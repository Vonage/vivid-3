# Catalog dependency upgrade analysis

Based on `pnpm outdated` and the catalog in `pnpm-workspace.yaml`. Use this to plan upgrades.

---

## 1. Upgrade without (or with minimal) changes

**Patch/minor within same major.** Safe to bump in catalog and run `pnpm install` + tests.

| Package                                     | Current (catalog) | Latest         | Notes                        |
| ------------------------------------------- | ----------------- | -------------- | ---------------------------- |
| `@11ty/eleventy-navigation`                 | ^1.0.4            | 1.0.5          | Patch                        |
| `@codemirror/lang-html`                     | ^6.4.11           | (within range) | —                            |
| `@codemirror/language`                      | ^6.11.3           | 6.12.2         | Minor                        |
| `@codemirror/state`                         | ^6.5.2            | 6.5.4          | Patch                        |
| `@codemirror/theme-one-dark`                | ^6.1.3            | (within range) | —                            |
| `@codemirror/view`                          | ^6.38.8           | 6.39.16        | Minor                        |
| `@floating-ui/dom`                          | ^1.6.13           | 1.7.6          | Minor (resolved 1.7.x)       |
| `@microsoft/api-extractor`                  | ^7.55.0           | 7.57.6         | Minor                        |
| `@microsoft/fast-element`                   | 2.8.3             | 2.10.1         | Pinned → ^2.10.1 (minor)     |
| `@microsoft/fast-foundation`                | ^2.50.0           | (within range) | —                            |
| `@microsoft/fast-web-utilities`             | ^6.0.0            | (within range) | —                            |
| `@playwright/test`                          | 1.57.0            | 1.58.2         | Minor (keep Playwright 1.x)  |
| `@pnpm/catalogs.config`                     | ^1000.0.5         | (check)        | —                            |
| `@pnpm/exportable-manifest`                 | ^1000.2.1         | 1000.4.1       | Minor                        |
| `@pnpm/read-project-manifest`               | ^1001.2.1         | 1001.2.5       | Patch                        |
| `@pnpm/workspace.read-manifest`             | ^1000.2.7         | 1000.2.10      | Patch                        |
| `@types/lodash`                             | ^4.17.20          | 4.17.24        | Patch                        |
| `dompurify`                                 | ^3.3.0            | 3.3.1          | Patch                        |
| `lodash`                                    | ^4.17.21          | 4.17.23        | Patch                        |
| `playwright`                                | 1.57.0            | 1.58.2         | Match @playwright/test       |
| `prosemirror-view`                          | ^1.40.1           | 1.41.6         | Minor (within 1.x)           |
| `prosemirror-transform`                     | ^1.10.5           | 1.11.0         | Minor                        |
| `sass`                                      | ^1.94.2           | 1.97.3         | Minor                        |
| `style-dictionary`                          | ^5.1.1            | 5.3.3          | Minor (already on v5)        |
| `stylelint-no-unsupported-browser-features` | ^8.0.5            | 8.1.1          | Minor                        |
| `tsx`                                       | ^4.20.6           | 4.21.0         | Minor                        |
| `turbo`                                     | ^2.6.1            | 2.8.13         | Minor (root; not in catalog) |
| `@turbo/gen`                                | ^2.6.1            | 2.8.13         | Minor                        |
| `video.js`                                  | ^8.23.4           | 8.23.7         | Patch                        |
| `vue` (catalog vue3)                        | ^3.5.24           | 3.5.29         | Patch                        |
| `dotenv`                                    | ^17.2.3           | 17.3.1         | Minor                        |

---

## 2. Requires some changes

**Minor or config/code tweaks.** Test after upgrading; may need small fixes or config updates.

