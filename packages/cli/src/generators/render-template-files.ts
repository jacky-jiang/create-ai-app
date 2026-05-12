import path from "node:path";
import fs from "fs-extra";

interface RenderContext {
  projectName: string;
  template: string;
  framework: string;
  stateManager: string;
}

export async function renderTemplateFiles(targetDir: string, context: RenderContext): Promise<void> {
  await renderTplFilesRecursively(targetDir, context);
  await renameGitignore(targetDir);
}

async function renderTplFilesRecursively(dir: string, context: RenderContext): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await renderTplFilesRecursively(fullPath, context);
      continue;
    }

    if (entry.name.endsWith(".tpl")) {
      await renderTplFile(fullPath, context);
    }
  }
}

async function renderTplFile(filePath: string, context: RenderContext): Promise<void> {
  const raw = await fs.readFile(filePath, "utf8");
  const rendered = renderString(raw, context);
  const outputPath = filePath.replace(/\.tpl$/, "");

  await fs.writeFile(outputPath, rendered, "utf8");
  await fs.remove(filePath);
}

function renderString(raw: string, context: RenderContext): string {
  return raw.replace(/\{\{(\w+)\}\}/g, (_, key: keyof RenderContext) => {
    return String(context[key] ?? "");
  });
}

async function renameGitignore(targetDir: string): Promise<void> {
  const source = path.join(targetDir, "_gitignore");
  const dest = path.join(targetDir, ".gitignore");

  if (await fs.pathExists(source)) {
    await fs.move(source, dest, { overwrite: true });
  }
}
