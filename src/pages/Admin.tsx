import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, FolderPlus, RefreshCw } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BucketSelector } from './admin/components/BucketSelector';
import { FileExplorer } from './admin/components/FileExplorer';
import { CreateFolderDialog } from './admin/components/CreateFolderDialog';
import { RenameFileDialog } from './admin/components/RenameFileDialog';
import { DeleteConfirmDialog } from './admin/components/DeleteConfirmDialog';
import KnowledgeBaseManager from './admin/components/KnowledgeBaseManager';
import { useStorageBuckets } from './admin/hooks/useStorageBuckets';
import { useStorageFiles } from './admin/hooks/useStorageFiles';
import { StorageFile } from './admin/types';
import { DEFAULT_FILE_SIZE_LIMIT } from './admin/constants';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const GitHubSyncCard = () => {
  const [syncing, setSyncing] = useState(false);
  const [lastResult, setLastResult] = useState<string[] | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    setLastResult(null);
    toast.info('GitHub sync started — this may take a few minutes...');
    try {
      const { data, error } = await supabase.functions.invoke('sync-github-projects');
      if (error) throw error;
      setLastResult(data?.results || ['Sync completed']);
      toast.success(`Sync complete: ${data?.results?.length || 0} repos processed`);
    } catch (e: any) {
      toast.error(`Sync failed: ${e.message}`);
      setLastResult([`Error: ${e.message}`]);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub Project Sync</CardTitle>
        <CardDescription>
          Sync projects from GitHub, generate AI descriptions, and capture screenshots.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleSync} disabled={syncing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Re-sync GitHub Projects'}
        </Button>
        {lastResult && (
          <div className="mt-4 max-h-64 overflow-auto rounded-md border p-3 text-xs font-mono bg-muted">
            {lastResult.map((r, i) => (
              <div key={i} className={r.includes('error') || r.includes('Error') ? 'text-destructive' : 'text-muted-foreground'}>
                {r}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Admin = () => {
  const { signOut, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [selectedBucket, setSelectedBucket] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<StorageFile | null>(null);

  // Dialog states
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isCreateBucketOpen, setIsCreateBucketOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Form states
  const [newFolderName, setNewFolderName] = useState('');
  const [newBucketName, setNewBucketName] = useState('');
  const [isPublicBucket, setIsPublicBucket] = useState(false);
  const [fileSizeLimit, setFileSizeLimit] = useState(DEFAULT_FILE_SIZE_LIMIT);
  const [allowedMimeTypes, setAllowedMimeTypes] = useState('');
  const [newName, setNewName] = useState('');

  // Custom hooks
  const { buckets, loading: bucketsLoading, loadBuckets, createBucket } = useStorageBuckets();
  const {
    files,
    folders,
    loading: filesLoading,
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
  } = useStorageFiles(selectedBucket);

  useEffect(() => {
    if (user && isAdmin) {
      loadBuckets();
    }
  }, [user, isAdmin]);

  useEffect(() => {
    if (selectedBucket) {
      loadFiles();
    }
  }, [selectedBucket, currentPath]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const success = await uploadFile(file);
    if (success) {
      e.target.value = '';
    }
  };

  const handleCreateFolder = async () => {
    const success = await createFolder(newFolderName);
    if (success) {
      setIsCreateFolderOpen(false);
      setNewFolderName('');
    }
  };

  const handleRenameFile = async () => {
    if (!selectedFile) return;

    const success = await renameFile(selectedFile.name, newName);
    if (success) {
      setIsRenameOpen(false);
      setSelectedFile(null);
      setNewName('');
    }
  };

  const handleDelete = async () => {
    if (!selectedFile) return;

    const success = await deleteFile(selectedFile.name);
    if (success) {
      setIsDeleteDialogOpen(false);
      setSelectedFile(null);
    }
  };

  const handleCreateBucket = async () => {
    const fileSizeLimitBytes = parseInt(fileSizeLimit) * 1024 * 1024;

    const success = await createBucket(newBucketName, {
      public: isPublicBucket,
      fileSizeLimit: fileSizeLimitBytes,
      allowedMimeTypes: allowedMimeTypes ? allowedMimeTypes.split(',').map(t => t.trim()) : null
    });

    if (success) {
      setIsCreateBucketOpen(false);
      setNewBucketName('');
      setIsPublicBucket(false);
      setFileSizeLimit(DEFAULT_FILE_SIZE_LIMIT);
      setAllowedMimeTypes('');
    }
  };

  const handleSelectFileForRename = (file: StorageFile) => {
    setSelectedFile(file);
    setNewName(file.name);
    setIsRenameOpen(true);
  };

  const handleSelectFileForDelete = (file: StorageFile) => {
    setSelectedFile(file);
    setIsDeleteDialogOpen(true);
  };

  const handleDownloadFile = (file: StorageFile) => {
    downloadFile(file.name);
  };

  const handlePreviewFile = (file: StorageFile) => {
    previewFile(file.name);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <Tabs defaultValue="storage" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="storage">Storage Management</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              <TabsTrigger value="github">GitHub Sync</TabsTrigger>
            </TabsList>

            <TabsContent value="storage" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Storage Management</CardTitle>
                  <CardDescription>Manage your storage buckets and files</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <BucketSelector
                    buckets={buckets}
                    selectedBucket={selectedBucket}
                    onBucketChange={setSelectedBucket}
                    isCreateBucketOpen={isCreateBucketOpen}
                    onCreateBucketOpenChange={setIsCreateBucketOpen}
                    newBucketName={newBucketName}
                    onNewBucketNameChange={setNewBucketName}
                    isPublicBucket={isPublicBucket}
                    onIsPublicBucketChange={setIsPublicBucket}
                    fileSizeLimit={fileSizeLimit}
                    onFileSizeLimitChange={setFileSizeLimit}
                    allowedMimeTypes={allowedMimeTypes}
                    onAllowedMimeTypesChange={setAllowedMimeTypes}
                    onCreateBucket={handleCreateBucket}
                    uploading={uploading}
                  />

                  {selectedBucket && (
                    <FileExplorer
                      selectedBucket={selectedBucket}
                      files={files}
                      folders={folders}
                      loading={filesLoading}
                      uploading={uploading}
                      currentPath={currentPath}
                      onFileUpload={handleFileUpload}
                      onNavigateToFolder={navigateToFolder}
                      onNavigateBack={navigateBack}
                      onNavigateToPath={navigateToPath}
                      onNavigateToRoot={navigateToRoot}
                      onDownloadFile={handleDownloadFile}
                      onPreviewFile={handlePreviewFile}
                      onSelectFileForRename={handleSelectFileForRename}
                      onSelectFileForDelete={handleSelectFileForDelete}
                      CreateFolderDialogTrigger={
                        <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <FolderPlus className="mr-2 h-4 w-4" />
                              Create Folder
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      }
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="knowledge" className="mt-6">
              <KnowledgeBaseManager />
            </TabsContent>

            <TabsContent value="github" className="mt-6">
              <GitHubSyncCard />
            </TabsContent>
          </Tabs>
        </div>

        {/* Dialogs */}
        <CreateFolderDialog
          open={isCreateFolderOpen}
          onOpenChange={setIsCreateFolderOpen}
          folderName={newFolderName}
          onFolderNameChange={setNewFolderName}
          onCreate={handleCreateFolder}
          selectedBucket={selectedBucket}
          currentPath={currentPath}
        />

        <RenameFileDialog
          open={isRenameOpen}
          onOpenChange={setIsRenameOpen}
          selectedFile={selectedFile}
          newName={newName}
          onNewNameChange={setNewName}
          onRename={handleRenameFile}
        />

        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          selectedFile={selectedFile}
          onDelete={handleDelete}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
