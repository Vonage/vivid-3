# Checkbox

Represents a checkbox custom element.

```js
<script type="module">
  import '@vonage/vivid/checkbox';
</script>
```

## Members

### Label

Use the `label` member to set the checkbox's label.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-checkbox label='A default checkbox'></vwc-checkbox>
```

### Checked

Toggle the `checked` member to set the checkbox's `on`/`off` state.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-checkbox checked></vwc-checkbox>
```

### Indeterminate

Use the `indeterminate` member to indicate that the checkbox's is neither "on" or "off".

- Type: `boolean`
- Default: `false`

> The indeterminate property sets or returns whether the state of a checkbox has changed.
> Checkboxes actually has three states: true, false and indeterminate which indicates that a checkbox is neither "on" or "off".
> A checkbox cannot be set to indeterminate state by an HTML attribute - it must be set by a JavaScript.
> This state can be used to force the user to check or uncheck the checkbox.
> -- <cite>[w3schools][1]</cite>

[1]: https://www.w3schools.com/jsref/prop_checkbox_indeterminate.asp

```html preview
<vwc-checkbox id="checkbox"></vwc-checkbox>
<script>
  checkbox.indeterminate = true;
</script>
```

### Disabled

Toggle the `disabled` member to disable/enable the checkbox.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-checkbox disabled></vwc-checkbox>
```

### Readonly

Set the `readonly` member to specify a checkbox is read-only.
A read-only checkbox cannot be modified (however it can focused and tabbed into).

- Type: `boolean`
- Default: `false`

```html preview
<vwc-checkbox readonly></vwc-checkbox>
```
