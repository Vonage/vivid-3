## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/searchable-select';
```

or, if you need to use a unique prefix:

```js
import { registerSearchableSelect } from '@vonage/vivid';

registerSearchableSelect('your-prefix');
```

```html preview 230px
<script type="module">
	import { registerSearchableSelect, registerOption } from '@vonage/vivid';
	registerSearchableSelect('your-prefix');
	registerOption('your-prefix');
</script>

<your-prefix-searchable-select label="Country">
	<your-prefix-option value="AF" text="Afghanistan"></your-prefix-option>
	<your-prefix-option value="AL" text="Albania"></your-prefix-option>
	<your-prefix-option value="DZ" text="Algeria"></your-prefix-option>
</your-prefix-searchable-select>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
</script>
<template>
	<VSearchableSelect label="Country">
		<VOption value="AF" text="Afghanistan" />
		<VOption value="AL" text="Albania" />
		<VOption value="DZ" text="Algeria" />
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Controlling the Value

### Single Select

For a single select, you can control the selected value by setting the `value` attribute.

```html preview 230px
<vwc-searchable-select label="Country" value="AL">
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

### Multiple Select

For multiple select, you can control the selected values by setting the `values` property.

<vwc-note connotation="information" icon="info-line">

Web components (as with all HTML elements) can only accept strings as their attributes. `values` requires an array, so it has to be set programmatically.

</vwc-note>

```html preview 230px
<vwc-searchable-select multiple label="Countries">
	<vwc-option
		icon="flag-afghanistan"
		value="AF"
		text="Afghanistan"
	></vwc-option>
	<vwc-option icon="flag-albania" value="AL" text="Albania"></vwc-option>
	<vwc-option icon="flag-algeria" value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
<script>
	customElements.whenDefined('vwc-searchable-select').then(() => {
		document.querySelector('vwc-searchable-select').values = ['AF', 'DZ'];
	});
</script>
```

## Fixed Dropdown

Add the `fixed-dropdown` attribute to change the dropdown to use a fixed position strategy.
This is useful for cases in which the dropdown is obstructed by other elements.

## Open

The `open` attribute allows the Searchable Select to be opened programmatically.

```html preview 230px
<vwc-searchable-select label="Country" open>
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

## Search Text

You can access the current search text through the `searchText` property and listen for changes through the `search-text-change` event.

```html preview 150px
<div>Current search text: "<span id="search-text"></span>"</div>
<vwc-searchable-select></vwc-searchable-select>

<script>
	customElements.whenDefined('vwc-searchable-select').then(() => {
		document
			.querySelector('vwc-searchable-select')
			.addEventListener('search-text-change', (e) => {
				document.querySelector('#search-text').innerText =
					e.currentTarget.searchText;
			});
	});
</script>
```

## Option Filtering

You can control option filtering by setting `optionFilter` to a custom function. For example, always returning `true` will disable filtering by always showing all options.

```html preview 250px
<vwc-searchable-select>
	<vwc-option
		icon="flag-afghanistan"
		value="AF"
		text="Afghanistan"
	></vwc-option>
	<vwc-option icon="flag-albania" value="AL" text="Albania"></vwc-option>
	<vwc-option icon="flag-algeria" value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>

<script>
	customElements.whenDefined('vwc-searchable-select').then(() => {
		document.querySelector('vwc-searchable-select').optionFilter = () => true;
	});
</script>
```

## Slots

### Default

Holds the available options as [Option](/components/option/) elements.

```html preview 230px
<vwc-searchable-select label="Select an option">
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
</vwc-searchable-select>
```

