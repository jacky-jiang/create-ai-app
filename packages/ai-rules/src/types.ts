export type Framework = "react" | "vue";
export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export interface AiRuleSet {
  project: ProjectContext;
  stack: StackRules;
  architecture: ArchitectureRules;
  codeStyle: CodeStyleRules;
  component: ComponentRules;
  state: StateRules;
  dataFetching: DataFetchingRules;
  errorHandling: ErrorHandlingRules;
  testing: TestingRules;
  git: GitRules;
  security: SecurityRules;
  performance: PerformanceRules;
  forbiddenFiles: ForbiddenFileRules;
}

export interface ProjectContext {
  projectName: string;
  framework: Framework;
  packageManager: PackageManager;
}

export interface StackRules {
  buildTool: "vite";
  language: "typescript";
  styling: "tailwind";
  httpClient: "axios";
  testing: "vitest";
  stateManager: "zustand" | "pinia";
  serverState?: "tanstack-query";
}

export interface ArchitectureRules {
  pattern: "layer-based-feature-modules";
  dependencyDirection: string[];
  forbiddenDependencies: string[];
}

export interface CodeStyleRules {
  useStrictTypeScript: boolean;
  preferNamedExports: boolean;
  maxFunctionLines: number;
  followSolid: boolean;
  commentPolicy: string;
}

export interface ComponentRules {
  separateContainerAndPresentation: boolean;
  uiComponentsCannotCallApi: boolean;
  propsMustBeTyped: boolean;
}

export interface StateRules {
  localStatePolicy: string;
  globalStatePolicy: string;
  serverStatePolicy: string;
}

export interface DataFetchingRules {
  transport: "axios";
  serverState?: "tanstack-query";
  mustNormalizeErrors: boolean;
  mustHandleLoadingErrorEmptySuccess: boolean;
}

export interface ErrorHandlingRules {
  normalizeApiErrors: boolean;
  avoidRawBackendErrorsInUi: boolean;
  noConsoleLogInProduction: boolean;
}

export interface TestingRules {
  framework: "vitest";
  businessLogicRequiresTests: boolean;
  apiErrorRequiresTests: boolean;
  hooksOrComposablesRequireTests: boolean;
}

export interface GitRules {
  commitConvention: "conventional-commits";
  allowedTypes: string[];
}

export interface SecurityRules {
  noSecretsExposure: boolean;
  avoidDangerousHtml: boolean;
  dependencyAuditRecommended: boolean;
}

export interface PerformanceRules {
  routeLazyLoading: boolean;
  avoidBlindMemoization: boolean;
  bundleSizeAwareness: boolean;
}

export interface ForbiddenFileRules {
  files: string[];
}
