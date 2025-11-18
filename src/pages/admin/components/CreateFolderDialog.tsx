import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreateFolderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    folderName: string;
    onFolderNameChange: (name: string) => void;
    onCreate: () => void;
    selectedBucket: string;
    currentPath: string;
}

export const CreateFolderDialog = ({
    open,
    onOpenChange,
    folderName,
    onFolderNameChange,
    onCreate,
    selectedBucket,
    currentPath,
}: CreateFolderDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                    <DialogDescription>
                        Creating folder in: {selectedBucket}/{currentPath || '(bucket root)'}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="folderName">Folder Name</Label>
                        <Input
                            id="folderName"
                            value={folderName}
                            onChange={(e) => onFolderNameChange(e.target.value)}
                            placeholder="my-folder"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={onCreate}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
