// --- Projects Grid data (single source of truth) ---
export type ProjectCardData = {
  id: number;
  title: string;
  tags: string[];
  level: "Beginner" | "Intermediate" | "Advanced" | string;
  desc: string;
};

export const projects: ProjectCardData[] = [
  {
    id: 1,
    title: "To-Do App",
    tags: ["React", "Tailwind"],
    level: "Beginner",
    desc: "Level up your skills by creating a task manager.",
  },
  {
    id: 2,
    title: "Landing Page Clone",
    tags: ["Next.js", "Tailwind"],
    level: "Intermediate",
    desc: "Recreate a responsive marketing page.",
  },
];

export const getProjects = () => projects;
export const getProjectById = (id: number) => projects.find((p) => p.id === id);

// =======================
// Task Page (steps) + lookups used by /projects/[id]/steps/[stepId]
// =======================

export type Step = {
    id: string;           // step id as a string, e.g. "1"
    title: string;
    description: string;
    code: string;
    tips?: string[];
};

// Demo steps keyed by project id
const stepSeeds: Record<string, Step[]> = {
  "1": [
    {
      id: "1",
      title: "Build a login form",
      description:
        "Create a form with email/password using controlled inputs and a submit handler.",
      code: `import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ email, password });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-md border p-2" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-md border p-2" />
      <button type="submit" className="rounded-md border px-3 py-2">Submit</button>
    </form>
  );
}`,
      tips: [
        "This is a controlled component pattern.",
        "Keep form state close to the form.",
      ],
    },
    {
      id: "2",
      title: "Client-side validation",
      description: "Add minimal validation and disabled states for UX.",
      code: `// add basic validation logic before submit\n// show inline errors and disable submit until valid`,
      tips: ["Disable submit until fields are valid."],
    },
    {
      id: "3",
      title: "Wire to handler",
      description: "Stub an auth call (no backend yet).",
      code: `async function login(email: string, password: string){\n  await new Promise(r => setTimeout(r, 500));\n  return { ok: true }\n}`,
      tips: ["Use a small delay to mimic network."],
    },
    {
      id: "4",
      title: "CRUD todos in localStorage",
      description: "Add list, add/remove, toggle, and persist todos to localStorage.",
      code: `type Todo = { id: string; title: string; done: boolean };\nconst [todos, setTodos] = useState<Todo[]>(() => {\n  try { return JSON.parse(localStorage.getItem('todos')||'[]') } catch { return [] }\n});\nuseEffect(() => { localStorage.setItem('todos', JSON.stringify(todos)) }, [todos]);`,
      tips: ["Persist after every change with useEffect."],
    },
    {
      id: "5",
      title: "Filters & search",
      description: "Add All/Active/Done filters and a search box.",
      code: `const [q, setQ] = useState('');\nconst visible = todos.filter(t => t.title.toLowerCase().includes(q.toLowerCase()));`,
      tips: ["Consider URL params for filter state."],
    },
    {
      id: "6",
      title: "Drag & drop reordering",
      description: "Reorder todos with keyboard + mouse support.",
      code: `// integrate @dnd-kit or a simple up/down move() helper`,
      tips: ["Keep it accessible; preserve order in storage."],
    },
    {
      id: "7",
      title: "Theme toggle",
      description: "Add light/dark theme and remember preference.",
      code: `// use data-theme on <html> and toggle classList`,
      tips: ["Match system preference with prefers-color-scheme."],
    },
    {
      id: "8",
      title: "Deploy",
      description: "Build & deploy to Vercel with environment checks.",
      code: `// vercel.json tweaks if needed`,
      tips: ["Smoke-test before sharing the link."],
    },
  ],
  "2": [
    {
      id: "1",
      title: "Lay out hero section",
      description: "Create a responsive hero with heading, copy, and CTA.",
      code: `export default function Hero(){ return (<section className=\"py-16\">Hero</section>); }`,
      tips: ["Constrain width with max-w-3xl and center with mx-auto."],
    },
    {
      id: "2",
      title: "Features grid",
      description: "Add 3–6 feature cards using your Card component.",
      code: `const features = [{title:'Fast'},{title:'Secure'},{title:'Fun'}];`,
      tips: ["Use a 3-col grid on desktop, 1-col on mobile."],
    },
    {
      id: "3",
      title: "Testimonials",
      description: "Add a simple testimonials section with avatars.",
      code: `const quotes = [{name:'Ada', quote:'Loved it!'}];`,
      tips: ["Keep contrast high for readability."],
    },
    {
      id: "4",
      title: "Pricing section",
      description: "Two or three tier cards with a CTA.",
      code: `const tiers = [{name:'Free', price:0},{name:'Pro', price:12}];`,
      tips: ["Highlight the recommended plan."]
    },
    {
      id: "5",
      title: "Footer + polish",
      description: "Add footer links and tune spacing/contrast.",
      code: `// footer nav and visual tweaks`,
      tips: ["Ensure focus states on links/buttons."],
    },
    {
      id: "6",
      title: "Mobile nav drawer",
      description: "Hamburger menu that opens a sheet/drawer on small screens.",
      code: `// use state to toggle <nav> visibility`,
      tips: ["Lock scroll when drawer is open."],
    },
    {
      id: "7",
      title: "Dark mode",
      description: "Support dark theme across sections.",
      code: `// use class 'dark' on html; test sections for contrast`,
      tips: ["Test color tokens on real content."],
    },
    {
      id: "8",
      title: "Deploy",
      description: "Push to Vercel and verify meta tags & OG images.",
      code: `// add og:image for nice link previews`,
      tips: ["Run Lighthouse for quick checks."],
    },
  ],
};

