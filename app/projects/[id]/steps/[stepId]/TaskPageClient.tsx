"use client";

import * as React from "react";
import { useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { markStepDone } from "@/app/actions/progress";
import { Lightbulb, Copy, Play, BookOpen, CheckCircle2 } from "lucide-react";

// shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Step = {
    id: string;
    title: string;
    description: string;
    code: string;
    tips?: string[];
};

export default function TaskPageClient({
                                           projectId,
                                           projectTitle,
                                           step,
                                       }: {
    projectId: string;
    projectTitle: string;
    step: Step;
}) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const storageKey = useMemo(
        () => `gf:project:${projectId}:step:${step.id}:done`,
        [projectId, step.id]
    );

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(step.code);
        } catch {}
    };

    const markComplete = () => {
        // optional optimistic local flag
        try {
            localStorage.setItem(`gf:project:${projectId}:step:${step.id}:done`, "true");
        } catch {}

        // ✅ wait for the server action, THEN navigate
        startTransition(() => {
            markStepDone(projectId, String(step.id)).then(() => {
                router.push(`/projects/${projectId}`);
            });
        });
    };

    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            {/* Breadcrumb */}
            <div className="mb-4 text-sm text-muted-foreground">
                <button
                    onClick={() => router.push(`/projects/${projectId}`)}
                    className="underline underline-offset-2 hover:text-foreground"
                >
                    {projectTitle}
                </button>{" "}
                / <span className="text-foreground">{step.title}</span>
            </div>

            <Card className="shadow-sm">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">Step</Badge>
                        <CardTitle className="text-2xl">{step.title}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardHeader>

                <CardContent className="space-y-5">
                    {/* Code Preview */}
                    <div className="rounded-xl border bg-black">
                        <div className="flex items-center justify-between border-b px-4 py-2 text-xs text-white/70">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-yellow-500" />
                                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                            </div>
                            <span>Code Preview</span>
                        </div>
                        <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-white">
{step.code}
            </pre>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Button variant="secondary" onClick={copyCode}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy to clipboard
                        </Button>
                        <Button onClick={() => router.refresh()}>
                            <Play className="mr-2 h-4 w-4" />
                            Try in editor (stub)
                        </Button>
                        <Button variant="outline" onClick={() => alert("Docs coming soon")}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Read docs (stub)
                        </Button>
                    </div>

                    {/* Tips */}
                    {step.tips?.length ? (
                        <div className="space-y-2 rounded-lg border bg-muted/40 p-3">
                            {step.tips.map((t, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
                                    <span>{t}</span>
                                </div>
                            ))}
                        </div>
                    ) : null}

                    {/* Mark Complete */}
                    <div className="pt-2">
                        <Button
                            className="w-full sm:w-auto"
                            onClick={markComplete}
                            disabled={pending}
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            {pending ? "Saving…" : "Mark Complete → Back to Project"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}