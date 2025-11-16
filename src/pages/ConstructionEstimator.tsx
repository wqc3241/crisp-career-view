import ProductTemplate from "@/components/ProductTemplate";
import constructionImage from "@/assets/product-construction.jpg";

const ConstructionEstimator = () => {
  return (
    <ProductTemplate
      name="Construction Estimator"
      tagline="Smart Construction Cost Estimation"
      description="AI-powered tool that provides accurate construction cost estimates based on project specifications. Streamline your bidding process and win more projects with data-driven estimates."
      image={constructionImage}
      features={[
        {
          title: "Material Cost Calculation",
          description: "Real-time pricing data for materials with automatic updates based on market conditions and supplier quotes.",
        },
        {
          title: "Labor Estimation",
          description: "Accurate labor cost predictions based on project complexity, location, and historical data.",
        },
        {
          title: "Project Timeline",
          description: "Automated project scheduling with critical path analysis and resource allocation optimization.",
        },
        {
          title: "Professional Reports",
          description: "Generate detailed PDF reports with itemized costs, timelines, and professional presentation for clients.",
        },
      ]}
      techStack={[
        "React",
        "TypeScript",
        "Machine Learning",
        "Node.js",
        "MongoDB",
        "Python",
        "scikit-learn",
      ]}
      metrics={[
        { value: "92%", label: "Estimation Accuracy" },
        { value: "500+", label: "Projects Estimated" },
        { value: "60%", label: "Faster Bidding" },
      ]}
      demoLink="https://construction-estimator.app"
      githubLink="https://github.com/alexdoe/construction-estimator"
    />
  );
};

export default ConstructionEstimator;
