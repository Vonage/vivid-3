# Badge

A small label, generally appearing inside or in proximity to another larger interface component, representing a status, property, or some other metadata.

```js
<script type="module">import '@vonage/vivid/badge';</script>
```

## Members

### Text

Add a `text` attribute to add text to the badge.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-badge text="A default badge"></vwc-badge>
```

### Shape

Use the `shape` attribute to change the badge's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-badge text="rounded" shape="rounded"></vwc-badge>
<vwc-badge text="pill" shape="pill"></vwc-badge>
```

### Icon

Use `icon` to set an icon to the badge.
View the list of available icons at the [vivid icons gallery](/icons/icons-gallery/).

Note: An icon on its own doesn't make a discernible text. An `aria-label` should be provided to ensure that the user can understand the avatar.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-badge appearance="filled" icon="message-sent-line"></vwc-badge>
<vwc-badge
	appearance="filled"
	icon="message-sent-line"
	shape="pill"
></vwc-badge>
```

### Icon with Text

Use the `icon-trailing` attribute to control whether the icon is aligned to the start or end of the badge.

- Type: `boolean`
- Default: `undefined`

```html preview
<vwc-badge appearance="filled" text="icon" icon="check-line"></vwc-badge>
<vwc-badge
	appearance="filled"
	text="icon-trailing"
	icon="check-line"
	icon-trailing
></vwc-badge>
```

### Appearance

Set the `appearance` attribute to change the badge's appearance.

- Type: `'filled'` | `'subtle'` | `'subtle-light'` | `'duotone'`
- Default: `'filled'`

```html preview
<vwc-badge text="filled" appearance="filled"></vwc-badge>
<vwc-badge text="subtle" appearance="subtle"></vwc-badge>
<vwc-badge text="subtle-light" appearance="subtle-light"></vwc-badge>
<vwc-badge text="duotone" appearance="duotone"></vwc-badge>
```

### Connotation

Set the `connotation` attribute to change the badge's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `'cta'` | `'success'` | `'alert'` | `'warning'` | `'information'` | `'announcement'`
- Default: `'accent'`

#### Filled badge with connotation

```html preview
<vwc-badge text="accent" connotation="accent" appearance="filled"></vwc-badge>
<vwc-badge text="cta" connotation="cta" appearance="filled"></vwc-badge>
<vwc-badge
	text="information"
	connotation="information"
	appearance="filled"
></vwc-badge>
<vwc-badge
	text="announcement"
	connotation="announcement"
	appearance="filled"
></vwc-badge>
<vwc-badge text="success" connotation="success"></vwc-badge>
<vwc-badge text="warning" connotation="warning"></vwc-badge>
<vwc-badge text="alert" connotation="alert"></vwc-badge>
```

#### Subtle badge with connotation

```html preview
<vwc-badge text="accent" appearance="subtle" connotation="accent"></vwc-badge>
<vwc-badge text="cta" appearance="subtle" connotation="cta"></vwc-badge>
<vwc-badge
	text="information"
	appearance="subtle"
	connotation="information"
></vwc-badge>
<vwc-badge
	text="announcement"
	appearance="subtle"
	connotation="announcement"
></vwc-badge>
<vwc-badge text="success" appearance="subtle" connotation="success"></vwc-badge>
<vwc-badge text="warning" appearance="subtle" connotation="warning"></vwc-badge>
<vwc-badge text="alert" appearance="subtle" connotation="alert"></vwc-badge>
```

#### Subtle-Light badge with connotation

```html preview
<vwc-badge
	text="accent"
	appearance="subtle-light"
	connotation="accent"
></vwc-badge>
<vwc-badge text="cta" appearance="subtle-light" connotation="cta"></vwc-badge>
<vwc-badge
	text="information"
	appearance="subtle-light"
	connotation="information"
></vwc-badge>
<vwc-badge
	text="announcement"
	appearance="subtle-light"
	connotation="announcement"
></vwc-badge>
<vwc-badge
	text="success"
	appearance="subtle-light"
	connotation="success"
></vwc-badge>
<vwc-badge
	text="warning"
	appearance="subtle-light"
	connotation="warning"
></vwc-badge>
<vwc-badge
	text="alert"
	appearance="subtle-light"
	connotation="alert"
></vwc-badge>
```

#### Duotone badge with connotation

```html preview
<vwc-badge text="accent" appearance="duotone" connotation="accent"></vwc-badge>
<vwc-badge text="cta" appearance="duotone" connotation="cta"></vwc-badge>
<vwc-badge
	text="information"
	appearance="duotone"
	connotation="information"
></vwc-badge>
<vwc-badge
	text="announcement"
	appearance="duotone"
	connotation="announcement"
></vwc-badge>
<vwc-badge
	text="success"
	appearance="duotone"
	connotation="success"
></vwc-badge>
<vwc-badge
	text="warning"
	appearance="duotone"
	connotation="warning"
></vwc-badge>
<vwc-badge text="alert" appearance="duotone" connotation="alert"></vwc-badge>
```

## Slots

### Icon

Set the `icon` slot to add an icon to the badge.
If set, the `icon` attribute is ignored.

```html preview
<vwc-badge text="with icon slot" appearance="filled">
	<vwc-icon
		slot="icon"
		name="check-circle-solid"
		connotation="success"
	></vwc-icon>
</vwc-badge>
```

## Use Cases

### Trim Text

```html preview
<vwc-badge text="with overflowing text" style="inline-size: 60px;"></vwc-badge>
```

### Custom Width

```html preview
<vwc-badge text="with min-width" style="min-width: 300px;"></vwc-badge>
```

## Accessibility

Badges are informative elements and cannot be interacted with.

If you're looking for an interactable component, consider using a [tag](/components/tag/) instead.
