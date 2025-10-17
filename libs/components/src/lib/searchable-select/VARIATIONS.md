## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Searchable Select.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
	<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

```html preview 270px
<vwc-searchable-select label="Country">
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

### Helper Text

The `helper-text` attribute provides additional information about the purpose of the Searchable Select.

To add HTML to the helper text, use the [helper-text slot](/components/searchable-select/code/#helper-text-slot).

```html preview 320px
<vwc-searchable-select
	helper-text="Select the countries that your company operates in"
	label="Country"
	multiple
>
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

### Placeholder Text

The `placeholder` attribute provides some text to be displayed when no option has been selected.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
	<p>Avoid using <code>placeholder</code> text as a substitute for a label. Placeholder text is not a reliable label—it disappears when users type and is not always announced by screen readers. Use a <code>label</code> element to ensure the Combobox is both visually and programmatically associated with a descriptive label.</p>
</vwc-note>

```html preview 230px
<vwc-searchable-select label="Country" placeholder="Select a country...">
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
<vwc-searchable-select
	label="Countries"
	placeholder="Select countries..."
	multiple
>
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

### Contextual Help

You can add the [Contextual Help](/components/contextual-help/) component using the `contextual-help` slot. It will be displayed next to the label, providing users additional information.

```html preview 230px
<vwc-searchable-select label="Country">
	<vwc-contextual-help slot="contextual-help"
		>Select the country where your company operates</vwc-contextual-help
	>
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

```html preview 270px
<vwc-searchable-select
	error-text="Madrid is incorrect"
	label="What is the capital of Italy?"
>
	<vwc-option value="madrid" text="Madrid" selected></vwc-option>
	<vwc-option value="paris" text="Paris"></vwc-option>
	<vwc-option value="london" text="London"></vwc-option>
	<vwc-option value="rome" text="Rome"></vwc-option>
</vwc-searchable-select>
```

### Success Text

The `success-text` attribute provides a custom success message. Any current error state will be overridden by `success-text`.

```html preview 270px
<vwc-searchable-select
	success-text="Rome is correct"
	label="What is the capital of Italy?"
>
	<vwc-option value="madrid" text="Madrid"></vwc-option>
	<vwc-option value="paris" text="Paris"></vwc-option>
	<vwc-option value="london" text="London"></vwc-option>
	<vwc-option value="rome" text="Rome" selected></vwc-option>
</vwc-searchable-select>
```

## Icon

The `icon` attribute can set to display an icon from the [icon library](/icons/icons-gallery/) on the component.

