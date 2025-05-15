## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/dial-pad';
```

or, if you need to use a unique prefix:

```js
import { registerDialPad } from '@vonage/vivid';

registerDialPad('your-prefix');
```

```html preview 500px
<script type="module">
	import { registerDialPad } from '@vonage/vivid';
	registerDialPad('your-prefix');
</script>

<your-prefix-dial-pad></your-prefix-dial-pad>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Value

To set the value of the input, use the `value` attribute to set the text displayed in the input.

```html preview
<vwc-dial-pad value="1234567890"></vwc-dial-pad>
```

## Pattern

Use the `pattern` attribute to set the regex string of allowed characters in the input.  
Read more about [vwc-text-field validation](/components/text-field/#validation).
It defaults to `^[0-9#*]*$` (key pad buttons).

```html preview
<vwc-dial-pad placeholder="Only digits" pattern="^[0-9]*$"></vwc-dial-pad>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                      | Type                             | Description                                                      |
| ------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| **call-active**           | `boolean`                        | Controls the active state of the call                            |
| **call-button-label**     | `string` (default is `Call`)     | Controls the call button label                                   |
| **disabled**              | `boolean`                        | Controls the disabled state of the dial pad                      |
| **end-call-button-label** | `string` (default is `End call`) | Controls the end call button label                               |
| **helper-text**           | `string`                         | Controls the helper text displayed below the phone input element |
| **no-call**               | `boolean`                        | Removes the call button and functionality                        |
| **no-input**              | `boolean`                        | Removes the phone input element                                  |
| **pattern**               | `regExp` (default `^[0-9#*]*$`)  | Regular expression to validate the value of the input element    |
| **pending**               | `boolean`                        | Controls the pending state                                       |
| **value**                 | `string`                         | Value of the phone input element                                 |

</div>

### Events

<div class="table-wrapper">

| Name             | Type                        | Bubbles | Composed | Description                                      |
| ---------------- | --------------------------- | ------- | -------- | ------------------------------------------------ |
| **input**        | `CustomEvent<undefined>`    | Yes     | Yes      | Emitted when the text field value changes        |
| **change**       | `CustomEvent<undefined>`    | Yes     | Yes      | Emitted when the text field value changes        |
| **blur**         | `CustomEvent<undefined>`    | Yes     | Yes      | Emitted when the Dial Pad loses focus            |
| **focus**        | `CustomEvent<undefined>`    | Yes     | Yes      | Emitted when the Dial Pad children receive focus |
| **keypad-click** | `CustomEvent<HTMLElement> ` | Yes     | Yes      | Emitted when a digit button is clicked           |
| **dial**         | `CustomEvent<undefined> `   | Yes     | Yes      | Emitted when the call button is clicked          |
| **end-call**     | `CustomEvent<undefined> `   | Yes     | Yes      | Emitted when the end call button is clicked      |

</div>
