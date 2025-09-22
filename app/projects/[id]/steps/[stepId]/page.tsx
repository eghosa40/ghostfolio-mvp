import { notFound } from "next/navigation";
import { getProject, getStep } from "@/lib/projects";
import TaskPageClient from "./TaskPageClient";

export default async function Page({
                                     params,
                                   }: {
  params: Promise<{ id: string; stepId: string }>;
}) {
  const { id, stepId } = await params;       // ✅ await params

  const project = getProject(id);
  const step = getStep(id, stepId);

  if (!project || !step) return notFound();

  return (
      <TaskPageClient
          projectId={project.id}
          projectTitle={project.title}
          step={step}
      />
  );
}