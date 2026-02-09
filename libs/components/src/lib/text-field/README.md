## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextField } from '@vonage/vivid-vue';
</script>

<template>
	<VTextField label="First name" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-field label="First name"></vwc-text-field>
```

</vwc-tab-panel>
</vwc-tabs>

## Types

While Text Field follows [the W3C specifictation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), it only supports the following types:

`text` (default), `email`, `password`, `search`, `tel`, `url`

We support the following other types with the following components:

- `button`: [Button](/components/button/)
- `checkbox`: [Checkbox](/components/checkbox/)
- `date`: [Date Picker](/components/date-picker/) | [Date Range Picker](/components/date-range-picker/)
- `file`: [File Picker](/components/field-picker/)
- `number`: [Number Field](/components/number-field/)
- `range`: [Slider](/components/slider/) | [Range Slider](/components/range-slider/)
- `time`: [Time Picker](/components/time-picker/)

### Input modes

Along with picking the correct `type` for the Text Field's purpose, it's also good for user experience to pick the correct `inputmode`.

The `inputmode` attribute hints at the type of data that might be entered by the user. This allows a browser to display an appropriate virtual keyboard.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextField } from '@vonage/vivid-vue';
</script>

<template>
	<div class="fields">
		<VTextField type="tel" inputmode="tel" label="Telephone number" />
		<VTextField type="email" inputmode="email" label="Email address" />
	</div>
</template>

<style scoped>
.fields {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div>
	<vwc-text-field type="tel" inputmode="tel" label="Telephone number"></vwc-text-field>
	<vwc-text-field type="email" inputmode="email" label="Email address"></vwc-text-field>
</div>

<style>
	div {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Action Items Slot

Use the `action-items` slot to postfix elements to the Text Field input element.<br />
In the example below Buttons are added to implement a custom funcationality for a search field.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextField, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VTextField icon="search" type="search" inputmode="search" label="Search">
		<template #action-items>
			<div class="action-items">
				<VButton size="condensed" aria-label="Record search query">
					<template #icon><VIcon name="microphone-2-line" /></template>
				</VButton>
				<VButton size="condensed" aria-label="Clear field">
					<template #icon><VIcon name="close-line" /></template>
				</VButton>
			</div>
		</template>
	</VTextField>
</template>

<style scoped>
.action-items {
	display: flex;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-field icon="search" type="search" inputmode="search" label="Search">
	<div slot="action-items" class="action-items">
		<vwc-button size="condensed" aria-label="Record search query">
			<vwc-icon slot="icon" name="microphone-2-line"></vwc-icon>
		</vwc-button>
		<vwc-button size="condensed" aria-label="Clear field">
			<vwc-icon slot="icon" name="close-line"></vwc-icon>
		</vwc-button>
	</div>
</vwc-text-field>

<style>
	.action-items {
		display: flex;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Leading Action Items Slot

Use the `leading-action-items` slot to prefix elements to the Text Field input element.<br />
In the example below a Select is added to implement a category filtered search field.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 220px
<script setup lang="ts">
import { VTextField, VSelect, VOption, VDivider } from '@vonage/vivid-vue';
</script>

<template>
	<VTextField label="Search groceries" type="search" inputmode="search">
		<template #leading-action-items>
			<div class="leading-action-items">
				<VSelect aria-label="Options Selector" appearance="ghost" style="--focus-inset: 2px">
					<VOption value="all" text="All" selected />
					<VOption value="fruit" text="Fruit" />
					<VOption value="veg" text="Vegetables" />
				</VSelect>
				<VDivider orientation="vertical" style="height: 20px" />
			</div>
		</template>
	</VTextField>
</template>

<style scoped>
.leading-action-items {
	display: flex;
	align-items: center;
	column-gap: 2px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 220px
<vwc-text-field label="Search groceries" type="search" inputmode="search">
	<div slot="leading-action-items" class="leading-action-items">
		<vwc-select aria-label="Options Selector" appearance="ghost">
			<vwc-option value="all" text="All" selected></vwc-option>
			<vwc-option value="fruit" text="Fruit"></vwc-option>
			<vwc-option value="veg" text="Vegetables"></vwc-option>
		</vwc-select>
		<vwc-divider orientation="vertical"></vwc-divider>
	</div>
</vwc-text-field>

<style>
	.leading-action-items {
		display: flex;
		align-items: center;
		column-gap: 2px;
	}
	vwc-select {
		--focus-inset: 2px;
	}
	vwc-divider {
		height: 20px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Helper Text Slot

The `helper-text` slot allows you to use rich content as the text-field's helper text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextField } from '@vonage/vivid-vue';
</script>

<template>
	<div class="helper-text-slot-demo">
		<VTextField label="EIN" :maxlength="12" char-count pattern="[0-9]*" inputmode="numeric" style="width: 100%">
			<template #helper-text>
				<span><a href="#">Employer Identification Number</a> should be 12 characters</span>
			</template>
		</VTextField>
	</div>
</template>

<style scoped>
.helper-text-slot-demo {
	width: 400px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-field label="EIN" maxlength="12" char-count pattern="[0-9]*" inputmode="numeric">
	<span slot="helper-text"> <a href="#">Employer Identification Number</a> should be 12 characters </span>
</vwc-text-field>

<style>
	vwc-text-field {
		width: 400px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual-Help

The `contextual-help` slot allows you to add the [Contextual Help](/components/contextual-help/) component next to the label.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextField, VContextualHelp } from '@vonage/vivid-vue';
</script>

<template>
	<VTextField label="First name">
		<template #contextual-help>
			<VContextualHelp>This is the contextual help</VContextualHelp>
		</template>
	</VTextField>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-field label="First name">
	<vwc-contextual-help slot="contextual-help">This is the contextual help</vwc-contextual-help>
</vwc-text-field>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name             | Type                                                                       | Description                                                                                                  |
| ---------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **appearance**   | `fieldset` (default), `ghost`                                              | Sets the input element's appearance                                                                          |
| **autocomplete** | `off`, `on`, `<token-list>`                                                | Hint for form autofill feature                                                                               |
| **autofocus**    | `boolean`                                                                  | Indicates that an element should be focused on page load, or when the Dialog that it is part of is displayed |
| **char-count**   | `boolean`                                                                  | Use in combination with `maxlength` to display a character count                                             |
| **disabled**     | `boolean`                                                                  | Whether the input element is disabled                                                                        |
| **error-text**   | `string`                                                                   | The error text for the form element.                                                                         |
| **helper-text**  | `string`                                                                   | The helper text for the form element.                                                                        |
| **inputmode**    | enum: `none`, `text`, `decimal` `numeric`, `tel`, `search`, `email`, `url` | Allows a browser to display an appropriate virtual keyboard                                                  |
| **label**        | `string`                                                                   | Label of the Text Field                                                                                      |
| **list**         | `string`                                                                   | Value of the id attribute of the `<datalist>` of autocomplete options                                        |
| **maxlength**    | `string`                                                                   | Maximum length (number of characters) of `value`                                                             |
| **minlength**    | `string`                                                                   | Minimum length (number of characters) of `value`                                                             |
| **pattern**      | `string`                                                                   | Pattern the `value` must match to be valid                                                                   |
| **placeholder**  | `string`                                                                   | Text that appears in the input element when it has no value set                                              |
| **readonly**     | `boolean`                                                                  | The `value` is not editable                                                                                  |
| **required**     | `boolean`                                                                  | A value is required for the form to be submittable                                                           |
| **size**         | `string`                                                                   | Size (in chars) of the input element                                                                         |
| **scale**        | `normal` (default), `condensed`                                            | Sets the display size of the input element                                                                   |
| **shape**        | `rounded`, `pill`                                                          | Sets the shape of the input element                                                                          |
| **success-text** | `string`                                                                   | The success text for the form element.                                                                       |
| **type**         | enum: `text`, `email`, `password`, `search`, `tel`, `url`                  | Type of input element                                                                                        |
| **value**        | `string`                                                                   | The value of the input element. When specified in the HTML, corresponds to the initial value                 |

</div>

### Slots

<div class="table-wrapper">

| Name                     | Description                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **action-items**         | Add postfix elements to the Text Field input element.                                                              |
| **helper-text**          | Add rich content as the Text Field's helper text.                                                                  |
| **leading-action-items** | Add prefix elements to the Text Field input element.                                                               |
| **contextual-help**      | Allows you to add the [Contextual Help](/components/contextual-help/) component to be displayed next to the label. |

</div>

### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                                                                   |
| ---------- | ------------------------ | ------- | -------- | --------------------------------------------------------------------------------------------- |
| **blur**   | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'blur' event the input loses focus                                             |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the `value` has changed and focus leaves the input element |
| **focus**  | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'focus' event when the input gains focus                                       |
| **input**  | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'input' event immediately when the `value` has changed                         |

</div>

### Methods

<div class="table-wrapper">

| Name               | Description                                                                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **checkValidity**  | Returns `true` if the element's `value` passes validity checks; otherwise, returns `false` and fires an `invalid` event at the element.                                                                 |
| **reportValidity** | Returns `true` if the element's `value` passes validity checks; otherwise, returns `false`, fires an `invalid` event at the element, and (if the event isn't canceled) reports the problem to the user. |
| **select**         | Selects all the text in the text field                                                                                                                                                                  |

</div>
