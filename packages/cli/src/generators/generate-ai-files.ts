import path from "node:path";
import fs from "fs-extra";
import {
  createReactViteRules,
  createVueViteRules,
  renderAgentsMd,
  renderAiCodingGuidelines,
  renderClaudeMd,
  renderCopilotInstructions,
} from "@create-ai-app/ai-rules";
import type { AiTool, TemplateConfig, PackageManager } from "../types.js";

interface GenerateAiFilesOptions {
  projectName: string;
  packageManager: PackageManager;
  templateConfig: TemplateConfig;
  aiTools: AiTool[];
}

export async function generateAiFiles(targetDir: string, options: GenerateAiFilesOptions): Promise<void> {
  const rules =
    options.templateConfig.framework === "react"
      ? createReactViteRules(options.projectName, options.packageManager)
      : createVueViteRules(options.projectName, options.packageManager);

  if (options.aiTools.includes("agents") || options.aiTools.includes("codex")) {
    await fs.writeFile(path.join(targetDir, "AGENTS.md"), renderAgentsMd(rules), "utf8");
  }

  if (options.aiTools.includes("claude")) {
    await fs.writeFile(path.join(targetDir, "CLAUDE.md"), renderClaudeMd(rules), "utf8");
  }

  if (options.aiTools.includes("copilot")) {
    await fs.ensureDir(path.join(targetDir, ".github"));
    await fs.writeFile(
      path.join(targetDir, ".github", "copilot-instructions.md"),
      renderCopilotInstructions(rules),
      "utf8",
    );
  }

  await fs.ensureDir(path.join(targetDir, "docs"));
  await fs.writeFile(path.join(targetDir, "docs", "ai-coding-guidelines.md"), renderAiCodingGuidelines(rules), "utf8");
  await fs.writeFile(path.join(targetDir, "docs", "forbidden-files.md"), renderForbiddenFiles(rules.forbiddenFiles.files), "utf8");
  await generateClaudeSettings(targetDir);
}

function renderForbiddenFiles(files: string[]): string {
  const fileList = files.map((file) => `- ${file}`).join("\n");

  return `# Forbidden Files

AI coding tools must not modify these files unless explicitly requested:

${fileList}
`;
}

async function generateClaudeSettings(targetDir: string): Promise<void> {
  const claudeDir = path.join(targetDir, ".claude");
  await fs.ensureDir(claudeDir);
  await fs.writeJson(
    path.join(claudeDir, "settings.json"),
    {
      permissions: {
        deny: ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)", "Read(./credentials/**)"],
      },
    },
    { spaces: 2 },
  );
}
