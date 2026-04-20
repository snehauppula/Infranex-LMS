"use server";

import { revalidatePath } from "next/cache";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function revalidateAdminPage() {
  revalidatePath("/admin");
}

async function assertCurrentUserIsAdmin() {
  const supabase = await createClient();
  if (!supabase) {
    throw new Error("Supabase is not configured on the server.");
  }

  // For destructive actions we always require a real signed-in user session.
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    throw new Error(userErr?.message ?? "You must be signed in to use admin actions.");
  }

  // Prefer service-role for the role check (bypasses RLS / session cookie issues).
  const admin = createServiceRoleClient();
  const roleClient = admin ?? supabase;

  const { data: profile, error: profileErr } = await roleClient
    .from("users")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileErr) {
    throw new Error(
      `Unable to verify admin permissions: ${profileErr.message}`
    );
  }

  if (String(profile?.role ?? "").toLowerCase() !== "admin") {
    throw new Error("Admin permissions required.");
  }

  return user.id;
}

export async function adminDeleteUser(formData: FormData) {
  const currentUserId = await assertCurrentUserIsAdmin();
  const targetUserId = String(formData.get("userId") ?? "").trim();

  if (!targetUserId) {
    throw new Error("Missing user id.");
  }

  if (targetUserId === currentUserId) {
    throw new Error("You can't delete your own admin account.");
  }

  const admin = createServiceRoleClient();
  if (!admin) {
    throw new Error(
      "Service role key is not configured (SUPABASE_SERVICE_ROLE_KEY)."
    );
  }

  const { error } = await admin.auth.admin.deleteUser(targetUserId);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}
