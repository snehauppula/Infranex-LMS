-- Applied via Supabase MCP (project). Idempotent catalog seed.

insert into public.courses (id, title, description, duration, price, cloudinary_url)
values
  ('11111111-1111-4111-8111-111111111101', 'Cloud Infrastructure Fundamentals', 'Design resilient systems with modern IaC patterns and observability.', '12h', 499900, 'https://res.cloudinary.com/dva2bnivt/video/upload/q_auto/f_auto/v1775913661/istockphoto-1916478171-640_adpp_is_jyydzf.mp4'),
  ('11111111-1111-4111-8111-111111111102', 'Security Engineering for Teams', 'Threat modeling, zero trust, and practical hardening for SaaS products.', '8h', 399900, null),
  ('11111111-1111-4111-8111-111111111103', 'Data Pipelines at Scale', 'Streaming ingestion, warehouse design, and cost-aware batch jobs.', '10h', 449900, null)
on conflict (id) do nothing;
