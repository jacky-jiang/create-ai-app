type Framework = "react" | "vue";
type PackageManager = "pnpm" | "npm" | "yarn" | "bun";
interface AiRuleSet {
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
interface ProjectContext {
    projectName: string;
    framework: Framework;
    packageManager: PackageManager;
}
interface StackRules {
    buildTool: "vite";
    language: "typescript";
    styling: "tailwind";
    httpClient: "axios";
    testing: "vitest";
    stateManager: "zustand" | "pinia";
    serverState?: "tanstack-query";
}
interface ArchitectureRules {
    pattern: "layer-based-feature-modules";
    dependencyDirection: string[];
    forbiddenDependencies: string[];
}
interface CodeStyleRules {
    useStrictTypeScript: boolean;
    preferNamedExports: boolean;
    maxFunctionLines: number;
    followSolid: boolean;
    commentPolicy: string;
}
interface ComponentRules {
    separateContainerAndPresentation: boolean;
    uiComponentsCannotCallApi: boolean;
    propsMustBeTyped: boolean;
}
interface StateRules {
    localStatePolicy: string;
    globalStatePolicy: string;
    serverStatePolicy: string;
}
interface DataFetchingRules {
    transport: "axios";
    serverState?: "tanstack-query";
    mustNormalizeErrors: boolean;
    mustHandleLoadingErrorEmptySuccess: boolean;
}
interface ErrorHandlingRules {
    normalizeApiErrors: boolean;
    avoidRawBackendErrorsInUi: boolean;
    noConsoleLogInProduction: boolean;
}
interface TestingRules {
    framework: "vitest";
    businessLogicRequiresTests: boolean;
    apiErrorRequiresTests: boolean;
    hooksOrComposablesRequireTests: boolean;
}
interface GitRules {
    commitConvention: "conventional-commits";
    allowedTypes: string[];
}
interface SecurityRules {
    noSecretsExposure: boolean;
    avoidDangerousHtml: boolean;
    dependencyAuditRecommended: boolean;
}
interface PerformanceRules {
    routeLazyLoading: boolean;
    avoidBlindMemoization: boolean;
    bundleSizeAwareness: boolean;
}
interface ForbiddenFileRules {
    files: string[];
}

declare function createReactViteRules(projectName: string, packageManager?: PackageManager): AiRuleSet;

declare function createVueViteRules(projectName: string, packageManager?: PackageManager): AiRuleSet;

declare function renderAgentsMd(rules: AiRuleSet): string;

declare function renderClaudeMd(rules: AiRuleSet): string;

declare function renderCopilotInstructions(rules: AiRuleSet): string;

declare function renderAiCodingGuidelines(rules: AiRuleSet): string;

declare function renderRequirementAnalysis(): string;

declare function renderTechnicalDesign(): string;

declare function renderChangePlan(): string;

declare function renderBugFix(): string;

declare function renderRefactor(): string;

declare function renderPrReviewChecklist(): string;

export { type AiRuleSet, type ArchitectureRules, type CodeStyleRules, type ComponentRules, type DataFetchingRules, type ErrorHandlingRules, type ForbiddenFileRules, type Framework, type GitRules, type PackageManager, type PerformanceRules, type ProjectContext, type SecurityRules, type StackRules, type StateRules, type TestingRules, createReactViteRules, createVueViteRules, renderAgentsMd, renderAiCodingGuidelines, renderBugFix, renderChangePlan, renderClaudeMd, renderCopilotInstructions, renderPrReviewChecklist, renderRefactor, renderRequirementAnalysis, renderTechnicalDesign };
