import Link from "next/link";

type Props = {
    title: string;
    tags: string[];
    level: "Beginner" | "Intermediate" | "Advanced" | string;
    desc: string;
    href: string;
};

export default function ProjectCard({ title, tags, level, desc, href }: Props) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
            <h3 className="mb-3 text-2xl font-semibold text-neutral-800">{title}</h3>

            <div className="mb-3 flex flex-wrap gap-2">
                {tags.map(t => (
                    <span key={t} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
            {t}
          </span>
                ))}
            </div>

            <p className="mb-4 text-sm text-neutral-800">{desc}</p>

            <div className="mb-5 text-sm text-neutral-800">😊 <span className="align-middle">{level}</span></div>
            <Link
                href={href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
                🚀 Start Project
            </Link>

        </div>
    );
}
