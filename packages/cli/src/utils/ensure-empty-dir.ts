import fs from "fs-extra";

interface EnsureEmptyDirOptions {
  force: boolean;
}

export async function ensureEmptyDir(targetDir: string, options: EnsureEmptyDirOptions): Promise<void> {
  const exists = await fs.pathExists(targetDir);

  if (!exists) {
    await fs.ensureDir(targetDir);
    return;
  }

  const entries = await fs.readdir(targetDir);

  if (entries.length === 0) {
    return;
  }

  if (!options.force) {
    throw new Error(`Target directory is not empty: ${targetDir}. Use --force to overwrite.`);
  }

  await fs.emptyDir(targetDir);
}
