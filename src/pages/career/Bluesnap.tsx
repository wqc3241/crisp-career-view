import CompanyTemplate from "@/components/CompanyTemplate";
import { supabase } from "@/integrations/supabase/client";

const Bluesnap = () => {
  const { data: logoData } = supabase.storage
    .from("project")
    .getPublicUrl("career project/Bluesnap/logo.png");

  return (
    <CompanyTemplate
      companyName="Bluesnap"
      logo={logoData.publicUrl}
      roleTitle="Product Manager"
      duration="March 2019 - December 2020"
      location="Boston, MA"
      teamSize="Team of 8"
      companyDescription="Bluesnap is a global payment gateway provider offering an all-in-one payment platform that supports businesses in over 100 countries with multi-currency and fraud prevention capabilities."
      keyMetrics={[
        { label: "Transaction Volume Increase", value: "45%" },
        { label: "API Adoption", value: "90%" },
        { label: "Fraud Prevention Accuracy", value: "98%" },
        { label: "Revenue Growth", value: "$12M ARR" },
      ]}
      projects={[
        {
          title: "Payment Gateway API v3",
          description: "Led the design and launch of Bluesnap's third-generation payment API, enabling faster integrations and better developer experience.",
          impact: "Increased transaction volume by 45% and achieved 90% API adoption among enterprise clients within 6 months.",
          tags: ["API Design", "Developer Experience", "Integration"],
        },
        {
          title: "Fraud Detection Engine",
          description: "Managed the development of an AI-powered fraud detection system to reduce chargebacks and improve transaction security.",
          impact: "Achieved 98% fraud detection accuracy, reducing chargebacks by 35% and saving merchants $2M annually.",
          tags: ["AI/ML", "Security", "Risk Management"],
        },
        {
          title: "Multi-Currency Support Expansion",
          description: "Expanded payment processing capabilities to support 30+ additional currencies and local payment methods.",
          impact: "Enabled entry into 15 new markets, contributing $12M in additional ARR.",
          tags: ["Global Payments", "Localization", "Market Expansion"],
        },
        {
          title: "Merchant Dashboard Redesign",
          description: "Redesigned the merchant-facing dashboard for better analytics, reporting, and payment reconciliation.",
          impact: "Improved merchant satisfaction by 40% and reduced support tickets by 25%.",
          tags: ["UX/UI", "Analytics", "Customer Success"],
        },
      ]}
      techStack={[
        "Payment Gateways",
        "API Development",
        "Fintech",
        "Fraud Prevention",
        "Machine Learning",
        "Data Analytics",
        "REST APIs",
        "Agile/Scrum",
      ]}
    />
  );
};

export default Bluesnap;
