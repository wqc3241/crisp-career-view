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
    logo: supabase.storage.from("project").getPublicUrl("Career/lucid-motors/logo.png").data.publicUrl,
    roleTitle: "Senior Product Manager",
    keyImpact: "Led EV platform development reducing time-to-market by 30%",
    tags: ["EV Technology", "Product Strategy", "Cross-functional Leadership"],
    link: "/career/lucid-motors",
  },
  {
    name: "Bluesnap",
    logo: supabase.storage.from("project").getPublicUrl("Career/bluesnap/logo.png").data.publicUrl,
    roleTitle: "Product Manager",
    keyImpact: "Launched payment gateway features increasing transaction volume by 45%",
    tags: ["FinTech", "Payment Systems", "API Design"],
    link: "/career/bluesnap",
  },
  {
    name: "Harmony Plus",
    logo: supabase.storage.from("project").getPublicUrl("Career/harmony-plus/logo.png").data.publicUrl,
    roleTitle: "Associate Product Manager",
    keyImpact: "Optimized user onboarding flow, boosting activation rate by 25%",
    tags: ["SaaS", "User Experience", "Growth"],
    link: "/career/harmony-plus",
  },
  {
    name: "Vortex Autogroup",
    logo: supabase.storage.from("project").getPublicUrl("Career/vortex-autogroup/logo.png").data.publicUrl,
    roleTitle: "Product Analyst",
    keyImpact: "Built analytics dashboard that improved decision-making across 5 departments",
    tags: ["Automotive", "Data Analytics", "Business Intelligence"],
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
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
