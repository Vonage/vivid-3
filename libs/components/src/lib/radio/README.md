# Radio

Represents a radio custom element.

Radio components are designed to represent a single value in a set of related ones.
As such, they do not make sense on their own and should always be used inside `radio-group` containers (see [here](https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/) for details).

```js
<script type="module">import '@vonage/vivid/radio';</script>
```

## Members

### Label

Use the `label` member to set the radio's label.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-radio label="A default radio"></vwc-radio>
```

### Checked

Use the `checked` to set the radio's `on`/`off` state.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-radio checked label="A checked radio"></vwc-radio>
```

### Disabled

Toggle the `disabled` member to disable/enable the radio.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-radio disabled label="A disabled radio"></vwc-radio>
```

### Readonly

Set the `readonly` member to specify that the radio is read-only.
A read-only radio cannot be modified but can be focused and tabbed into.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-radio readonly label="A readonly radio"></vwc-radio>
```
