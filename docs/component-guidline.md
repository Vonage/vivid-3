# Documentation Conventions

For better and unify components documentation

## Template Guide

Use the new component generator to create a new component:  
`npm run nx g @vonage/nx-vivid:component my-component`

## Terminology 

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

- `graphic` - for a slot bound to contain a decorative figure; such as a custom icon or image
- `media` - for a slot bound to contain visual elements; such as an illustration, video etc'.
- `meta`
- `footer / actions`
- `action-item / action-items` singular or plural - need to ne decided
- `main`

<hr>

## Documentation

### Structure

```
# Component Name
One summary line

- Code import sample
- Code example preview 

## Members (properties / attributes)

### member 1

`{{ description }}`

- type: `{{ type }}`
- default: `{{ default }}`

code sumple

### member 2
...

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

//TODO: take out this part to a separate documentation 

## Documentation style (Code-Preview style)

### Code preview options

```html preview blocks
code snipet
```
#### use one of these options

setting the preview with various options:

- full
- blocks
- columns
- inline (default)
- center


[//]: # (### Styling wrapper div)

[//]: # ()
[//]: # (- `.cover-fill`)

[//]: # (- `.cover-full`)

[//]: # (- `.demo-gradient`)
