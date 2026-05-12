import { bold, cyan, green } from "kolorist";
import type { PackageManager } from "../types.js";

interface PrintSuccessMessageOptions {
  projectName: string;
  packageManager: PackageManager;
  install: boolean;
}

export function printSuccessMessage(options: PrintSuccessMessageOptions): void {
  const pm = options.packageManager;

  console.log();
  console.log(green("Project created successfully."));
  console.log();
  console.log(bold("Next steps:"));
  console.log();
  console.log(`  cd ${options.projectName}`);

  if (!options.install) {
    console.log(`  ${pm} install`);
  }

  console.log(`  ${pm} dev`);
  console.log();
  console.log(bold("Quality checks:"));
  console.log();
  console.log(`  ${cyan(`${pm} lint`)}`);
  console.log(`  ${cyan(`${pm} typecheck`)}`);
  console.log(`  ${cyan(`${pm} test`)}`);
  console.log(`  ${cyan(`${pm} build`)}`);
  console.log();
}
