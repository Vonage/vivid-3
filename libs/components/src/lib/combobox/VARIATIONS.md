## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Combobox.

```html preview 270px
<vwc-combobox label="Search for something">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

<vwc-note connotation="information" icon="info-line" headline="Accessibility note">
	<p>If you can not use the visible <code>label</code>, provide it using the <code>aria-label</code> attribute.</p>
	<p>It will be announced by screen readers so that those users will know the purpose of the Combobox.</p>
</vwc-note>

<!-- ### Helper-text will be added in VIV-2268 -->

### Placeholder Text

The `placeholder` attribute provides some text to be displayed when no option has been Combobox.

```html preview 270px
<vwc-combobox placeholder="placeholder" label="Combobox with placeholder">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

<vwc-note connotation="warning" icon="warning-line" headline="Placeholder text should not be used as a label">
	<p>Using <code>placeholder</code> text to label the Combobox harms accessibility and user experience. The <code>label</code> text is visually and programmatically associated with its corresponding form control.</p>
</vwc-note>

<!-- ## Validation Feedback - VIV-2268
### Error Text
### Success Text

## Icon
## Scale
## Shape
-->

## Appearance

The `appearance` attribute controls the style of the Combobox element.<br />
Use `ghost` in combination with a containing element which provides a border, for example when used inside the [leading action items slot of Text Field](/components/text-field/code/#leading-action-items-slot).

```html preview 200px
<vwc-combobox label="fieldset" appearance="fieldset" placeholder="appearance">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
<vwc-combobox label="ghost" appearance="ghost" placeholder="appearance">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

## Placement

Set the `placement` attribute to set the combobox's placement in accordance to its anchor.  
Placement options are: `top-start` , `top` , `top-end` , `bottom-start` (default) , `bottom` and `bottom-end`.

```html preview
<div class="combobox-wrapper">
	<vwc-combobox
		placement="top-start"
		aria-label="combobox with default placement of bottom-start"
	>
		<vwc-option text="First Option"></vwc-option>
		<vwc-option text="Second Option"></vwc-option>
	</vwc-combobox>
</div>

<style>
	.combobox-wrapper {
		block-size: 140px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: start;
	}
</style>
```

## Disabled

The `disabled` attribute disables the Combobox element.

```html preview
<vwc-combobox disabled label="disabled combobox">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```