| Package                      | Current   | Latest      | What to check                                                                                           |
| ---------------------------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `@11ty/eleventy-plugin-vite` | ^5.0.2    | **7.0.0**   | Major jump; Eleventy + Vite integration may have changed. Check 11ty and Vite docs.                     |
| `@microsoft/fast-element`    | 2.8.3     | 2.10.1      | FAST 2.10 changelog; template/API tweaks.                                                               |
| `@storybook/*` (stay on 7.x) | ^7.6.x    | 7.x latest  | Some packages show “Deprecated” for 8+/10+; stay on 7.x unless you migrate Storybook.                   |
| `@types/node`                | ^20.19.25 | 20.x latest | Prefer staying on `^20.x` to match Node 20; only move to 22/25 if you standardize on that Node version. |
| `markdown-it`                | ^13.0.2   | 14.x        | Major; plugin and API changes.                                                                          |
| `markdown-it-anchor`         | ^8.6.7    | 9.x         | Major; may need config/options update.                                                                  |
| `markdown-table`             | ^2.0.0    | 3.0.4       | Major; API may differ (package deprecated in favor of another).                                         |
| `nyc`                        | ^17.1.0   | 18.0.0      | Major; config and reporters may need a quick check.                                                     |

---

## 3. Breaking changes (major upgrades)

**Require migration, config, or ecosystem alignment.** Do one group at a time and run full test/lint/build.

### ESLint ecosystem (do together)

| Package                            | Current  | Latest   | Notes                         |
| ---------------------------------- | -------- | -------- | ----------------------------- |
| `eslint`                           | 8.57.1   | **10.x** | Flat config, rule renames.    |
| `@types/eslint`                    | ^8.56.12 | 9.x      | Match ESLint major.           |
| `@typescript-eslint/eslint-plugin` | 7.18.0   | **8.x**  | Must match ESLint and TS.     |
| `@typescript-eslint/parser`        | 7.18.0   | 8.x      | Same.                         |
| `@typescript-eslint/utils`         | 7.18.0   | 8.x      | Same.                         |
| `eslint-config-prettier`           | 9.1.2    | 10.x     | Compatibility with ESLint 10. |
| `eslint-plugin-ban`                | ^1.6.0   | 2.0.0    | Rule/options changes.         |
| `eslint-plugin-compat`             | ^4.2.0   | 7.x      | Major API/config.             |
| `eslint-plugin-unused-imports`     | ^3.2.0   | 4.x      | Config/rules.                 |
| `eslint-plugin-vue`                | ^9.33.0  | 10.x     | Vue 3 + new rules.            |

### Storybook (7 → 8 or 10)

| Package                         | Current | Latest     | Notes                                                 |
| ------------------------------- | ------- | ---------- | ----------------------------------------------------- |
| `@storybook/addon-essentials`   | ^7.6.20 | 8.6.14     | Storybook 8 migration.                                |
| `@storybook/addon-interactions` | ^7.6.20 | 8.6.14     | Same.                                                 |
| `@storybook/addon-links`        | ^7.6.20 | 10.2.14    | Version skew; align all to 8.x.                       |
| `@storybook/blocks`             | ^7.6.20 | 8.6.14     | Same.                                                 |
| `@storybook/builder-vite`       | ^7.6.20 | 10.2.14    | Align with framework (Vue).                           |
| `@storybook/manager-api`        | ^7.6.20 | 8.6.14     | Same.                                                 |
| `@storybook/vue3`               | ^7.6.20 | 10.2.14    | Vue 3 + Storybook 8/10.                               |
| `@storybook/vue3-vite`          | ^7.6.20 | 10.2.14    | Same.                                                 |
| `storybook`                     | ^7.6.20 | 8.x / 10.x | Bump with addons.                                     |
| `@storybook/vue`                | ^7.6.17 | Deprecated | Vue 2; replace or keep 7.x.                           |
| `@storybook/vue-vite`           | ^7.6.17 | Deprecated | Same.                                                 |
| `@storybook/testing-library`    | ^0.2.2  | Deprecated | Use Storybook 8+ testing or Testing Library directly. |

### Vitest 3 → 4

| Package               | Current | Latest | Notes               |
| --------------------- | ------- | ------ | ------------------- |
| `vitest`              | ^3.2.4  | 4.x    | Vitest 4 migration. |
| `@vitest/coverage-v8` | ^3.2.4  | 4.x    | Match Vitest.       |
| `@vitest/ui`          | ^3.2.4  | 4.x    | Same.               |

