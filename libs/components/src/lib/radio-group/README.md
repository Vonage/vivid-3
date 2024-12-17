# Radio-group

Represents a radio-group custom element.

The radio-group should be used to group related `radio` elements in a form.
Use the `name` attribute to give a name to your value.

```js
<script type="module">import '@vonage/vivid/radio-group';</script>
```

## Members



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



### Value

Use the `value` member to set the radio's value.

- Type: `string`
- Default: `"on"`

```html preview
<vwc-radio value="my-value"></vwc-radio>
```



## Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                                          |
| -------- | ------------------------ | ------- | -------- | ---------------------------------------------------- |
| `change` | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the value changes |

</div>
