# Radio

Represents a radio custom element.

Radio components are designed to represent a single value in a set of related ones.
As such, they do not make sense on their own and should always be used inside `radio-group` containers (see [here](https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/) for details).
Their `value` member contains the value that will be associated to the component name during form submission (i.e., the `radio-group`'s name).

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
<vwc-radio checked></vwc-radio>
```

### Connotation

Use the `connotation` attribute to set the radio color.

- Type: `'accent'` | `'cta'`
- Default: `'accent'`

```html preview
<vwc-radio connotation="accent"></vwc-radio>
<vwc-radio connotation="accent" checked></vwc-radio>
<vwc-radio connotation="cta"></vwc-radio>
<vwc-radio connotation="cta" checked></vwc-radio>
```

### Disabled

Toggle the `disabled` member to disable/enable the radio.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-radio disabled></vwc-radio> <vwc-radio disabled checked></vwc-radio>
```

### Value

Use the `value` member to set the radio's value.

- Type: `string`
- Default: `"on"`

```html preview
<vwc-radio value="my-value"></vwc-radio>
```

## Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                                                |
| -------- | ------------------------ | ------- | -------- | ---------------------------------------------------------- |
| `change` | `CustomEvent<undefined>` | Yes     | Yes      | Emits a custom change event when the checked state changes |

</div>

## Accessibility

- If a label is not provided either through the `label` attribute, then the checkbox needs an accessible label.
- It is then the consumer's concern to add `aria-label` to the `checkbox` element.
