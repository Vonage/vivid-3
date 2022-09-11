# Vivid Conventions

Please read the following conventions guidelines before starting to work on a new component:

## Template Guide

Use the new component generator to create a new component, and it will also generate the proper documentation structure:
`npx nx g @vonage/nx-vivid:component`

## Components Terminology

### CSS Class Names

- Use `.base` for the first element in the component.
- Use `.control` for the main form control such as input, buttons etc.
- Use kebab case.
- Our template is encapsulated within the shadow DOM. There is no need to prefix class names. Instead of a class `card-header` just write `header`.

### Attribute Names

You should use kebab case for attribute names. Alternatively, you can use one of the following:

- `heading` - for the head or main ext with HTML heading tag
- `headline` - for the head or main text in the component.
- `sub-title` - for the sub text in the component.
- `text` - for the text in the component.
- `label` - for the label in the component.

### Slot Names

Use kebab case for slot names. Or use one of the following:

- `graphic` - for a slot bound to contain a decorative figure; such as a custom icon or image.
- `media` - for a slot bound to contain visual elements; such as an illustration, video etc.
- `meta` - for a slot bound to contain meta data.
- `footer` - for a slot bound to contain a footer or a summary.
- `action-items` - for action items that can be performed on the component.
- `main` - for main content of the component.

## Documentation Structure

The documentation file should have the following structure:

- `# Component Name` - name and description and code preview of the component.

- `## Members` - all the attributes and properties of the component with code previews for each.

- `## Slots` - all the slots of the component.

- `## CSS Variables` - all the CSS variables of the component.

- `## Events` - all the dispatched events of the component.

- `## Methods` - all the methods of the component.

- `## Accessibility` - explanation about aria attributes and roles.

- `## Use Cases` - User examples with more vivid components.

## Code Preview

### Code Preview Style

```html preview blocks
code snipet
```

### Use One of These Options

Use one of these options to style the code preview:

- full
- blocks
- columns
- inline (default)
- center
