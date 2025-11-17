import CompanyTemplate from "@/components/CompanyTemplate";
import { supabase } from "@/integrations/supabase/client";

const LucidMotors = () => {
  const { data: logoData } = supabase.storage.from("project").getPublicUrl("career project/LucidMotors/logo.png");

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
          title: "Digital Purchasing App (Mobile Web)",
          description:
            "Led the end-to-end product development of Lucid’s new mobile purchasing flow, including financing, trade-in, document upload, and offer selection.",
          impact: [
            "Increased funnel completion by 30% through redesigned UX and automated financing flows",
            "Reduced approval time from 1 week to 10 minutes by integrating Experian, LexisNexis, and lender APIs",
            "Accelerated release cadence by implementing modular UI components and a scalable backend architecture",
          ],
          tags: ["E-Commerce", "FinTech", "UX Optimization", "API Integration"],
        },
        {
          title: "FinOps Intelligence Dashboard",
          description:
            "Built a centralized financial operations dashboard to streamline lender submission, fraud validation, contract review, and post-decision workflows.",
          impact: [
            "Cut FinOps workload by 80% through automated validation, pricing recalculation, and lender routing",
            "Improved financing accuracy by 95% using a rules-engine-driven audit system",
            "Enabled cross-team visibility and faster deal resolution through real-time operational metrics",
          ],
          tags: ["Internal Tools", "Automation", "Fraud Prevention", "Operations Intelligence"],
        },
        {
          title: "Global Payment Calculator",
          description:
            "Designed a unified multi-market payment engine supporting US, Canada, EU, KSA, and UAE with localized tax rules, fees, rates, and incentives.",
          impact: [
            "Delivered a single backend calculator replacing five regional systems",
            "Reduced engineering dependency by 70% through configurable tax and fee master data",
            "Improved pricing accuracy and update speed across global markets",
          ],
          tags: ["FinTech", "Pricing Engine", "Internationalization", "Payments"],
        },
        {
          title: "Financial Services Data Structure Rebuild",
          description:
            "Re-architected Lucid's financing data structures, including bulletin pricing, lender programs, APR/MF/RV tables, and discount rules.",
          impact: [
            "Improved data reliability and reduced program mismatches by 90%",
            "Enabled faster rollout of promotional offers and regional programs",
            "Established scalable schemas for multi-lender, multi-market expansion",
          ],
          tags: ["Data Architecture", "Financing Programs", "Supabase", "System Design"],
        },
      ]}
      techStack={[
        "AI Automation",
        "Product Management",
        "Product Strategy",
        "Agile/Scrum",
        "Data-driven decision",
        "User Research",
        "A/B Testing",
        "Roadmap Planning",
      ]}
    />
  );
};

export default LucidMotors;
