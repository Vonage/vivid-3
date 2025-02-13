# Tokens

Vivid (design) tokens are a set of variables that define the design identities in our system, it is a prime dependency of the _components_ and _styles_ packages and is used to create a consistent look and feel across all platforms and products. Tokens are mostly used to define colors, spacing, typography, and other design decisions.

Based on the content of this package, and the content maintained in figma by design authors, SCSS/CSS values are dynamically created at build time, injected into the _components_ and _styles_ packages and apply styles to an application integrating Vivid components at run-time.

This package features a blueprint practice where an interface-like file is used to define the tokens. This file is then used to refer to as the _model_ which figma content should match to. Failure of figma content to comply to the blueprint requirements will result in a build error.

## Running unit tests

Run `npx nx run tokens:test` to execute the unit tests via [Vitest](https://vitest.dev).

## Generate tokens

Run `npx nx run tokens:build` to generate the tokens via [Style Dictionary](https://amzn.github.io/style-dictionary).
This will output the tokens in the `dist/libs/tokens` folder.

- `dist/libs/tokens/scss/themes/_constants.scss` - SCSS constants representing the available tokens. Using constants, for components to reference, is a good practice to avoid magic strings (hardcoding values), preventing typos and other errors

- `dist/libs/tokens/scss/theme/_{light/dark}.mixin.scss` - SCSS mixin containing theme CSS variables. This is used to inject the tokens into the _styles_ package for authors to use in their applications.
