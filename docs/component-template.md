## Template Guide

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
- `meta` - for a slot bound to contain metadata.
- `footer` - for a slot bound to contain a footer or a summary.
- `action-items` - for action items that can be performed on the component.
- `main` - for main content of the component.
