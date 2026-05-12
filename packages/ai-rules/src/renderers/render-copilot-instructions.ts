import type { AiRuleSet } from "../types.js";

export function renderCopilotInstructions(rules: AiRuleSet): string {
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
- Respect dependency direction: ${rules.architecture.dependencyDirection.join(" → ")}.
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
