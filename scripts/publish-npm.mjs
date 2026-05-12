#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const cliDir = path.join(rootDir, "packages", "cli");
const cliPackageJsonPath = path.join(cliDir, "package.json");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const skipBuild = args.includes("--skip-build");
const publishArgs = args.filter((arg) => arg !== "--dry-run" && arg !== "--skip-build");

if (!fs.existsSync(cliPackageJsonPath)) {
  fail("Cannot find packages/cli/package.json. Please run this command from the repository root.");
}

const originalPackageJsonText = fs.readFileSync(cliPackageJsonPath, "utf8");
const cliPackageJson = JSON.parse(originalPackageJsonText);

console.log(`Preparing ${cliPackageJson.name}@${cliPackageJson.version} for npm ${dryRun ? "dry run" : "publish"}...`);

try {
  if (!skipBuild) {
    run("pnpm", ["--filter", "@create-ai-app/ai-rules", "build"], rootDir);
    run("pnpm", ["--filter", "create-ai-app", "build"], rootDir);
  }

  assertFile(path.join(cliDir, "dist", "index.js"), "Missing dist/index.js. Build the CLI before publishing.");
  assertDir(path.join(cliDir, "dist", "templates"), "Missing dist/templates. The published CLI package must include project templates.");
  assertSingleShebang(path.join(cliDir, "dist", "index.js"));

  sanitizePackageJsonForPublish(cliPackageJsonPath, cliPackageJson);

  console.log("Running npm publish dry run to verify package contents...");
  run("npm", ["publish", "--dry-run", "--access", "public"], cliDir);

  if (dryRun) {
    console.log("Dry run completed. No package was published.");
    process.exitCode = 0;
  } else {
    console.log("Checking npm authentication...");
    run("npm", ["whoami"], cliDir);

    const finalArgs = ["publish", "--access", "public", ...publishArgs];
    console.log(`Publishing with: npm ${finalArgs.join(" ")}`);
    run("npm", finalArgs, cliDir);

    console.log(`Published ${cliPackageJson.name}@${cliPackageJson.version}.`);
    console.log(`Test with: npx ${cliPackageJson.name}`);
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`\nPublish failed: ${message}`);
  process.exitCode = 1;
} finally {
  fs.writeFileSync(cliPackageJsonPath, originalPackageJsonText);
}

function sanitizePackageJsonForPublish(packageJsonPath, packageJson) {
  const sanitized = structuredClone(packageJson);

  for (const section of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
    if (!sanitized[section]) {
      continue;
    }

    for (const [name, version] of Object.entries(sanitized[section])) {
      if (typeof version === "string" && version.startsWith("workspace:")) {
        delete sanitized[section][name];
      }
    }

    if (Object.keys(sanitized[section]).length === 0) {
      delete sanitized[section];
    }
  }

  fs.writeFileSync(packageJsonPath, `${JSON.stringify(sanitized, null, 2)}\n`);
}

function run(command, commandArgs, cwd) {
  const result = spawnSync(command, commandArgs, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.error) {
    fail(result.error.message);
  }

  if (result.status !== 0) {
    fail(`Command failed: ${command} ${commandArgs.join(" ")}`);
  }
}

function assertFile(filePath, message) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    fail(message);
  }
}

function assertDir(dirPath, message) {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    fail(message);
  }
}

function assertSingleShebang(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const matches = content.match(/^#!\/usr\/bin\/env node/gm) ?? [];

  if (matches.length !== 1) {
    fail(`Expected exactly one shebang in ${filePath}, found ${matches.length}.`);
  }
}

function fail(message) {
  throw new Error(message);
}
