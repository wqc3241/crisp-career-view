import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { StorageBucket, BucketOptions } from '../types';
import { validateBucketName } from '../utils';

export const useStorageBuckets = () => {
    const { toast } = useToast();
    const [buckets, setBuckets] = useState<StorageBucket[]>([]);
    const [loading, setLoading] = useState(false);

    const loadBuckets = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                toast({
                    title: 'Authentication required',
                    description: 'Please sign in to access this feature',
                    variant: 'destructive',
                });
                return;
            }

            const { data, error } = await supabase.functions.invoke('list-buckets', {
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            });

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

    const createBucket = async (
        bucketName: string,
        options: BucketOptions
    ): Promise<boolean> => {
        const validation = validateBucketName(bucketName);
        if (!validation.valid) {
            toast({
                title: 'Invalid bucket name',
                description: validation.error,
                variant: 'destructive',
            });
            return false;
        }

        setLoading(true);

        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            toast({
                title: 'Authentication required',
                description: 'Please sign in to access this feature',
                variant: 'destructive',
            });
            setLoading(false);
            return false;
        }

        const { error } = await supabase.functions.invoke('list-buckets', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
            body: {
                bucketName,
                options
            }
        });

        setLoading(false);

        if (error) {
            toast({
                title: 'Create bucket failed',
                description: error.message,
                variant: 'destructive',
            });
            return false;
        } else {
            toast({
                title: 'Success',
                description: `Bucket "${bucketName}" created successfully`,
            });
            await loadBuckets();
            return true;
        }
    };

    return {
        buckets,
        loading,
        loadBuckets,
        createBucket,
    };
};
