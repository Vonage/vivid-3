# Dial Pad

This is a composed component that allows users to enter / dial telephone numbers.

```js
<script type="module">import '@vonage/vivid/dial-pad';</script>
```

```html preview
<vwc-dial-pad></vwc-dial-pad>
```

## Members

### Value

To set the value of the input, use the `value` attribute to set the text displayed in the input.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-dial-pad value="1234567890"></vwc-dial-pad>
```

### Helper Text

To give extra context to the number that is being displayed, use the `helper-text` attribute to set the text displayed under the input.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-dial-pad
	helper-text="58 Meeting Room - Extension"
	value="4734"
></vwc-dial-pad>
```

### Placeholder

To give a hint to the user of what to enter in the input, use the `placeholder` attribute to set the text displayed in the input.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-dial-pad placeholder="Enter a phone number"></vwc-dial-pad>
```

### Disabled

Use the `disabled` attribute to disable the keypad, input and Call/End call buttons.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-dial-pad disabled></vwc-dial-pad>
```

### Call Active

Use the `call-active` attribute (or `callActive` property) to enable the `end call button` and disable the `dial button`.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-dial-pad call-active value="01146869483"></vwc-dial-pad>
```

### No Call

Use the `no-call` attribute (or `noCall` property) to disable call/end call functionality and hide the call/end call button.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-dial-pad no-call></vwc-dial-pad>
```

### No Input

Use the `no-input` attribute (or `noInput` property) to disable the input field.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-dial-pad no-input></vwc-dial-pad>
```

### Call Button Label

Use the `call-button-label` attribute (or `callButtonLabel` property) to update the call button label.

- Type: `string`
- Default: `Call`

```html preview
<vwc-dial-pad call-button-label="Dial"></vwc-dial-pad>
```

### End Call Button Label

Use the `end-call-button-label` attribute (or `endCallButtonLabel` property) to update the end call button label.

- Type: `string`
- Default: `End Call`

```html preview
<vwc-dial-pad call-active end-call-button-label="End"></vwc-dial-pad>
```

### Pending

Add the `pending` attribute to disable the button and display a processing indicator.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-dial-pad pending></vwc-dial-pad>
```

### Pattern

Use the `pattern` attribute to set the regex string of allowed characters in the input.  
Read more about [vwc-text-field validation](/components/text-field/#validation).  
You can change the error text with the `error-text` attribute.

- Type: `string`
- Default: `^[0-9#*]*$` (key pad buttons)

```html preview
<vwc-dial-pad
	placeholder="Only digits"
	pattern="^[0-9]*$"
	error-text="The input is invalid"
></vwc-dial-pad>
```

## Events

<div class="table-wrapper">

| Name           | Type                        | Bubbles | Composed | Description                                 |
| -------------- | --------------------------- | ------- | -------- | ------------------------------------------- |
| `input`        | `CustomEvent<undefined>`    | Yes     | Yes      | Emitted when the text field value changes   |
| `change`       | `CustomEvent<undefined>`    | Yes     | Yes      | Emitted when the text field value changes   |
| `blur`         | `CustomEvent<undefined>`    | Yes     | Yes      | Emitted when the text field loses focus     |
| `focus`        | `CustomEvent<undefined>`    | Yes     | Yes      | Emitted when the text field receives focus  |
| `keypad-click` | `CustomEvent<HTMLElement> ` | Yes     | Yes      | Emitted when a digit button is clicked      |
| `dial`         | `CustomEvent<undefined> `   | Yes     | Yes      | Emitted when the call button is clicked     |
| `end-call`     | `CustomEvent<undefined> `   | Yes     | Yes      | Emitted when the end call button is clicked |

</div>
