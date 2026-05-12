import type { AiRuleSet } from "../types.js";

export function renderAiCodingGuidelines(rules: AiRuleSet): string {
  return `# AI Coding Guidelines

## 1. Goal

This document defines how AI coding tools should modify this project.

## 2. Architecture

The project uses layer-based architecture with feature modules.

Allowed dependency direction:

\`\`\`txt
${rules.architecture.dependencyDirection.join(" → ")}
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
