# Dial Pad

This is a composed component that allows users to enter / dial telephone numbers.

```js
<script type="module">
    import '@vonage/vivid/dial-pad';
</script>
```

```html preview
<vwc-dial-pad></vwc-dial-pad>
```

## CSS Variables

## Events

<div class="table-wrapper">

| Name                | Description                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| `dial`              | Emitted (with the value of the input) when the dial pad is submitted and there is a value in the input |
| `endCall`           | Emitted when the end call button is clicked                                                            |
| `keypadButtonClick` | Emitted when a keypad button is clicked with the value of the button clicked                           |
| `input`             | Emitted from the input element                                                                         |
| `change`            | Emitted from the input element                                                                         |
| `blur`              | Emitted from the input element                                                                         |
| `focus`             | Emitted from the input element                                                                         |
| `noCall`            | Disables call/end call functionality and hides the call/end call button                                |

</div>

## Properties

<div class="table-wrapper">

| Name            | Type      | Default                         | Description                                                                                         |
| --------------- | --------- | ------------------------------- | --------------------------------------------------------------------------------------------------- |
| `feedback-text` | `string`  | `''`                            | Text to be displayed under the input to give extra context to the number that is being displayed.   |
| `value`         | `string`  | `''`                            | Value to be displayed in the input (will be passed through the input-regex before being displayed). |
| `call-active`   | `boolean` | `false`                         | When set to true the end call button replaces the dial button.                                      |
| `pattern`       | `string`  | `^[0-9#*]*$" (key pad buttons)` | Regex string of allowed characters in the input.                                                    |
| `disabled`      | `boolean` | `false`                         | Disables the dialpad interactions. Keypad, input and Call/End call buttons.                         |
| `auto-focus`    | `boolean` | `false`                         | Focuses on the input element when first loaded.                                                     |

</div>

## Accessibility

- The input element should have aria-label, if no visible label is in the design
- The dial / end call buttons should have an aria-label, if it is designed to just show an icon only
- The feedback-text area should have aria-live set to polite, so that it is read out by screen readers when it changes
- Keyboard only users will navigate the buttons and input using the TAB key

