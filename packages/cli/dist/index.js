#!/usr/bin/env node

// src/commands/create-command.ts
import { Command, InvalidArgumentError } from "commander";

// src/create-app.ts
import path6 from "path";
import process2 from "process";

// src/generators/generate-project.ts
import path5 from "path";

// src/template-resolver/get-template-config.ts
var TEMPLATE_CONFIGS = {
  "react-vite": {
    name: "react-vite",
    displayName: "React + Vite + TypeScript",
    framework: "react",
    stateManager: "zustand",
    dataFetching: "tanstack-query"
  },
  "vue-vite": {
    name: "vue-vite",
    displayName: "Vue + Vite + TypeScript",
    framework: "vue",
    stateManager: "pinia",
    dataFetching: "axios-only"
  }
};
function getTemplateConfig(templateName) {
  return TEMPLATE_CONFIGS[templateName];
}

// src/template-resolver/resolve-template-path.ts
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";
var currentFile = fileURLToPath(import.meta.url);
var currentDir = path.dirname(currentFile);
function resolveTemplatePath(templateName) {
  const candidates = [
    path.resolve(currentDir, "templates", templateName, "template"),
    path.resolve(process.cwd(), "packages", "templates", templateName, "template"),
    path.resolve(currentDir, "..", "..", "..", "templates", templateName, "template"),
    path.resolve(currentDir, "..", "..", "..", "..", "templates", templateName, "template"),
    path.resolve(currentDir, "..", "..", "templates", templateName, "template")
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(`Template not found: ${templateName}. Checked: ${candidates.join(", ")}`);
}

// src/utils/copy-dir.ts
import fs2 from "fs-extra";
async function copyTemplateDir(sourceDir, targetDir) {
  await fs2.copy(sourceDir, targetDir, {
    overwrite: true,
    errorOnExist: false
  });
}

// src/generators/generate-ai-files.ts
import path2 from "path";
import fs3 from "fs-extra";

// ../ai-rules/dist/index.js
function createReactViteRules(projectName, packageManager = "pnpm") {
  return {
    project: {
      projectName,
      framework: "react",
      packageManager
    },
    stack: {
      buildTool: "vite",
      language: "typescript",
      styling: "tailwind",
      httpClient: "axios",
      testing: "vitest",
      stateManager: "zustand",
      serverState: "tanstack-query"
    },
    architecture: {
      pattern: "layer-based-feature-modules",
      dependencyDirection: ["app", "pages", "features", "shared"],
      forbiddenDependencies: [
        "shared -> features",
        "shared -> pages",
        "shared -> app",
        "features -> pages",
        "features -> app",
        "pages -> app"
      ]
    },
    codeStyle: {
      useStrictTypeScript: true,
      preferNamedExports: true,
      maxFunctionLines: 50,
      followSolid: true,
      commentPolicy: "Comments should explain why, not repeat what the code does."
    },
    component: {
      separateContainerAndPresentation: true,
      uiComponentsCannotCallApi: true,
      propsMustBeTyped: true
    },
    state: {
      localStatePolicy: "Use useState for temporary UI state.",
      globalStatePolicy: "Use Zustand for cross-page client state.",
      serverStatePolicy: "Use TanStack Query for server data, cache, retries, and invalidation."
    },
    dataFetching: {
      transport: "axios",
      serverState: "tanstack-query",
      mustNormalizeErrors: true,
      mustHandleLoadingErrorEmptySuccess: true
    },
    errorHandling: {
      normalizeApiErrors: true,
      avoidRawBackendErrorsInUi: true,
      noConsoleLogInProduction: true
    },
    testing: {
      framework: "vitest",
      businessLogicRequiresTests: true,
      apiErrorRequiresTests: true,
      hooksOrComposablesRequireTests: true
    },
    git: {
      commitConvention: "conventional-commits",
      allowedTypes: ["feat", "fix", "refactor", "chore", "test", "docs", "style", "perf"]
    },
    security: {
      noSecretsExposure: true,
      avoidDangerousHtml: true,
      dependencyAuditRecommended: true
    },
    performance: {
      routeLazyLoading: true,
      avoidBlindMemoization: true,
      bundleSizeAwareness: true
    },
    forbiddenFiles: {
      files: [
        ".env",
        ".env.*",
        "secrets/**",
        "credentials/**",
        "pnpm-lock.yaml",
        "package-lock.json",
        "yarn.lock",
        "generated/**",
        "src/shared/api/generated/**",
        ".github/workflows/**",
        "migrations/**"
      ]
    }
  };
}
function createVueViteRules(projectName, packageManager = "pnpm") {
  const base = createReactViteRules(projectName, packageManager);
  return {
    ...base,
    project: {
      ...base.project,
      framework: "vue"
    },
    stack: {
      buildTool: "vite",
      language: "typescript",
      styling: "tailwind",
      httpClient: "axios",
      testing: "vitest",
      stateManager: "pinia"
    },
    state: {
      localStatePolicy: "Use ref or reactive for temporary component state.",
      globalStatePolicy: "Use Pinia for cross-page client state.",
      serverStatePolicy: "Use composables and Axios for request state in the MVP template."
    },
    dataFetching: {
      transport: "axios",
      mustNormalizeErrors: true,
      mustHandleLoadingErrorEmptySuccess: true
    }
  };
}
function renderAgentsMd(rules) {
  const serverStateLine = rules.stack.serverState ? `- Server state: ${rules.stack.serverState}` : "";
  return `# AGENTS.md

## Project Overview

This project is generated by create-ai-app.

- Project name: ${rules.project.projectName}
- Framework: ${rules.project.framework}
- Package manager: ${rules.project.packageManager}

## Setup Commands

- Install dependencies: \`${rules.project.packageManager} install\`
- Start dev server: \`${rules.project.packageManager} dev\`
- Run lint: \`${rules.project.packageManager} lint\`
- Run typecheck: \`${rules.project.packageManager} typecheck\`
- Run tests: \`${rules.project.packageManager} test\`
- Build: \`${rules.project.packageManager} build\`

## Tech Stack

- Build tool: ${rules.stack.buildTool}
- Language: ${rules.stack.language}
- Styling: ${rules.stack.styling}
- HTTP client: ${rules.stack.httpClient}
- State manager: ${rules.stack.stateManager}
- Testing: ${rules.stack.testing}
${serverStateLine}

## Architecture

Follow layer-based architecture.

Allowed dependency direction:

\`\`\`txt
${rules.architecture.dependencyDirection.join(" \u2192 ")}
\`\`\`

Forbidden dependencies:

${rules.architecture.forbiddenDependencies.map((item) => `- ${item}`).join("\n")}

## Code Style

- Use TypeScript strict mode.
- Prefer named exports.
- Keep functions under ${rules.codeStyle.maxFunctionLines} lines when practical.
- Follow SOLID principles.
- ${rules.codeStyle.commentPolicy}
- Prefer guard clauses over deeply nested conditionals.
- Do not add broad file header comments unless the file contains important architectural context.

## Component Rules

- Separate container and presentational components when data fetching or complex state is involved.
- UI-only components must not call APIs directly.
- Props must be explicit and typed.
- Extract reusable stateful logic into hooks or composables.

## State Management

- ${rules.state.localStatePolicy}
- ${rules.state.globalStatePolicy}
- ${rules.state.serverStatePolicy}
- Do not store server response caches in global client stores.

## Data Fetching

- Use Axios for HTTP transport.
- Normalize API errors in \`shared/api\`.
- Always handle loading, error, empty, and success states.
- Do not expose raw backend errors directly to users.

## Testing

- Business logic implemented as functions must have unit tests.
- API error normalization must have tests.
- Non-trivial hooks or composables should have tests.

## Security

- Do not expose secrets.
- Do not read or modify \`.env\` files unless explicitly requested.
- Sanitize user-generated HTML.
- Avoid dangerous HTML APIs unless explicitly justified.

## Performance

- Use lazy loading for route-level code splitting.
- Do not use memoization blindly.
- Explain performance optimizations when adding them.

## Git Commit Rules

Use Conventional Commit style:

${rules.git.allowedTypes.map((type) => `- ${type}:`).join("\n")}

## Forbidden Changes

Do not modify files listed in \`docs/forbidden-files.md\` unless explicitly requested.

## Validation

After code changes, run:

- \`${rules.project.packageManager} lint\`
- \`${rules.project.packageManager} typecheck\`
- \`${rules.project.packageManager} test\`
- \`${rules.project.packageManager} build\`
`;
}
function renderClaudeMd(rules) {
  return `# CLAUDE.md

## Working Agreement

Before making code changes:

1. Read relevant files first.
2. Explain the intended change briefly.
3. Avoid broad rewrites unless requested.
4. Preserve existing architecture boundaries.
5. Add tests for business logic.

## Project Context

- Framework: ${rules.project.framework}
- Package manager: ${rules.project.packageManager}
- State manager: ${rules.stack.stateManager}
- HTTP client: ${rules.stack.httpClient}
- Test runner: ${rules.stack.testing}

## Project Architecture

Allowed dependency direction:

\`\`\`txt
${rules.architecture.dependencyDirection.join(" \u2192 ")}
\`\`\`

Do not introduce reverse dependencies.

## Claude Code Behavior

- Prefer small, reviewable diffs.
- Do not reformat unrelated files.
- Do not change package dependencies without explicit approval.
- Do not modify lock files unless dependency changes are requested.
- Do not read or modify .env files.
- Do not introduce new architectural patterns without explaining the reason.
- Use docs/workflows/change-plan.md before substantial edits.

## Review Checklist

Before finishing, verify:

- TypeScript strict mode is respected.
- No forbidden files were modified.
- Tests were added for business logic.
- Loading, error, empty, and success states are handled.
- \`${rules.project.packageManager} lint\`, \`${rules.project.packageManager} typecheck\`, \`${rules.project.packageManager} test\`, and \`${rules.project.packageManager} build\` pass.
`;
}
function renderCopilotInstructions(rules) {
  const serverStateLine = rules.stack.serverState ? `- ${rules.stack.serverState}` : "";
  return `# GitHub Copilot Instructions

This project uses:

- ${rules.stack.buildTool}
- ${rules.stack.language}
- ${rules.stack.styling}
- ${rules.stack.httpClient}
- ${rules.stack.testing}
- ${rules.project.framework} + ${rules.stack.stateManager}
${serverStateLine}

Follow these rules:

- Use layer-based architecture.
- Respect dependency direction: ${rules.architecture.dependencyDirection.join(" \u2192 ")}.
- Put business logic inside \`features/*/services\`.
- Put reusable utilities inside \`shared\`.
- Do not call APIs directly from UI-only components.
- Use Axios for REST API calls.
- Normalize API errors.
- Add unit tests for business logic.
- Do not modify forbidden files listed in \`docs/forbidden-files.md\`.
- Use Conventional Commits for commit messages.
`;
}
function renderAiCodingGuidelines(rules) {
  return `# AI Coding Guidelines

## 1. Goal

This document defines how AI coding tools should modify this project.

## 2. Architecture

The project uses layer-based architecture with feature modules.

Allowed dependency direction:

\`\`\`txt
${rules.architecture.dependencyDirection.join(" \u2192 ")}
\`\`\`

Forbidden dependencies:

${rules.architecture.forbiddenDependencies.map((item) => `- ${item}`).join("\n")}

## 3. Directory Rules

- \`app\`: application bootstrap, providers, and routes.
- \`pages\`: page composition.
- \`features\`: business features.
- \`shared\`: reusable utilities and infrastructure.
- \`styles\`: global styles.

## 4. Component Design

- Use container components for data fetching and orchestration.
- Use presentational components for UI rendering.
- UI-only components must not call APIs directly.
- Props must be explicit and typed.

## 5. State Management

- ${rules.state.localStatePolicy}
- ${rules.state.globalStatePolicy}
- ${rules.state.serverStatePolicy}

## 6. API and Error Handling

- Use Axios for HTTP transport.
- Normalize errors in \`shared/api\`.
- Do not expose raw backend errors directly to users.
- Always handle loading, empty, success, and error states.

## 7. Testing Rules

- Business logic must have unit tests.
- API error normalization must have tests.
- Non-trivial hooks or composables should have tests.

## 8. Security Rules

- Do not expose secrets.
- Do not modify \`.env\` files unless explicitly requested.
- Sanitize user-generated HTML.
- Avoid dangerous HTML APIs unless justified.

## 9. Performance Rules

- Use route-level lazy loading.
- Do not add memoization without a clear reason.
- Consider bundle size impact when adding dependencies.

## 10. Git Commit Rules

Use Conventional Commits:

${rules.git.allowedTypes.map((type) => `- ${type}:`).join("\n")}

## 11. Forbidden Files

See \`docs/forbidden-files.md\`.

## 12. Anti-patterns

Avoid:

- API calls inside UI-only components.
- Server cache in global client stores.
- Large unrelated diffs.
- Reformatting unrelated files.
- Introducing new architecture patterns without explanation.
`;
}
function renderRequirementAnalysis() {
  return `# Requirement Analysis Template

## User Goal

## Business Context

## User Flow

## Input / Output

## Edge Cases

## Non-goals

## Acceptance Criteria
`;
}
function renderTechnicalDesign() {
  return `# Technical Design Template

## Goal

## Affected Modules

## Architecture Impact

## Data Flow

## API Design

## State Management

## Error Handling

## Testing Plan

## Risks
`;
}
function renderChangePlan() {
  return `# Code Change Plan Template

Before editing code, produce a short plan.

## Goal

## Files to Inspect

## Files Likely to Change

## Constraints

- Respect architecture dependency direction.
- Do not modify forbidden files.
- Add tests for business logic.

## Implementation Steps

1.
2.
3.

## Validation

- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm build
`;
}
function renderBugFix() {
  return `# Bug Fix Template

## Bug Summary

## Reproduction Steps

## Expected Behavior

## Actual Behavior

## Root Cause

## Fix Plan

## Regression Tests

## Validation
`;
}
function renderRefactor() {
  return `# Refactor Template

## Refactor Goal

## Current Problem

## Scope

## Non-goals

## Proposed Change

## Risk

## Test Coverage

## Validation
`;
}
function renderPrReviewChecklist() {
  return `# PR Review Checklist

## Architecture

- [ ] Dependency direction is respected.
- [ ] Business logic is not placed in UI-only components.

## Code Quality

- [ ] TypeScript types are explicit.
- [ ] No unrelated files are modified.
- [ ] No broad reformatting.

## Testing

- [ ] Business logic has tests.
- [ ] Error handling is tested.

## Security

- [ ] No secrets exposed.
- [ ] User input is handled safely.

## Performance

- [ ] No unnecessary memoization.
- [ ] Bundle impact is reasonable.
`;
}

// src/generators/generate-ai-files.ts
async function generateAiFiles(targetDir, options) {
  const rules = options.templateConfig.framework === "react" ? createReactViteRules(options.projectName, options.packageManager) : createVueViteRules(options.projectName, options.packageManager);
  if (options.aiTools.includes("agents") || options.aiTools.includes("codex")) {
    await fs3.writeFile(path2.join(targetDir, "AGENTS.md"), renderAgentsMd(rules), "utf8");
  }
  if (options.aiTools.includes("claude")) {
    await fs3.writeFile(path2.join(targetDir, "CLAUDE.md"), renderClaudeMd(rules), "utf8");
  }
  if (options.aiTools.includes("copilot")) {
    await fs3.ensureDir(path2.join(targetDir, ".github"));
    await fs3.writeFile(
      path2.join(targetDir, ".github", "copilot-instructions.md"),
      renderCopilotInstructions(rules),
      "utf8"
    );
  }
  await fs3.ensureDir(path2.join(targetDir, "docs"));
  await fs3.writeFile(path2.join(targetDir, "docs", "ai-coding-guidelines.md"), renderAiCodingGuidelines(rules), "utf8");
  await fs3.writeFile(path2.join(targetDir, "docs", "forbidden-files.md"), renderForbiddenFiles(rules.forbiddenFiles.files), "utf8");
  await generateClaudeSettings(targetDir);
}
function renderForbiddenFiles(files) {
  const fileList = files.map((file) => `- ${file}`).join("\n");
  return `# Forbidden Files

AI coding tools must not modify these files unless explicitly requested:

${fileList}
`;
}
async function generateClaudeSettings(targetDir) {
  const claudeDir = path2.join(targetDir, ".claude");
  await fs3.ensureDir(claudeDir);
  await fs3.writeJson(
    path2.join(claudeDir, "settings.json"),
    {
      permissions: {
        deny: ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)", "Read(./credentials/**)"]
      }
    },
    { spaces: 2 }
  );
}

// src/generators/generate-workflow-docs.ts
import path3 from "path";
import fs4 from "fs-extra";
async function generateWorkflowDocs(workflowDir) {
  await fs4.ensureDir(workflowDir);
  await Promise.all([
    fs4.writeFile(path3.join(workflowDir, "requirement-analysis.md"), renderRequirementAnalysis(), "utf8"),
    fs4.writeFile(path3.join(workflowDir, "technical-design.md"), renderTechnicalDesign(), "utf8"),
    fs4.writeFile(path3.join(workflowDir, "change-plan.md"), renderChangePlan(), "utf8"),
    fs4.writeFile(path3.join(workflowDir, "bug-fix.md"), renderBugFix(), "utf8"),
    fs4.writeFile(path3.join(workflowDir, "refactor.md"), renderRefactor(), "utf8"),
    fs4.writeFile(path3.join(workflowDir, "pr-review-checklist.md"), renderPrReviewChecklist(), "utf8")
  ]);
}

// src/generators/render-template-files.ts
import path4 from "path";
import fs5 from "fs-extra";
async function renderTemplateFiles(targetDir, context) {
  await renderTplFilesRecursively(targetDir, context);
  await renameGitignore(targetDir);
}
async function renderTplFilesRecursively(dir, context) {
  const entries = await fs5.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path4.join(dir, entry.name);
    if (entry.isDirectory()) {
      await renderTplFilesRecursively(fullPath, context);
      continue;
    }
    if (entry.name.endsWith(".tpl")) {
      await renderTplFile(fullPath, context);
    }
  }
}
async function renderTplFile(filePath, context) {
  const raw = await fs5.readFile(filePath, "utf8");
  const rendered = renderString(raw, context);
  const outputPath = filePath.replace(/\.tpl$/, "");
  await fs5.writeFile(outputPath, rendered, "utf8");
  await fs5.remove(filePath);
}
function renderString(raw, context) {
  return raw.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return String(context[key] ?? "");
  });
}
async function renameGitignore(targetDir) {
  const source = path4.join(targetDir, "_gitignore");
  const dest = path4.join(targetDir, ".gitignore");
  if (await fs5.pathExists(source)) {
    await fs5.move(source, dest, { overwrite: true });
  }
}

// src/generators/generate-project.ts
async function generateProject(options) {
  const templateConfig = getTemplateConfig(options.template);
  const templatePath = resolveTemplatePath(options.template);
  await copyTemplateDir(templatePath, options.targetDir);
  await renderTemplateFiles(options.targetDir, {
    projectName: options.projectName,
    template: options.template,
    framework: templateConfig.framework,
    stateManager: templateConfig.stateManager
  });
  await generateAiFiles(options.targetDir, {
    projectName: options.projectName,
    packageManager: options.packageManager,
    templateConfig,
    aiTools: options.aiTools
  });
  await generateWorkflowDocs(path5.join(options.targetDir, "docs", "workflows"));
}

// src/output/print-success-message.ts
import { bold, cyan, green } from "kolorist";
function printSuccessMessage(options) {
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

// src/utils/assert-valid-project-name.ts
import validatePackageName from "validate-npm-package-name";
function assertValidProjectName(projectName) {
  const result = validatePackageName(projectName);
  if (result.validForNewPackages) {
    return;
  }
  const errors = [...result.errors ?? [], ...result.warnings ?? []];
  throw new Error(`Invalid project name "${projectName}": ${errors.join(", ")}`);
}

// src/utils/ensure-empty-dir.ts
import fs6 from "fs-extra";
async function ensureEmptyDir(targetDir, options) {
  const exists = await fs6.pathExists(targetDir);
  if (!exists) {
    await fs6.ensureDir(targetDir);
    return;
  }
  const entries = await fs6.readdir(targetDir);
  if (entries.length === 0) {
    return;
  }
  if (!options.force) {
    throw new Error(`Target directory is not empty: ${targetDir}. Use --force to overwrite.`);
  }
  await fs6.emptyDir(targetDir);
}

// src/utils/run-command.ts
import { spawn } from "child_process";
function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32"
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

// src/utils/init-git.ts
async function initGit(targetDir) {
  try {
    await runCommand("git", ["init"], targetDir);
  } catch {
  }
}

// src/utils/install-dependencies.ts
async function installDependencies(targetDir, packageManager) {
  await runCommand(packageManager, ["install"], targetDir);
}

// src/create-app.ts
async function createApp(options) {
  assertValidProjectName(options.projectName);
  const targetDir = path6.resolve(process2.cwd(), options.projectName);
  await ensureEmptyDir(targetDir, {
    force: options.force
  });
  await generateProject({
    ...options,
    targetDir
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
    install: options.install
  });
}

// src/constants.ts
var SUPPORTED_TEMPLATES = ["react-vite", "vue-vite"];
var SUPPORTED_PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"];
var SUPPORTED_AI_TOOLS = ["claude", "copilot", "codex", "agents"];

// src/commands/create-command.ts
async function createCommand() {
  const program = new Command();
  program.name("create-ai-app").description("Create an AI coding friendly frontend project.").argument("<project-name>", "Project name").option("-t, --template <template>", "Project template: react-vite or vue-vite", parseTemplate, "react-vite").option("--package-manager <packageManager>", "Package manager: pnpm, npm, yarn, or bun", parsePackageManager, "pnpm").option("--ai <tools>", "AI tools: claude,copilot,codex,agents", parseAiTools, ["claude", "copilot", "codex", "agents"]).option("--install", "Install dependencies after project creation", false).option("--no-git", "Skip git initialization").option("--force", "Overwrite target directory if it exists", false).action(async (projectName, options) => {
    await createApp({
      projectName,
      template: options.template,
      packageManager: options.packageManager,
      aiTools: options.ai,
      install: Boolean(options.install),
      git: Boolean(options.git),
      force: Boolean(options.force)
    });
  });
  await program.parseAsync(process.argv);
}
function parseTemplate(value) {
  if (!SUPPORTED_TEMPLATES.includes(value)) {
    throw new InvalidArgumentError(`Unsupported template: ${value}`);
  }
  return value;
}
function parsePackageManager(value) {
  if (!SUPPORTED_PACKAGE_MANAGERS.includes(value)) {
    throw new InvalidArgumentError(`Unsupported package manager: ${value}`);
  }
  return value;
}
function parseAiTools(value) {
  const tools = value.split(",").map((item) => item.trim()).filter(Boolean);
  for (const tool of tools) {
    if (!SUPPORTED_AI_TOOLS.includes(tool)) {
      throw new InvalidArgumentError(`Unsupported AI tool: ${tool}`);
    }
  }
  return [...new Set(tools)];
}

// src/index.ts
await createCommand();
