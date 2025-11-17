import ProductTemplate from "@/components/ProductTemplate";
import talkifyImage1 from "@/assets/projects/side-projects/talkify/slideshow/image1.jpg";

const Talkify = () => {
  return (
    <ProductTemplate
      name="Talkify"
      tagline="Personalized Language Learning"
      description="AI-driven language learning app that adapts to your learning style and pace. Master new languages through personalized lessons, real-time feedback, and interactive conversations with AI tutors."
      images={[talkifyImage1]}
      vision="To break down language barriers worldwide by providing personalized, accessible, and engaging language education that adapts to each learner's unique journey, making fluency achievable for everyone regardless of location or background."
      painpoints={[
        "Traditional language courses are expensive and inflexible with fixed schedules",
        "Generic learning apps don't adapt to individual learning speeds and styles",
        "Limited opportunities for real conversation practice with native speakers",
        "Difficulty maintaining motivation and tracking progress in self-study",
      ]}
      customerSegments={[
        {
          title: "Students & Academics",
          description:
            "University students and researchers needing language proficiency for studies, research, or academic exchanges abroad.",
        },
        {
          title: "Professionals",
          description:
            "Business professionals seeking language skills for career advancement, international business, or relocation opportunities.",
        },
        {
          title: "Travel Enthusiasts",
          description:
            "Travelers and expatriates wanting to communicate confidently and immerse themselves in local cultures authentically.",
        },
      ]}
      features={[
        {
          title: "Personalized Learning Paths",
          description:
            "AI analyzes your progress and adapts lesson difficulty and content to match your learning pace and goals.",
        },
        {
          title: "Speech Recognition",
          description:
            "Practice pronunciation with advanced speech recognition that provides instant feedback on your accent and fluency.",
        },
        {
          title: "Real-Time Feedback",
          description:
            "Get immediate corrections and suggestions as you practice, helping you learn from mistakes instantly.",
        },
        {
          title: "15+ Languages",
          description:
            "Learn from a wide selection of languages including Spanish, French, Japanese, Mandarin, and more.",
        },
      ]}
      techStack={["React Native", "TypeScript", "OpenAI API", "Firebase", "WebRTC", "TensorFlow"]}
      metrics={[
        { value: "15+", label: "Supported Languages" },
        { value: "92%", label: "Completion Rate" },
      ]}
      futureImprovements={[
        "AR features for immersive real-world object labeling and contextual learning",
        "Live conversation sessions with native speakers for cultural immersion",
        "Offline mode for learning without internet connectivity during travel",
        "Gamification with achievements, leaderboards, and social challenges",
        "Corporate training packages with team progress tracking and analytics",
      ]}
      demoLink="https://speak-smart-clips.lovable.app/auth"
      githubLink="https://github.com/wqc3241/lovable-gemini-draw"
    />
  );
};

export default Talkify;
