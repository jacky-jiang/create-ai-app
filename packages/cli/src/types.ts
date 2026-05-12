export type TemplateName = "react-vite" | "vue-vite";
export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";
export type AiTool = "claude" | "copilot" | "codex" | "agents";

export interface CreateAppOptions {
  projectName: string;
  template: TemplateName;
  packageManager: PackageManager;
  aiTools: AiTool[];
  install: boolean;
  git: boolean;
  force: boolean;
}

export interface TemplateConfig {
  name: TemplateName;
  displayName: string;
  framework: "react" | "vue";
  stateManager: "zustand" | "pinia";
  dataFetching: "tanstack-query" | "axios-only";
}
