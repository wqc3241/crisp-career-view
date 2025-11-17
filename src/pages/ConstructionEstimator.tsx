import ProductTemplate from "@/components/ProductTemplate";
import constructionImage from "@/assets/product-construction.jpg";

const ConstructionEstimator = () => {
  return (
    <ProductTemplate
      name="Construction Estimator"
      tagline="Smart Construction Cost Estimation"
      description="AI-powered tool that provides accurate construction cost estimates based on project specifications. Streamline your bidding process and win more projects with data-driven estimates."
      images={[constructionImage]}
      vision="To revolutionize construction bidding by providing contractors with instant, accurate cost estimates powered by AI and real-time market data, enabling them to win more profitable projects and reduce time spent on manual calculations."
      painpoints={[
        "Manual estimation is time-consuming and prone to costly errors",
        "Fluctuating material prices making budgets outdated quickly",
        "Difficulty competing with larger firms that have dedicated estimating teams",
        "Lack of historical data to inform accurate project timelines and costs",
      ]}
      customerSegments={[
        {
          title: "General Contractors",
          description:
            "Mid-sized construction firms seeking to improve bid accuracy and win more competitive projects with data-driven estimates.",
        },
        {
          title: "Specialty Contractors",
          description:
            "Electrical, plumbing, and HVAC contractors needing quick, accurate subcontractor bids for multiple concurrent projects.",
        },
        {
          title: "Project Developers",
          description:
            "Real estate developers and project managers requiring preliminary cost assessments for feasibility studies and investor presentations.",
        },
      ]}
      features={[
        {
          title: "Material Cost Calculation",
          description:
            "Real-time pricing data for materials with automatic updates based on market conditions and supplier quotes.",
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
          description:
            "Generate detailed PDF reports with itemized costs, timelines, and professional presentation for clients.",
        },
      ]}
      techStack={["React", "TypeScript", "Machine Learning", "Node.js", "MongoDB", "Python", "scikit-learn"]}
      metrics={[
        { value: "80%", label: "Estimation Accuracy" },
        { value: "95%", label: "Estimation Faster" },
      ]}
      futureImprovements={[
        "3D blueprint scanning for automated material takeoff and quantity surveying",
        "Real-time collaboration features for team-based estimation workflows",
        "Integration with supplier APIs for live material pricing updates",
        "Mobile app with photo estimation using computer vision for on-site assessments",
        "Risk analysis module predicting potential cost overruns and delays",
      ]}
      demoLink="https://preview--home-cost-view.lovable.app/"
      githubLink="https://github.com/wqc3241/home-cost-view"
    />
  );
};

export default ConstructionEstimator;
