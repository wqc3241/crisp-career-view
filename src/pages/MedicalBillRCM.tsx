import ProductTemplate from "@/components/ProductTemplate";
import medicalImage from "@/assets/product-medical-rcm.jpg";

const MedicalBillRCM = () => {
  return (
    <ProductTemplate
      name="Medical Bill RCM"
      tagline="Revenue Cycle Management Solution"
      description="Streamline medical billing processes with automated claim management and revenue tracking. Built for healthcare providers to reduce administrative overhead and improve cash flow."
      image={medicalImage}
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
      demoLink="https://medicalbillrcm.com"
    />
  );
};

export default MedicalBillRCM;
