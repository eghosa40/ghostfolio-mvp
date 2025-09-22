import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";


export default function ProjectsPage() {
    return (
        <section className="mx-auto max-w-5xl px-6 py-16">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-semibold tracking-tight">Choose your next project</h1>
                <p className="mt-2 text-neutral-600">Build real-world projects, step by step.</p>
            </header>

            <div className="grid gap-8 md:grid-cols-2">
                {projects.map(p => (
                    <ProjectCard key={p.id} {...p} href={`/projects/${p.id}`} />
                ))}
            </div>

            {/* Optional “generate with AI” banner */}
            <div className="mt-10 rounded-2xl border bg-gradient-to-b from-white to-neutral-50 p-5 text-center shadow-sm">
                <span className="text-neutral-700">🪄 Can’t decide? <b>Generate a project with AI</b></span>
            </div>
        </section>
    );
}
