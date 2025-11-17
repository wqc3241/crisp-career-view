import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Upload, 
  Folder, 
  Trash2, 
  LogOut, 
  Download, 
  FolderPlus,
  Edit,
  Eye,
  Home,
  ArrowLeft,
  FileText,
  FileImage,
  File as FileIcon,
  ChevronRight
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const Admin = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [buckets, setBuckets] = useState<any[]>([]);
  const [selectedBucket, setSelectedBucket] = useState<string>('');
  const [files, setFiles] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>('');
  
  // Dialog states
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isCreateBucketOpen, setIsCreateBucketOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Form states
  const [newFolderName, setNewFolderName] = useState('');
  const [newBucketName, setNewBucketName] = useState('');
  const [isPublicBucket, setIsPublicBucket] = useState(false);
  const [fileSizeLimit, setFileSizeLimit] = useState('50');
  const [allowedMimeTypes, setAllowedMimeTypes] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [newName, setNewName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewType, setPreviewType] = useState<'image' | 'pdf' | 'text' | 'other'>('other');

  useEffect(() => {
    loadBuckets();
  }, []);

  useEffect(() => {
    if (selectedBucket) {
      loadFiles();
    }
  }, [selectedBucket, currentPath]);

  const loadBuckets = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('list-buckets');
      
      if (error) {
        toast({
          title: 'Error loading buckets',
          description: error.message,
          variant: 'destructive',
        });
      } else if (data?.buckets) {
        setBuckets(data.buckets);
      }
    } catch (error: any) {
      toast({
        title: 'Error loading buckets',
        description: error.message || 'Failed to load buckets',
        variant: 'destructive',
      });
    }
  };

  const loadFiles = async () => {
    if (!selectedBucket) return;
    
    setLoading(true);
    const { data, error } = await supabase.storage.from(selectedBucket).list(currentPath, {
      limit: 100,
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
        item.id !== null && !item.name.endsWith('.gitkeep')
      );
      
      // Identify folders: items with id === null OR items that are .gitkeep files
      const folderSet = new Set<string>();
      
      (data || []).forEach(item => {
        if (item.id === null) {
          // Regular folder
          folderSet.add(item.name);
        } else if (item.name.endsWith('/.gitkeep')) {
          // Extract folder name from .gitkeep path
          const folderName = item.name.replace('/.gitkeep', '');
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedBucket) return;

    setUploading(true);
    const filePath = currentPath ? `${currentPath}/${file.name}` : file.name;

    const { error } = await supabase.storage
      .from(selectedBucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    setUploading(false);

    if (error) {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
      loadFiles();
      e.target.value = '';
    }
  };

  const handleNavigateToFolder = (folderName: string) => {
    const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;
    setCurrentPath(newPath);
  };

  const handleNavigateBack = () => {
    const pathParts = currentPath.split('/');
    pathParts.pop();
    setCurrentPath(pathParts.join('/'));
  };

  const handleNavigateToPath = (index: number) => {
    const pathParts = currentPath.split('/');
    const newPath = pathParts.slice(0, index + 1).join('/');
    setCurrentPath(newPath);
  };

  const handleCreateFolder = async () => {
    if (!selectedBucket || !newFolderName.trim()) {
      toast({
        title: 'Invalid folder name',
        description: 'Please enter a valid folder name',
        variant: 'destructive',
      });
      return;
    }

    // Validate folder name - prevent spaces and special characters
    if (/[/\\\s]/.test(newFolderName)) {
      toast({
        title: 'Invalid folder name',
        description: 'Folder name cannot contain spaces, / or \\',
        variant: 'destructive',
      });
      return;
    }

    // Create folder by uploading a .gitkeep file
    const folderPath = currentPath 
      ? `${currentPath}/${newFolderName}/.gitkeep` 
      : `${newFolderName}/.gitkeep`;

    const { error } = await supabase.storage
      .from(selectedBucket)
      .upload(folderPath, new Blob([''], { type: 'text/plain' }), {
        cacheControl: '3600',
      });

    if (error) {
      toast({
        title: 'Create folder failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Folder created successfully',
      });
      setIsCreateFolderOpen(false);
      setNewFolderName('');
      loadFiles();
    }
  };

  const handleRenameFile = async () => {
    if (!selectedBucket || !selectedFile || !newName.trim()) {
      toast({
        title: 'Invalid file name',
        description: 'Please enter a valid file name',
        variant: 'destructive',
      });
      return;
    }

    // Validate file name
    if (/[/\\]/.test(newName)) {
      toast({
        title: 'Invalid file name',
        description: 'File name cannot contain / or \\',
        variant: 'destructive',
      });
      return;
    }

    const oldPath = currentPath ? `${currentPath}/${selectedFile.name}` : selectedFile.name;
    const newPath = currentPath ? `${currentPath}/${newName}` : newName;

    const { error } = await supabase.storage
      .from(selectedBucket)
      .move(oldPath, newPath);

    if (error) {
      toast({
        title: 'Rename failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'File renamed successfully',
      });
      setIsRenameOpen(false);
      setSelectedFile(null);
      setNewName('');
      loadFiles();
    }
  };

  const handlePreviewFile = (file: any) => {
    if (!selectedBucket) return;

    const filePath = currentPath ? `${currentPath}/${file.name}` : file.name;
    const { data } = supabase.storage.from(selectedBucket).getPublicUrl(filePath);
    
    setPreviewUrl(data.publicUrl);
    setSelectedFile(file);
    
    // Determine preview type based on file extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      setPreviewType('image');
    } else if (ext === 'pdf') {
      setPreviewType('pdf');
    } else if (['txt', 'md', 'json', 'csv', 'xml', 'html', 'css', 'js', 'ts', 'tsx'].includes(ext || '')) {
      setPreviewType('text');
    } else {
      setPreviewType('other');
    }
    
    setIsPreviewOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedBucket || !selectedFile) return;

    const filePath = currentPath ? `${currentPath}/${selectedFile.name}` : selectedFile.name;

    const { error } = await supabase.storage
      .from(selectedBucket)
      .remove([filePath]);

    if (error) {
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'File deleted successfully',
      });
      setIsDeleteDialogOpen(false);
      setSelectedFile(null);
      loadFiles();
    }
  };

  const handleDownload = async (fileName: string) => {
    if (!selectedBucket) return;

    const { data } = await supabase.storage
      .from(selectedBucket)
      .download(fileName);

    if (data) {
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      return <FileImage className="h-4 w-4" />;
    } else if (['txt', 'md', 'json', 'csv', 'xml'].includes(ext || '')) {
      return <FileText className="h-4 w-4" />;
    }
    return <FileIcon className="h-4 w-4" />;
  };

  const formatBreadcrumbs = () => {
    if (!currentPath) return [];
    return currentPath.split('/');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  const handleCreateBucket = async () => {
    if (!newBucketName.trim()) {
      toast({
        title: 'Invalid bucket name',
        description: 'Please enter a valid bucket name',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate bucket name format
    if (!/^[a-z0-9-]+$/.test(newBucketName)) {
      toast({
        title: 'Invalid bucket name',
        description: 'Bucket name must be lowercase alphanumeric with hyphens only',
        variant: 'destructive',
      });
      return;
    }
    
    setUploading(true);
    
    // Convert file size limit to bytes
    const fileSizeLimitBytes = parseInt(fileSizeLimit) * 1024 * 1024; // Convert MB to bytes
    
    const { data, error } = await supabase.functions.invoke('list-buckets', {
      method: 'POST',
      body: {
        bucketName: newBucketName,
        options: {
          public: isPublicBucket,
          fileSizeLimit: fileSizeLimitBytes,
          allowedMimeTypes: allowedMimeTypes ? allowedMimeTypes.split(',').map(t => t.trim()) : null
        }
      }
    });
    
    setUploading(false);
    
    if (error) {
      toast({
        title: 'Create bucket failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Bucket "${newBucketName}" created successfully`,
      });
      setIsCreateBucketOpen(false);
      setNewBucketName('');
      setIsPublicBucket(false);
      setFileSizeLimit('50');
      setAllowedMimeTypes('');
      loadBuckets(); // Refresh bucket list
    }
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

          <Card>
            <CardHeader>
              <CardTitle>File Management</CardTitle>
              <CardDescription>Upload and manage files in storage buckets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 space-y-2">
                  <Label>Select Bucket</Label>
                  <Select value={selectedBucket} onValueChange={setSelectedBucket}>
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
                  <Dialog open={isCreateBucketOpen} onOpenChange={setIsCreateBucketOpen}>
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
                            onChange={(e) => setNewBucketName(e.target.value.toLowerCase())}
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
                            onCheckedChange={setIsPublicBucket}
                          />
                          <Label htmlFor="isPublic">Public Bucket</Label>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Public buckets allow anyone to download files without authentication
                        </p>
                        
                        <div>
                          <Label htmlFor="fileSize">File Size Limit (MB)</Label>
                          <Select value={fileSizeLimit} onValueChange={setFileSizeLimit}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 MB</SelectItem>
                              <SelectItem value="5">5 MB</SelectItem>
                              <SelectItem value="10">10 MB</SelectItem>
                              <SelectItem value="50">50 MB</SelectItem>
                              <SelectItem value="100">100 MB</SelectItem>
                              <SelectItem value="500">500 MB</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="mimeTypes">Allowed MIME Types (optional)</Label>
                          <Input
                            id="mimeTypes"
                            value={allowedMimeTypes}
                            onChange={(e) => setAllowedMimeTypes(e.target.value)}
                            placeholder="image/*, application/pdf"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Leave empty to allow all file types. Separate multiple types with commas.
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateBucketOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateBucket} disabled={uploading}>
                          {uploading ? 'Creating...' : 'Create Bucket'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {selectedBucket && (
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
                      onClick={() => setCurrentPath('')}
                      disabled={!currentPath}
                    >
                      <Home className="h-4 w-4" />
                    </Button>
                    {currentPath && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNavigateBack}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                    )}
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink onClick={() => setCurrentPath('')} className="cursor-pointer">
                            {selectedBucket} (Bucket Root)
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        {formatBreadcrumbs().map((part, index) => (
                          <>
                            <BreadcrumbSeparator key={`sep-${index}`}>
                              <ChevronRight className="h-4 w-4" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem key={index}>
                              {index === formatBreadcrumbs().length - 1 ? (
                                <BreadcrumbPage>{part}</BreadcrumbPage>
                              ) : (
                                <BreadcrumbLink 
                                  onClick={() => handleNavigateToPath(index)}
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
                    <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <FolderPlus className="mr-2 h-4 w-4" />
                          Create Folder
                        </Button>
                      </DialogTrigger>
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
                              value={newFolderName}
                              onChange={(e) => setNewFolderName(e.target.value)}
                              placeholder="my-folder"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsCreateFolderOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleCreateFolder}>Create</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

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
                        onChange={handleFileUpload}
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
                            onClick={() => handleNavigateToFolder(folder.name)}
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
                              {getFileIcon(file.name)}
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
                                onClick={() => handlePreviewFile(file)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedFile(file);
                                  setNewName(file.name);
                                  setIsRenameOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownload(file)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedFile(file);
                                  setIsDeleteDialogOpen(true);
                                }}
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
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
