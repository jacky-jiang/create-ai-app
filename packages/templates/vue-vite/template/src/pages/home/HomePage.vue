<script setup lang="ts">
import ExampleContainer from "../../features/example/components/ExampleContainer.vue";
</script>

<template>
  <main class="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
    <section class="mx-auto max-w-3xl space-y-6">
      <div>
        <p class="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">create-ai-app</p>
        <h1 class="mt-3 text-4xl font-semibold tracking-tight">
          AI-coding-friendly Vue template
        </h1>
        <p class="mt-4 text-slate-300">
          This template demonstrates the standard layer-based project structure,
          Axios API layer, Pinia client state, composables, and testable business services.
        </p>
      </div>
      <ExampleContainer />
    </section>
  </main>
</template>
