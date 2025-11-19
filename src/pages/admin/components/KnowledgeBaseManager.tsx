import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { companies, sideProjects } from '@/constants/projectData';
import { resumeData } from '@/constants/resumeData';
import { Loader2, Database, CheckCircle, RefreshCw } from 'lucide-react';

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
        // Career Experience from Project Data
        ...companies.map(company => ({
          type: 'Career Experience',
          name: company.name,
          roleTitle: company.roleTitle,
          keyImpact: company.keyImpact,
          tags: company.tags,
        })),
        // Side Projects
        ...sideProjects.map(project => ({
          type: 'Side Project',
          title: project.title,
          description: project.description,
          tags: project.tags,
        })),
        // Resume Personal Info
        {
          title: "Contact & Personal Info",
          type: "Personal Info",
          description: resumeData.personalInfo.summary,
          keyImpact: [
            `Phone: ${resumeData.personalInfo.phone}`,
            `Email: ${resumeData.personalInfo.email}`,
            `Location: ${resumeData.personalInfo.location}`,
            `LinkedIn: ${resumeData.personalInfo.linkedin}`,
            `Portfolio: ${resumeData.personalInfo.portfolio}`
          ]
        },
        // Resume Skills
        {
          title: "Professional Skills",
          type: "Skills",
          description: "List of technical and professional skills",
          tags: resumeData.skills
        },
        // Resume Education
        ...resumeData.education.map(edu => ({
          title: edu.school,
          type: "Education",
          description: `${edu.degree} (${edu.period})`,
          keyImpact: [`Degree: ${edu.degree}`, `School: ${edu.school}`, `Period: ${edu.period}`]
        })),
        // Resume Experience (Detailed)
        ...resumeData.experience.map(exp => ({
          title: exp.company,
          type: "Resume Experience",
          description: `${exp.role} (${exp.period})`,
          keyImpact: exp.description
        }))
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
        title: 'Sync Complete',
        description: `Successfully synced ${successCount} items to the Knowledge Base.`,
      });
    } catch (error) {
      console.error('Error ingesting knowledge base:', error);
      toast({
        title: 'Sync Failed',
        description: error instanceof Error ? error.message : 'Failed to sync knowledge base',
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
          Sync your career, projects, and resume data to the AI Knowledge Base.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
          <div>
            <p className="font-medium">Data Sources</p>
            <p className="text-sm text-muted-foreground">
              Includes: Career Projects, Side Projects, Resume (Experience, Skills, Education)
            </p>
          </div>
          {ingestedCount > 0 && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">{ingestedCount} items synced</span>
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
              Syncing Data...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Data
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          This will update the vector database with the latest information from your code and resume.
          Duplicate entries will be automatically removed.
        </p>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBaseManager;