import CompanyTemplate from "@/components/CompanyTemplate";
import { supabase } from "@/integrations/supabase/client";

const VortexAutogroup = () => {
  const { data: logoData } = supabase.storage
    .from("project")
    .getPublicUrl("career project/VortexAuto/logo.png");

  return (
    <CompanyTemplate
      companyName="Vortex Autogroup"
      logo={logoData.publicUrl}
      roleTitle="Product Analyst"
      duration="August 2015 - May 2017"
      location="Detroit, MI"
      teamSize="Team of 4"
      companyDescription="Vortex Autogroup is an automotive technology company specializing in data analytics and business intelligence solutions for dealerships and automotive service centers."
      keyMetrics={[
        { label: "Dashboard Adoption", value: "5 Depts" },
        { label: "Decision-Making Speed", value: "40%" },
        { label: "Cost Savings", value: "$800K" },
        { label: "Report Accuracy", value: "99.5%" },
      ]}
      projects={[
        {
          title: "Business Intelligence Dashboard",
          description: "Designed and launched an enterprise analytics dashboard providing real-time insights into sales, inventory, and service operations.",
          impact: "Improved decision-making speed by 40% across 5 departments, enabling faster response to market changes.",
          tags: ["Business Intelligence", "Data Analytics", "Dashboards"],
        },
        {
          title: "Inventory Optimization System",
          description: "Developed a predictive analytics model to optimize vehicle inventory levels based on historical sales data and market trends.",
          impact: "Reduced excess inventory costs by $800K annually while maintaining service levels.",
          tags: ["Predictive Analytics", "Machine Learning", "Cost Optimization"],
        },
        {
          title: "Customer Segmentation Analysis",
          description: "Conducted in-depth customer segmentation analysis to identify high-value customer groups and tailor marketing strategies.",
          impact: "Increased targeted marketing ROI by 35% and improved customer lifetime value by 20%.",
          tags: ["Customer Analytics", "Segmentation", "Marketing"],
        },
        {
          title: "Automated Reporting System",
          description: "Built automated reporting workflows to replace manual data compilation, saving hundreds of hours per month.",
          impact: "Achieved 99.5% report accuracy and freed up analyst time for strategic initiatives.",
          tags: ["Automation", "Reporting", "Process Improvement"],
        },
      ]}
      techStack={[
        "Business Intelligence",
        "Data Analytics",
        "SQL",
        "Python",
        "Tableau",
        "Predictive Modeling",
        "Automotive Industry",
        "Excel/VBA",
      ]}
    />
  );
};

export default VortexAutogroup;
