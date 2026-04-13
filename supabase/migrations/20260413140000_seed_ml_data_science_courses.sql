-- Catalog: Applied ML Bootcamp + Data Science (idempotent).

insert into public.courses (id, title, description, duration, price, cloudinary_url)
values
  (
    '00000000-0000-4000-8000-000000000011',
    'Applied Machine Learning Bootcamp',
    'Learn ML from scratch to deployment with real-world projects including regression, classification, and model deployment.',
    '12 weeks',
    599900,
    'https://res.cloudinary.com/dva2bnivt/video/upload/q_auto/f_auto/v1776098944/8617391-hd_1920_1080_25fps_oyofwd.mp4'
  ),
  (
    '00000000-0000-4000-8000-000000000012',
    'Data Science for Real-World Projects',
    'Master data analysis, visualization, and predictive modeling using Python, Pandas, and real datasets.',
    '10 weeks',
    499900,
    'https://res.cloudinary.com/dva2bnivt/video/upload/q_auto/f_auto/v1776100031/8924918-hd_1920_1080_25fps_jx7hq2.mp4'
  )
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  duration = excluded.duration,
  price = excluded.price,
  cloudinary_url = excluded.cloudinary_url;
