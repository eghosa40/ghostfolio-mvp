"use client";

import { useMemo, useState, useTransition } from "react";
import TaskCard from "@/components/TaskCard";
import { type Task, type Status } from "@/lib/projects";
import { markStepDone } from "@/app/actions/progress";

export default function ProjectTasksClient({
                                               id,
                                               initialTasks,
                                           }: {
    id: string;
    initialTasks: Task[];
}) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [current, setCurrent] = useState<number>(
        Math.max(0, initialTasks.findIndex((t) => t.status !== "done"))
    );
    const [pending, startTransition] = useTransition();

    const progress = useMemo(() => {
        const doneCount = tasks.filter((t) => t.status === "done").length;
        return Math.round((doneCount / tasks.length) * 100);
    }, [tasks]);

    const finished = tasks.length > 0 && tasks.every((t) => t.status === "done");

    const nextStep = () => {
        // 1) Compute new state synchronously
        let stepToPersist: string | null = null;

        setTasks((prev) => {
            const idx = prev.findIndex((t) => t.status !== "done");
            if (idx === -1) return prev;

            stepToPersist = String(prev[idx].step);
            const updated = prev.map((t, i) =>
                i === idx ? { ...t, status: "done" as Status } : t
            );
            // safe: set another state here, still inside event handler (not render)
            setCurrent(Math.min(idx + 1, prev.length - 1));
            return updated;
        });

        // 2) Kick off server action in a transition (no async fn passed)
        if (stepToPersist) {
            const sid = stepToPersist;
            startTransition(() => {
                // don't await in render path
                markStepDone(id, sid);
            });
        }
    };

    return (
        <div>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Project #{id}</h1>
                    <p className="text-sm text-neutral-600">Follow the steps in order.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="h-2 w-40 overflow-hidden rounded-full bg-neutral-200">
                        <div
                            className="h-full rounded-full bg-blue-600 transition-[width] duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-sm tabular-nums">{progress}%</span>

                    <button
                        onClick={nextStep}
                        disabled={finished || pending}
                        className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
                    >
                        {finished ? "Completed" : pending ? "Saving…" : "Next step"}
                    </button>
                </div>
            </div>

            {finished && (
                <div className="mb-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-green-700">
                    🎉 Project completed!
                </div>
            )}

            {tasks.length === 0 ? (
                <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-6 text-center text-sm text-neutral-800">
                    No steps yet for this project.
                </div>
            ) : (
                <div className="grid gap-4">
                    {tasks.map((t) => (
                        <TaskCard
                            key={t.id}
                            projectId={id}
                            taskId={t.id}
                            step={t.step}
                            title={t.title}
                            desc={t.desc}
                            status={t.status}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}