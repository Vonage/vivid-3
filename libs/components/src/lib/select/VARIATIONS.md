## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Select.

```html preview 270px
<vwc-select label="Title" placeholder="Select an option">
	<vwc-option value="mr" text="Mr"></vwc-option>
	<vwc-option value="mrs" text="Mrs"></vwc-option>
	<vwc-option value="miss" text="Miss"></vwc-option>
	<vwc-option value="ms" text="Ms"></vwc-option>
</vwc-select>
```

<vwc-note connotation="information" icon="info-line" headline="Accessibility note">
	<p>If you can not use the visible <code>label</code>, provide it using the <code>aria-label</code> attribute.</p>
	<p>It will be announced by screen readers so that those users will know the purpose of the Select.</p>
</vwc-note>

### Helper Text

The `helper-text` attribute provides additional information about the purpose of the Select.

To add HTML to the helper text, use the [helper-text slot](/components/select/code/#helper-text-slot).

```html preview 320px
<vwc-select
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
</vwc-select>

<style>
	.marketing {
		min-inline-size: 250px;
	}
</style>
```

### Placeholder Text

The `placeholder` attribute provides some text to be displayed when no option has been selected.

```html preview 270px
<vwc-select placeholder="Select an option" label="Title">
	<vwc-option value="mr" text="Mr"></vwc-option>
	<vwc-option value="mrs" text="Mrs"></vwc-option>
	<vwc-option value="miss" text="Miss"></vwc-option>
	<vwc-option value="ms" text="Ms"></vwc-option>
</vwc-select>
```

<vwc-note connotation="warning" icon="warning-line" headline="Placeholder text should not be used as a label">
	<p>Using <code>placeholder</code> text to label the Select harms accessibility and user experience. The <code>label</code> text is visually and programmatically associated with its corresponding form control.</p>
</vwc-note>

## Selected Option

To provide a selected option, use the `selected` attribute on the selected [Option](/components/option/#selected).

```html preview 270px
<vwc-select placeholder="Select an option" label="Title">
	<vwc-option value="mr" text="Mr" selected></vwc-option>
	<vwc-option value="mrs" text="Mrs"></vwc-option>
	<vwc-option value="miss" text="Miss"></vwc-option>
	<vwc-option value="ms" text="Ms"></vwc-option>
</vwc-select>
```

### Selected Option Label

Use the `label` attribute on the [Option](/components/option/#label) component to proviode a different label to be displayed when the option is selected.

In the example below, the state code is displayed when selected but the full state name is displayed in the option list.

```html preview 320px
<vwc-select placeholder="Select a state" label="US state code" class="state">
	<vwc-option value="al" text="Alabama" label="AL" selected></vwc-option>
	<vwc-option value="ak" text="Alaska" label="AK"></vwc-option>
	<vwc-option value="az" text="Arizona" label="AZ"></vwc-option>
	<vwc-option value="ar" text="Arkansas" label="AR"></vwc-option>
	<vwc-option value="ca" text="California" label="CA"></vwc-option>
</vwc-select>

<style>
	.state {
		min-inline-size: 100px;
	}
</style>
```

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

```html preview 270px
<vwc-select
	error-text="Madrid is incorrect"
	placeholder="Select an option"
	label="What is the capital of Italy?"
	class="question"
>
	<vwc-option value="madrid" text="Madrid" selected></vwc-option>
	<vwc-option value="paris" text="Paris"></vwc-option>
	<vwc-option value="london" text="London"></vwc-option>
	<vwc-option value="rome" text="Rome"></vwc-option>
</vwc-select>

<style>
	.question {
		min-inline-size: 250px;
	}
</style>
```

### Success Text

The `success-text` attribute provides a custom success message. Any current error state will be overridden by `success-text`.

```html preview 270px
<vwc-select
	success-text="Rome is the correct answer"
	placeholder="Select an option"
	label="What is the capital of Italy?"
	class="question"
>
	<vwc-option value="madrid" text="Madrid"></vwc-option>
	<vwc-option value="paris" text="Paris"></vwc-option>
	<vwc-option value="london" text="London"></vwc-option>
	<vwc-option value="rome" text="Rome" selected></vwc-option>
</vwc-select>

<style>
	.question {
		min-inline-size: 250px;
	}
</style>
```

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery), which prefixes the Select element.

To add custom icons, use the `icon` [slot](/components/select/code/#icon-slot) provided.

```html preview 270px
<vwc-select
	label="Country code"
	icon="flag-united-states"
	class="country-code"
	id="country-code"
>
	<vwc-option
		value="1"
		text="United States"
		label="+1"
		icon="flag-united-states"
	></vwc-option>
	<vwc-option
		value="44"
		text="United Kingdom"
		label="+44"
		icon="flag-united-kingdom"
	></vwc-option>
	<vwc-option
		value="49"
		text="Germany"
		label="+49"
		icon="flag-germany"
	></vwc-option>
	<vwc-option
		value="355"
		text="Albania"
		label="+355"
		icon="flag-albania"
	></vwc-option>
</vwc-select>

<style>
	.country-code {
		inline-size: 120px;
	}
</style>

<script>
	const select = document.getElementById('country-code');
	select?.addEventListener('change', (e) => {
		select.icon = select.selectedOptions[0].icon;
	});
</script>
```

## Scale

The `scale` attribute controls the select element display size.
Use `condensed` in situations when space is limited, for example, inside a Data Grid cell.

```html preview 270px
<div class="container">
	<vwc-select scale="normal" label="Normal" placeholder="Select an option">
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-select>

	<vwc-select
		scale="condensed"
		label="Condensed"
		placeholder="Select an option"
	>
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-select>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

<vwc-note connotation="information" icon="info-line" headline="Scale instead of Size">
	<p>The reason for using <code>scale</code> for form elements and not <code>size</code> (as used in other components such as Button), is that <code>size</code> is a HTML attribute that can be used on <code>input</code> elements (and also Text Field) to control the width of the input.</p>
</vwc-note>

## Shape

The `shape` attribute controls the border radius of the Select input element.

```html preview 270px
<div class="container">
	<vwc-select shape="rounded" label="Rounded" placeholder="Select an option">
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-select>

	<vwc-select shape="pill" label="Pill" placeholder="Select an option">
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-select>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Appearance

The `appearance` attribute controls the style of the select element.<br />
Use `ghost` in combination with a containing element which provides a border, for example when used inside the [leading action items slot of Text Field](/components/text-field/code/#leading-action-items-slot).

```html preview 270px
<div class="container">
	<vwc-select
		appearance="fieldset"
		label="Fieldset"
		placeholder="Select an option"
	>
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-select>

	<vwc-select appearance="ghost" label="Ghost" placeholder="Select an option">
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-select>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Multiple

The `multiple` attribute allows the user to select more than one option. When in the multiple selection state, the options will always be visible.

For a better user experience, consider using a [Checkbox](/components/checkbox/) list or the [Searchable Select](/components/searchable-select/) if there are many options to pick from.

```html preview 230px
<vwc-select
	multiple
	label="Which countries have you visited?"
	class="countries"
>
	<vwc-option value="germany" text="Germany"></vwc-option>
	<vwc-option value="italy" text="Italy" selected></vwc-option>
	<vwc-option value="spain" text="Spain" selected></vwc-option>
	<vwc-option value="usa" text="USA"></vwc-option>
</vwc-select>

<style>
	.countries {
		width: 250px;
	}
</style>
```

## Disabled

The `disabled` attribute disables the select element.

```html preview 270px
<vwc-select disabled label="Title" placeholder="Select an option">
	<vwc-option value="mr" text="Mr"></vwc-option>
	<vwc-option value="mrs" text="Mrs"></vwc-option>
	<vwc-option value="miss" text="Miss"></vwc-option>
	<vwc-option value="ms" text="Ms"></vwc-option>
</vwc-select>
```