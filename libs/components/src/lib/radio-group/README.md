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
    <vwc-radio label="one" value="one">One</vwc-radio>
    <vwc-radio label="two" value="two">Two</vwc-radio>
    <vwc-radio label="three" value="three">Three</vwc-radio>
</vwc-radio-group>
```
