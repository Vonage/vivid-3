# Vivid Studio

A browser-based UI prototyping playground for the [Vivid design system](../../libs/components).

## Run it

From the repo root:

```sh
pnpm studio
```

Turbo builds `@vonage/vivid` and `@repo/styles` first, then serves the studio at <http://localhost:5199>.

To enable AI generation, provide an Anthropic API key. The easiest way is a
one-time setup — copy the example env file and paste your key in:

```sh
cp apps/studio/.env.example apps/studio/.env.local
# edit apps/studio/.env.local and set ANTHROPIC_API_KEY=sk-ant-…
pnpm studio
```

`.env.local` is gitignored, so the key never leaves your machine. Setting
`ANTHROPIC_API_KEY` in your shell environment also works and takes precedence:

```sh
ANTHROPIC_API_KEY=sk-ant-… pnpm studio
```

## What you get

- **Landing screen** — press **Enter Studio** and you're in. No auth; your work is saved to `localStorage`.
- **AI generation** — describe the UI you want ("Build me an application settings page") in the prompt bar under the editor and Claude (`claude-opus-4-8`) generates it from real Vivid components. Follow-up prompts refine the current design; the conversation is saved per project, and manual code edits are folded into the next refinement. The key stays server-side — a Vite middleware proxies to the Claude API ([src/server/ai-plugin.ts](src/server/ai-plugin.ts)), with the component reference cached via prompt caching. Override the model with `VIVID_STUDIO_AI_MODEL`.
- **Component palette** — all 85 Vivid components, generated from the real `libs/components/metadata.json`, grouped by category and searchable. Click to insert at the cursor, or drag straight into the editor.
- **Editor** — CodeMirror 6 with HTML highlighting.
- **Live preview** — renders in an isolated iframe with every Vivid component registered. Debounced updates, no page reloads. `<script>` tags in your prototype are executed, so interactions work.
- **Theme & devices** — flip the preview between Vivid light/dark themes and desktop/tablet/mobile frames.
- **Templates** — blank canvas, login page, dashboard, settings, contact form.
- **Projects** — multiple prototypes, autosaved, reopenable from the landing screen or the Open menu.
- **Export** — one click downloads a standalone `.html` that loads Vivid from unpkg using the officially documented CDN paths. Open it anywhere.

## Architecture

| Piece   | Choice                                                           | Why                                     |
| ------- | ---------------------------------------------------------------- | --------------------------------------- |
| Build   | Vite multi-page (`index.html` + `preview.html`)                  | already the repo standard               |
| UI      | Vanilla TS + Vivid web components                                | the studio chrome dogfoods Vivid itself |
| Editor  | CodeMirror 6                                                     | already in the repo dependency catalog  |
| Preview | iframe + `postMessage`                                           | style/registry isolation from the shell |
| Palette | `virtual:vivid-metadata` alias → `libs/components/metadata.json` | stays in sync with the source of truth  |
