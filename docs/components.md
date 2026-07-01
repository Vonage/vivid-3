# Web Components Library

## Component Structure

Components are implemented as web components using the Microsoft FAST library.

Each component is implemented in its own directory under the `libs/components/src/lib/<component-name>` directory. The component's directory contains:

- `<component-name>.ts`: The main component file, containing the component class and its logic.
- `<component-name>.template.ts`: The HTML template is moved to its own file.
- `<component-name>.scss`
- `<component-name>.spec.ts`: Unit tests using Vitest.
- `<component-name>.a11y.spec.ts`: Accessibility tests using Axe with Vitest.
- `variations.browser-spec.tsx`: Visual variation tests using Vitest browser mode with playwright driver.
- `VARIATIONS.md`: Documents visual variations.
- `GUIDELINES.md`: Design guidelines.
- `README.md`: Developer Reference.
- `USE-CASES.md`: Showcase common use cases.
- `ACCESSIBILITY.md`: Accessibility guidelines.

To run unit tests for a specific component: `pnpm --filter ./libs/components exec vitest --run src/lib/<component name>`
To run the visual snapshots for a specific component: `pnpm turbo @vonage/vivid#test:browser:docker -- <component name>`
