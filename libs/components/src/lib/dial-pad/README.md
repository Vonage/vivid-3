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
<vwc-dial-pad helper-text="58 Meeting Room - Extension"></vwc-dial-pad>
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
<vwc-dial-pad call-active></vwc-dial-pad>
```

### No Call

Use the `no-call` attribute (or `noCall` property) to disable call/end call functionality and hide the call/end call button.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-dial-pad no-call></vwc-dial-pad>
```

### Pattern

Use the `pattern` attribute to set the regex string of allowed characters in the input.  
Read more about [vwc-text-field validation](/components/text-field/#validation).  
You can change the error text with the `error-text` attribute.

- Type: `string`
- Default: `^[0-9#*]*$` (key pad buttons)

```html preview
<vwc-dial-pad
	placeholder="Only digits are valid"
	pattern="^[0-9]*$"
	error-text="The input is invalid"
></vwc-dial-pad>
```

## Events

<div class="table-wrapper">

| Name           | Description                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| `dial`         | Emitted (with the value of the input) when the dial pad is submitted and there is a value in the input. |
| `end-call`     | Emitted when the end call button is clicked.                                                            |
| `keypad-click` | Emitted when a keypad button is clicked with the value of the button clicked.                           |
| `input`        | Emitted from the input element.                                                                         |
| `change`       | Emitted from the input element.                                                                         |
| `blur`         | Emitted from the input element.                                                                         |
| `focus`        | Emitted from the input element.                                                                         |

</div>
