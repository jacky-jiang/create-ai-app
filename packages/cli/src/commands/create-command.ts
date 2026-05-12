import { Command, InvalidArgumentError } from "commander";
import { createApp } from "../create-app.js";
import { SUPPORTED_AI_TOOLS, SUPPORTED_PACKAGE_MANAGERS, SUPPORTED_TEMPLATES } from "../constants.js";
import type { AiTool, PackageManager, TemplateName } from "../types.js";

export async function createCommand(): Promise<void> {
  const program = new Command();

  program
    .name("create-ai-app")
    .description("Create an AI coding friendly frontend project.")
    .argument("<project-name>", "Project name")
    .option("-t, --template <template>", "Project template: react-vite or vue-vite", parseTemplate, "react-vite")
    .option("--package-manager <packageManager>", "Package manager: pnpm, npm, yarn, or bun", parsePackageManager, "pnpm")
    .option("--ai <tools>", "AI tools: claude,copilot,codex,agents", parseAiTools, ["claude", "copilot", "codex", "agents"])
    .option("--install", "Install dependencies after project creation", false)
    .option("--no-git", "Skip git initialization")
    .option("--force", "Overwrite target directory if it exists", false)
    .action(async (projectName: string, options: Record<string, unknown>) => {
      await createApp({
        projectName,
        template: options.template as TemplateName,
        packageManager: options.packageManager as PackageManager,
        aiTools: options.ai as AiTool[],
        install: Boolean(options.install),
        git: Boolean(options.git),
        force: Boolean(options.force),
      });
    });

  await program.parseAsync(process.argv);
}

function parseTemplate(value: string): TemplateName {
  if (!SUPPORTED_TEMPLATES.includes(value as TemplateName)) {
    throw new InvalidArgumentError(`Unsupported template: ${value}`);
  }
  return value as TemplateName;
}

function parsePackageManager(value: string): PackageManager {
  if (!SUPPORTED_PACKAGE_MANAGERS.includes(value as PackageManager)) {
    throw new InvalidArgumentError(`Unsupported package manager: ${value}`);
  }
  return value as PackageManager;
}

function parseAiTools(value: string): AiTool[] {
  const tools = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean) as AiTool[];

  for (const tool of tools) {
    if (!SUPPORTED_AI_TOOLS.includes(tool)) {
      throw new InvalidArgumentError(`Unsupported AI tool: ${tool}`);
    }
  }

  return [...new Set(tools)];
}
