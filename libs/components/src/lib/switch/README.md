# Switch

Represents a switch custom element.

```js
<script type="module">import '@vonage/vivid/switch';</script>
```

```html preview
<vwc-switch></vwc-switch>
```

## Members

### Checked

Use `checked` in order to set the state of the switch.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-switch checked></vwc-switch>
```

### Disabled

Use the `disabled` attribute to show a disabled state of the switch.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-switch disabled></vwc-switch>
<vwc-switch disabled checked></vwc-switch>
```

### Readonly

Use the `readonly` attribute to show a readonly state of the switch.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-switch readonly></vwc-switch>
<vwc-switch readonly checked></vwc-switch>
```

### Value

Use `value` in order to set the value of the switch. Mainly used inside a form that will receive the value on submit.

- Type: `string`
- Default: `"on"`

```html
<vwc-switch value="my-value"></vwc-switch>
```

### Name

Use `name` in order to set the name of the switch. Mainly used inside a form that will receive the value on submit.

- Type: `string`
- Default: `undefined`

```html
<vwc-switch name="my-name"></vwc-switch>
```

### Label

Use `label` in order to set the label of the switch.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-switch label="my-label"></vwc-switch>
```

### Connotation

Use `connotation` in order to set the connotation of the switch.

- Type: `'primary'`, `'cta'`, `'success'`, `'alert'`
- Default: `primary`

```html preview
<vwc-switch connotation="primary" checked ></vwc-switch>
<vwc-switch connotation="cta" checked ></vwc-switch>
<vwc-switch connotation="success" checked ></vwc-switch>
<vwc-switch connotation="alert" checked ></vwc-switch>
```

## Custom Colors

```html preview variables
<vwc-switch connotation="$CONNOTATION"></vwc-switch>
```
