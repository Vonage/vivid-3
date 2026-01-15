# Documentation Guidelines

## Writing Style

- Use American English.
  - DO: "color"
  - DON'T: "colour"
- Use APA title case for headings and titles.
  - DO: "Getting Started With Vivid"
  - DON'T: "Getting started with Vivid"
- Refer to components in title case.
  - DO: "Searchable Select"
  - DON'T: "searchable select", "searchable-select"
- Refer to Vivid itself as "Vivid". If you need to refer to a specific version, use "Vivid 3.x.x".
  - DO: Vivid, Vivid 3.x.x
  - DON'T: VIVID, vivid, VIVID@3, vivid-3, Vivid 3
- Refer to other projects and tools by their official name.
  - DO: CSS, GitHub, npm
  - DON'T: css, github, NPM
- Use the second person (you) to address the reader.
  - DO: "You can use the `v-model` syntax to shorten this to:"
  - DON'T: "Authors can use the `v-model` syntax to shorten this to:"
- Prefer the active voice.
  - DO: "Refer to components in title case."
  - DON'T: "Components should be referred to in title case."

## Code Preview

All code examples should be provided for Vue Wrappers and Web Components. Use tabs to allow users to switch between the two.

Our documentation site supports special code blocks that will render a live preview of the code alongside the code snippet.

Start the code block with `html preview` for HTML (Web Components) preview or `vue preview` for Vue preview, and optionally append one of the style options below (for example, ```html preview blocks).

### Code Preview Style

```html preview blocks
<vwc-button label="Click Me"></vwc-button>
```

### Use One of These Options

Use one of these options to style the code preview:

- full
- blocks
- columns
- inline (default)
- center
