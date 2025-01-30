## Labelling

### Label

The `label` attribute adds the label text for the default action.

### Secondary Action Label

By default, the secondard action is given a locallized `aria-label` of "Show more actions", this can be overriden using the `indicator-aria-label` attribute. This will be read by screen-readers to clarify the purpose of the action.

```html preview
<vwc-split-button
	label="A default split button"
	indicator-aria-label="Secondary action"
	appearance="filled"
></vwc-split-button>
```

## Icons

### Default Action Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/) for the default action.

Custom icons can be provided using the [icon slot](/components/button/code/#icon-slot).

```html preview
<vwc-split-button
	icon="compose-line"
	appearance="filled"
	aria-label="Send Message"
	indicator-aria-label="More actions"
></vwc-split-button>
```

### Split Indicator Icon

The `split-indicator` attribute to sets the icon for the secondary action button.
View list of available icon at the [vivid icons gallery](/icons/icons-gallery/).

```html preview
<vwc-split-button
	split-indicator="more-vertical-solid"
	indicator-aria-label="More actions"
	appearance="filled"
	label="Split Indicator"
></vwc-split-button>
```

## Appearance

The `appearance` sets the Split Button's appearance.

```html preview
<vwc-split-button label="ghost" appearance="ghost"></vwc-split-button>
<vwc-split-button label="filled" appearance="filled"></vwc-split-button>
<vwc-split-button label="outlined" appearance="outlined"></vwc-split-button>
```

## Connotation

The `connotation` attribute sets the Split Button's connotation.

```html preview
<vwc-split-button
	appearance="filled"
	label="accent"
	connotation="accent"
></vwc-split-button>
<vwc-split-button
	appearance="filled"
	label="cta"
	connotation="cta"
></vwc-split-button>
<vwc-split-button
	appearance="filled"
	label="announcement"
	connotation="announcement"
></vwc-split-button>
<vwc-split-button
	appearance="filled"
	label="success"
	connotation="success"
></vwc-split-button>
<vwc-split-button
	appearance="filled"
	label="alert"
	connotation="alert"
></vwc-split-button>
```

## Shape

The `shape` attribute sets the style of the Split Button's edges.

```html preview
<vwc-split-button
	appearance="filled"
	label="rounded"
	shape="rounded"
></vwc-split-button>
<vwc-split-button
	appearance="filled"
	label="pill"
	shape="pill"
></vwc-split-button>
```

## Size

The `size` attribute sets the Split Button to one of the predefined block sizes.

```html preview
<vwc-split-button
	appearance="filled"
	label="super-condensed"
	size="super-condensed"
></vwc-split-button>
<vwc-split-button
	appearance="filled"
	label="condensed"
	size="condensed"
></vwc-split-button>
<vwc-split-button
	appearance="filled"
	label="normal"
	size="normal"
></vwc-split-button>
<vwc-split-button
	appearance="filled"
	label="expanded"
	size="expanded"
></vwc-split-button>
```

## Disabled

The `disabled` attribute sets the disabled state of the Split Button.

```html preview
<vwc-split-button appearance="ghost" label="ghost" disabled></vwc-split-button>
<vwc-split-button
	appearance="filled"
	label="filled"
	disabled
></vwc-split-button>
<vwc-split-button
	appearance="outlined"
	label="outlined"
	disabled
></vwc-split-button>
```
