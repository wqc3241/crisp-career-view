import ProductTemplate from "@/components/ProductTemplate";
import talkifyImage from "@/assets/product-talkify.jpg";

const Talkify = () => {
  return (
    <ProductTemplate
      name="Talkify"
      tagline="Personalized Language Learning"
      description="AI-driven language learning app that adapts to your learning style and pace. Master new languages through personalized lessons, real-time feedback, and interactive conversations with AI tutors."
      image={talkifyImage}
      features={[
        {
          title: "Personalized Learning Paths",
          description: "AI analyzes your progress and adapts lesson difficulty and content to match your learning pace and goals.",
        },
        {
          title: "Speech Recognition",
          description: "Practice pronunciation with advanced speech recognition that provides instant feedback on your accent and fluency.",
        },
        {
          title: "Real-Time Feedback",
          description: "Get immediate corrections and suggestions as you practice, helping you learn from mistakes instantly.",
        },
        {
          title: "15+ Languages",
          description: "Learn from a wide selection of languages including Spanish, French, Japanese, Mandarin, and more.",
        },
      ]}
      techStack={[
        "React Native",
        "TypeScript",
        "OpenAI API",
        "Firebase",
        "WebRTC",
        "TensorFlow",
      ]}
      metrics={[
        { value: "5,000+", label: "Active Learners" },
        { value: "4.6★", label: "App Store Rating" },
        { value: "92%", label: "Completion Rate" },
      ]}
      demoLink="https://talkify.app"
    />
  );
};

export default Talkify;
