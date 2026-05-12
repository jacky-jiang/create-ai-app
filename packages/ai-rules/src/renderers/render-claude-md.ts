import type { AiRuleSet } from "../types.js";

export function renderClaudeMd(rules: AiRuleSet): string {
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
${rules.architecture.dependencyDirection.join(" → ")}
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
