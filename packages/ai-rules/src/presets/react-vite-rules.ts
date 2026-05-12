import type { AiRuleSet, PackageManager } from "../types.js";

export function createReactViteRules(
  projectName: string,
  packageManager: PackageManager = "pnpm",
): AiRuleSet {
  return {
    project: {
      projectName,
      framework: "react",
      packageManager,
    },
    stack: {
      buildTool: "vite",
      language: "typescript",
      styling: "tailwind",
      httpClient: "axios",
      testing: "vitest",
      stateManager: "zustand",
      serverState: "tanstack-query",
    },
    architecture: {
      pattern: "layer-based-feature-modules",
      dependencyDirection: ["app", "pages", "features", "shared"],
      forbiddenDependencies: [
        "shared -> features",
        "shared -> pages",
        "shared -> app",
        "features -> pages",
        "features -> app",
        "pages -> app",
      ],
    },
    codeStyle: {
      useStrictTypeScript: true,
      preferNamedExports: true,
      maxFunctionLines: 50,
      followSolid: true,
      commentPolicy: "Comments should explain why, not repeat what the code does.",
    },
    component: {
      separateContainerAndPresentation: true,
      uiComponentsCannotCallApi: true,
      propsMustBeTyped: true,
    },
    state: {
      localStatePolicy: "Use useState for temporary UI state.",
      globalStatePolicy: "Use Zustand for cross-page client state.",
      serverStatePolicy: "Use TanStack Query for server data, cache, retries, and invalidation.",
    },
    dataFetching: {
      transport: "axios",
      serverState: "tanstack-query",
      mustNormalizeErrors: true,
      mustHandleLoadingErrorEmptySuccess: true,
    },
    errorHandling: {
      normalizeApiErrors: true,
      avoidRawBackendErrorsInUi: true,
      noConsoleLogInProduction: true,
    },
    testing: {
      framework: "vitest",
      businessLogicRequiresTests: true,
      apiErrorRequiresTests: true,
      hooksOrComposablesRequireTests: true,
    },
    git: {
      commitConvention: "conventional-commits",
      allowedTypes: ["feat", "fix", "refactor", "chore", "test", "docs", "style", "perf"],
    },
    security: {
      noSecretsExposure: true,
      avoidDangerousHtml: true,
      dependencyAuditRecommended: true,
    },
    performance: {
      routeLazyLoading: true,
      avoidBlindMemoization: true,
      bundleSizeAwareness: true,
    },
    forbiddenFiles: {
      files: [
        ".env",
        ".env.*",
        "secrets/**",
        "credentials/**",
        "pnpm-lock.yaml",
        "package-lock.json",
        "yarn.lock",
        "generated/**",
        "src/shared/api/generated/**",
        ".github/workflows/**",
        "migrations/**",
      ],
    },
  };
}
