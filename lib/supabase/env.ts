/** Normalize env values (common copy/paste issues). */
function sanitize(value: string | undefined): string | undefined {
  if (value == null) return undefined;
  let v = value.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v.length > 0 ? v : undefined;
}

export function getSupabaseUrl(): string | undefined {
  return sanitize(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

/**
 * Client / SSR public key: legacy JWT `anon` **or** hosted `sb_publishable_…`
 * (see https://supabase.com/docs/guides/api/api-keys ). Never use service_role.
 */
export function getSupabaseAnonKey(): string | undefined {
  return (
    sanitize(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ??
    sanitize(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  );
}

export function getSupabaseServiceRoleKey(): string | undefined {
  return sanitize(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
