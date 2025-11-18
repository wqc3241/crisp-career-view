import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { StorageFile, StorageFolder } from '../types';
import { validateFolderName, validateFileName, buildFilePath } from '../utils';
import { DEFAULT_LIST_LIMIT, GITKEEP_FILENAME, CACHE_CONTROL_VALUE } from '../constants';

export const useStorageFiles = (selectedBucket: string) => {
    const { toast } = useToast();
    const [files, setFiles] = useState<StorageFile[]>([]);
    const [folders, setFolders] = useState<StorageFolder[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [currentPath, setCurrentPath] = useState<string>('');

    const loadFiles = async () => {
        if (!selectedBucket) return;

        setLoading(true);
        const { data, error } = await supabase.storage.from(selectedBucket).list(currentPath, {
            limit: DEFAULT_LIST_LIMIT,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        });

        setLoading(false);

        if (error) {
            toast({
                title: 'Error loading files',
                description: error.message,
                variant: 'destructive',
            });
        } else {
            // Filter out .gitkeep files from the file list
            const fileItems = (data || []).filter(item =>
                item.id !== null && !item.name.endsWith(GITKEEP_FILENAME)
            );

            // Identify folders: items with id === null OR items that are .gitkeep files
            const folderSet = new Set<string>();

            (data || []).forEach(item => {
                if (item.id === null) {
                    // Regular folder
                    folderSet.add(item.name);
                } else if (item.name.includes(`/${GITKEEP_FILENAME}`)) {
                    // Extract folder name from .gitkeep path
                    const folderName = item.name.replace(`/${GITKEEP_FILENAME}`, '');
                    if (folderName) {
                        folderSet.add(folderName);
                    }
                }
            });

            // Convert set to array of folder objects
            const folderItems = Array.from(folderSet).map(name => ({
                name,
                id: null,
            }));

            setFolders(folderItems);
            setFiles(fileItems);
        }
    };

    const uploadFile = async (file: File): Promise<boolean> => {
        if (!file || !selectedBucket) return false;

        setUploading(true);
        const filePath = buildFilePath(currentPath, file.name);

        const { error } = await supabase.storage
            .from(selectedBucket)
            .upload(filePath, file, {
                cacheControl: CACHE_CONTROL_VALUE,
                upsert: true,
            });

        setUploading(false);

        if (error) {
            toast({
                title: 'Upload failed',
                description: error.message,
                variant: 'destructive',
            });
            return false;
        } else {
            toast({
                title: 'Success',
                description: 'File uploaded successfully',
            });
            await loadFiles();
            return true;
        }
    };

    const createFolder = async (folderName: string): Promise<boolean> => {
        if (!selectedBucket) return false;

        const validation = validateFolderName(folderName);
        if (!validation.valid) {
            toast({
                title: 'Invalid folder name',
                description: validation.error,
                variant: 'destructive',
            });
            return false;
        }

        // Create folder by uploading a .gitkeep file
        const folderPath = currentPath
            ? `${currentPath}/${folderName}/${GITKEEP_FILENAME}`
            : `${folderName}/${GITKEEP_FILENAME}`;

        const { error } = await supabase.storage
            .from(selectedBucket)
            .upload(folderPath, new Blob([''], { type: 'text/plain' }), {
                cacheControl: CACHE_CONTROL_VALUE,
            });

        if (error) {
            toast({
                title: 'Create folder failed',
                description: error.message,
                variant: 'destructive',
            });
            return false;
        } else {
            toast({
                title: 'Success',
                description: 'Folder created successfully',
            });
            await loadFiles();
            return true;
        }
    };

    const renameFile = async (oldName: string, newName: string): Promise<boolean> => {
        if (!selectedBucket) return false;

        const validation = validateFileName(newName);
        if (!validation.valid) {
            toast({
                title: 'Invalid file name',
                description: validation.error,
                variant: 'destructive',
            });
            return false;
        }

        const oldPath = buildFilePath(currentPath, oldName);
        const newPath = buildFilePath(currentPath, newName);

        const { error } = await supabase.storage
            .from(selectedBucket)
            .move(oldPath, newPath);

        if (error) {
            toast({
                title: 'Rename failed',
                description: error.message,
                variant: 'destructive',
            });
            return false;
        } else {
            toast({
                title: 'Success',
                description: 'File renamed successfully',
            });
            await loadFiles();
            return true;
        }
    };

    const deleteFile = async (fileName: string): Promise<boolean> => {
        if (!selectedBucket) return false;

        const filePath = buildFilePath(currentPath, fileName);

        const { error } = await supabase.storage
            .from(selectedBucket)
            .remove([filePath]);

        if (error) {
            toast({
                title: 'Delete failed',
                description: error.message,
                variant: 'destructive',
            });
            return false;
        } else {
            toast({
                title: 'Success',
                description: 'File deleted successfully',
            });
            await loadFiles();
            return true;
        }
    };

    const downloadFile = async (fileName: string): Promise<void> => {
        if (!selectedBucket) return;

        const filePath = buildFilePath(currentPath, fileName);

        const { data, error } = await supabase.storage
            .from(selectedBucket)
            .download(filePath);

        if (error) {
            toast({
                title: 'Download failed',
                description: error.message,
                variant: 'destructive',
            });
            return;
        }

        if (data) {
            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const previewFile = (fileName: string): void => {
        if (!selectedBucket) return;

        const filePath = buildFilePath(currentPath, fileName);
        const { data } = supabase.storage.from(selectedBucket).getPublicUrl(filePath);

        // Open file in new tab
        window.open(data.publicUrl, '_blank');
    };

    const navigateToFolder = (folderName: string): void => {
        const newPath = buildFilePath(currentPath, folderName);
        setCurrentPath(newPath);
    };

    const navigateBack = (): void => {
        const pathParts = currentPath.split('/');
        pathParts.pop();
        setCurrentPath(pathParts.join('/'));
    };

    const navigateToPath = (index: number): void => {
        const pathParts = currentPath.split('/');
        const newPath = pathParts.slice(0, index + 1).join('/');
        setCurrentPath(newPath);
    };

    const navigateToRoot = (): void => {
        setCurrentPath('');
    };

    return {
        files,
        folders,
        loading,
        uploading,
        currentPath,
        loadFiles,
        uploadFile,
        createFolder,
        renameFile,
        deleteFile,
        downloadFile,
        previewFile,
        navigateToFolder,
        navigateBack,
        navigateToPath,
        navigateToRoot,
    };
};
