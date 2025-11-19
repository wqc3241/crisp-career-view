import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { companies, sideProjects } from '@/constants/projectData';
import { Loader2, Database, CheckCircle } from 'lucide-react';

const KnowledgeBaseManager = () => {
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestedCount, setIngestedCount] = useState(0);
  const { toast } = useToast();

  const ingestKnowledgeBase = async () => {
    setIsIngesting(true);
    setIngestedCount(0);

    try {
      // Prepare items with type metadata
      const items = [
        ...companies.map(company => ({
          type: 'career',
          name: company.name,
          roleTitle: company.roleTitle,
          keyImpact: company.keyImpact,
          tags: company.tags,
        })),
        ...sideProjects.map(project => ({
          type: 'sideproject',
          title: project.title,
          description: project.description,
          tags: project.tags,
        })),
      ];

      console.log('Ingesting items:', items.length);

      // Call the edge function to process and store embeddings
      const { data, error } = await supabase.functions.invoke('ingest-knowledge', {
        body: { items },
      });

      if (error) throw error;

      const successCount = data?.results?.filter((r: any) => r.status === 'success').length || 0;
      setIngestedCount(successCount);

      toast({
        title: 'Knowledge Base Updated',
        description: `Successfully ingested ${successCount} items into the knowledge base.`,
      });
    } catch (error) {
      console.error('Error ingesting knowledge base:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to ingest knowledge base',
        variant: 'destructive',
      });
    } finally {
      setIsIngesting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Knowledge Base Manager
        </CardTitle>
        <CardDescription>
          Ingest career and side project data into the AI knowledge base for the avatar chat
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
          <div>
            <p className="font-medium">Total Items</p>
            <p className="text-sm text-muted-foreground">
              {companies.length} career projects + {sideProjects.length} side projects
            </p>
          </div>
          {ingestedCount > 0 && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">{ingestedCount} ingested</span>
            </div>
          )}
        </div>

        <Button
          onClick={ingestKnowledgeBase}
          disabled={isIngesting}
          className="w-full"
        >
          {isIngesting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Ingesting Knowledge Base...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Ingest Knowledge Base
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          This will create embeddings for all career and side projects using OpenAI's API
          and store them in the documents table for semantic search.
        </p>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBaseManager;