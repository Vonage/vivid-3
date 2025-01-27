## Text

The `text` attribute sets the badge's text.

```html preview
<vwc-badge text="A default badge"></vwc-badge>
```

## Appearance

Set the `appearance` attribute to change the badge's appearance.

```html preview
<vwc-badge appearance="filled" text="filled (default)"></vwc-badge>
<vwc-badge appearance="subtle" text="subtle"></vwc-badge>
<vwc-badge appearance="subtle-light" text="subtle-light"></vwc-badge>
<vwc-badge appearance="duotone" text="duotone"></vwc-badge>
```

## Connotation

The `connotation` attribute controls the purpose of the badge, expressed in its colors.

```html preview
<p>Filled badge with connotation (default)</p>
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
<p>Subtle badge with connotation</p>
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
<p>Subtle-Light badge with connotation</p>
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
<p>Duotone badge with connotation</p>
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

## Shape

Use the `shape` attribute to change the badge's edges.

```html preview
<vwc-badge text="rounded (default)" shape="rounded"></vwc-badge>
<vwc-badge text="pill" shape="pill"></vwc-badge>
```

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/), which can be displayed on the leading (default) or trailing side (`icon-trailing`) of the badge.

Custom icons can be provided using the [icon slot](/components/badge/code/#icon-slot).

```html preview
<vwc-badge
	icon="message-sent-line"
	appearance="filled"
	text="icon leading (default)"
	shape="pill"
></vwc-badge>
<vwc-badge
	icon-trailing
	icon="message-sent-line"
	appearance="filled"
	text="icon trailing"
	shape="pill"
></vwc-badge>
```

### Icon Only

If the `label` is omitted, the badge will be displayed as an _icon-only_ badge.

<vwc-note connotation="information" icon="info-line">

An icon on its own doesn't make a discernible text. An <code>aria-label</code> should be provided to ensure that the user can understand the badge.

</vwc-note>

```html preview
<vwc-badge
	icon="check-line"
	aria-label="checked"
	appearance="filled"
></vwc-badge>
```
