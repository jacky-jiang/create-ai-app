import path from "node:path";
import process from "node:process";
import { generateProject } from "./generators/generate-project.js";
import { printSuccessMessage } from "./output/print-success-message.js";
import { assertValidProjectName } from "./utils/assert-valid-project-name.js";
import { ensureEmptyDir } from "./utils/ensure-empty-dir.js";
import { initGit } from "./utils/init-git.js";
import { installDependencies } from "./utils/install-dependencies.js";
import type { CreateAppOptions } from "./types.js";

export async function createApp(options: CreateAppOptions): Promise<void> {
  assertValidProjectName(options.projectName);

  const targetDir = path.resolve(process.cwd(), options.projectName);

  await ensureEmptyDir(targetDir, {
    force: options.force,
  });

  await generateProject({
    ...options,
    targetDir,
  });

  if (options.git) {
    await initGit(targetDir);
  }

  if (options.install) {
    await installDependencies(targetDir, options.packageManager);
  }

  printSuccessMessage({
    projectName: options.projectName,
    packageManager: options.packageManager,
    install: options.install,
  });
}
