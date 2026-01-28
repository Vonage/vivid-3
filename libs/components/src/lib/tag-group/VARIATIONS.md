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
	<vwc-tag label="Subtle-Light" appearance="subtle-light"></vwc-tag>
	<vwc-tag label="Duotone" appearance="duotone"></vwc-tag>
</vwc-tag-group>
```

## Connotation

The `connotation` attribute sets the Tag's connotation.
It accepts a subset of predefined values.

```html preview
<p>Subtle tag with connotation</p>
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

## Shape

The `shape` attribute sets Tag's shape.

```html preview
<vwc-tag-group>
	<vwc-tag label="Rounded" shape="rounded"></vwc-tag>
	<vwc-tag label="Pill" shape="pill"></vwc-tag>
</vwc-tag-group>
```

## Icon

The `icon` attribute can set to display an icon from the [icon library](/icons/icons-gallery/) on the component.

The preferred way to add icons is to use the [icon slot](/components/tags/code/#icon-slot).

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

```html preview
<vwc-tag-group>
	<vwc-tag label="Tag with icon">
		<vwc-icon slot="icon" name="pin-line"></vwc-icon>
	</vwc-tag>
</vwc-tag-group>
```

## Disabled

The `disabled` attribute sets the disabled state.

```html preview
<vwc-tag-group>
	<vwc-tag label="Disabled tag" disabled></vwc-tag>
</vwc-tag-group>
```
