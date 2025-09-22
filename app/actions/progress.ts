"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function markStepDone(projectId: string, stepId: string) {
  const cookieStore = await cookies();
  const key = `gf_p_${projectId}`;

  const existing = cookieStore.get(key)?.value ?? "[]";
  let done: string[] = [];
  try { done = JSON.parse(existing); } catch { done = []; }

  if (!done.includes(stepId)) done.push(stepId);

  cookieStore.set(key, JSON.stringify(done), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  revalidatePath(`/projects/${projectId}`);
}