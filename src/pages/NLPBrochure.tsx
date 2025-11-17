import ProductTemplate from "@/components/ProductTemplate";
import { supabase } from "@/integrations/supabase/client";

const NLPBrochure = () => {
  const slideshowImages = [
    "Side project/nlp/slideshow/slide1.png",
    "Side project/nlp/slideshow/slide2.png",
    "Side project/nlp/slideshow/slide3.png",
  ].map((path) => {
    const { data } = supabase.storage.from("project").getPublicUrl(path);
    return data.publicUrl;
  });

  return (
    <ProductTemplate
      name="NLP Brochure"
      tagline="Automotive Parts E-commerce Platform"
      description="A comprehensive e-commerce platform specializing in high-performance automotive parts and accessories for car enthusiasts, mechanics, and racing teams."
      images={slideshowImages}
      demoLink="https://nlpbrochure.com/"
      vision="To become the go-to online destination for automotive enthusiasts seeking premium aftermarket parts, providing exceptional selection, competitive pricing, and expert support."
      painpoints={[
        "Performance parts often unavailable at local auto shops, requiring extensive searching across multiple retailers",
        "Difficulty determining which parts fit specific vehicle models without expert knowledge",
        "Traditional brick-and-mortar stores charging premium prices due to overhead costs",
        "Lack of detailed specifications and installation guidance for specialized components",
      ]}
      customerSegments={[
        {
          title: "Car Enthusiasts & Tuners",
          description:
            "Performance-focused individuals looking to upgrade and customize their vehicles with high-quality aftermarket parts, detailed technical specifications, and competitive pricing.",
        },
        {
          title: "Professional Mechanics",
          description:
            "Auto repair professionals sourcing reliable parts for customer vehicles with bulk ordering capabilities, fast shipping, and technical support.",
        },
        {
          title: "Racing Teams",
          description:
            "Competitive racing organizations requiring premium performance parts, priority shipping, and custom part sourcing assistance.",
        },
      ]}
      metrics={[
        { label: "Products", value: "180k+" },
        { label: "Categories", value: "36+" },
        { label: "Shipping", value: "2-5 days" },
        { label: "Support", value: "24/7" },
      ]}
      features={[
        {
          title: "Extensive Product Catalog",
          description:
            "180k+ SKUs of performance parts and accessories across multiple categories including intakes, exhausts, suspension, and lighting.",
        },
        {
          title: "Vehicle Compatibility Search",
          description: "Advanced filtering system to find parts compatible with specific makes, models, and years.",
        },
        {
          title: "Real-time Inventory",
          description: "Live stock updates and automated notifications for out-of-stock items and restocks.",
        },
        {
          title: "Secure Checkout",
          description:
            "Shopify-powered payment processing with support for multiple payment methods and shipping options.",
        },
        {
          title: "Detailed Product Info",
          description: "Comprehensive specifications, installation guides, and compatibility charts for every product.",
        },
        {
          title: "Order Tracking",
          description: "Real-time shipping updates and order status tracking from purchase to delivery.",
        },
      ]}
      techStack={["React", "TypeScript", "Vite", "TailwindCSS", "Shopify", "React Query", "Shadcn UI", "React Router"]}
      futureImprovements={[
        "AI-powered part recommendations based on vehicle and driving style",
        "Augmented reality for visualizing parts on vehicles",
        "Community forum for installation guides and reviews",
        "Integration with local mechanics for professional installation",
        "Loyalty rewards program for repeat customers",
      ]}
    />
  );
};

export default NLPBrochure;
