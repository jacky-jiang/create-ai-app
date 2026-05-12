import { runCommand } from "./run-command.js";
import type { PackageManager } from "../types.js";

export async function installDependencies(targetDir: string, packageManager: PackageManager): Promise<void> {
  await runCommand(packageManager, ["install"], targetDir);
}
