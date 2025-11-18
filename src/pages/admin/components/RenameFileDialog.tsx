import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StorageFile } from '../types';

interface RenameFileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedFile: StorageFile | null;
    newName: string;
    onNewNameChange: (name: string) => void;
    onRename: () => void;
}

export const RenameFileDialog = ({
    open,
    onOpenChange,
    selectedFile,
    newName,
    onNewNameChange,
    onRename,
}: RenameFileDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rename File</DialogTitle>
                    <DialogDescription>
                        Enter a new name for "{selectedFile?.name}"
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="newName">New Name</Label>
                        <Input
                            id="newName"
                            value={newName}
                            onChange={(e) => onNewNameChange(e.target.value)}
                            placeholder="Enter new file name"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={onRename}>
                        Rename
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
