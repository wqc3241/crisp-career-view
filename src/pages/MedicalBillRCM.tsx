import ProductTemplate from "@/components/ProductTemplate";
import medicalImage from "@/assets/product-medical-rcm.jpg";

const MedicalBillRCM = () => {
  return (
    <ProductTemplate
      name="Medical Bill RCM"
      tagline="Revenue Cycle Management Solution"
      description="Streamline medical billing processes with automated claim management and revenue tracking. Built for healthcare providers to reduce administrative overhead and improve cash flow."
      image={medicalImage}
      vision="To transform healthcare revenue cycle management by eliminating billing complexity and delays, ensuring healthcare providers get paid accurately and promptly so they can focus on patient care rather than paperwork."
      painpoints={[
        "High claim rejection rates due to manual errors and incomplete information",
        "Slow payment cycles impacting healthcare facility cash flow",
        "Complex insurance requirements and ever-changing billing codes",
        "Excessive administrative burden diverting resources from patient care",
      ]}
      customerSegments={[
        {
          title: "Small Clinics",
          description: "Independent practices and small clinics seeking to reduce billing staff costs while improving collection rates.",
        },
        {
          title: "Multi-Specialty Groups",
          description: "Larger medical groups managing diverse billing requirements across multiple specialties and locations.",
        },
        {
          title: "Billing Companies",
          description: "Medical billing service providers looking to scale operations and serve more healthcare clients efficiently.",
        },
      ]}
      features={[
        {
          title: "Automated Billing",
          description: "Automatically generate and submit insurance claims with smart validation to reduce errors and rejections.",
        },
        {
          title: "Claims Tracking",
          description: "Real-time tracking of claim status from submission to payment with automated follow-ups on pending claims.",
        },
        {
          title: "Analytics Dashboard",
          description: "Comprehensive analytics showing revenue trends, claim acceptance rates, and payment cycles.",
        },
        {
          title: "HIPAA Compliant",
          description: "Fully compliant with HIPAA regulations ensuring patient data security and privacy.",
        },
      ]}
      techStack={[
        "React",
        "TypeScript",
        "Python",
        "PostgreSQL",
        "Stripe",
        "AWS",
        "Redis",
      ]}
      metrics={[
        { value: "95%", label: "Claim Acceptance Rate" },
        { value: "30%", label: "Faster Processing" },
        { value: "50+", label: "Healthcare Partners" },
      ]}
      futureImprovements={[
        "AI-powered coding suggestions to reduce manual coding time",
        "Patient payment portal with flexible payment plans and automated reminders",
        "Predictive analytics for claim denial prevention before submission",
        "Integration with major EHR systems for seamless data flow",
        "Advanced reporting dashboard with real-time KPI tracking",
      ]}
      demoLink="https://medicalbillrcm.com"
    />
  );
};

export default MedicalBillRCM;
