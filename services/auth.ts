import type { User } from "@supabase/supabase-js";
import type { UserRole } from "@/types";
import { createServiceRoleClient } from "@/lib/supabase/admin";

/** `admin` is case-insensitive; anything else is treated as student. */
function normalizeUserRole(value: string | null | undefined): UserRole {
  const v = typeof value === "string" ? value.trim().toLowerCase() : "";
  return v === "admin" ? "admin" : "student";
}

/**
 * LMS role can live in `public.users.role` (what this app prefers) or in
 * `auth.users.raw_app_meta_data.role` (visible under Authentication → Users
 * as App Metadata in the Supabase dashboard). Both are honored so admin
 * access works if only one place was updated.
 */
function resolveUserRole(
  user: User,
  profile: { role: string } | null
): UserRole {
  const fromDb = normalizeUserRole(profile?.role);
  const metaRaw = user.app_metadata?.role;
  const fromAppMeta = normalizeUserRole(
    typeof metaRaw === "string" ? metaRaw : undefined
  );
  if (fromDb === "admin" || fromAppMeta === "admin") return "admin";
  return "student";
}

/** Optional: `ADMIN_EMAILS=you@x.com,other@y.com` — always treat these sign-ins as admin (server only). */
function isAdminEmailAllowlisted(email: string | undefined): boolean {
  const raw = process.env.ADMIN_EMAILS;
  if (!raw?.trim() || !email) return false;
  const allow = new Set(
    raw
      .split(/[,;]/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
  return allow.has(email.trim().toLowerCase());
}

/** Navbar / UI: full name from metadata, else email local-part. */
export function getUserDisplayName(user: User | null | undefined): string | null {
  if (!user) return null;
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  const pick = (key: string) => {
    const v = meta?.[key];
    return typeof v === "string" && v.trim() ? v.trim() : null;
  };
  return (
    pick("full_name") ||
    pick("name") ||
    pick("preferred_username") ||
    user.email?.split("@")[0] ||
    null
  );
}

export async function getSessionUser() {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  if (!supabase) return { user: null as null, role: null as UserRole | null };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { user: null, role: null };

  const { data: profileAnon, error: anonErr } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (anonErr && process.env.NODE_ENV === "development") {
    console.warn("[getSessionUser] public.users (anon) select:", anonErr.message);
  }

  let profile = profileAnon;

  /* RLS or replication issues can hide the row from the anon client; service role reads the same id only. */
  if (!profile) {
    const admin = createServiceRoleClient();
    if (admin) {
      const { data: profileSr, error: srErr } = await admin
        .from("users")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      if (srErr && process.env.NODE_ENV === "development") {
        console.warn("[getSessionUser] public.users (service) select:", srErr.message);
      }
      if (profileSr) profile = profileSr;
    } else if (process.env.NODE_ENV === "development") {
      console.warn(
        "[getSessionUser] No public.users row for this account and SUPABASE_SERVICE_ROLE_KEY is unset — cannot bypass RLS. Set service role key or add ADMIN_EMAILS."
      );
    }
  }

  let role = resolveUserRole(user, profile);
  if (isAdminEmailAllowlisted(user.email ?? undefined)) {
    role = "admin";
  }

  return { user, role };
}
