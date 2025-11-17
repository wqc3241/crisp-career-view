import ProductTemplate from "@/components/ProductTemplate";
import { supabase } from "@/integrations/supabase/client";

const Talkify = () => {
  const slideshowImages = [
    "Side project/talkify/slideshow/slide1.jpg",
    "Side project/talkify/slideshow/slide2.jpg",
    "Side project/talkify/slideshow/slide3.jpg",
    "Side project/talkify/slideshow/slide4.jpg",
    "Side project/talkify/slideshow/slide5.jpg",
    "Side project/talkify/slideshow/slide6.jpg",
  ].map((path) => {
    const { data } = supabase.storage.from("project").getPublicUrl(path);
    return data.publicUrl;
  });

  return (
    <ProductTemplate
      name="Talkify"
      tagline="Personalized Language Learning"
      description="AI-driven language learning app that adapts to your learning style and pace. Master new languages through personalized lessons, real-time feedback, and interactive conversations with AI tutors."
      images={slideshowImages}
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
      techStack={["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Radix UI", "React Router", "React Hook Form", "Zod"]}
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
      githubLink="https://github.com/wqc3241/speak-smart-clips"
      testEmail="qichaotomwang+1@gmail.com"
      testPassword="Test123"
    />
  );
};

export default Talkify;
