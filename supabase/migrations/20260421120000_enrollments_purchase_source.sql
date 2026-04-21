-- Track how an enrollment was acquired (paid vs coupon/free).
alter table public.enrollments
  add column if not exists purchase_source text not null default 'razorpay'
  check (purchase_source in ('razorpay', 'coupon'));

