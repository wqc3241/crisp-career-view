import CompanyTemplate from "@/components/CompanyTemplate";
import { supabase } from "@/integrations/supabase/client";

const LucidMotors = () => {
  const { data: logoData } = supabase.storage
    .from("project")
    .getPublicUrl("career project/LucidMotors/logo.png");

  return (
    <CompanyTemplate
      companyName="Lucid Motors"
      logo={logoData.publicUrl}
      roleTitle="Senior Product Manager"
      duration="January 2024 - October 2025"
      location="Newark, CA"
      companyDescription="Lucid Motors is a luxury electric vehicle manufacturer focused on delivering high-performance, sustainable transportation with cutting-edge technology and innovative design."
      keyMetrics={[
        { label: "Customer Conversion Growth", value: "30%" },
        { label: "Revenue Growth", value: "$62M" },
        { label: "Operation Effeciency Boost", value: "80%" },
        { label: "Market Expansion", value: "5 Countries" },
      ]}
      projects={[
        {
          title: "Digitalize Customer purchasing journey",
          description: "Led the product strategy and roadmap for Lucid's next-generation EV platform, coordinating across engineering, design, and manufacturing teams.",
          impact: "Reduced time-to-market by 30% through agile methodologies and streamlined cross-functional workflows.",
          tags: ["Product Strategy", "Agile", "Cross-functional Leadership"],
        },
        {
          title: "Advanced Driver Assistance System (ADAS)",
          description: "Managed the development of Level 2+ autonomous driving features, including adaptive cruise control and lane-keeping assistance.",
          impact: "Achieved 85% feature adoption rate among early users, exceeding targets by 20%.",
          tags: ["Autonomous Driving", "AI/ML", "User Safety"],
        },
        {
          title: "Connected Car Platform",
          description: "Oversaw the launch of Lucid's connected vehicle services, enabling over-the-air updates and remote diagnostics.",
          impact: "Improved customer satisfaction scores by 25% through seamless software updates and proactive issue resolution.",
          tags: ["IoT", "Cloud Infrastructure", "Customer Experience"],
        },
        {
          title: "Sustainability Initiatives",
          description: "Championed product features focused on energy efficiency and sustainable materials sourcing.",
          impact: "Contributed to company-wide 15% reduction in carbon footprint per vehicle produced.",
          tags: ["Sustainability", "Innovation", "ESG"],
        },
      ]}
      techStack={[
        "Electric Vehicle Platforms",
        "Autonomous Driving",
        "IoT & Connected Services",
        "Agile/Scrum",
        "Product Analytics",
        "User Research",
        "A/B Testing",
        "Roadmap Planning",
      ]}
    />
  );
};

export default LucidMotors;
