import validatePackageName from "validate-npm-package-name";

export function assertValidProjectName(projectName: string): void {
  const result = validatePackageName(projectName);

  if (result.validForNewPackages) {
    return;
  }

  const errors = [...(result.errors ?? []), ...(result.warnings ?? [])];
  throw new Error(`Invalid project name "${projectName}": ${errors.join(", ")}`);
}
