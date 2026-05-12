# Architecture

The repository is a pnpm workspace with three packages:

- `packages/cli`: command-line project generator.
- `packages/ai-rules`: unified AI rule model and Markdown renderers.
- `packages/templates`: framework-specific templates.

Generated applications follow this dependency direction:

```txt
app → pages → features → shared
```

Reverse dependencies are forbidden.
