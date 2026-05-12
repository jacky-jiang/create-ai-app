export function renderChangePlan(): string {
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
