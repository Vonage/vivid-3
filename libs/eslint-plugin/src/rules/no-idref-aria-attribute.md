# Do not use IDREF ARIA attributes on components

This rule prevents the use of IDREF ARIA attributes on components. These attributes will not work correctly with shadow DOM.

## IDREF ARIA Attributes

The following ARIA attributes are IDREF attributes and should not be used on components.

- `aria-activedescendant`
- `aria-controls`
- `aria-describedby`
- `aria-details`
- `aria-errormessage`
- `aria-flowto`
- `aria-labelledby`
- `aria-owns`

## Why?

When these components are used with shadow DOM, IDREF ARIA attributes will not work correctly because they cannot reference elements across shadow DOM boundaries.

#### Example

```html
<!-- ❌ BAD -->
<VButton aria-labelledby="button-label">Click me</VButton>
<div id="button-label">This is a button</div>

<VTextField aria-describedby="field-description"></VTextField>
<div id="field-description">Enter your name</div>

<VMenu aria-controls="menu-trigger"></VMenu>
<button id="menu-trigger">Open menu</button>

<!-- ✅ GOOD -->
<VButton aria-label="This is a button">Click me</VButton>

<VTextField aria-label="Name" aria-description="Enter your name"></VTextField>

<VMenu aria-label="Menu"></VMenu>
```

### Rule Details

This rule prevents using IDREF ARIA attributes on components since they will not work correctly with shadow DOM.

### Options

This rule has no options.

### Default Configuration

```json
{
	"@vonage/vivid/no-idref-aria-attribute": "error"
}
```

#### Affected Components

The rule applies to the following components:

- `VBreadcrumb`
- `VBreadcrumbItem`
- `VButton`
- `VNav`
- `VTagGroup`
- `VTag`
- `VActionGroup`
- `VHeader`
- `VSwitch`
- `VDivider`
- `VTextArea`
- `VCheckbox`
- `VSearchableSelect`
- `VFilePicker`
- `VCalendarEvent`
- `VProgress`
- `VProgressRing`
- `VSelectableBox`
- `VBanner`
- `VCombobox`
- `VMenu`
- `VRadio`
- `VSelect`
- `VTextField`
- `VDialog`
- `VSlider`
- `VTextAnchor`
- `VSplitButton`
- `VNumberField`
- `VNavDisclosure`
