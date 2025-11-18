import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FolderPlus } from 'lucide-react';
import { StorageBucket } from '../types';
import { FILE_SIZE_OPTIONS } from '../constants';

interface BucketSelectorProps {
    buckets: StorageBucket[];
    selectedBucket: string;
    onBucketChange: (bucket: string) => void;
    isCreateBucketOpen: boolean;
    onCreateBucketOpenChange: (open: boolean) => void;
    newBucketName: string;
    onNewBucketNameChange: (name: string) => void;
    isPublicBucket: boolean;
    onIsPublicBucketChange: (isPublic: boolean) => void;
    fileSizeLimit: string;
    onFileSizeLimitChange: (limit: string) => void;
    allowedMimeTypes: string;
    onAllowedMimeTypesChange: (types: string) => void;
    onCreateBucket: () => void;
    uploading: boolean;
}

export const BucketSelector = ({
    buckets,
    selectedBucket,
    onBucketChange,
    isCreateBucketOpen,
    onCreateBucketOpenChange,
    newBucketName,
    onNewBucketNameChange,
    isPublicBucket,
    onIsPublicBucketChange,
    fileSizeLimit,
    onFileSizeLimitChange,
    allowedMimeTypes,
    onAllowedMimeTypesChange,
    onCreateBucket,
    uploading,
}: BucketSelectorProps) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 space-y-2">
                <Label>Select Bucket</Label>
                <Select value={selectedBucket} onValueChange={onBucketChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose a bucket" />
                    </SelectTrigger>
                    <SelectContent>
                        {buckets.map((bucket) => (
                            <SelectItem key={bucket.id} value={bucket.id}>
                                {bucket.name} {bucket.public && '(Public)'}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="pt-8">
                <Dialog open={isCreateBucketOpen} onOpenChange={onCreateBucketOpenChange}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            <FolderPlus className="mr-2 h-4 w-4" />
                            Create Bucket
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Storage Bucket</DialogTitle>
                            <DialogDescription>
                                Create a new bucket to organize your files. Bucket names must be lowercase alphanumeric with hyphens only.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="bucketName">Bucket Name *</Label>
                                <Input
                                    id="bucketName"
                                    value={newBucketName}
                                    onChange={(e) => onNewBucketNameChange(e.target.value.toLowerCase())}
                                    placeholder="my-bucket"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Only lowercase letters, numbers, and hyphens
                                </p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="isPublic"
                                    checked={isPublicBucket}
                                    onCheckedChange={onIsPublicBucketChange}
                                />
                                <Label htmlFor="isPublic">Public Bucket</Label>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Public buckets allow anyone to download files without authentication
                            </p>

                            <div>
                                <Label htmlFor="fileSize">File Size Limit (MB)</Label>
                                <Select value={fileSizeLimit} onValueChange={onFileSizeLimitChange}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FILE_SIZE_OPTIONS.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="mimeTypes">Allowed MIME Types (optional)</Label>
                                <Input
                                    id="mimeTypes"
                                    value={allowedMimeTypes}
                                    onChange={(e) => onAllowedMimeTypesChange(e.target.value)}
                                    placeholder="image/*, application/pdf"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Leave empty to allow all file types. Separate multiple types with commas.
                                </p>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => onCreateBucketOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button onClick={onCreateBucket} disabled={uploading}>
                                {uploading ? 'Creating...' : 'Create Bucket'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
