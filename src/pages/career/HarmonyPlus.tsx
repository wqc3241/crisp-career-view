import CompanyTemplate from "@/components/CompanyTemplate";
import { supabase } from "@/integrations/supabase/client";

const HarmonyPlus = () => {
  const { data: logoData } = supabase.storage
    .from("project")
    .getPublicUrl("career project/HarmonyPlus/logo.png");

  return (
    <CompanyTemplate
      companyName="Harmony Plus"
      logo={logoData.publicUrl}
      roleTitle="Associate Product Manager"
      duration="June 2017 - February 2019"
      location="San Francisco, CA"
      teamSize="Team of 6"
      companyDescription="Harmony Plus is a SaaS platform providing team collaboration and project management tools designed to enhance productivity and streamline workflows for distributed teams."
      keyMetrics={[
        { label: "User Activation Increase", value: "25%" },
        { label: "Retention Improvement", value: "18%" },
        { label: "Feature Engagement", value: "65%" },
        { label: "Customer NPS", value: "72" },
      ]}
      projects={[
        {
          title: "Onboarding Flow Optimization",
          description: "Redesigned the user onboarding experience to reduce friction and improve time-to-value for new users.",
          impact: "Boosted user activation rate by 25% and reduced drop-off during signup by 30%.",
          tags: ["User Experience", "Growth", "Funnel Optimization"],
        },
        {
          title: "Real-Time Collaboration Features",
          description: "Launched real-time document editing and collaborative workspace features to compete with market leaders.",
          impact: "Achieved 65% feature engagement within the first quarter, driving a 18% increase in user retention.",
          tags: ["Collaboration", "Real-Time Sync", "Product Innovation"],
        },
        {
          title: "Mobile App Development",
          description: "Managed the product roadmap for Harmony Plus's first mobile application (iOS and Android).",
          impact: "Reached 50K downloads in the first 3 months with a 4.6-star rating on app stores.",
          tags: ["Mobile Development", "Cross-Platform", "User Research"],
        },
        {
          title: "Analytics Dashboard",
          description: "Built an in-app analytics dashboard to help teams track productivity metrics and project timelines.",
          impact: "Improved customer NPS by 12 points through data-driven insights and transparency.",
          tags: ["Analytics", "Data Visualization", "Customer Success"],
        },
      ]}
      techStack={[
        "SaaS",
        "Product Management",
        "User Research",
        "A/B Testing",
        "Mobile Development",
        "Agile",
        "Collaboration Tools",
        "Data Analytics",
      ]}
    />
  );
};

export default HarmonyPlus;
