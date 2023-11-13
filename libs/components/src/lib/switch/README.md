# Switch

Represents a switch custom element.

```js
<script type="module">import '@vonage/vivid/switch';</script>
```

```html preview
<style>
.grid {display: grid; grid-template-columns: 160px 210px 210px; grid-template-rows: auto auto; gap: 8px; margin-block: 16px;}
</style>
<div class="grid">
<vwc-switch label="unchecked"></vwc-switch>
<vwc-switch disabled label="unchecked + disabled"></vwc-switch>
<vwc-switch readonly label="unchecked + readonly"></vwc-switch>
</div>

<div class="grid">
<vwc-switch checked label="checked"></vwc-switch>
<vwc-switch checked disabled label="checked + disabled"></vwc-switch>
<vwc-switch checked readonly label="checked + readonly"></vwc-switch>
</div>


<div class="grid">
<vwc-switch checked label="checked" connotation="cta"></vwc-switch>
<vwc-switch checked disabled label="checked + disabled" connotation="cta"></vwc-switch>
<vwc-switch checked readonly label="checked + readonly" connotation="cta"></vwc-switch>
</div>

<div class="grid">
<vwc-switch checked label="checked" connotation="alert"></vwc-switch>
<vwc-switch checked disabled label="checked + disabled" connotation="alert"></vwc-switch>
<vwc-switch checked readonly label="checked + readonly" connotation="alert"></vwc-switch>
</div>

<div class="grid">
<vwc-switch checked label="checked" connotation="success"></vwc-switch>
<vwc-switch checked disabled label="checked + disabled" connotation="success"></vwc-switch>
<vwc-switch checked readonly label="checked + readonly" connotation="success"></vwc-switch>
</div>
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
