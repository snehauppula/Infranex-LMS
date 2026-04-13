"use server";

import { revalidatePath } from "next/cache";

export async function revalidateAdminPage() {
  revalidatePath("/admin");
}
