## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/checkbox';
```

or, if you need to use a unique prefix:

```js
import { registerCheckbox } from '@vonage/vivid';

registerCheckbox('your-prefix');
```

```html preview
<script type="module">
	import { registerCheckbox } from '@vonage/vivid';
	registerCheckbox('your-prefix');
</script>

<your-prefix-checkbox label="Use signed Webhooks"></your-prefix-checkbox>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template>
	<VCheckbox label="Use signed Webhooks" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

Checkbox follows [the W3C specification for `<input type="checkbox">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox).

## Controlling State

### Aria Checked

As an alternative to the `checked` and `indeterminate` members, you can use the `aria-checked` attribute to set the Checkbox's checked state. It reflects the `checked` state as well as the `indeterminate` state with the value "mixed".

> The ariaChecked property of the Element interface reflects the value of the aria-checked attribute, which indicates the current "checked" state of checkboxes.
> A string with one of the following values:
> "true" The element is checked.
> "mixed" Indicates a mixed mode value for a tri-state checkbox.
> "false" The element supports being checked but is not currently checked.
> "undefined" The element does not support being checked.
> -- <cite>[mdn][2]</cite>

[2]: https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaChecked#value

<vwc-note connotation="warning" headline="Deprecated behavior: aria-checked">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `aria-checked` prop will no longer set the state (as of 06/25) . It is still functional in the component, but will be updated in a future major release. This will be communicated when it's change becomes a release candidate at the end of the support period.

</vwc-note>

```html preview
<vwc-checkbox aria-checked="true"></vwc-checkbox>
<vwc-checkbox aria-checked="false"></vwc-checkbox>
<vwc-checkbox aria-checked="mixed"></vwc-checkbox>
```

## Slots

### Default

The default slot allows you to use rich content as the Checkbox's label.

```html preview
<vwc-checkbox error-text="You need to accept the Terms of service">
	I agree to
	<a href="https://www.vonage.com/legal/" target="_blank">
		Vonage Terms of Service
	</a>
</vwc-checkbox>
```

### Helper Text

The `helper-text` slot allows you to use rich content as the Checkbox's helper text.

```html preview
<style>
	.checkbox {
		width: 300px;
	}
</style>
<vwc-checkbox class="checkbox" label="Use Signed Webhooks">
	<span slot="helper-text"
		><a href="#">Signed Webhooks</a> are a way to verify that the request is
		coming from Vonage.</span
	>
</vwc-checkbox>
```

## API Reference

### Props

| Name                | Type                                                       | Description                                                                                                                                                                                                                                                                                                                           |
| ------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **success-text**    | `string`                                                   | The success text for the form element.                                                                                                                                                                                                                                                                                                |
| **error-text**      | `string`                                                   | The error text for the form element.                                                                                                                                                                                                                                                                                                  |
| **helper-text**     | `string`                                                   | The helper text for the form element.                                                                                                                                                                                                                                                                                                 |
| **label**           | `string`                                                   | The label for the form element.                                                                                                                                                                                                                                                                                                       |
| **disabled**        | `boolean`                                                  | Sets the element's disabled state. A disabled element will not be included during form submission.                                                                                                                                                                                                                                    |
| **initial-value**   | `string`                                                   | The initial value of the form. This value sets the `value` property only when the `value` property has not been explicitly set.                                                                                                                                                                                                       |
| **value**           | `string`                                                   | The current value of the element. This property serves as a mechanism to set the `value` property through both property assignment and the .setAttribute() method. This is useful for setting the field's value in UI libraries that bind data through the .setAttribute() API and don't support IDL attribute binding.               |
| **name**            | `string`                                                   | The name of the element. This element's value will be surfaced during form submission under the provided name.                                                                                                                                                                                                                        |
| **required**        | `boolean`                                                  | Require the field to be completed prior to form submission.                                                                                                                                                                                                                                                                           |
| **default-checked** | `boolean`                                                  | Provides the default checkedness of the input element                                                                                                                                                                                                                                                                                 |
| **checked**         | `boolean`                                                  | The current checkedness of the element. This property serves as a mechanism to set the `checked` property through both property assignment and the .setAttribute() method. This is useful for setting the field's checkedness in UI libraries that bind data through the .setAttribute() API and don't support IDL attribute binding. |
| **aria-label**      | `string`                                                   |
| **indeterminate**   | `boolean`                                                  | Indicates whether a checkbox is in an indeterminate state.                                                                                                                                                                                                                                                                            |
| **connotation**     | _Enum_:<br/>`accent`<br/>`cta`                             | The connotation the checklist should have.                                                                                                                                                                                                                                                                                            |
| **aria-checked**    | _Enum_:<br/>`true`<br/>`false`<br/>`mixed`<br/>`undefined` | The current checkbox state                                                                                                                                                                                                                                                                                                            |
| **readonly**        | `boolean`                                                  | When true, the control will be immutable by user interaction. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly HTML attribute for more information.                                                                                                                                                          |

### Events

| Name       | Type                     | Bubbles | Composed | Description                             |
| ---------- | ------------------------ | ------- | -------- | --------------------------------------- |
| **input**  | `CustomEvent<undefined>` | Yes     | Yes      | Emitted when the checked state changes. |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Emitted when the checked state changes. |

### Slots

| Name            | Description                                                                    |
| --------------- | ------------------------------------------------------------------------------ |
| **default**     | The default slot allows you to use rich content as the checkbox's label.       |
| **helper-text** | Describes how to use the checkbox. Alternative to the `helper-text` attribute. |
