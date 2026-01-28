# Tag

## Members

### Label

Add a `label` attribute to add label to the tag.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-tag-group>
	<vwc-tag label="tag"></vwc-tag>
</vwc-tag-group>
```

### Shape

Use the `shape` attribute to change the tag's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-tag-group>
	<vwc-tag label="rounded" shape="rounded"></vwc-tag>
	<vwc-tag label="pill" shape="pill"></vwc-tag>
</vwc-tag-group>
```

### Icon

Use `icon` slot or`icon`_(deprecated)_ attribute to set an icon to the tag.
View list of available icon at the [vivid icons gallery](/icons/icons-gallery/).

- Type: `string`
- Default: `undefined`

```html preview
<vwc-tag-group>
	<vwc-tag label="icon">
		<vwc-icon slot="icon" name="pin-line"></vwc-icon>
	</vwc-tag>
</vwc-tag-group>
```

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

### Appearance

Set the `appearance` attribute to change the tag's appearance.

- Type: `'subtle'` | `'duotone'` | `'subtle-light'`
- Default: `'subtle'`

```html preview
<vwc-tag-group>
	<vwc-tag label="subtle" appearance="subtle"></vwc-tag>
	<vwc-tag label="subtle-light" appearance="subtle-light"></vwc-tag>
	<vwc-tag label="duotone" appearance="duotone"></vwc-tag>
</vwc-tag-group>
```

### Connotation

Set the `connotation` attribute to change the tag's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `announcement` | `alert` | `cta` | `success` | `warning` | `information`
- Default: `'accent'`

#### Subtle tag with connotation

```html preview
<vwc-tag-group>
	<vwc-tag label="Accent" appearance="subtle" connotation="accent"></vwc-tag>
	<vwc-tag label="CTA" appearance="subtle" connotation="cta"></vwc-tag>
	<vwc-tag label="Information" appearance="subtle" connotation="information"></vwc-tag>
	<vwc-tag label="Announcement" appearance="subtle" connotation="announcement"></vwc-tag>
	<vwc-tag label="Success" appearance="subtle" connotation="success"></vwc-tag>
	<vwc-tag label="Warning" appearance="subtle" connotation="warning"></vwc-tag>
	<vwc-tag label="Alert" appearance="subtle" connotation="alert"></vwc-tag>
</vwc-tag-group>
<p>Subtle-Light Tag with connotation</p>
<vwc-tag-group>
	<vwc-tag label="Accent" appearance="subtle-light" connotation="accent"></vwc-tag>
	<vwc-tag label="CTA" appearance="subtle-light" connotation="cta"></vwc-tag>
	<vwc-tag label="Information" appearance="subtle-light" connotation="information"></vwc-tag>
	<vwc-tag label="Announcement" appearance="subtle-light" connotation="announcement"></vwc-tag>
	<vwc-tag label="Success" appearance="subtle-light" connotation="success"></vwc-tag>
	<vwc-tag label="Warning" appearance="subtle-light" connotation="warning"></vwc-tag>
	<vwc-tag label="Alert" appearance="subtle-light" connotation="alert"></vwc-tag>
</vwc-tag-group>
<p>Duotone Tag with connotation</p>
<vwc-tag-group>
	<vwc-tag label="Accent" appearance="duotone" connotation="accent"></vwc-tag>
	<vwc-tag label="CTA" appearance="duotone" connotation="cta"></vwc-tag>
	<vwc-tag label="Information" appearance="duotone" connotation="information"></vwc-tag>
	<vwc-tag label="Announcement" appearance="duotone" connotation="announcement"></vwc-tag>
	<vwc-tag label="Success" appearance="duotone" connotation="success"></vwc-tag>
	<vwc-tag label="Warning" appearance="duotone" connotation="warning"></vwc-tag>
	<vwc-tag label="Alert" appearance="duotone" connotation="alert"></vwc-tag>
</vwc-tag-group>
```

#### Duotone tag with connotation

```html preview
<vwc-tag-group>
	<vwc-tag label="accent" appearance="duotone" connotation="accent"></vwc-tag>
	<vwc-tag label="cta" appearance="duotone" connotation="cta"></vwc-tag>
</vwc-tag-group>
```

### Disabled

Add the `disabled` attribute to disable the tag.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tag-group>
	<vwc-tag label="disabled" disabled></vwc-tag>
</vwc-tag-group>
```

### Selectable

Add the `selectable` attribute to be able to select the tag.
Toggle the `selected` attribute to select and deselect the tag.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tag-group>
	<vwc-tag appearance="subtle" label="First tag" selectable selected></vwc-tag>
	<vwc-tag appearance="subtle-light" label="Second tag" selectable selected></vwc-tag>
	<vwc-tag appearance="duotone" label="Third tag" selectable selected></vwc-tag>
</vwc-tag-group>
```

### Removable

The `removable` attribute sets a remove button. On click it will remove the tag from the DOM.
You can also remove the tag by pressing the `Delete` `Backspace` or key.

Notice that it works only if the tag is `removable` and not `selectable`.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tag-group>
	<vwc-tag label="removable" removable></vwc-tag>
</vwc-tag-group>
```

## Slots

### Icon

Set the `icon` slot to show an icon in the tag.  
If set, the `icon` attribute is ignored.

```html preview
<vwc-tag-group>
	<vwc-tag label="with icon">
		<vwc-icon slot="icon" name="heart-solid" connotation="alert"></vwc-icon>
	</vwc-tag>
</vwc-tag-group>
```

## Events

## Events

<div class="table-wrapper">

| Name              | Type                     | Bubbles | Composed | Description                           |
| ----------------- | ------------------------ | ------- | -------- | ------------------------------------- |
| `selected-change` | `CustomEvent<undefined>` | Yes     | Yes      | Fires when the selected state changes |
| `removed`         | `CustomEvent<undefined>` | Yes     | Yes      | Fires when the tag is removed         |

</div>

## Methods

<div class="table-wrapper">

| Name     | Returns | Description                                                                                                                                                                                                              |
| -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `remove` | `void`  | Removes the tag from the DOM. Fires the `removed` event and removes the tag from the DOM completely. If you have a variable that refers to the tag element make sure to clear it otherwise it might cause a memory leak. |

</div>
