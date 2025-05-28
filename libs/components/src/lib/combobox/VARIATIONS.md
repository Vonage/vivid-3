## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Combobox.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

```html preview 270px
<vwc-combobox label="Search for something">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

### Helper Text

The `helper-text` attribute provides additional information about the purpose of the Combobox.

To add HTML to the helper text, use the [helper-text slot](/components/combobox/code/#helper-text-slot).

```html preview 320px
<vwc-combobox
	helper-text="We use this information in to help inform our marketing strategy"
	label="Where did you hear about us?"
	placeholder="Select an option"
	class="marketing"
>
	<vwc-option value="friend" text="A friend"></vwc-option>
	<vwc-option value="net" text="Internet search"></vwc-option>
	<vwc-option value="online-ad" text="Online advert"></vwc-option>
	<vwc-option value="radio-ad" text="Radio advert"></vwc-option>
	<vwc-option value="other" text="Other"></vwc-option>
</vwc-combobox>

<style>
	.marketing {
		min-inline-size: 250px;
	}
</style>
```

### Placeholder Text

The `placeholder` attribute provides some text to be displayed when no option has been Combobox.

<vwc-note connotation="information"headline="Accessibility Tip">
<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

<p>Avoid using <code>placeholder</code> text as a substitute for a label. Placeholder text is not a reliable label—it disappears when users type and is not always announced by screen readers. Use a <code>label</code> element to ensure the Combobox is both visually and programmatically associated with a descriptive label.</p>
</vwc-note>

```html preview 270px
<vwc-combobox placeholder="placeholder" label="Combobox with placeholder">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

## Validation Feedback

### Success Text

The `success-text` attribute provides a custom success message. Any current error state will be overridden by `success-text`.

```html preview 270px
<vwc-combobox
	success-text="Rome is the correct answer"
	placeholder="Select an option"
	label="What is the capital of Italy?"
	class="question"
>
	<vwc-option value="madrid" text="Madrid"></vwc-option>
	<vwc-option value="paris" text="Paris"></vwc-option>
	<vwc-option value="london" text="London"></vwc-option>
	<vwc-option value="rome" text="Rome" selected></vwc-option>
</vwc-combobox>

<style>
	.question {
		min-inline-size: 250px;
	}
</style>
```

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

```html preview 270px
<vwc-combobox
	error-text="Madrid is incorrect"
	placeholder="Select an option"
	label="What is the capital of Italy?"
	class="question"
>
	<vwc-option value="madrid" text="Madrid" selected></vwc-option>
	<vwc-option value="paris" text="Paris"></vwc-option>
	<vwc-option value="london" text="London"></vwc-option>
	<vwc-option value="rome" text="Rome"></vwc-option>
</vwc-combobox>

<style>
	.question {
		min-inline-size: 250px;
	}
</style>
```

## Icon

To add icons, use the `icon` [slot](/components/combobox/code/#icon-slot) provided.\
The `icon`(_deprecated_) attribute displays an icon from the [icon library](/icons/icons-gallery), which prefixes the Combobox element.

```html preview 270px
<vwc-combobox label="Country code" class="country-code" id="country-code">
	<vwc-icon
		slot="icon"
		id="icon"
		name="flag-united-states"
		label="United States +1"
	></vwc-icon>
	<vwc-option value="1" text="United States" label="+1">
		<vwc-icon name="flag-united-states" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="44" text="United Kingdom" label="+44">
		<vwc-icon name="flag-united-kingdom" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="49" text="Germany" label="+49">
		<vwc-icon name="flag-germany" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="355" text="Albania" label="+355">
		<vwc-icon name="flag-albania" slot="icon"></vwc-icon>
	</vwc-option>
</vwc-combobox>

<script>
	const combobox = document.getElementById('country-code');
	const icon = document.getElementById('icon');
	combobox?.addEventListener('change', (e) => {
		icon.name = combobox.selectedOptions[0].icon;
		icon.label =
			combobox.selectedOptions[0].text +
			' ' +
			combobox.selectedOptions[0].value;
	});
</script>
```

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

## Scale

The `scale` attribute controls the combobox element display size.  
Use `condensed` in situations when space is limited, for example, inside a Data Grid cell.

```html preview 270px
<div class="container">
	<vwc-combobox scale="normal" label="Normal" placeholder="Select an option">
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-combobox>

	<vwc-combobox
		scale="condensed"
		label="Condensed"
		placeholder="Select an option"
	>
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-combobox>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

<vwc-note connotation="information" headline="Scale instead of Size">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>
	<p>The reason for using <code>scale</code> for form elements and not <code>size</code> (as used in other components such as Button), is that <code>size</code> is a HTML attribute that can be used on <code>input</code> elements (and also Text Field) to control the width of the input.</p>
</vwc-note>

## Shape

The `shape` attribute controls the border radius of the Combobox input element.

```html preview 270px
<div class="container">
	<vwc-combobox shape="rounded" label="Rounded" placeholder="Select an option">
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-combobox>

	<vwc-combobox shape="pill" label="Pill" placeholder="Select an option">
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-combobox>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

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
