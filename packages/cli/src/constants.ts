import type { AiTool, PackageManager, TemplateName } from "./types.js";

export const SUPPORTED_TEMPLATES: TemplateName[] = ["react-vite", "vue-vite"];
export const SUPPORTED_PACKAGE_MANAGERS: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];
export const SUPPORTED_AI_TOOLS: AiTool[] = ["claude", "copilot", "codex", "agents"];
