export interface ResumeExperience {
    company: string;
    role: string;
    period: string;
    description: string[];
}

export interface ResumeSkill {
    category: string;
    items: string[];
}

export interface ResumeEducation {
    school: string;
    degree: string;
    period: string;
}

export const resumeData = {
    personalInfo: {
        name: "Qichao Wang",
        phone: "+1 (517) 575-7456",
        email: "qichaotomwang@gmail.com",
        location: "Fremont, CA (Open to relocate within US)",
        linkedin: "linkedin.com/in/qichaowang",
        portfolio: "qichaowang.org",
        summary: "7+ years in Payments & Financial Services PM; expertise in money movement, fraud prevention, onboarding, and AI-driven product at Lucid Motors and BlueSnap; delivered products generating 62M revenue and serving global merchants and consumers across 40+ markets; drove 99% reduction in credit approval time, 28% increase in payout settlement accuracy."
    },
    experience: [
        {
            company: "Lucid Motors",
            role: "Sr. Product Manager, Financial Services, Customer Experience",
            period: "Jan 2024 - Oct 2025",
            description: [
                "Drove 36% revenue growth by launching high-conversion financing funnel that generated $62M in incremental financed transactions.",
                "Grew user conversion by 15% by launching the unified customer digital purchase experience.",
                "Defined platform vision and roadmap for global financing journey across 5 international markets, 2x customer base and accelerating approval completion by 99% (1 week → 3 min).",
                "Designed data instrumentation and funnel tracking across financing flows to uncover UX friction and increase completion rate by 35% through iterative experiments.",
                "Implemented AI-powered automation for customer verification and payment readiness checks, cutting operational workload by 80%.",
                "Led cross-border Engineering, DS, Legal, and Compliance to deliver multi-region financing flows that balanced regulatory requirements with a frictionless user experience.",
                "Launched LLM based tools that automated financing journey and grow 30% funnel completion.",
                "Developed a rule-based pricing engine that eliminated engineering dependencies and 2X go-to-market launch speed.",
                "Implemented AI-powered analytics dashboards that unified user behavior data tracking and accelerated experiment cycles by 75%.",
                "Define and present AI product roadmap for both 2C and 2B Lucid Financial Services initiatives to boost conversion rate.",
                "Leveraging user feedback, A/B testing, data, and competitor analysis to improve UX funnel for the Finance product in global market."
            ]
        },
        {
            company: "BlueSnap",
            role: "Product Manager, Payment, Fraud, Merchant onboarding, User Experience",
            period: "Oct 2021 - Dec 2023",
            description: [
                "Optimized global checkout and payment flow, result into 25% increase in acquisition and 20% increase in engagement.",
                "Redesigned merchant onboarding & payment setup journeys across 40+ countries, cutting onboarding time by 35%.",
                "Launched multi-vendor fraud and dispute-handling flows (RDR, Verifi, Ethoca) that reduce merchant revenue lost by 15%.",
                "Led a five-person cross-functional team to ship a fraud-prevention suite, increasing revenue by $500k in a year.",
                "Boost retention by 30% by reducing average payout settlement time from T+7 to T+1.",
                "Improved auto-reconciliation accuracy from 70% to 98%, cutting finance ops workload by 50% with centralized transaction report.",
                "Defined comprehensive roadmap for the checkout page from initial idea through to launch thru constantly A/B Testing and Data analysis.",
                "Leveraged DS, UX research, and competitor analysis to improve payment success rates and reduce friction for users.",
                "Led cross-functional team (Legal, IT, marketing) to deliver solution meet the regulation requirement."
            ]
        },
        {
            company: "Harmony Plus",
            role: "Product Manager, EdTech",
            period: "Nov 2020 - Sep 2021",
            description: [
                "Drive 15% increases on user conversion rate thru SEO improvements.",
                "2X the company product sales online ($30k revenue in 1 month) with new website product of E-commerce platform.",
                "Led a 3-person cross-functional team to deliver CRM module and reduce the time team spent on redundant works by 40%.",
                "Rebuild company website with A/B Test to achieve 30% increased session time, 20% decreased bounce rate. Help the management team understand customer behavior patterns from 1k+ client information."
            ]
        },
        {
            company: "Next level performance Auto parts",
            role: "Product Manager & Founder, E-Commerce, growth, conversion",
            period: "Sep 2020 - Sep 2021",
            description: [
                "2X the shipping revenue by launch the real-time shipping estimation Shopify App with vendor API integration.",
                "1.5X the sales through Yotpo integration on shopify store with reward, marketing, review collection functions.",
                "6X monthly revenue in 3 months, currently has 40K monthly revenue by improving our google ads strategies.",
                "Led 4-person cross-function team deliver auto parts Shopify store from ideation to Launch in 2 months.",
                "A/B Testing different marketing campaigns on various social media platforms and 2X the ROAS.",
                "Create GTM strategies to drive E-commerce customer conversions increase by 50%."
            ]
        },
        {
            company: "Vortex Autogroup",
            role: "Chief Product Officer & Founder",
            period: "Aug 2017 - Sep 2020",
            description: [
                "Led a team of 20+ people to achieve 30% YtoY Revenue Increase from 2017-2019.",
                "Achieve $5 Million revenue 2019 by running A/B testing on the website and matching products with customer’s needs."
            ]
        }
    ],
    skills: [
        "Data Analysis", "Figma", "JIRA", "Product Design", "SEO", "AI-Agent integration",
        "A/B Testing", "Product Roadmap", "User Research", "Market Analysis", "GTM Strategies",
        "Data-driven Insights", "Customer Analysis", "Product Management", "User experience (UX)",
        "Go-to-market strategy", "Lovable", "Claude coding", "Replit"
    ],
    education: [
        {
            school: "Michigan State University",
            degree: "Master's, Construction Management",
            period: "Aug 2018 - May 2020"
        },
        {
            school: "Michigan State University",
            degree: "Bachelor's, Computer Science",
            period: "Aug 2013 - May 2017"
        }
    ]
};
