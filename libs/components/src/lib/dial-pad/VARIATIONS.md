## Default Configuration

```html preview
<vwc-dial-pad aria-label="Dial a telephone number"></vwc-dial-pad>
```

## Labelling

### Helper Text

The `helper-text` attribute allows you give extra context to the number that is being displayed. The helper text is displayed under the phone number input element.

```html preview
<vwc-dial-pad
	helper-text="58 Meeting Room - Extension"
	value="1158"
></vwc-dial-pad>
```

### Call Button Label

Use the `call-button-label` attribute to change the call button label.

```html preview
<vwc-dial-pad call-button-label="Dial"></vwc-dial-pad>
```

### End Call Button Label

Use the `end-call-button-label` attribute to change the end call button label.

```html preview
<vwc-dial-pad end-call-button-label="End" call-active></vwc-dial-pad>
```

### Placeholder

To give a hint to the user of what to enter in the input, use the `placeholder` attribute to set the text displayed in the input.

```html preview
<vwc-dial-pad placeholder="Enter number"></vwc-dial-pad>
```

## Call Active

The `call-active` attribute enables the "end call button" and hides the "dial button".

```html preview
<vwc-dial-pad call-active value="01146869483"></vwc-dial-pad>
```

## Pending

The `pending` attribute disables the call button and displays a processing indicator.

```html preview
<vwc-dial-pad pending></vwc-dial-pad>
```

## Disabled

The `disabled` attribute controls the disabled state of the keypad, input and Call/End call buttons.

```html preview
<vwc-dial-pad disabled></vwc-dial-pad>
```

## Removing Elements

### No Call

The `no-call` attribute removes call/end call functionality and hides the call/end call button.

```html preview
<vwc-dial-pad no-call></vwc-dial-pad>
```

### No Input

The `no-input` attribute removes the input field.

```html preview
<vwc-dial-pad no-input></vwc-dial-pad>
```
