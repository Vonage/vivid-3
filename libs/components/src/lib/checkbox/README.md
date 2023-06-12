# Checkbox

Represents a checkbox custom element.
All native attributes of `checkbox` are supported as well as some enhancements.

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

### Connotation
Use the `connotation` attribute to set the checkbox color.

- Type: `'accent'` | `'cta'`
- Default: `'accent'`
- 
```html preview
<vwc-checkbox connotation="accent" ></vwc-checkbox>
<vwc-checkbox connotation="accent" checked></vwc-checkbox>
<vwc-checkbox connotation="cta" ></vwc-checkbox>
<vwc-checkbox connotation="cta" checked></vwc-checkbox>
```

### Helper text

Add the `helper-text` to add some helper text below the checkbox.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-checkbox label='A default checkbox' helper-text="Helper text"></vwc-checkbox>
```

### Success text

Add the `success-text` to add some success text below the checkbox.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-checkbox label='A default checkbox' success-text="Success text"></vwc-checkbox>
```


### Error text

It is possible to force the checkbox error state by setting the `error-text` attribute to a custom error message.
Note that any current error state will be overriden by `error-text` (and, if applicable, restored once it is removed).

- Type: `string`
- Default: `undefined`


```html preview
<vwc-checkbox label='A default checkbox' error-text="Please pick one"></vwc-checkbox>
```

### Disabled

Toggle the `disabled` member to disable/enable the checkbox.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-checkbox disabled></vwc-checkbox>
<vwc-checkbox disabled checked></vwc-checkbox>
```

### Readonly

Set the `readonly` member to specify a checkbox is read-only.
A read-only checkbox cannot be modified (however it can focused and tabbed into).

- Type: `boolean`
- Default: `false`

```html preview
<vwc-checkbox readonly></vwc-checkbox>
<vwc-checkbox readonly checked></vwc-checkbox>
```

### Value

Use the `value` member to set the checkbox's value.

- Type: `string`
- Default: `"on"`

```html preview
<vwc-checkbox value="my-value"></vwc-checkbox>
```
