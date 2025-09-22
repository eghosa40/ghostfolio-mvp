"use client";
import Link from "next/link";
import { useState } from "react";

type Props = {
  projectId?: string; // for linking to /steps
  taskId?: number;
  step?: number;
  title: string;
  desc?: string;
  status: "todo" | "doing" | "done";
};

export default function TaskCard({
  projectId,
  taskId,
  step,
  title,
  desc,
  status,
}: Props) {
  const [open, setOpen] = useState(false);

  const badge =
    status === "done"
      ? "bg-green-100 text-green-700"
      : status === "doing"
      ? "bg-blue-100 text-blue-700"
      : "bg-neutral-200 text-neutral-600";

  const titleStyle =
    status === "done"
      ? "text-green-700 line-through"
      : status === "doing"
      ? "text-blue-700"
      : "text-neutral-700";

  // Click header to toggle; hover shows a small preview.
  return (
    <div className="group rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Header row */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <h3 className={`font-medium ${titleStyle}`}>
          {step ? `Step ${step}. ` : ""}
          {title}
        </h3>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge}`}>
          {status}
        </span>
      </button>

      {/* In-flow expanding panel */}
      {desc && (
        <div
          className={[
            "overflow-hidden transition-all duration-300 ease-out",
            open
              ? "max-h-48 opacity-100 mt-3"
              : "max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-3",
          ].join(" ")}
        >
          <div className="rounded-xl border border-black/5 bg-white/90 p-3 text-sm text-neutral-700 shadow-lg backdrop-blur-sm supports-[backdrop-filter]:bg-white/75">
            <p>{desc}</p>
            {projectId && taskId && (
              <div className="mt-3">
                <Link
                  href={`/projects/${projectId}/steps/${step}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Open step →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}