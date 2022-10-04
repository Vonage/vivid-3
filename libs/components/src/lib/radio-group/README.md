# Radio-group

Represents a radio-group custom element.

The radio-group

```js
<script type="module">import '@vonage/vivid/radio-group';</script>
```

## Members

### Label

Use the `label` member to set the group's label.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-radio-group label="Some radio group" name="formname">
    <vwc-radio label="one" value="one"></vwc-radio>
    <vwc-radio label="ONE IN UPPERCASE" value="one"></vwc-radio>
    <vwc-radio label="also 1" value="one"></vwc-radio>
</vwc-radio-group>
```
