import ProductTemplate from "@/components/ProductTemplate";
import { supabase } from "@/integrations/supabase/client";

const CinelyAI = () => {
  // Get slideshow images from Lovable Cloud storage
  const slideshowImages = [
    'Side project/cinely/slideshow/slide1.png',
    'Side project/cinely/slideshow/slide2.png',
    'Side project/cinely/slideshow/slide3.png',
    'Side project/cinely/slideshow/slide4.png',
  ].map(path => {
    const { data } = supabase.storage.from('project').getPublicUrl(path);
    return data.publicUrl;
  });

  return (
    <ProductTemplate
      name="Cinely.AI"
      tagline="AI-Powered Batch Image Editing"
      description="Intelligent batch image editing tool that uses AI to enhance, resize, and optimize thousands of images in minutes. Perfect for photographers, e-commerce businesses, and content creators who need to process large volumes of images efficiently."
      images={slideshowImages}
      vision="To democratize professional-grade image editing by making AI-powered tools accessible to everyone, from individual creators to large enterprises. We envision a future where time-consuming manual editing is eliminated, allowing creators to focus on their creative vision."
      painpoints={[
        "Manual image editing is time-consuming and repetitive for large batches",
        "Inconsistent quality across multiple images without automation",
        "High cost of professional editing services for bulk operations",
        "Complex software requiring extensive training and expertise",
      ]}
      customerSegments={[
        {
          title: "E-commerce Businesses",
          description: "Online stores needing consistent product photography across thousands of SKUs with fast turnaround times.",
        },
        {
          title: "Professional Photographers",
          description: "Wedding, event, and portrait photographers processing hundreds of photos per project efficiently.",
        },
        {
          title: "Content Creators",
          description: "Social media influencers and digital marketers requiring optimized images at scale for multiple platforms.",
        },
      ]}
      features={[
        {
          title: "AI-Powered Enhancement",
          description: "Automatically enhance image quality, adjust colors, and optimize lighting using advanced machine learning algorithms.",
        },
        {
          title: "Batch Processing",
          description: "Process thousands of images simultaneously with customizable presets and automated workflows.",
        },
        {
          title: "Format Conversion",
          description: "Convert between multiple image formats (JPG, PNG, WEBP, AVIF) with intelligent compression settings.",
        },
        {
          title: "Cloud-Based Storage",
          description: "Secure cloud storage with instant access to your processed images from anywhere.",
        },
      ]}
      techStack={[
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Supabase",
        "React Router",
        "Radix UI",
        "JSZip",
        "Zod",
        "Gen AI",
      ]}
      metrics={[
        { value: "10,000+", label: "Images Processed Daily" },
        { value: "80%", label: "Time Saved" },
        { value: "4.8★", label: "User Rating" },
      ]}
      futureImprovements={[
        "Advanced AI filters with custom style training for brand consistency",
        "Video processing capabilities for batch video editing and enhancement",
        "Integration with major e-commerce platforms (Shopify, WooCommerce)",
        "Mobile app for on-the-go image processing and editing",
        "Collaborative workspace for team-based editing projects",
      ]}
      demoLink="https://cinely.ai"
      githubLink="https://github.com/wqc3241/lovable-gemini-draw"
    />
  );
};

export default CinelyAI;
