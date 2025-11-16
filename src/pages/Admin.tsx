import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Folder, Trash2, LogOut, Download } from 'lucide-react';

const Admin = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [buckets, setBuckets] = useState<any[]>([]);
  const [selectedBucket, setSelectedBucket] = useState<string>('');
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [folderPath, setFolderPath] = useState('');

  useEffect(() => {
    loadBuckets();
  }, []);

  useEffect(() => {
    if (selectedBucket) {
      loadFiles();
    }
  }, [selectedBucket]);

  const loadBuckets = async () => {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      toast({
        title: 'Error loading buckets',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setBuckets(data || []);
    }
  };

  const loadFiles = async () => {
    if (!selectedBucket) return;
    
    const { data, error } = await supabase.storage.from(selectedBucket).list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

    if (error) {
      toast({
        title: 'Error loading files',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setFiles(data || []);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedBucket) return;

    setUploading(true);
    const filePath = folderPath ? `${folderPath}/${file.name}` : file.name;

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
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!selectedBucket) return;
    
    const confirmed = window.confirm(`Delete ${fileName}?`);
    if (!confirmed) return;

    const { error } = await supabase.storage
      .from(selectedBucket)
      .remove([fileName]);

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
              <div className="space-y-2">
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

              {selectedBucket && (
                <>
                  <div className="space-y-2">
                    <Label>Folder Path (optional)</Label>
                    <div className="flex gap-2">
                      <Folder className="h-4 w-4 mt-2" />
                      <Input
                        placeholder="e.g., images/avatars"
                        value={folderPath}
                        onChange={(e) => setFolderPath(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Upload File</Label>
                    <div className="flex gap-2">
                      <Input
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                        disabled={uploading}
                      />
                      <Button disabled={uploading}>
                        <Upload className="mr-2 h-4 w-4" />
                        {uploading ? 'Uploading...' : 'Upload'}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Files ({files.length})</Label>
                    <div className="border rounded-md max-h-96 overflow-y-auto">
                      {files.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          No files in this bucket
                        </div>
                      ) : (
                        <div className="divide-y">
                          {files.map((file) => (
                            <div
                              key={file.name}
                              className="p-3 flex items-center justify-between hover:bg-muted/50"
                            >
                              <div className="flex-1">
                                <p className="font-medium">{file.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {(file.metadata?.size / 1024).toFixed(2)} KB
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDownload(file.name)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDelete(file.name)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
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
