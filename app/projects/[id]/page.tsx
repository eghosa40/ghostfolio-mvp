import { cookies } from "next/headers";
import BackButton from "@/components/BackButton";
import ProjectTasksClient from "./ProjectTasksClient";
import { getProjectTasks, type Task, type Status } from "@/lib/projects";

export default async function ProjectTasksPage({
                                                 params,
                                               }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;               // ✅ await params

  const cookieStore = await cookies();
  const raw = cookieStore.get(`gf_p_${id}`)?.value ?? "[]";
  let done: string[] = [];
  try { done = JSON.parse(raw); } catch {}

  const seed = getProjectTasks(id);
  const tasks: Task[] = seed.map(t =>
      done.includes(String(t.step)) ? { ...t, status: "done" as Status } : t
  );

  return (
      <section className="mx-auto max-w-3xl px-6 py-12 space-y-6">
        <BackButton />
        <ProjectTasksClient id={id} initialTasks={tasks} />
      </section>
  );
}