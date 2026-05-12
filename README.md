# create-ai-app

`create-ai-app` is an AI-coding-friendly frontend scaffolding system. It creates Vite-based React or Vue projects and generates consistent instruction files for multiple AI coding tools.

## Goals

- Create standardized frontend projects quickly.
- Keep Claude Code, GitHub Copilot, Codex, and generic coding agents aligned with the same project rules.
- Encode architecture, testing, security, and workflow rules as generated project artifacts.

## Supported MVP Templates

- `react-vite`: React + Vite + TypeScript + Tailwind + Axios + Zustand + TanStack Query + Vitest
- `vue-vite`: Vue 3 + Vite + TypeScript + Tailwind + Axios + Pinia + Vitest

## Local Development

```bash
pnpm install
pnpm build
pnpm --filter create-ai-app dev my-app --template react-vite --force
```

## Example Usage After Publishing

```bash
npx create-ai-app my-app --template react-vite
pnpm create ai-app my-app --template vue-vite
```

## Generated AI Files

- `AGENTS.md`
- `CLAUDE.md`
- `.github/copilot-instructions.md`
- `docs/ai-coding-guidelines.md`
- `docs/forbidden-files.md`
- `docs/workflows/*`

## Project Structure

```txt
packages/
  cli/        CLI implementation
  ai-rules/   Rule presets and renderers
  templates/  React and Vue project templates
```

## Validation

After generating a project, run:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## License

MIT
