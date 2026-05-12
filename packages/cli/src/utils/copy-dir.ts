import fs from "fs-extra";

export async function copyTemplateDir(sourceDir: string, targetDir: string): Promise<void> {
  await fs.copy(sourceDir, targetDir, {
    overwrite: true,
    errorOnExist: false,
  });
}