The preferred way to add icons is to use the [icon slot](/components/searchable-select/code/#icon-slot).

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

```html preview 230px
<vwc-searchable-select label="Country" icon="globe-line">
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

## Shape

The `shape` attribute controls the border radius of the Searchable Select input element.

```html preview 230px
<vwc-searchable-select shape="rounded" label="Country">
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
<vwc-searchable-select shape="pill" label="Country">
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

## Appearance

The `appearance` attribute controls the style of the select element.

Use `ghost` in combination with a containing element which provides a border, for example when used inside the [leading action items slot of Text Field](/components/text-field/code/#leading-action-items-slot).

```html preview 270px
<vwc-searchable-select appearance="ghost" label="Country" clearable>
	<vwc-option value="AF" text="Afghanistan" selected></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
<vwc-searchable-select appearance="ghost" label="Country" clearable multiple>
	<vwc-option value="AF" text="Afghanistan" selected></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

## Multiple

The `multiple` attribute allows the user to select more than one option.

```html preview 270px
<vwc-searchable-select multiple label="Countries">
	<vwc-option value="AF" text="Afghanistan">
		<vwc-icon slot="icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
	<vwc-option value="AL" text="Albania">
		<vwc-icon slot="icon" name="flag-albania"></vwc-icon>
	</vwc-option>
	<vwc-option value="DZ" text="Algeria">
		<vwc-icon slot="icon" name="flag-algeria"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>
```

### Max Lines

This controls the maximum number of lines of tags to display. When the limit would be exceeded, the remaining tags will be hidden and replaced by a counter instead.

```html preview 270px
<vwc-searchable-select multiple label="Countries" max-lines="2">
	<vwc-option value="afghanistan" text="Afghanistan" selected>
		<vwc-icon slot="icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
	<vwc-option value="albania" text="Albania" selected>
		<vwc-icon slot="icon" name="flag-albania"></vwc-icon>
	</vwc-option>
	<vwc-option value="algeria" text="Algeria" selected>
		<vwc-icon slot="icon" name="flag-algeria"></vwc-icon>
	</vwc-option>
	<vwc-option value="argentina" text="Argentina" selected>
		<vwc-icon slot="icon" name="flag-argentina"></vwc-icon>
	</vwc-option>
	<vwc-option value="armenia" text="Armenia" selected>
		<vwc-icon slot="icon" name="flag-armenia"></vwc-icon>
	</vwc-option>
	<vwc-option value="aruba" text="Aruba" selected>
		<vwc-icon slot="icon" name="flag-aruba"></vwc-icon>
	</vwc-option>
	<vwc-option value="australia" text="Australia" selected>
		<vwc-icon slot="icon" name="flag-australia"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>
```

### Max Selected

This controls the maximum number of items that user can select. Once the limit is reached, the remaining options will be disabled.

```html preview 270px
<vwc-searchable-select multiple label="Countries" max-selected="3">
	<vwc-option value="afghanistan" text="Afghanistan">
		<vwc-icon slot="icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
	<vwc-option value="albania" text="Albania">
		<vwc-icon slot="icon" name="flag-albania"></vwc-icon>
	</vwc-option>
	<vwc-option value="algeria" text="Algeria">
		<vwc-icon slot="icon" name="flag-algeria"></vwc-icon>
	</vwc-option>
	<vwc-option value="argentina" text="Argentina"> </vwc-option>
	<vwc-option value="armenia" text="Armenia">
		<vwc-icon slot="icon" name="flag-armenia"></vwc-icon>
	</vwc-option>
	<vwc-option value="aruba" text="Aruba">
		<vwc-icon slot="icon" name="flag-aruba"></vwc-icon>
	</vwc-option>
	<vwc-option value="australia" text="Australia">
		<vwc-icon slot="icon" name="flag-australia"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>
```

### External Tags

When set, the selected tags will not be displayed inside the component.

```html preview 230px
<vwc-searchable-select external-tags multiple label="Countries" clearable>
	<vwc-option value="AF" text="Afghanistan">
		<vwc-icon slot="icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
	<vwc-option value="AL" text="Albania">
		<vwc-icon slot="icon" name="flag-albania"></vwc-icon>
	</vwc-option>
	<vwc-option value="DZ" text="Algeria">
		<vwc-icon slot="icon" name="flag-algeria"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>
<vwc-searchable-select external-tags multiple label="Company Type" clearable>
	<vwc-option value="ngo" text="Non-Governmental Organization"></vwc-option>
	<vwc-option value="gov" text="Governmental Organization"></vwc-option>
	<vwc-option value="edu" text="Educational Institution"></vwc-option>
</vwc-searchable-select>
<vwc-tag-group></vwc-tag-group>

<script>
	function updateTags() {
		document.querySelector('vwc-tag-group').innerHTML = '';
		for (const option of document.querySelectorAll('vwc-option')) {
			if (option.selected) {
				const tag = document.createElement('vwc-tag');
				tag.label = option.text;
				tag.removable = true;
				tag.dataset.value = option.value;
				document.querySelector('vwc-tag-group').append(tag);
			}
		}
	}
	for (const select of document.querySelectorAll('vwc-searchable-select')) {
		select.addEventListener('change', updateTags);
	}
	updateTags();
	document
		.querySelector('vwc-tag-group')
		.addEventListener('removed', (event) => {
			const option = document.querySelector(
				`vwc-option[value="${event.target.dataset.value}"]`
			);
			option.selected = false;
			updateTags();
		});
</script>

<style>
	vwc-tag-group {
		display: block;
		margin-top: 12px;
	}
</style>
```

### Tag Connotation

The `tag-connotation` of Option attribute sets the connotation of the tags.

```html preview 270px
<vwc-searchable-select multiple>
	<vwc-option value="accent" text="accent" selected></vwc-option>
	<vwc-option
		tag-connotation="cta"
		value="cta"
		text="cta"
		selected
	></vwc-option>
</vwc-searchable-select>
```

### Enable Select All

Use the `enable-select-all` attribute to add **Select All** option at the top of the list.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	
	Do not use **enable-select-all** together with **max-selected**. When max-selected is set to a positive number, the “Select All” option is hidden.

</vwc-note>

```html preview 270px
<vwc-searchable-select
	multiple
	label="Countries"
	enable-select-all
	select-all-text="Select all countries"
	deselect-all-text="Deselect all countries"
>
	<vwc-option value="afghanistan" text="Afghanistan">
		<vwc-icon slot="icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
	<vwc-option value="albania" text="Albania">
		<vwc-icon slot="icon" name="flag-albania"></vwc-icon>
	</vwc-option>
	<vwc-option value="algeria" text="Algeria">
		<vwc-icon slot="icon" name="flag-algeria"></vwc-icon>
	</vwc-option>
	<vwc-option value="argentina" text="Argentina">
		<vwc-icon slot="icon" name="flag-argentina"></vwc-icon>
	</vwc-option>
	<vwc-option value="armenia" text="Armenia">
		<vwc-icon slot="icon" name="flag-armenia"></vwc-icon>
	</vwc-option>
	<vwc-option value="aruba" text="Aruba">
		<vwc-icon slot="icon" name="flag-aruba"></vwc-icon>
	</vwc-option>
	<vwc-option value="australia" text="Australia">
		<vwc-icon slot="icon" name="flag-australia"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>
```

## Clearable

Adds a clear button to the input field, which clears the selected value(s) when clicked.

```html preview 270px
<vwc-searchable-select multiple label="Countries" clearable>
	<vwc-option value="AF" text="Afghanistan">
		<vwc-icon slot="icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
	<vwc-option value="AL" text="Albania">
		<vwc-icon slot="icon" name="flag-albania"></vwc-icon>
	</vwc-option>
	<vwc-option value="DZ" text="Algeria">
		<vwc-icon slot="icon" name="flag-algeria"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>
```

## Disabled

The `disabled` attribute disables the Searchable Select.

```html preview
<vwc-searchable-select label="Country" disabled clearable>
	<vwc-option value="AF" text="Afghanistan" selected></vwc-option>
</vwc-searchable-select>
<vwc-searchable-select label="Country" disabled multiple clearable>
	<vwc-option value="AF" text="Afghanistan" selected></vwc-option>
</vwc-searchable-select>
```

## Loading

The `loading` attribute shows the component in a loading state.

If there are no options to display, the component shows a loading message. It can be customized using the `loading-options` slot.

See the [asynchronous option loading use-case](/components/searchable-select/use-cases/#asynchronous-option-loading) for an example of how to load options.

```html preview 230px
<vwc-searchable-select loading>
	<span slot="loading-options">Loading results...</span>
</vwc-searchable-select>
```

## No Options

The `no-options` slot allows you to customize the message when there are no options to choose from.

```html preview 400px
<style>
	vwc-empty-state {
		margin: 24px;
	}
</style>
<vwc-searchable-select label="Connect number">
	<span slot="no-options">You do not have any numbers.</span>
</vwc-searchable-select>
<vwc-searchable-select label="Connect number">
	<vwc-empty-state
		slot="no-options"
		icon="phone-number-line"
		headline="No numbers"
	>
		You do not have any numbers yet.
	</vwc-empty-state>
</vwc-searchable-select>
```

## No Matches

The `no-matches` slot allows you to customize the message that appears when no options match the search query.

```html preview 230px
<vwc-searchable-select label="Connect number">
	<vwc-option value="1" text="+1 1243 546789"></vwc-option>
	<span slot="no-matches"> No numbers found. </span>
</vwc-searchable-select>
```
