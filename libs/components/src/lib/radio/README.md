# Radio

Represents a radio custom element.

Radio components are designed to represent a single value in a set of related ones.
As such, they do not make sense on their own and should always be used inside `radio-group` containers (see [here](https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/) for details).
Their `value` member contains the value that will be associated to the component name during form submission (i.e., the `radio-group`'s name).

```js
<script type="module">
  import '@vonage/vivid/radio';
</script>
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
<vwc-radio checked></vwc-radio>
```

### Disabled

Toggle the `disabled` member to disable/enable the radio.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-radio disabled></vwc-radio>
<vwc-radio disabled checked></vwc-radio>
```
