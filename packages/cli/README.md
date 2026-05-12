# create-ai-app

A frontend project scaffolding CLI designed for AI-assisted development.

`create-ai-app` helps you quickly create standardized React/Vue frontend projects with built-in architecture conventions, AI coding instructions, workflow documents, and engineering best practices.

It is especially useful when you work with multiple AI coding tools such as Claude Code, GitHub Copilot, Codex, or other agents, and want them to follow the same project structure and coding rules.

## Features

- Create frontend projects from preset templates
- Support React + Vite + TypeScript
- Support Vue + Vite + TypeScript
- Generate AI coding instruction files automatically
- Generate architecture and workflow documents
- Include standardized frontend project structure
- Include ESLint, Prettier, Vitest, and TypeScript configuration
- Include Tailwind CSS
- Include REST + Axios API layer
- React template includes Zustand and TanStack Query
- Vue template includes Pinia
- Designed for AI-assisted coding workflows

## Quick Start

Run with npx:

```bash
npx create-ai-app
```

Then follow the interactive prompts:

```bash
Project name
Template
Package manager
Install dependencies now?
Initialize git repository?
```

You can also create a project directly with command options:

```bash
npx create-ai-app my-app --template react-vite
```

## Available Templates

| Template     | Stack                                                                                |
| ------------ | ------------------------------------------------------------------------------------ |
| `react-vite` | React + Vite + TypeScript + Tailwind CSS + Axios + Zustand + TanStack Query + Vitest |
| `vue-vite`   | Vue 3 + Vite + TypeScript + Tailwind CSS + Axios + Pinia + Vitest                    |


## Example

```bash
npx create-ai-app my-app --template react-vite
cd my-app
pnpm install
pnpm dev
```

For Vue:

```bash
npx create-ai-app my-vue-app --template vue-vite
cd my-vue-app
pnpm install
pnpm dev
```

## Generated Project Structure

A generated React project roughly follows this structure:

```
my-app/
├── .github/
│   ├── copilot-instructions.md
│   └── pull_request_template.md
├── .claude/
│   └── settings.json
├── docs/
│   ├── ai-coding-guidelines.md
│   ├── architecture.md
│   ├── forbidden-files.md
│   └── workflows/
├── src/
│   ├── app/
│   ├── pages/
│   ├── features/
│   ├── shared/
│   ├── styles/
│   └── main.tsx
├── AGENTS.md
├── CLAUDE.md
├── package.json
├── tsconfig.json
├── eslint.config.js
├── prettier.config.js
├── tailwind.config.ts
└── vite.config.ts
```

## AI Coding Files

The generated project includes multiple AI instruction files:

| File                              | Purpose                                                           |
| --------------------------------- | ----------------------------------------------------------------- |
| `AGENTS.md`                       | General AI agent coding rules                                     |
| `CLAUDE.md`                       | Claude Code specific project instructions                         |
| `.github/copilot-instructions.md` | GitHub Copilot repository-level instructions                      |
| `docs/ai-coding-guidelines.md`    | Full human-readable and AI-readable coding guide                  |
| `docs/workflows/*`                | AI task workflow templates                                        |
| `docs/forbidden-files.md`         | Files that AI tools should not modify unless explicitly requested |

These files help different AI coding tools follow the same architecture, coding style, testing rules, and safety boundaries.

## Architecture Convention

Generated projects use a layer-based architecture with feature modules:

```
app → pages → features → shared
```

General rules:

* app contains application bootstrap, providers, and routes
* pages contains page-level composition
* features contains business feature modules
* shared contains reusable utilities, API clients, components, hooks, types, and helpers
* shared must not depend on features, pages, or app
* UI-only components should not call APIs directly
* Business logic should be placed in services and covered by tests

## React Template

The React template includes:

* React
* Vite
* TypeScript
* Tailwind CSS
* Axios
* Zustand
* TanStack Query
* Vitest
* ESLint
* Prettier

State management convention:

* Use local state for temporary UI state
* Use Zustand for cross-page client state
* Use TanStack Query for server state
* Do not store server cache in Zustand

## Vue Template

The Vue template includes:

Vue 3
Vite
TypeScript
Tailwind CSS
Axios
Pinia
Vitest
ESLint
Prettier

State management convention:

* Use `ref` / `reactive` for local component state
* Use Pinia for cross-page client state
* Use composables and Axios for API request logic

