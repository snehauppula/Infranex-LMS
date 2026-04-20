-- Seed domain catalog as courses (idempotent).
-- Titles match marketing domains, posters reuse `/public/domains/*`.
-- Videos will be added later; keep `video_url` empty for now.

insert into public.courses (slug, title, description, duration, price, video_url, poster_url)
values
  (
    'digital-marketing',
    'Digital Marketing',
    'Growth loops, attribution, and creative that converts.',
    null,
    450000,
    null,
    '/domains/digital-marketing.png'
  ),
  (
    'cse',
    'Computer Science Engineering (CSE)',
    'CS fundamentals, systems, and engineering judgment.',
    null,
    450000,
    null,
    '/domains/cse.png'
  ),
  (
    'web-development',
    'Web Development',
    'Full-stack web platforms with accessibility and scale baked in.',
    null,
    450000,
    null,
    '/domains/web-development.png'
  ),
  (
    'machine-learning',
    'Machine Learning (ML)',
    'Training, evaluation, and deployment without the hand-wavy math.',
    null,
    450000,
    null,
    '/domains/machine-learning.png'
  ),
  (
    'artificial-intelligence',
    'Artificial Intelligence (AI)',
    'Search, planning, agents, and responsible AI product patterns.',
    null,
    450000,
    null,
    '/domains/artificial-intelligence.png'
  ),
  (
    'ai-ml-integrated',
    'AI & ML (Integrated Specialization)',
    'Unified depth across classical ML and applied AI engineering.',
    null,
    450000,
    null,
    '/domains/ai-ml-integrated.png'
  ),
  (
    'data-science',
    'Data Science',
    'Experimentation, modeling, and communication for real decisions.',
    null,
    450000,
    null,
    '/domains/data-science.png'
  ),
  (
    'data-analytics',
    'Data Analytics',
    'SQL, warehousing, and metrics that survive exec scrutiny.',
    null,
    450000,
    null,
    '/domains/data-analytics.png'
  ),
  (
    'application-development',
    'Application Development',
    'Mobile and modern app delivery with performance in mind.',
    null,
    450000,
    null,
    '/domains/application-development.png'
  ),
  (
    'cyber-security',
    'Cyber Security',
    'Defense in depth, identity, and pragmatic threat reduction.',
    null,
    450000,
    null,
    '/domains/cyber-security.png'
  ),
  (
    'ece',
    'Electronics & Communication Engineering (ECE)',
    'Signals, communications, and hardware-aware thinking.',
    null,
    450000,
    null,
    '/domains/ece.png'
  ),
  (
    'embedded-systems',
    'Embedded Systems',
    'Firmware, RTOS, and tight coupling to physical constraints.',
    null,
    450000,
    null,
    '/domains/embedded-systems.png'
  ),
  (
    'vlsi',
    'VLSI Design',
    'RTL-to-GDSII literacy for serious silicon-minded engineers.',
    null,
    450000,
    null,
    '/domains/vlsi.png'
  ),
  (
    'professional-ai-data-analytics',
    'Professional AI & Data Analytics',
    'Industry-ready AI and analytics stacks from ingestion to insight — dashboards, metrics design, and stakeholder-ready storytelling.',
    null,
    450000,
    null,
    '/domains/professional-ai-data-analytics.png'
  ),
  (
    'professional-ui-ux',
    'Professional UI/UX Design',
    'Research, systems thinking, and craft at SaaS quality bars.',
    null,
    450000,
    null,
    '/domains/professional-ui-ux.png'
  ),
  (
    'generative-ai',
    'Generative AI',
    'LLMs, multimodal apps, and safe patterns for production GenAI.',
    null,
    500000,
    null,
    '/domains/generative-ai.png'
  ),
  (
    'ai-driven-data-analytics',
    'AI-Driven Data Analytics',
    'Decision systems that pair models with governed data products.',
    null,
    450000,
    null,
    '/domains/ai-driven-data-analytics.png'
  )
on conflict (slug) do update
set
  title = excluded.title,
  description = excluded.description,
  price = excluded.price,
  video_url = public.courses.video_url,
  duration = coalesce(public.courses.duration, excluded.duration),
  poster_url = coalesce(public.courses.poster_url, excluded.poster_url);

