import path from "node:path";
import { getTemplateConfig } from "../template-resolver/get-template-config.js";
import { resolveTemplatePath } from "../template-resolver/resolve-template-path.js";
import { copyTemplateDir } from "../utils/copy-dir.js";
import { generateAiFiles } from "./generate-ai-files.js";
import { generateWorkflowDocs } from "./generate-workflow-docs.js";
import { renderTemplateFiles } from "./render-template-files.js";
import type { CreateAppOptions } from "../types.js";

interface GenerateProjectOptions extends CreateAppOptions {
  targetDir: string;
}

export async function generateProject(options: GenerateProjectOptions): Promise<void> {
  const templateConfig = getTemplateConfig(options.template);
  const templatePath = resolveTemplatePath(options.template);

  await copyTemplateDir(templatePath, options.targetDir);

  await renderTemplateFiles(options.targetDir, {
    projectName: options.projectName,
    template: options.template,
    framework: templateConfig.framework,
    stateManager: templateConfig.stateManager,
  });

  await generateAiFiles(options.targetDir, {
    projectName: options.projectName,
    packageManager: options.packageManager,
    templateConfig,
    aiTools: options.aiTools,
  });

  await generateWorkflowDocs(path.join(options.targetDir, "docs", "workflows"));
}
