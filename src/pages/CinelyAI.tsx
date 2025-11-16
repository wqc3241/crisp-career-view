import ProductTemplate from "@/components/ProductTemplate";
import cinelyImage from "@/assets/product-cinely.jpg";

const CinelyAI = () => {
  return (
    <ProductTemplate
      name="Cinely.AI"
      tagline="AI-Powered Batch Image Editing"
      description="Intelligent batch image editing tool that uses AI to enhance, resize, and optimize thousands of images in minutes. Perfect for photographers, e-commerce businesses, and content creators who need to process large volumes of images efficiently."
      image={cinelyImage}
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
      ]}
      metrics={[
        { value: "10,000+", label: "Images Processed Daily" },
        { value: "80%", label: "Time Saved" },
        { value: "4.8★", label: "User Rating" },
      ]}
      demoLink="https://cinely.ai"
      githubLink="https://github.com/alexdoe/cinely-ai"
    />
  );
};

export default CinelyAI;
