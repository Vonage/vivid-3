# Combobox

A combobox is an input widget that has an associated popup. The popup enables users to choose suggested values for the input from a collection.

```js
<script type="module">import '@vonage/vivid/combobox';</script>
```

## Members

### Label

Use the `label` member to set the combobox's label.

- Type: `string`
- Default: `undefined`

```html preview 200px
<vwc-combobox label="Search for something">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

### Value

- Type: `string` | `undefined`
- Default: `undefined`

Set the `value` attribute to set the default value for the input field. Setting the property on the element will not change the default value, but will change the value shown in the view as well as the submitted value in a form (imitating the native behavior).

```html preview 200px
<vwc-combobox value="First Option">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

### Placeholder

- Type: `string` | `undefined`
- Default: `undefined`

Add a `placeholder` attribute to add placeholder text to the input.

```html preview 200px
<vwc-combobox placeholder="placeholder">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

### Autocomplete

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

### Open

Use the `open` member to set the combobox's open state.

- Type: `boolean`
- Default: `false`

```html preview 200px
<vwc-combobox open>
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

### Placement

Use the `placement` member to set the combobox's placement in accordance to its anchor.

- Type: `'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end'`
- Default: `'bottom-start'`

```html preview
<style>
	.combobox-wrapper {
		/* for demo purposes */
		block-size: 140px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: start;
	}
</style>
<div class="combobox-wrapper">
	<vwc-combobox placement="top-start">
		<vwc-option text="First Option"></vwc-option>
		<vwc-option text="Second Option"></vwc-option>
	</vwc-combobox>
</div>
```

### Appearance

Set the `appearance` attribute to change the combobox's appearance.

- Type: `'fieldset'` | `'ghost'`
- Default: `'fieldset'`

(`'ghost'` is typically used within a composition such as action group / toolbar).

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

### Fixed-Dropdown

Add the `fixed-dropdown` attribute to use a fixed position for the dropdown instead of the default absolute positioning.
This is useful for cases in which the dropdown is obstructed by other elements. For example, when the combobox is inside a small dialog.

- Type: `boolean`
- Default: `false`

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

### Disabled

Add the `disabled` attribute to disable the combobox.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-combobox disabled>
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

## Dimensions

### Height (CSS Variable)

Use `--combobox-height` to set the max-height of the dropdown.

- Default: `408px`

```html preview 300px
<style>
	vwc-combobox {
		--combobox-height: 200px;
	}
</style>
<vwc-combobox aria-label="Options Selector">
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
	<vwc-option value="4" text="Option 4"></vwc-option>
	<vwc-option value="5" text="Option 5"></vwc-option>
	<vwc-option value="6" text="Option 6"></vwc-option>
	<vwc-option value="7" text="Option 7"></vwc-option>
</vwc-combobox>
```

### Width

By default, the combobox width is `fit-content` and the same goes for the dropdown.

You can specify width on the `vwc-combobox` if required (the dropdown will not be affected by this setting).

```html preview 230px
<style>
	vwc-combobox {
		width: 140px;
	}
</style>
<vwc-combobox label="Choose one option">
	<vwc-option value="1" text="Option 1: dogs"></vwc-option>
	<vwc-option value="2" text="Option 2: cats"></vwc-option>
	<vwc-option value="3" text="Option 3: dogs and cats"></vwc-option>
</vwc-combobox>
```

## Properties

<div class="table-wrapper">

| Name              | Type       | Default     | Description                                                      |
| ----------------- | ---------- | ----------- | ---------------------------------------------------------------- |
| `options`         | `Option[]` | `[]`        | A read-only list of options.                                     |
| `selectedOptions` | `Option[]` | `[]`        | A read-only collection of the selected options.                  |
| `selectedIndex`   | `number`   | `undefined` | The index of the selected option or -1 if no option is selected. |

</div>

## Slots

### Default

Place [vwc-option](/components/option/) elements inside the default slot to create the list of suggested options.

```html preview 200px
<vwc-combobox>
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

## Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                                          |
| -------- | ------------------------ | ------- | -------- | ---------------------------------------------------- |
| `change` | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the value updates |

</div>
