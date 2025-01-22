## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/combobox';
```

or, if you need to use a unique prefix:

```js
import { registerCombobox } from '@vonage/vivid';

registerCombobox('your-prefix');
```

```html preview 270px
<script type="module">
	import { registerCombobox, registerOption } from '@vonage/vivid';
	registerCombobox('your-prefix');
	registerOption('your-prefix');
</script>

<your-prefix-combobox label="Title" placeholder="Find an option">
	<your-prefix-option value="mr" text="Mr"></your-prefix-option>
	<your-prefix-option value="mrs" text="Mrs"></your-prefix-option>
	<your-prefix-option value="miss" text="Miss"></your-prefix-option>
	<your-prefix-option value="ms" text="Ms"></your-prefix-option>
</your-prefix-combobox>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VCombobox, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VCombobox label="Title" placeholder="Select an option">
		<VOption value="mr" text="Mr" />
		<VOption value="mrs" text="Mrs" />
		<VOption value="miss" text="Miss" />
		<VOption value="ms" text="Ms" />
	</VCombobox>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Autocomplete

- Type: `'inline'` | `'list'` | `'both'` | `'none'`
- Default: `undefined`

The `autocomplete` attribute controls the auto-complete behaviour.

- `inline` means the auto-complete takes place by string matching in the input element
- `list` means the auto-complete takes place by filtering the list in drop down
- `both` means both of the above behaviours take place
- `none` disables the auto-complete behaviour

See [aria-autocomplete](https://www.w3.org/TR/wai-aria-1.2/#aria-autocomplete) for more information.

```html preview 200px
<vwc-combobox label="Inline" autocomplete="inline">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
<vwc-combobox label="List" autocomplete="list">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
<vwc-combobox label="Both" autocomplete="both">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

## Custom Width

By default, the Combobox's `width` is `fit-content` and the same goes for the listbox containing the options.

You can specify the `width` of the Combobox using CSS.

```html preview 230px
<vwc-combobox class="vwc-combobox" label="Choose one option">
	<vwc-option value="1" text="Option 1: dogs"></vwc-option>
	<vwc-option value="2" text="Option 2: cats"></vwc-option>
	<vwc-option value="3" text="Option 3: dogs and cats"></vwc-option>
</vwc-combobox>

<style>
	.vwc-combobox {
		width: 140px;
	}
</style>
```

## Fixed-Dropdown

The `fixed-dropdown` attribute is useful for cases in which the dropdown is obstructed by other elements.

```html preview 320px
<vwc-dialog open headline="Dialog Content">
	<div slot="body">
		<vwc-combobox autocomplete="both" fixed-dropdown>
			<vwc-option text="First Option"></vwc-option>
			<vwc-option text="Second Option"></vwc-option>
			<vwc-option text="Third Option"></vwc-option>
			<vwc-option text="Fourth Option"></vwc-option>
		</vwc-combobox>
	</div>
</vwc-dialog>
```

## Open

The `open` attribute allows the Combobox to be opened programmatically.

```html preview 200px
<vwc-combobox open>
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

## Value

Set the `value` attribute to set the default value for the input field.  
Setting the property on the element will not change the default value, but will change the value shown in the view as well as the submitted value in a form (imitating the native behavior).

```html preview 200px
<vwc-combobox value="First Option">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

<!-- ## Validation Feedback - VIV-2268
## Slots
### Meta Slot
### Icon Slot
### Helper Text Slot
-->

## CSS Variables

### Dropdown Height

Use `--combobox-height` to customize the `max-height` of the dropdown.

```html preview 300px
<vwc-combobox aria-label="Options Selector">
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
	<vwc-option value="4" text="Option 4"></vwc-option>
	<vwc-option value="5" text="Option 5"></vwc-option>
	<vwc-option value="6" text="Option 6"></vwc-option>
	<vwc-option value="7" text="Option 7"></vwc-option>
</vwc-combobox>

<style>
	vwc-combobox {
		--combobox-height: 200px;
	}
</style>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name              | Type                          | Description                                                                                        |
| ----------------- | ----------------------------- | -------------------------------------------------------------------------------------------------- |
| `appearance`      | `fieldset` (default), `ghost` | Sets the element's appearance                                                                      |
| `disabled`        | `boolean`                     | Sets the element's disabled state. A disabled element will not be included during form submission. |
| `fixed-dropdown`  | `boolean`                     | Sets the position strategy of the dropdown to fixed                                                |
| `label`           | `string`                      | Sets the element's label                                                                           |
| `open`            | `boolean`                     | Sets the element's menu to be open                                                                 |
| `options`         | `Option[]`                    | A read-only list of options.                                                                       |
| `placeholder`     | `string`                      | Sets the text to be displayed when no option is selected                                           |
| `selectedOptions` | `Option[]`                    | A read-only collection of the selected options.                                                    |
| `selectedIndex`   | `number`                      | The index of the selected option or -1 if no option is selected.                                   |

</div>

### Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                                          |
| -------- | ------------------------ | ------- | -------- | ---------------------------------------------------- |
| `change` | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the value updates |

</div>

<!-- ## Validation Feedback - VIV-2268
### Slots

<div class="table-wrapper">

| Name            | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| **default**     | Default slot meant for Option component to provide the option list |
| **helper-text** | Add HTML content for helper text                                   |
| **icon**        | Add an icon to the component.                                      |
| **meta**        | Show meta information after the selected option label              |

</div>
-->
