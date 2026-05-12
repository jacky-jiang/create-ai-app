import { ExampleContainer } from "../../features/example/components/ExampleContainer";

export function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <section className="mx-auto max-w-3xl space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
            create-ai-app
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            AI-coding-friendly React template
          </h1>
          <p className="mt-4 text-slate-300">
            This template demonstrates the standard layer-based project structure,
            Axios API layer, TanStack Query server state, Zustand client state, and
            testable business services.
          </p>
        </div>
        <ExampleContainer />
      </section>
    </main>
  );
}
