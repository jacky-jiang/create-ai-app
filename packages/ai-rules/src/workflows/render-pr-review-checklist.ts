export function renderPrReviewChecklist(): string {
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
