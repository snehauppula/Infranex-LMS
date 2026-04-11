/** Infranex LMS domain catalogue (marketing + course filters). */

export type LearningDomain = {
  slug: string;
  emoji: string;
  label: string;
  blurb: string;
  /** Lowercase phrases; earlier domains are checked first (put specific before broad). */
  keywords: readonly string[];
};

export const INFRANEX_DOMAINS: readonly LearningDomain[] = [
  {
    slug: "ai-driven-data-analytics",
    emoji: "📉",
    label: "AI-Driven Data Analytics",
    blurb: "Decision systems that pair models with governed data products.",
    keywords: ["ai-driven data", "ai driven data", "ai-driven analytics"],
  },
  {
    slug: "generative-ai",
    emoji: "🧬",
    label: "Generative AI",
    blurb: "LLMs, multimodal apps, and safe patterns for production GenAI.",
    keywords: [
      "generative ai",
      "genai",
      "large language",
      "llm",
      "diffusion",
      "rag",
    ],
  },
  {
    slug: "professional-ai-data-analytics",
    emoji: "🤖",
    label: "Professional AI & Data Analytics",
    blurb: "Industry-ready AI and analytics stacks from ingestion to insight.",
    keywords: ["professional ai", "ai & data analytics", "ai and data analytics"],
  },
  {
    slug: "professional-data-analytics",
    emoji: "📊",
    label: "Professional Data Analytics",
    blurb: "Dashboards, metrics design, and stakeholder-ready storytelling.",
    keywords: ["professional data analytics"],
  },
  {
    slug: "professional-ui-ux",
    emoji: "🎨",
    label: "Professional UI/UX Design",
    blurb: "Research, systems thinking, and craft at SaaS quality bars.",
    keywords: ["ui/ux", "ui ux", "user experience", "user interface", "figma"],
  },
  {
    slug: "ai-ml-integrated",
    emoji: "🔬",
    label: "AI & ML (Integrated Specialization)",
    blurb: "Unified depth across classical ML and applied AI engineering.",
    keywords: ["integrated specialization", "ai & ml integrated", "ai and ml integrated"],
  },
  {
    slug: "machine-learning",
    emoji: "🤖",
    label: "Machine Learning (ML)",
    blurb: "Training, evaluation, and deployment without the hand-wavy math.",
    keywords: ["machine learning"],
  },
  {
    slug: "artificial-intelligence",
    emoji: "🧠",
    label: "Artificial Intelligence (AI)",
    blurb: "Search, planning, agents, and responsible AI product patterns.",
    keywords: ["artificial intelligence", " ai ", " ai,", " ai-"],
  },
  {
    slug: "data-science",
    emoji: "📊",
    label: "Data Science",
    blurb: "Experimentation, modeling, and communication for real decisions.",
    keywords: ["data science"],
  },
  {
    slug: "data-analytics",
    emoji: "📈",
    label: "Data Analytics",
    blurb: "SQL, warehousing, and metrics that survive exec scrutiny.",
    keywords: ["data analytics", "business intelligence"],
  },
  {
    slug: "cyber-security",
    emoji: "🔐",
    label: "Cyber Security",
    blurb: "Defense in depth, identity, and pragmatic threat reduction.",
    keywords: ["cyber security", "cybersecurity", "infosec", "security engineering"],
  },
  {
    slug: "application-development",
    emoji: "📱",
    label: "Application Development",
    blurb: "Mobile and modern app delivery with performance in mind.",
    keywords: [
      "application development",
      "mobile development",
      "android",
      "ios",
      "flutter",
      "react native",
    ],
  },
  {
    slug: "web-development",
    emoji: "🌐",
    label: "Web Development",
    blurb: "Full-stack web platforms with accessibility and scale baked in.",
    keywords: [
      "web development",
      "frontend",
      "front-end",
      "backend",
      "back-end",
      "react",
      "next.js",
      "node.js",
    ],
  },
  {
    slug: "digital-marketing",
    emoji: "💻",
    label: "Digital Marketing",
    blurb: "Growth loops, attribution, and creative that converts.",
    keywords: ["digital marketing", "growth marketing", "seo", "sem", "ads"],
  },
  {
    slug: "cse",
    emoji: "🎓",
    label: "Computer Science Engineering (CSE)",
    blurb: "CS fundamentals, systems, and engineering judgment.",
    keywords: [
      "computer science engineering",
      "cse",
      "data structures",
      "algorithms",
      "operating systems",
    ],
  },
  {
    slug: "ece",
    emoji: "⚡",
    label: "Electronics & Communication Engineering (ECE)",
    blurb: "Signals, communications, and hardware-aware thinking.",
    keywords: [
      "electronics and communication",
      "ece",
      "communication engineering",
      "signal processing",
    ],
  },
  {
    slug: "embedded-systems",
    emoji: "💡",
    label: "Embedded Systems",
    blurb: "Firmware, RTOS, and tight coupling to physical constraints.",
    keywords: ["embedded systems", "embedded software", "rtos", "firmware", "iot"],
  },
  {
    slug: "vlsi",
    emoji: "🧩",
    label: "VLSI Design",
    blurb: "RTL-to-GDSII literacy for serious silicon-minded engineers.",
    keywords: ["vlsi", "verilog", "vhdl", "fpga", "asic"],
  },
] as const;

const DOMAIN_BY_SLUG = new Map(
  INFRANEX_DOMAINS.map((d) => [d.slug, d] as const)
);

export function getDomainBySlug(slug: string): LearningDomain | undefined {
  return DOMAIN_BY_SLUG.get(slug);
}

/** Best-effort domain from course text (title + description). */
export function inferCourseDomainSlug(course: {
  title: string;
  description: string | null;
}): string | null {
  const hay = `${course.title} ${course.description ?? ""}`.toLowerCase();
  for (const d of INFRANEX_DOMAINS) {
    for (const kw of d.keywords) {
      if (hay.includes(kw)) return d.slug;
    }
  }
  return null;
}
