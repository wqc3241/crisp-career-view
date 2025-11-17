import ProductTemplate from "@/components/ProductTemplate";
import { supabase } from "@/integrations/supabase/client";

const MedicalBillRCM = () => {
  // Get slideshow images from Lovable Cloud storage
  const slideshowImages = [
    "Side project/RCM/slideshow/slide1.png",
    "Side project/RCM/slideshow/slide2.png",
    "Side project/RCM/slideshow/slide3.png",
    "Side project/RCM/slideshow/slide4.png",
    "Side project/RCM/slideshow/slide5.png",
    "Side project/RCM/slideshow/slide6.png",
    "Side project/RCM/slideshow/slide7.png",
  ].map((path) => {
    const { data } = supabase.storage.from("project").getPublicUrl(path);
    return data.publicUrl;
  });

  return (
    <ProductTemplate
      name="Medical Bill RCM"
      tagline="Revenue Cycle Management Solution"
      description="Streamline medical billing processes with automated claim management and revenue tracking. Built for healthcare providers to reduce administrative overhead and improve cash flow."
      images={slideshowImages}
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
          description:
            "Independent practices and small clinics seeking to reduce billing staff costs while improving collection rates.",
        },
        {
          title: "Multi-Specialty Groups",
          description:
            "Larger medical groups managing diverse billing requirements across multiple specialties and locations.",
        },
        {
          title: "Billing Companies",
          description:
            "Medical billing service providers looking to scale operations and serve more healthcare clients efficiently.",
        },
      ]}
      features={[
        {
          title: "Automated Billing",
          description:
            "Automatically generate and submit insurance claims with smart validation to reduce errors and rejections.",
        },
        {
          title: "Claims Tracking",
          description:
            "Real-time tracking of claim status from submission to payment with automated follow-ups on pending claims.",
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
      techStack={["React", "TypeScript", "Vite", "TailwindCSS", "Supabase", "React Query", "Shadcn UI", "React Router", "Recharts"]}
      metrics={[
        { value: "95%", label: "Claim Acceptance Rate" },
        { value: "30%", label: "Faster Processing" },
      ]}
      futureImprovements={[
        "AI-powered coding suggestions to reduce manual coding time",
        "Patient payment portal with flexible payment plans and automated reminders",
        "Predictive analytics for claim denial prevention before submission",
        "Integration with major EHR systems for seamless data flow",
        "Advanced reporting dashboard with real-time KPI tracking",
      ]}
      demoLink="https://lovable-rcm-ai.lovable.app/"
      githubLink="https://github.com/wqc3241/lovable-rcm-ai"
    />
  );
};

export default MedicalBillRCM;
