import { FileText, FileImage, File as FileIcon } from 'lucide-react';
import { IMAGE_EXTENSIONS, TEXT_EXTENSIONS } from './constants';

export const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (IMAGE_EXTENSIONS.includes(ext || '')) {
        return FileImage;
    } else if (TEXT_EXTENSIONS.includes(ext || '')) {
        return FileText;
    }
    return FileIcon;
};

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

export const formatBreadcrumbs = (currentPath: string): string[] => {
    if (!currentPath) return [];
    return currentPath.split('/');
};

export const validateFolderName = (name: string): { valid: boolean; error?: string } => {
    if (!name.trim()) {
        return { valid: false, error: 'Please enter a valid folder name' };
    }
    if (/[/\\\s]/.test(name)) {
        return { valid: false, error: 'Folder name cannot contain spaces, / or \\' };
    }
    return { valid: true };
};

export const validateFileName = (name: string): { valid: boolean; error?: string } => {
    if (!name.trim()) {
        return { valid: false, error: 'Please enter a valid file name' };
    }
    if (/[/\\]/.test(name)) {
        return { valid: false, error: 'File name cannot contain / or \\' };
    }
    return { valid: true };
};

export const validateBucketName = (name: string): { valid: boolean; error?: string } => {
    if (!name.trim()) {
        return { valid: false, error: 'Please enter a valid bucket name' };
    }
    if (!/^[a-z0-9-]+$/.test(name)) {
        return { valid: false, error: 'Bucket name must be lowercase alphanumeric with hyphens only' };
    }
    return { valid: true };
};

export const buildFilePath = (currentPath: string, fileName: string): string => {
    return currentPath ? `${currentPath}/${fileName}` : fileName;
};
