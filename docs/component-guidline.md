# Documentation Conventions
For better and unify components documentation

## Class Names

### Do:

- use `.base` for the first element in the component
- Use `.control` for form control such as input, buttons ect.
- Use kebab case and if containing more than one word should use hyphen.

### Dont:

- no need for adding vwc to the component name or the css class
- no need for the component name in the classes

## Properties name

- `Heading` for the head or main text in the component.
- `Sub-Heading`
- `text`


### Slots Name
Use kebab case for slots name and if containing more than one word should use hyphen.

- `Graphic`
- `Media` - for slot that are recommended to contain either images or video.
- `Meta`
- `Footer`
- `Content` - should we chang to default?
- 

<hr> 

# Documentation
## Structure

```
# Component Name
One summery line

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

## Methods - ? (found in Accordion)

## Accessibility

## Events - ? (found in banner)

## Use Cases
```
## Common repeating description

For each member need to specify (if there are):
- Type: `'member one'` | `'member two'` ...
- Default: `'default member'`

### Appearance
Set the `appearance` attribute to change the component's appearance.

### Shape
Use the `shape` attribute to set the component's edges.

### Density
Use the `density` attribute to set the component's to one of the predefined block size extent.

### icon
we need to decide :)
these are some variations:
- Use the icon attribute/property to set an icon to the button. View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com/).

- Text field input can be prefixed by a decorative icon.

- Use the `icon` attribute to add an icon.
  Add icon='icon-name' attribute to add icon on the right of the card heading

- Badge text can be affixed by a decorative icon, either by its start or end. Use the icon attribute to add an icon. Use the icon-trailing to place the icon to the right.
- To add an icon to the right of the text, use the icon-trailing attribute (or iconTrailing property).




## Code-Preview style
### use of one of these options:
- full
- center
- ...

