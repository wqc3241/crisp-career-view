export interface StorageBucket {
  id: string;
  name: string;
  public: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface StorageFile {
  id: string | null;
  name: string;
  metadata?: {
    size?: number;
    mimetype?: string;
    lastModified?: string;
  };
}

export interface StorageFolder {
  name: string;
  id: null;
}

export interface BucketOptions {
  public: boolean;
  fileSizeLimit: number;
  allowedMimeTypes: string[] | null;
}

export interface DialogStates {
  isCreateFolderOpen: boolean;
  isCreateBucketOpen: boolean;
  isRenameOpen: boolean;
  isPreviewOpen: boolean;
  isDeleteDialogOpen: boolean;
}

export interface FormStates {
  newFolderName: string;
  newBucketName: string;
  isPublicBucket: boolean;
  fileSizeLimit: string;
  allowedMimeTypes: string;
  selectedFile: StorageFile | null;
  newName: string;
  previewUrl: string;
  previewType: 'image' | 'pdf' | 'text' | 'other';
}