### Vite / Vue tooling

| Package              | Current | Latest  | Notes                                                                                                                 |
| -------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `@vitejs/plugin-vue` | ^5.2.4  | **7.x** | Vite 7 + Vue 3; check Vite 7 + plugin-vue changelog and Storybook builder-vite compatibility.                         |
| `vite`               | ^7.0.0  | 7.x     | Requires Node 20.19+ or 22.12+ (engines + CI). Verify Storybook Vite builder and Eleventy Vite plugin against Vite 7. |

### Testing / DOM

| Package                | Current | Latest   | Notes                                      |
| ---------------------- | ------- | -------- | ------------------------------------------ |
| `@testing-library/dom` | ^8.20.1 | **10.x** | API and async behavior.                    |
| `cypress`              | ^14.5.4 | 15.x     | Cypress 15 migration.                      |
| `jsdom`                | ^23.2.0 | **28.x** | Major; JSDOM and `@types/jsdom` alignment. |
| `@types/jsdom`         | ^21.1.7 | 28.x     | Use with jsdom 28.                         |

### Types (align with runtime)

| Package                 | Current   | Latest            | Notes                                                     |
| ----------------------- | --------- | ----------------- | --------------------------------------------------------- |
| `@types/node`           | ^20.19.25 | 25.x              | Only if you move to Node 22+.                             |
| `@types/react`          | ^18.3.27  | 19.x              | Only if you upgrade to React 19.                          |
| `@types/react-dom`      | ^18.3.7   | 19.x              | Same.                                                     |
| `@types/markdown-it`    | ^13.0.9   | 14.x              | With markdown-it 14.                                      |
| `@types/glob`           | ^8.1.0    | 9.x (deprecated)  | Prefer `@types/glob` 8 or types from `glob` if available. |
| `@types/markdown-table` | ^2.0.0    | 3.x (deprecated)  | With markdown-table 3 or drop if deprecated.              |
| `@types/uuid`           | ^10.0.0   | 11.x (deprecated) | uuid 11 has built-in types; may remove @types.            |

### Other majors

| Package                       | Current | Latest   | Notes                                   |
| ----------------------------- | ------- | -------- | --------------------------------------- |
| `@angular-eslint/utils`       | ^17.0.0 | 21.x     | Only if you use Angular; else can stay. |
| `date-fns`                    | ^3.0.0  | 4.x      | v4 breaking changes.                    |
| `element-internals-polyfill`  | ^1.3.13 | 3.0.2    | API/behavior changes.                   |
| `glob`                        | ^7.2.3  | **13.x** | ESM and API changes.                    |
| `htmx.org`                    | ^1.9.12 | 2.x      | htmx 2 migration.                       |
| `node-fetch`                  | ^2.7.0  | 3.x      | ESM-only; may break CJS usage.          |
| `prettier`                    | 2.8.8   | **3.x**  | Config/plugin compatibility.            |
| `prettier-plugin-packagejson` | ^2.5.19 | 3.x      | With Prettier 3.                        |

---

## 4. Deprecated or special

- **@storybook/testing-library** – Deprecated; use Storybook 8+ testing or `@testing-library/dom` directly.
- **@storybook/vue**, **@storybook/vue-vite** – Deprecated (Vue 2); stay on 7.x or migrate Vue 2 app.
- **@types/glob**, **@types/markdown-table**, **@types/uuid** – Marked deprecated; use latest within current major or switch to package’s own types.

---

## Suggested order of work

1. **Apply “Upgrade without changes”** – Bump those catalog versions, `pnpm install`, run tests and build.
2. **“Requires some changes”** – Upgrade one area (e.g. markdown-it + markdown-it-anchor + markdown-table), fix usages, then repeat.
3. **“Breaking changes”** – One ecosystem at a time, e.g. ESLint 10 + typescript-eslint 8, then Storybook 8, then Vitest 4, then Vite 6 + plugin-vue 6.

If you want, next step can be: (a) only applying the “upgrade without changes” bumps in `pnpm-workspace.yaml`, or (b) a concrete step-by-step plan for one breaking group (e.g. ESLint or Storybook).
