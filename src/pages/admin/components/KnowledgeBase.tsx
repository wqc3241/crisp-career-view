import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { resumeData } from "@/constants/resumeData";
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
                // Career Experience from Project Data
                ...companies.map(c => ({ ...c, type: 'Career Experience' })),
                // Side Projects
                ...sideProjects.map(p => ({ ...p, type: 'Side Project' })),
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
