import type { AiRuleSet, PackageManager } from "../types.js";
import { createReactViteRules } from "./react-vite-rules.js";

export function createVueViteRules(
  projectName: string,
  packageManager: PackageManager = "pnpm",
): AiRuleSet {
  const base = createReactViteRules(projectName, packageManager);

  return {
    ...base,
    project: {
      ...base.project,
      framework: "vue",
    },
    stack: {
      buildTool: "vite",
      language: "typescript",
      styling: "tailwind",
      httpClient: "axios",
      testing: "vitest",
      stateManager: "pinia",
    },
    state: {
      localStatePolicy: "Use ref or reactive for temporary component state.",
      globalStatePolicy: "Use Pinia for cross-page client state.",
      serverStatePolicy: "Use composables and Axios for request state in the MVP template.",
    },
    dataFetching: {
      transport: "axios",
      mustNormalizeErrors: true,
      mustHandleLoadingErrorEmptySuccess: true,
    },
  };
}