// Minimal project meta used by Task Page (we only need id + title)
export type ProjectMeta = { id: string; title: string };

export function getProject(projectId: string): ProjectMeta | undefined {
    // assumes you already have and export `projects` above in this file
    const p = projects.find((prj: any) => String(prj.id) === String(projectId));
    if (!p) return undefined;
    return { id: String(p.id), title: p.title };
}

export function getStep(projectId: string, stepId: string): Step | undefined {
    const pid = String(projectId);
    const sid = String(stepId);
    const steps = stepSeeds[pid] ?? stepSeeds["1"] ?? [];
    return steps.find((s) => String(s.id) === sid);
}

// =======================
// Project Detail page tasks (used by /projects/[id])
// =======================
export type Status = "todo" | "doing" | "done";

export type Task = {
  id: number;      // task id within the project
  step: number;    // 1-based order, used to link to /steps/[stepId]
  title: string;
  desc: string;
  status: Status;
};

// Demo task seeds keyed by projectId from the route
const taskSeeds: Record<string, Task[]> = {
  "1": [
    { id: 1, step: 1, title: "Set up repository", desc: "Init repo, add README, install deps.", status: "doing" },
    { id: 2, step: 2, title: "Create layout",     desc: "Make header, shell, and container.",   status: "todo"  },
    { id: 3, step: 3, title: "Add components",    desc: "ProjectCard, TaskCard, Button.",       status: "todo"  },
    { id: 4, step: 4, title: "Wire API",          desc: "Fetch tasks by project id.",           status: "todo"  },
    { id: 5, step: 5, title: "Deploy",            desc: "Build & push to Vercel.",              status: "todo"  },
  ],
  "2": [
    { id: 1, step: 1, title: "Plan sections",     desc: "Hero, features, CTA, footer.",         status: "doing" },
    { id: 2, step: 2, title: "Build hero",        desc: "Heading, subcopy, button, image.",     status: "todo"  },
    { id: 3, step: 3, title: "Features grid",     desc: "3–6 cards with icons.",                status: "todo"  },
    { id: 4, step: 4, title: "Polish & a11y",     desc: "Focus states, semantics.",             status: "todo"  },
    { id: 5, step: 5, title: "Ship preview",      desc: "Vercel deploy + share.",               status: "todo"  },
  ],
};

// Exported accessor for the Project Tasks page
export function getProjectTasks(projectId: string): Task[] {
  // return a clone so pages can mutate local state safely without touching the source
  return (taskSeeds[projectId] ?? taskSeeds["1"]).map((t) => ({ ...t }));
}