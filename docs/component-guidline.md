# Documentation Conventions

For better and unify components documentation

## Template Guide

Use the new component generator to create a new component:  
`npm run nx g @vonage/nx-vivid:component my-component`

### CSS Class Names

- Use `.base` for the first element in the component.
- Use `.control` for the main form control such as input, buttons etc.'.
- Use kebab case.
- Our template is encapsulated, no need for the component name in the nested elements class-name (like `card-header`).

## Property Names

- `heading` for the head or main text in the component.
- `sub-heading`
- `text`
- `label`

### Slot Names

Use kebab case for slots name.

- `graphic` - for slots that are recommended for decorative element such as custom icon or image
- `media` - for slot that are recommended to contain either images or video.
- `meta`
- `footer / actions`
- `action-ites / action-items` - ?
- `content`
- `App-content` - Maybe change it to `app-main` for slots in components that categorized as templating components (such as side-drawer, top-app-bar).

<hr>

## Documentation

### Structure

```
# Component Name
One summary line

- Code import sample
- Code example preview 

## properties

### member 1
lorem ipsum

### member 2
lorem ipsum

## slots

### slot 1
lorem ipsum

## CSS variables

## Accessibility

## Use Cases
### Events - ? (found in banner)
### Methods - ? (found in Accordion)
```

## Common repeating description

### icon

Icon's description should follow text / label description, of which it decorates.

#### Common version

Text can be decorated by an icon of choice. Use the `icon` member to set the icon's type.

###### View [list of available icons](https://icons.vivid.vonage.com)

#### short version (when there's only icon)

Use the `icon` member to set the icon type.

###### View [list of available icons](https://icons.vivid.vonage.com)

### Icon Trailing

Toggle `icon-trailing` member to set the icon’s placement at the beginning or end.

For each member need to specify (if there are):

- Type: `'member one'` | `'member two'` ...
- Default: `'default member'`

### Appearance

Use the `appearance` member to set the component's [appearance model](link to appearance guidelines).

### Connotation

Use the `connotation` member to set the component's [connotation color](link to connotation guidelines).

### Density

Use the `density` member to set the component's [block size extent](link to density and baseline block size guidelines).

### Shape

Use the `shape` member to set the component's rectangle shape.

<hr>

## Documentation style (Code-Preview style)

### Code preview options

```html preview blocks
code snipet
```

#### use of one of these options

- full
- center
- blocks

https://github.com/Vonage/vivid-3/blob/95df74b6284f28cbf4a31279db28d2a40fbc151e/apps/docs/transformers/code-block-demo/layout.js#L7-L11
### Styling wrapper div

- `.cover-fill`
- `.cover-full`
- `.demo-gradient`
