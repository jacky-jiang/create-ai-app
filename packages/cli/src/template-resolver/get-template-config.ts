import type { TemplateConfig, TemplateName } from "../types.js";

const TEMPLATE_CONFIGS: Record<TemplateName, TemplateConfig> = {
  "react-vite": {
    name: "react-vite",
    displayName: "React + Vite + TypeScript",
    framework: "react",
    stateManager: "zustand",
    dataFetching: "tanstack-query",
  },
  "vue-vite": {
    name: "vue-vite",
    displayName: "Vue + Vite + TypeScript",
    framework: "vue",
    stateManager: "pinia",
    dataFetching: "axios-only",
  },
};

export function getTemplateConfig(templateName: TemplateName): TemplateConfig {
  return TEMPLATE_CONFIGS[templateName];
}
