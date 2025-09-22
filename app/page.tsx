import Link from "next/link";

export default function Home() {
  return (
      <main className="relative isolate min-h-screen overflow-hidden bg-black text-white">
        {/* glow background */}
        <div
            className="pointer-events-none absolute inset-0"
            style={{
                background: "radial-gradient(800px 400px at 50% 40%, rgba(555,609,132,.35), transparent 60%),radial-gradient(600px 300px at 50% 70%, rgba(437,150,234,.3), transparent 60%)",
                filter: "blur(24px)",
            }}
        />

        {/* content */}
        <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
              <h1 className="mb-6 text-5xl font-semibold tracking-tight sm:text-6xl">
                  Ghostfolio
              </h1>
              <p className="mb-8 max-w-xl text-lg text-white/70">
                  Build projects the smart way — structured steps, clean UI, and a little Apple polish.
              </p>

              {/* 👇 Link wrapping your button */}
              <Link href="/projects">
                  <button className="rounded-full bg-white px-6 py-3 text-base font-medium text-black hover:opacity-90">
                      Try Demo
                  </button>
              </Link>
          </div>
      </main>
  );
}
