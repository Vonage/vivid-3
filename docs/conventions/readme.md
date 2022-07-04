# Vivid Conventions

Please read the following conventions guidelines before starting to work on a new component:

## Template Guide

Use the new component generator to create a new component, and it will also generate the proper documentation structure:
`npx run nx g @vonage/nx-vivid:component my-component`

## Components Terminology

### CSS Class Names

- Use `.base` for the first element in the component.
- Use `.control` for the main form control such as input, buttons etc.
- Use kebab case.
- Our template is encapsulated, no need for the component name in the nested elements class-name (like `card-header`).

### Attribute Names

You should use kebab case for attribute names. Alternatively, you can use one of the following:

- `heading` - for the head or main text in the component.
- `sub-heading` - for the sub text in the component.
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

## Documentation style (Code-Preview style)

### Code preview options

```html preview blocks
code snipet
```

### Use one of these options

Use one of these options to style the code preview:

- full
- blocks
- columns
- inline (default)
- center
