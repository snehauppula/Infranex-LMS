/** Infranex LMS domain catalogue (marketing + course filters). */

import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  Brain,
  Cpu,
  FlaskConical,
  Globe,
  GraduationCap,
  Megaphone,
  Microchip,
  Palette,
  Puzzle,
  Shield,
  Smartphone,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

export type LearningDomain = {
  slug: string;
  icon: LucideIcon;
  label: string;
  blurb: string;
  /** Lowercase phrases; earlier domains are checked first (put specific before broad). */
  keywords: readonly string[];
  /**
   * Optional hero image URL under `/public` (home domain marquee).
   * Example: `/domains/vlsi.png`
   */
  imageSrc?: string;
};

export const INFRANEX_DOMAINS: readonly LearningDomain[] = [
  {
    slug: "ai-driven-data-analytics",
    icon: TrendingDown,
    label: "AI-Driven Data Analytics",
    blurb: "Decision systems that pair models with governed data products.",
    keywords: ["ai-driven data", "ai driven data", "ai-driven analytics"],
    imageSrc: "/domains/ai-driven-data-analytics.png",
  },
  {
    slug: "generative-ai",
    icon: Sparkles,
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
    imageSrc: "/domains/generative-ai.png",
  },
  {
    slug: "professional-ai-data-analytics",
    icon: Bot,
    label: "Professional AI & Data Analytics",
    blurb:
      "Industry-ready AI and analytics stacks from ingestion to insight — dashboards, metrics design, and stakeholder-ready storytelling.",
    keywords: [
      "professional ai",
      "ai & data analytics",
      "ai and data analytics",
      "professional data analytics",
    ],
    imageSrc: "/domains/professional-ai-data-analytics.png",
  },
  {
    slug: "professional-ui-ux",
    icon: Palette,
    label: "Professional UI/UX Design",
    blurb: "Research, systems thinking, and craft at SaaS quality bars.",
    keywords: ["ui/ux", "ui ux", "user experience", "user interface", "figma"],
    imageSrc: "/domains/professional-ui-ux.png",
  },
  {
    slug: "ai-ml-integrated",
    icon: FlaskConical,
    label: "AI & ML (Integrated Specialization)",
    blurb: "Unified depth across classical ML and applied AI engineering.",
    keywords: ["integrated specialization", "ai & ml integrated", "ai and ml integrated"],
    imageSrc: "/domains/ai-ml-integrated.png",
  },
  {
    slug: "machine-learning",
    icon: Cpu,
    label: "Machine Learning (ML)",
    blurb: "Training, evaluation, and deployment without the hand-wavy math.",
    keywords: ["machine learning"],
    imageSrc: "/domains/machine-learning.png",
  },
  {
    slug: "artificial-intelligence",
    icon: Brain,
    label: "Artificial Intelligence (AI)",
    blurb: "Search, planning, agents, and responsible AI product patterns.",
    keywords: ["artificial intelligence", " ai ", " ai,", " ai-"],
    imageSrc: "/domains/artificial-intelligence.png",
  },
  {
    slug: "data-science",
    icon: BarChart3,
    label: "Data Science",
    blurb: "Experimentation, modeling, and communication for real decisions.",
    keywords: ["data science"],
    imageSrc: "/domains/data-science.png",
  },
  {
    slug: "data-analytics",
    icon: TrendingUp,
    label: "Data Analytics",
    blurb: "SQL, warehousing, and metrics that survive exec scrutiny.",
    keywords: ["data analytics", "business intelligence"],
    imageSrc: "/domains/data-analytics.png",
  },
  {
    slug: "cyber-security",
    icon: Shield,
    label: "Cyber Security",
    blurb: "Defense in depth, identity, and pragmatic threat reduction.",
    keywords: ["cyber security", "cybersecurity", "infosec", "security engineering"],
    imageSrc: "/domains/cyber-security.png",
  },
  {
    slug: "application-development",
    icon: Smartphone,
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
    imageSrc: "/domains/application-development.png",
  },
  {
    slug: "web-development",
    icon: Globe,
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
    imageSrc: "/domains/web-development.png",
  },
  {
    slug: "digital-marketing",
    icon: Megaphone,
    label: "Digital Marketing",
    blurb: "Growth loops, attribution, and creative that converts.",
    keywords: ["digital marketing", "growth marketing", "seo", "sem", "ads"],
    imageSrc: "/domains/digital-marketing.png",
  },
  {
    slug: "cse",
    icon: GraduationCap,
    label: "Computer Science Engineering (CSE)",
    blurb: "CS fundamentals, systems, and engineering judgment.",
    keywords: [
      "computer science engineering",
      "cse",
      "data structures",
      "algorithms",
      "operating systems",
    ],
    imageSrc: "/domains/cse.png",
  },
  {
    slug: "ece",
    icon: Zap,
    label: "Electronics & Communication Engineering (ECE)",
    blurb: "Signals, communications, and hardware-aware thinking.",
    keywords: [
      "electronics and communication",
      "ece",
      "communication engineering",
      "signal processing",
    ],
    imageSrc: "/domains/ece.png",
  },
  {
    slug: "embedded-systems",
    icon: Microchip,
    label: "Embedded Systems",
    blurb: "Firmware, RTOS, and tight coupling to physical constraints.",
    keywords: ["embedded systems", "embedded software", "rtos", "firmware", "iot"],
    imageSrc: "/domains/embedded-systems.png",
  },
  {
    slug: "vlsi",
    icon: Puzzle,
    label: "VLSI Design",
    blurb: "RTL-to-GDSII literacy for serious silicon-minded engineers.",
    keywords: ["vlsi", "verilog", "vhdl", "fpga", "asic"],
    imageSrc: "/domains/vlsi.png",
  },
];

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
