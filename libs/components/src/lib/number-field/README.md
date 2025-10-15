## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerNumberField } from '@vonage/vivid';

registerNumberField('your-prefix');
```

```html preview
<script type="module">
	import { registerNumberField } from '@vonage/vivid';
	registerNumberField('your-prefix');
</script>

<your-prefix-number-field
	label="First name"
	autofocus
></your-prefix-number-field>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField label="First name" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## About Number Field

The number-field component allows users to enter a number in a text field. It follows the [native number field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number) specification.

The component is not appropriate for values that only happen to consist of numbers but aren't strictly speaking a number, e.g. phone numbers or ZIP codes.
Use the [`text-field`](/components/text-field/) component instead.

### Known issues

- Constraint validation with `minlength` and `maxlength` is not supported.

## Step

- Type: `number`
- Default: `1`

Set the `step` attribute to change the step value for the number field.

```html preview
<vwc-number-field label="With step" step="0.1" value="1.5"></vwc-number-field>
```

## Min

- Type: `number` | `undefined`
- Default: `undefined`

Set the `min` attribute to set the minimum value for the number field.

```html preview
<vwc-number-field label="With minimum" min="100"></vwc-number-field>
```

## Max

- Type: `number` | `undefined`
- Default: `undefined`

Set the `max` attribute to set the maximum value for the number field.

```html preview
<vwc-number-field label="With maximum" max="2"></vwc-number-field>
```

## Slots

### Helper-Text

The `helper-text` slot allows you to use rich content as the number field's helper text.

Example showing a link in the helper text:

```html preview
<vwc-number-field label="Timeout">
	<span slot="helper-text"
		>The timeout in seconds. <a href="#">Guide to setting timeouts</a></span
	>
</vwc-number-field>
```

### Contextual-Help

The `contextual-help` slot allows you to add the [Contextual Help](/components/contextual-help/) component next to the label.

```html preview
<vwc-number-field label="Wanted quantity">
	<vwc-contextual-help slot="contextual-help"
		>How many apples do you need</vwc-contextual-help
	>
</vwc-number-field>
```

## Properties

<div class="table-wrapper">

| Name              | Type                            | Description                                                                                                  |
| ----------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **appearance**    | `fieldset` (default), `ghost`   | Sets the input element's appearance                                                                          |
| **autofocus**     | `boolean`                       | Indicates that an element should be focused on page load, or when the Dialog that it is part of is displayed |
| **disabled**      | `boolean`                       | Whether the input element is disabled                                                                        |
| **error-text**    | `string`                        | Sets error-text on element                                                                                   |
| **label**         | `string`                        | Label of the Text Field                                                                                      |
| **max**           | `string`                        | Maximum value of the element                                                                                 |
| **min**           | `string`                        | Minimum value of the element                                                                                 |
| **placeholder**   | `string`                        | Text that appears in the input element when it has no value set                                              |
| **readonly**      | `boolean`                       | The `value` is not editable                                                                                  |
| **required**      | `boolean`                       | A value is required for the form to be submittable                                                           |
| **size**          | `string`                        | Size (in chars) of the input element                                                                         |
| **scale**         | `normal` (default), `condensed` | Sets the display size of the input element                                                                   |
| **shape**         | `rounded`, `pill`               | Sets the shape of the input element                                                                          |
| **step**          | `number`, `undefined` (default) | Sets to change the step value for the number field.                                                          |
| **success-text**  | `string`                        | Sets success-text on element                                                                                 |
| **value**         | `string`                        | The value of the input element. When specified in the HTML, corresponds to the initial value                 |
| **valueAsNumber** | `number`, `undefined` (default) | get or set the value as a number                                                                             |

</div>

## Slots

<div class="table-wrapper">

| Name                     | Description                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **leading-action-items** | Add rich content as the number-field's helper text                                                                 |
| **contextual-help**      | Allows you to add the [Contextual Help](/components/contextual-help/) component to be displayed next to the label. |

</div>

## Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                              |
| ---------- | ------------------------ | ------- | -------- | -------------------------------------------------------- |
| **input**  | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'input' event when the value has changed  |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the value has changed |

</div>

## Methods

<div class="table-wrapper">

| Name         | Returns | Description                                   |
| ------------ | ------- | --------------------------------------------- |
| **stepUp**   | `void`  | Increase value by step (1 if step is not set) |
| **stepDown** | `void`  | Decrease value by step (1 if step is not set) |

</div>
