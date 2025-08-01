# Vivid Test Utils

A library to make it easier to interact with Vivid components in unit tests.

## Testing Frameworks

This library supports the following testing frameworks:

- DOM: Can be used with Vue Test Utils or React Testing Library
- Playwright
- Cypress

## Operations

- Selectors: Finding components, e.g. a Dialog by its headline.
- Actions: Simulate user interactions with components, e.g. clicking buttons, typing in inputs, selecting options, etc.
- Queries: Allows asserting the state of components, e.g. checking if a Dialog is open, if a Checkbox is checked, etc.
- Refs: Provides a way to access nested components and elements.

## Implementation Details

The operations for each component are defined on the components themselves, using JSDoc comments.

Example:

```js
/**
 * @testSelector byLabel byLabel
 * @testAction click click control
 * @testQuery checked checked
 * @testRef control shadow .control
 */
```

The first argument is the name of the operation in the library, the second argument is the name of the implementation.

Implementations are defined in the `selectors.ts`, `actions.ts`, `queries.ts`, and `refs.ts` files.

Arbitrary additional arguments can be passed to operation implementation.
