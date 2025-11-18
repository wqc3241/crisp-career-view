import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import {
    Upload,
    Folder,
    Trash2,
    Download,
    FolderPlus,
    Edit,
    Eye,
    Home,
    ArrowLeft,
    ChevronRight
} from 'lucide-react';
import { DialogTrigger } from '@/components/ui/dialog';
import { StorageFile, StorageFolder } from '../types';
import { getFileIcon, formatFileSize, formatBreadcrumbs } from '../utils';

interface FileExplorerProps {
    selectedBucket: string;
    currentPath: string;
    loading: boolean;
    uploading: boolean;
    folders: StorageFolder[];
    files: StorageFile[];
    onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNavigateToFolder: (folderName: string) => void;
    onNavigateBack: () => void;
    onNavigateToPath: (index: number) => void;
    onNavigateToRoot: () => void;
    onPreviewFile: (file: StorageFile) => void;
    onSelectFileForRename: (file: StorageFile) => void;
    onDownloadFile: (file: StorageFile) => void;
    onSelectFileForDelete: (file: StorageFile) => void;
    CreateFolderDialogTrigger: React.ReactNode;
}

export const FileExplorer = ({
    selectedBucket,
    currentPath,
    loading,
    uploading,
    folders,
    files,
    onFileUpload,
    onNavigateToFolder,
    onNavigateBack,
    onNavigateToPath,
    onNavigateToRoot,
    onPreviewFile,
    onSelectFileForRename,
    onDownloadFile,
    onSelectFileForDelete,
    CreateFolderDialogTrigger,
}: FileExplorerProps) => {
    const FileIconComponent = (props: { fileName: string }) => {
        const IconComponent = getFileIcon(props.fileName);
        return <IconComponent className="h-4 w-4" />;
    };

    return (
        <>
            {/* Bucket Indicator */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-md mb-4">
                <Folder className="h-4 w-4" />
                <span>Current Bucket: <strong className="text-foreground">{selectedBucket}</strong></span>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onNavigateToRoot}
                    disabled={!currentPath}
                >
                    <Home className="h-4 w-4" />
                </Button>
                {currentPath && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onNavigateBack}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                )}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={onNavigateToRoot} className="cursor-pointer">
                                {selectedBucket} (Bucket Root)
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {formatBreadcrumbs(currentPath).map((part, index) => (
                            <>
                                <BreadcrumbSeparator key={`sep-${index}`}>
                                    <ChevronRight className="h-4 w-4" />
                                </BreadcrumbSeparator>
                                <BreadcrumbItem key={index}>
                                    {index === formatBreadcrumbs(currentPath).length - 1 ? (
                                        <BreadcrumbPage>{part}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink
                                            onClick={() => onNavigateToPath(index)}
                                            className="cursor-pointer"
                                        >
                                            {part}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                {CreateFolderDialogTrigger}

                <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button variant="outline" disabled={uploading} asChild>
                        <span>
                            <Upload className="mr-2 h-4 w-4" />
                            {uploading ? 'Uploading...' : 'Upload File'}
                        </span>
                    </Button>
                    <Input
                        id="file-upload"
                        type="file"
                        onChange={onFileUpload}
                        className="hidden"
                    />
                </Label>
            </div>

            <Separator />

            {/* Loading State */}
            {loading && (
                <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            )}

            {/* Empty State */}
            {!loading && folders.length === 0 && files.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="font-medium">No folders or files in this location</p>
                    <p className="text-sm mt-2">
                        {currentPath
                            ? `Create a folder or upload files to ${currentPath}`
                            : `Create your first folder in "${selectedBucket}" bucket`
                        }
                    </p>
                </div>
            )}

            {/* Folders */}
            {!loading && folders.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Folders</h3>
                    <div className="space-y-1">
                        {folders.map((folder) => (
                            <div
                                key={folder.name}
                                className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-accent cursor-pointer transition-colors"
                                onClick={() => onNavigateToFolder(folder.name)}
                            >
                                <div className="flex items-center gap-3">
                                    <Folder className="h-5 w-5 text-primary" />
                                    <span className="font-medium">{folder.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Files */}
            {!loading && files.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Files</h3>
                    <div className="space-y-1">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-accent/50 transition-colors"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <FileIconComponent fileName={file.name} />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatFileSize(file.metadata?.size || 0)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onPreviewFile(file)}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onSelectFileForRename(file)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDownloadFile(file)}
                                    >
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onSelectFileForDelete(file)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
