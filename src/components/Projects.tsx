import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "./ProjectCard";
import CompanyListItem from "./CompanyListItem";
import { supabase } from "@/integrations/supabase/client";
import analyticsImage from "@/assets/project-analytics.jpg";
import mobileImage from "@/assets/project-mobile.jpg";
import ecommerceImage from "@/assets/project-ecommerce.jpg";

// Get Cinely slideshow image from cloud storage
const { data: cinelyImageData } = supabase.storage
  .from("project")
  .getPublicUrl("Side project/cinely/slideshow/slide1.png");
const cinelyImage = cinelyImageData.publicUrl;

// Get Talkify slideshow image from cloud storage
const { data: talkifyImageData } = supabase.storage
  .from("project")
  .getPublicUrl("Side project/talkify/slideshow/slide1.jpg");
const talkifyImage = talkifyImageData.publicUrl;

// Get Medical Bill RCM slideshow image from cloud storage
const { data: rcmImageData } = supabase.storage.from("project").getPublicUrl("Side project/RCM/slideshow/slide1.png");
const rcmImage = rcmImageData.publicUrl;

// Get Construction Estimator slideshow image from cloud storage
const { data: constructionImageData } = supabase.storage
  .from("project")
  .getPublicUrl("Side project/Estimator/slideshow/Slide1.jpg");
const constructionImage = constructionImageData.publicUrl;

// Get NLP Brochure slideshow image from cloud storage
const { data: nlpImageData } = supabase.storage.from("project").getPublicUrl("Side project/nlp/slideshow/slide1.png");
const nlpImage = nlpImageData.publicUrl;

const companies = [
  {
    name: "Lucid Motors",
    logo: supabase.storage.from("project").getPublicUrl("Career project/LucidMotors/logo.png").data.publicUrl,
    roleTitle: "Sr. Product Manager, Financial Services, Customer Experience",
    keyImpact: [
      "Delivered a high-reliability financing funnel that drove $62M incremental financed transactions and 36% revenue growth.",
      "Reduced end-to-end financing order & approval latency by 99% (1 week → 3 min) via re-architected multi-step workflows.",
      "Improved lease deal operational efficiency 20% with automated pricing recalculation logic.",
      "Automated the vehicle matching flow, reducing manual processing 15% and improving allocation accuracy."
    ],
    tags: [
      "Auto Finance", 
      "Pricing Engine", 
      "AI/LLM Automation", 
      "Risk Decisioning", 
      "Global Market Launches",
      "Digital Experience"
    ],
    link: "/career/lucid-motors",
  },

  {
    name: "BlueSnap",
    logo: supabase.storage.from("project").getPublicUrl("Career project/Bluesnap/logo.png").data.publicUrl,
    roleTitle: "Product Manager, Payment, Fraud, Merchant Onboarding, User Experience",
    keyImpact: [
      "Improved onboarding & payment workflow efficiency 35% by simplifying internal processes.",
      "Increased operational accuracy from 70% → 98% by redesigning data pipelines.",
      "Drove 25% acquisition growth and 20% engagement lift through data-driven UX updates.",
      "Reduced revenue loss 15% by launching automated risk & dispute workflows."
    ],
    tags: [
      "Payments", 
      "Fraud & Risk", 
      "Merchant Onboarding", 
      "KYC/KYB Automation",
      "Checkout Optimization"
    ],
    link: "/career/bluesnap",
  },

  {
    name: "Harmony Plus",
    logo: supabase.storage.from("project").getPublicUrl("Career project/HarmonyPlus/logo.png").data.publicUrl,
    roleTitle: "Product Manager, EdTech",
    keyImpact: [
      "Drove 15% increase in user conversion through SEO improvements.",
      "2X product sales online ($30k in 1 month) with new e-commerce platform.",
      "Led a 3-person team delivering a CRM module, reducing redundant work time by 40%.",
      "Rebuilt company website with A/B testing to deliver +30% session time and −20% bounce rate."
    ],
    tags: [
      "EdTech",
      "SEO & Growth",
      "E-commerce",
      "CRM Development",
      "A/B Testing"
    ],
    link: "/career/harmony-plus",
  },

  {
    name: "Vortex Autogroup",
    logo: supabase.storage.from("project").getPublicUrl("Career project/VortexAuto/logo.png").data.publicUrl,
    roleTitle: "Chief Product Officer & Founder",
    keyImpact: [
      "Led a 20+ person team to achieve 30% YoY revenue increase from 2017–2019.",
      "Achieved $5M revenue in 2019 through A/B testing and optimized product matching.",
      "Built foundational digital commerce and operational systems for auto dealership.",
      "Improved business intelligence with data-driven strategy across sales & service."
    ],
    tags: [
      "Automotive Commerce",
      "Product Strategy",
      "Data Analytics",
      "Growth Optimization",
      "Founding Leadership"
    ],
    link: "/career/vortex-autogroup",
  },
];

const sideProjects = [
  {
    title: "Cinely.AI",
    description:
      "AI-powered batch image editing tool that processes thousands of images in minutes with intelligent enhancement.",
    image: cinelyImage,
    tags: ["Gen AI", "Batch Editing", "SaaS", "To C", "Cloud", "LLM"],
    link: "/products/cinely-ai",
  },
  {
    title: "Talkify",
    description:
      "Personalized language learning app with AI tutors, speech recognition, and adaptive learning paths for 15+ languages.",
    image: talkifyImage,
    tags: ["AI/LLM", "Web App", "EdTech", "Video to Lesson", "To C"],
    link: "/products/talkify",
  },
  {
    title: "Medical Bill RCM",
    description:
      "Revenue cycle management platform for healthcare providers with automated billing and claims tracking.",
    image: rcmImage,
    tags: ["Healthcare", "AI/LLM", "Platform Tool", "RCM", "Ops Console", "To B"],
    link: "/products/medical-bill-rcm",
  },
  {
    title: "Construction Estimator",
    description:
      "Smart cost estimation tool for construction projects using ML to predict accurate material and labor costs.",
    image: constructionImage,
    tags: ["GenAI", "Construction", "To B", "Estimation", "Visualization"],
    link: "/products/construction-estimator",
  },
  {
    title: "NLP Brochure",
    description:
      "E-commerce platform for high-performance automotive parts and accessories with 1000+ SKUs and real-time inventory.",
    image: nlpImage,
    tags: ["E-commerce", "Shopify", "Automotive", "To C", "Inventory Management"],
    link: "/products/nlp-brochure",
  },
];

const Projects = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Tabs defaultValue="career" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
          <TabsTrigger value="career">Career Highlights</TabsTrigger>
          <TabsTrigger value="side">Side Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="career" className="mt-0">
          <div className="space-y-4">
            {companies.map((company) => (
              <CompanyListItem key={company.name} {...company} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="side" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sideProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Projects;
