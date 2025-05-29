# Tree Item

Represents a tree-item custom element.
Read more about [vwc-tree-view](/components/tree-view/).

```js
<script type="module">import '@vonage/vivid/tree-item';</script>
```

## Members

### Text

- Type: `string`
- Default: `undefined`

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item"></vwc-tree-item>
</vwc-tree-view>
```

### Icon

Use [icon slot](/components/tree-item/#icon-1) or `icon`_(deprecated)_ attribute to set an icon to the tree item.
Check out the [vivid icons gallery](/icons/icons-gallery/) for a list of available icons.

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

- Type: `string`
- Default: `undefined`

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item" icon="chat-line"></vwc-tree-item>
</vwc-tree-view>
```

### Selected

Add the `selected` attribute to select the tree item.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item" selected></vwc-tree-item>
</vwc-tree-view>
```

### Disabled

Add the `disabled` attribute to disable the tree item.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item" disabled></vwc-tree-item>
</vwc-tree-view>
```

### Expanded

Use the `expanded` attribute to set the tree-item's open state.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item" expanded>
		<vwc-tree-item slot="item" text="Tree Item 1 - 1"></vwc-tree-item>
	</vwc-tree-item>
</vwc-tree-view>
```

## Slots

### Item

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item 1">
		<vwc-tree-item slot="item" text="Tree Item 1 - 1"></vwc-tree-item>
	</vwc-tree-item>
	<vwc-tree-item text="Tree Item 2"></vwc-tree-item>
</vwc-tree-view>
```

### Icon

Set the `icon` slot to show an icon before the tree item's text.
If set, the `icon` attribute is ignored.

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item">
		<vwc-icon
			slot="icon"
			name="check-circle-solid"
			connotation="success"
		></vwc-icon>
	</vwc-tree-item>
</vwc-tree-view>
```

## Events

<div class="table-wrapper">

| Name              | Type                       | Bubbles | Composed | Description                                                            |
| ----------------- | -------------------------- | ------- | -------- | ---------------------------------------------------------------------- |
| `expanded-change` | `CustomEvent<HTMLElement>` | Yes     | Yes      | Fires a custom 'expanded-change' event when the expanded state changes |
| `selected-change` | `CustomEvent<HTMLElement>` | Yes     | Yes      | Fires a custom 'selected-change' event when the selected state changes |

</div>
