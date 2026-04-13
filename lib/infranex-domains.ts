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
};

export const INFRANEX_DOMAINS: readonly LearningDomain[] = [
  {
    slug: "ai-driven-data-analytics",
    icon: TrendingDown,
    label: "AI-Driven Data Analytics",
    blurb: "Decision systems that pair models with governed data products.",
    keywords: ["ai-driven data", "ai driven data", "ai-driven analytics"],
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
  },
  {
    slug: "professional-ai-data-analytics",
    icon: Bot,
    label: "Professional AI & Data Analytics",
    blurb: "Industry-ready AI and analytics stacks from ingestion to insight.",
    keywords: ["professional ai", "ai & data analytics", "ai and data analytics"],
  },
  {
    slug: "professional-data-analytics",
    icon: BarChart3,
    label: "Professional Data Analytics",
    blurb: "Dashboards, metrics design, and stakeholder-ready storytelling.",
    keywords: ["professional data analytics"],
  },
  {
    slug: "professional-ui-ux",
    icon: Palette,
    label: "Professional UI/UX Design",
    blurb: "Research, systems thinking, and craft at SaaS quality bars.",
    keywords: ["ui/ux", "ui ux", "user experience", "user interface", "figma"],
  },
  {
    slug: "ai-ml-integrated",
    icon: FlaskConical,
    label: "AI & ML (Integrated Specialization)",
    blurb: "Unified depth across classical ML and applied AI engineering.",
    keywords: ["integrated specialization", "ai & ml integrated", "ai and ml integrated"],
  },
  {
    slug: "machine-learning",
    icon: Cpu,
    label: "Machine Learning (ML)",
    blurb: "Training, evaluation, and deployment without the hand-wavy math.",
    keywords: ["machine learning"],
  },
  {
    slug: "artificial-intelligence",
    icon: Brain,
    label: "Artificial Intelligence (AI)",
    blurb: "Search, planning, agents, and responsible AI product patterns.",
    keywords: ["artificial intelligence", " ai ", " ai,", " ai-"],
  },
  {
    slug: "data-science",
    icon: BarChart3,
    label: "Data Science",
    blurb: "Experimentation, modeling, and communication for real decisions.",
    keywords: ["data science"],
  },
  {
    slug: "data-analytics",
    icon: TrendingUp,
    label: "Data Analytics",
    blurb: "SQL, warehousing, and metrics that survive exec scrutiny.",
    keywords: ["data analytics", "business intelligence"],
  },
  {
    slug: "cyber-security",
    icon: Shield,
    label: "Cyber Security",
    blurb: "Defense in depth, identity, and pragmatic threat reduction.",
    keywords: ["cyber security", "cybersecurity", "infosec", "security engineering"],
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
  },
  {
    slug: "digital-marketing",
    icon: Megaphone,
    label: "Digital Marketing",
    blurb: "Growth loops, attribution, and creative that converts.",
    keywords: ["digital marketing", "growth marketing", "seo", "sem", "ads"],
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
  },
  {
    slug: "embedded-systems",
    icon: Microchip,
    label: "Embedded Systems",
    blurb: "Firmware, RTOS, and tight coupling to physical constraints.",
    keywords: ["embedded systems", "embedded software", "rtos", "firmware", "iot"],
  },
  {
    slug: "vlsi",
    icon: Puzzle,
    label: "VLSI Design",
    blurb: "RTL-to-GDSII literacy for serious silicon-minded engineers.",
    keywords: ["vlsi", "verilog", "vhdl", "fpga", "asic"],
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
