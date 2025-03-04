## Labelling

### Label Text

Use the `label` attribute to provide a visible label for the Checkbox.

```html preview
<vwc-checkbox label="Use signed Webhooks"></vwc-checkbox>
```

### Helper Text

Use the `helper-text` attribute or slot to provide additional context or instructions for the Checkbox.

```html preview
<vwc-checkbox
	label="Use signed Webhooks"
	helper-text="Signed Webhooks are a way to verify that the request is coming from Vonage."
></vwc-checkbox>
```

## States

### Checked

The `checked` property or `current-checked` attribute controls the checked state of the Checkbox.

```html preview
<vwc-checkbox label="Use signed Webhooks" checked></vwc-checkbox>
```

### Indeterminate

Checkboxes support an indeterminate state, which indicates that the Checkbox is neither checked nor unchecked.

The indeterminate state is mainly used to implement Select all / none functionality.

Use the `indeterminate` property to set the Checkbox to indeterminate.

```html preview
<vwc-checkbox label="Select all"></vwc-checkbox>

<script>
	document.querySelector('vwc-checkbox').indeterminate = true;
</script>
```

### Disabled

Toggle the `disabled` member to disable/enable the Checkbox.

```html preview
<vwc-checkbox disabled></vwc-checkbox>
<vwc-checkbox disabled checked></vwc-checkbox>
```

### Read Only

Set the `readonly` member to specify a Checkbox is read-only.
A read-only Checkbox cannot be modified (however it can be focused and tabbed into).

```html preview
<vwc-checkbox readonly></vwc-checkbox>
<vwc-checkbox readonly checked></vwc-checkbox>
```

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

```html preview
<vwc-checkbox
	label="I agree to the terms and conditions"
	error-text="You must agree to the terms and conditions to proceed"
></vwc-checkbox>
```

### Success Text

The `success-text` attribute provides a custom success message. Any current error state will be overridden by `success-text`.

```html preview
<vwc-checkbox
	label="A default checkbox"
	success-text="Success text"
	checked
></vwc-checkbox>
```

## Connotation

Use the `connotation` attribute to set the Checkbox color.

```html preview
<vwc-checkbox connotation="accent"></vwc-checkbox>
<vwc-checkbox connotation="accent" checked></vwc-checkbox>
<vwc-checkbox connotation="cta"></vwc-checkbox>
<vwc-checkbox connotation="cta" checked></vwc-checkbox>
```
