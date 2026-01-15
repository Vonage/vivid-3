# Repository Structure

This is the repository of the Vivid Design System. It is a monorepo managed with pnpm and Turborepo.

The projects that we publish are:

- `apps/docs/`: Public documentation website for Vivid.
- `libs/components/`: Vivid component library, implemented as web components using the FAST library.
- `libs/vue-wrappers/`: Auto-generated Vue Wrapper library for the Vivid components.
- `libs/styles/`: Style sheets.
- `libs/eslint-plugin/`: ESLint plugin with Vivid-specific linting rules.
- `libs/test-utils/`: Auto-generated wrappers to simplify writing tests for projects using Vivid components.

Here is a list of instruction files that contain important information when working with the repository. Before reading or writing a file matching the pattern, you MUST read the corresponding instruction file.

| Instructions                 | Applies to                         |
| ---------------------------- | ---------------------------------- |
| `docs/components.md`         | `libs/components/**/*`             |
| `docs/component-docs.md`     | `libs/components/**/*.md`          |
| `docs/component-ui-tests.md` | `libs/components/**/ui.test.ts`    |
| `docs/component-template.md` | `libs/components/**/*.template.ts` |
| `docs/docs.md`               | `*.md`                             |

When reviewing component changes, you MUST use the `docs/component-checklist.md` instructions.

There are a few repo wide commands. You should prefer to run commands from specific projects when possible, since they will be much faster.

- `pnpm format`: Reformat all files.
- `pnpm lint`: Lint all projects.
- `pnpm typecheck`: Typecheck all projects.
- `pnpm test`: Run all unit tests with coverage.
