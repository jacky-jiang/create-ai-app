import { runCommand } from "./run-command.js";

export async function initGit(targetDir: string): Promise<void> {
  try {
    await runCommand("git", ["init"], targetDir);
  } catch {
    // Git is optional. Project generation should not fail if git is unavailable.
  }
}
