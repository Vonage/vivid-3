**Tags** should be wrapped by the **Tag Group** component to provide the correct layout and also semantic meaning.

## Label

The `label` attribute adds label text to the **Tag**.

```html preview
<vwc-tag-group>
	<vwc-tag label="Tag label"></vwc-tag>
</vwc-tag-group>
```

## Selectable

The `selectable` attribute enables the selectable behaviour. Use the `selected` attribute to mark the Tag as selected.

```html preview
<vwc-tag-group>
	<vwc-tag selectable label="Selectable tag"></vwc-tag>
	<vwc-tag selected selectable label="Selected tag"></vwc-tag>
</vwc-tag-group>
```

## Removable

The `removable` attribute enables the removable behaviour. Clicking the remove icon removes the Tag from the Tag Group

```html preview
<vwc-tag-group>
	<vwc-tag removable label="Removable tag 1"></vwc-tag>
	<vwc-tag removable label="Removable tag 2"></vwc-tag>
</vwc-tag-group>
```

## Appearance

The `appearance` attribute sets the Tag's appearance.

```html preview
<vwc-tag-group>
	<vwc-tag label="Subtle" appearance="subtle"></vwc-tag>
	<vwc-tag label="Duotone" appearance="duotone"></vwc-tag>
</vwc-tag-group>
```

## Connotation

The `connotation` attribute sets the Tag's connotation.
It accepts a subset of predefined values.

### Subtle Tag With Connotation

```html preview
<vwc-tag-group>
	<vwc-tag label="Accent" appearance="subtle" connotation="accent"></vwc-tag>
	<vwc-tag label="CTA" appearance="subtle" connotation="cta"></vwc-tag>
</vwc-tag-group>
```

### Duotone Tag With Connotation

```html preview
<vwc-tag-group>
	<vwc-tag label="Accent" appearance="duotone" connotation="accent"></vwc-tag>
	<vwc-tag label="CTA" appearance="duotone" connotation="cta"></vwc-tag>
</vwc-tag-group>
```

## Shape

The `shape` attribute sets Tag's shape.

```html preview
<vwc-tag-group>
	<vwc-tag label="Rounded" shape="rounded"></vwc-tag>
	<vwc-tag label="Pill" shape="pill"></vwc-tag>
</vwc-tag-group>
```

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/), which is displayed on the leading side of the Tag.

Custom icons can be provided using the [icon slot](/components/tag-and-tag-group/code/#icon-slot).

```html preview
<vwc-tag-group>
	<vwc-tag label="Tag with icon" icon="pin-line"></vwc-tag>
</vwc-tag-group>
```

## Disabled

The `disabled` attribute sets the disabled state.

```html preview
<vwc-tag-group>
	<vwc-tag label="Disabled tag" disabled></vwc-tag>
</vwc-tag-group>
```
