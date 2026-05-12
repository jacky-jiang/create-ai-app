import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import type { TemplateName } from "../types.js";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

export function resolveTemplatePath(templateName: TemplateName): string {
  const candidates = [
    path.resolve(currentDir, "templates", templateName, "template"),
    path.resolve(process.cwd(), "packages", "templates", templateName, "template"),
    path.resolve(currentDir, "..", "..", "..", "templates", templateName, "template"),
    path.resolve(currentDir, "..", "..", "..", "..", "templates", templateName, "template"),
    path.resolve(currentDir, "..", "..", "templates", templateName, "template"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(`Template not found: ${templateName}. Checked: ${candidates.join(", ")}`);
}
