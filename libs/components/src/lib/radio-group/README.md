# Radio-group

Represents a radio-group custom element.

The radio-group should be used to group related `radio` elements in a form.
Use the `name` attribute to give a name to your value.

```js
<script type="module">
  import '@vonage/vivid/radio-group';
</script>
```

## Members

### Label

Use the `label` member to set the group's label.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-radio-group label="Pick a number" name="number">
  <vwc-radio label="1" value="1"></vwc-radio>
  <vwc-radio label="2" value="2"></vwc-radio>
  <vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
```

### Disabled

Toggle the `disabled` member to disable/enable all radio buttons in the radio-group.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-radio-group label="Pick a number" name="number" disabled>
  <vwc-radio label="1" value="1" checked></vwc-radio>
  <vwc-radio label="2" value="2"></vwc-radio>
  <vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
```

### Readonly

Set the `readonly` member to specify that the radio-group is read-only.
A read-only radio-group cannot be modified but can be focused and tabbed into.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-radio-group label="Pick a number" name="number" readonly>
  <vwc-radio label="1" value="1" checked></vwc-radio>
  <vwc-radio label="2" value="2"></vwc-radio>
  <vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
```

### Orientation

Set the `orientation` member to set the orientation (`horizontal` or `vertical`) of the radio-group.

- Type: `horizontal` | `vertical`
- Default: `horizontal`

```html preview
<vwc-radio-group label="Pick a number" name="number" orientation="vertical">
  <vwc-radio label="1" value="1"></vwc-radio>
  <vwc-radio label="2" value="2"></vwc-radio>
  <vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
```