You can use the [Option's `tag-icon` slot](/components/option/#tag-icon) to display an icon next to the selected option's tag.

```html preview 320px
<vwc-searchable-select label="Country" clearable multiple>
	<vwc-option
		icon="flag-afghanistan"
		value="afghanistan"
		text="Afghanistan"
		selected
	>
		<vwc-icon slot="tag-icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
	<vwc-option icon="flag-albania" value="albania" text="Albania">
		<vwc-icon slot="tag-icon" name="flag-albania"></vwc-icon>
	</vwc-option>
	<vwc-option icon="flag-algeria" value="algeria" text="Algeria">
		<vwc-icon slot="tag-icon" name="flag-algeria"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>
```

#### Hidden Options

Setting `hidden` on an Option will hide it from the dropdown while still allowing it to be a selected value.

```html preview 150px
<vwc-searchable-select multiple>
	<vwc-option value="AF" text="Afghanistan" selected hidden></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

### Icon

Set the `icon` slot to show an icon at the start of the input.
If set, the `icon` attribute is ignored.

```html preview 230px
<vwc-searchable-select label="Country">
	<vwc-icon
		slot="icon"
		name="check-circle-solid"
		connotation="success"
	></vwc-icon>
	<vwc-option value="AF" text="Afghanistan" selected></vwc-option>
	<vwc-option value="AL" text="Albania" selected></vwc-option>
	<vwc-option value="DZ" text="Algeria" selected></vwc-option>
</vwc-searchable-select>
```

### Meta

Use the `meta` slot to show meta information at the end of the input field.

```html preview 320px
<vwc-searchable-select aria-label="Country" multiple>
	<vwc-option value="AF" text="Afghanistan" selected></vwc-option>
	<vwc-option value="AL" text="Albania" selected></vwc-option>
	<vwc-option value="DZ" text="Algeria" selected></vwc-option>
	<vwc-badge slot="meta" connotation="success" text="Beta"></vwc-badge>
</vwc-searchable-select>

<style>
	vwc-searchable-select {
		width: 250px;
	}
</style>
```

### Helper Text

The `helper-text` slot allows you to use rich content as the helper text.

```html preview 230px
<vwc-searchable-select label="Business Type">
	<vwc-option value="ngo" text="Non-Governmental Organization"></vwc-option>
	<vwc-option value="gov" text="Governmental Organization"></vwc-option>
	<vwc-option value="edu" text="Educational Institution"></vwc-option>
	<span slot="helper-text">
		Please select the <a href="#">type of your business</a>.
	</span>
</vwc-searchable-select>
```

## Custom Width

You can specify width on the Searchable Select to control the width of the component. The default width is `300px`.

The dropdown has min-width of its content.

```html preview 230px
<style>
	vwc-searchable-select {
		width: 140px;
	}
</style>
<vwc-searchable-select label="Choose an option">
	<vwc-option value="1" text="Option 1: dogs"></vwc-option>
	<vwc-option value="2" text="Option 2: cats"></vwc-option>
	<vwc-option value="3" text="Option 3: dogs and cats"></vwc-option>
</vwc-searchable-select>
```

## CSS Variables

### Height

Use `--searchable-select-height` to set the max-height of the dropdown. The default value is `408px`.

```html preview 300px
<style>
	vwc-searchable-select {
		--searchable-select-height: 100px;
	}
</style>
<vwc-searchable-select aria-label="Options Selector">
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
	<vwc-option value="4" text="Option 4"></vwc-option>
	<vwc-option value="5" text="Option 5"></vwc-option>
	<vwc-option value="6" text="Option 6"></vwc-option>
	<vwc-option value="7" text="Option 7"></vwc-option>
</vwc-searchable-select>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                | Type                                                        | Description                                                                                                                       |
| ------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **successText**     | `string`                                                    | The success text for the form element.                                                                                            |
| **errorText**       | `string`                                                    | The error text for the form element.                                                                                              |
| **helperText**      | `string`                                                    | The helper text for the form element.                                                                                             |
| **label**           | `string`                                                    | The label for the form element.                                                                                                   |
| **icon**            | _Enum_:<br/>`[icon-name]`                                   | A decorative icon the custom element should have. See the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/ |
| **iconTrailing**    | `boolean`                                                   | Indicates the icon affix alignment.                                                                                               |
| **disabled**        | `boolean`                                                   | Sets the element's disabled state. A disabled element will not be included during form submission.                                |
| **name**            | `string`                                                    | The name of the element. This element's value will be surfaced during form submission under the provided name.                    |
| **required**        | `boolean`                                                   | Require the field to be completed prior to form submission.                                                                       |
| **appearance**      | _Enum_:<br/>`fieldset`<br/>`ghost`                          |                                                                                                                                   |
| **shape**           | _Enum_:<br/>`rounded`<br/>`pill`                            |                                                                                                                                   |
| **fixedDropdown**   | `boolean`                                                   |                                                                                                                                   |
| **placeholder**     | `string`                                                    |                                                                                                                                   |
| **open**            | `boolean`                                                   |                                                                                                                                   |
| **multiple**        | `boolean`                                                   |                                                                                                                                   |
| **externalTags**    | `boolean`                                                   |                                                                                                                                   |
| **maxLines**        | `number`                                                    |                                                                                                                                   |
| **clearable**       | `boolean`                                                   | Adds a clear button to the input field that clears the selected values.                                                           |
| **values**          | `string[]`                                                  | List of selected option's values in the order that they have been selected in.                                                    |
| **value**           | `string`                                                    | Value of the first selected option or the empty string if no option is selected.                                                  |
| **selectedIndex**   | `number`                                                    | Index of the first selected option or `-1` if no option is selected.                                                              |
| **options**         | `ListboxOption[]`                                           | Read-only collections of all options.                                                                                             |
| **selectedOptions** | `ListboxOption[]`                                           | Read-only collections of selected options.                                                                                        |
| **initialValues**   | `string[]`                                                  | List of initially selected option's values. Used in case of form reset.                                                           |
| **initialValue**    | `string`                                                    | Initially selected option's value. Used in case of form reset.                                                                    |
| **loading**         | `boolean`                                                   | Whether the component is in a loading state.                                                                                      |
| **searchText**      | `string`                                                    | Read-only property containing the current search text.                                                                            |
| **optionFilter**    | `(option: VwcOptionElement, searchText: string) => boolean` | Function to filter the options to display.                                                                                        |

</div>

### Events

<div class="table-wrapper">

| Name                   | Event Type               | Bubbles | Composed | Description                            |
| ---------------------- | ------------------------ | ------- | -------- | -------------------------------------- |
| **input**              | `CustomEvent<undefined>` | No      | Yes      | Fired when the selected options change |
| **change**             | `CustomEvent<undefined>` | No      | Yes      | Fired when the selected options change |
| **search-text-change** | `CustomEvent<undefined>` | No      | No       | Fired when the search text changes     |

</div>

### Slots

<div class="table-wrapper">

| Name                | Description                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------- |
| **default**         | Holds the available options.                                                                  |
| **icon**            | Slot to add an icon to the control.                                                           |
| **meta**            | Slot to add meta content to the control.                                                      |
| **helper-text**     | Describes how to use the component. Alternative to the `helper-text` attribute.               |
| **no-options**      | Message that appears when no options are available.                                           |
| **no-matches**      | Message that appears when no options match the search query.                                  |
| **loading-options** | Message that appears there are no options to display and the component is in a loading state. |

</div>
