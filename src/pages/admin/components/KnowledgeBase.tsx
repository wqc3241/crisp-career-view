import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { companies, sideProjects } from "@/constants/projectData";
import { Loader2, Database, RefreshCw } from "lucide-react";

const KnowledgeBase = () => {
    const { toast } = useToast();
    const [syncing, setSyncing] = useState(false);

    const handleSyncData = async () => {
        setSyncing(true);
        try {
            // Prepare data for ingestion
            const itemsToIngest = [
                ...companies.map(c => ({ ...c, type: 'Career Experience' })),
                ...sideProjects.map(p => ({ ...p, type: 'Side Project' }))
            ];

            const { data, error } = await supabase.functions.invoke('ingest-knowledge', {
                body: { items: itemsToIngest },
            });

            if (error) throw error;

            toast({
                title: "Sync Complete",
                description: `Successfully synced ${itemsToIngest.length} items to the Knowledge Base.`,
            });
        } catch (error) {
            console.error('Sync error:', error);
            toast({
                title: "Sync Failed",
                description: "Failed to sync data to the Knowledge Base.",
                variant: "destructive",
            });
        } finally {
            setSyncing(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Knowledge Base
                </CardTitle>
                <CardDescription>
                    Manage the data available to your AI Avatar. Syncing will update the vector database with the latest career and project information.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                    <div>
                        <h3 className="font-medium">Career & Projects Data</h3>
                        <p className="text-sm text-muted-foreground">
                            Syncs data from <code>projectData.ts</code> to the AI memory.
                        </p>
                    </div>
                    <Button onClick={handleSyncData} disabled={syncing}>
                        {syncing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Syncing...
                            </>
                        ) : (
                            <>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Sync Data
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default KnowledgeBase;
