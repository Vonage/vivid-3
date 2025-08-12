## Labelling

### Label

The `label` attribute adds the label text for the default action.

```html preview
<vwc-split-button
	label="A default split button"
	appearance="filled"
></vwc-split-button>
```

### Secondary Action Label

By default, the secondard action is given a locallized `aria-label` of "Show more actions", this can be overriden using the `indicator-aria-label` attribute. This will be read by screen-readers to clarify the purpose of the action.

```html preview
<vwc-split-button
	indicator-aria-label="Secondary action"
	label="A default split button"
	appearance="filled"
></vwc-split-button>
```

## Icons

### Default Action Icon

Icons can be provided using the [icon slot](/components/button/code/#icon-slot) or
the `icon`_(deprecated)_ attribute([icon library](/icons/icons-gallery/)) to display an icon for the default action.

```html preview
<vwc-split-button
	appearance="filled"
	aria-label="Send Message"
	indicator-aria-label="More actions"
>
	<vwc-icon slot="icon" name="compose-line"></vwc-icon>
</vwc-split-button>
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
<div class="container">
	<vwc-split-button label="ghost" appearance="ghost"></vwc-split-button>
	<vwc-split-button label="filled" appearance="filled"></vwc-split-button>
	<vwc-split-button label="outlined" appearance="outlined"></vwc-split-button>
	<vwc-split-button
		label="outlined-light"
		appearance="outlined-light"
	></vwc-split-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Connotation

The `connotation` attribute sets the Split Button's connotation.

```html preview
<div class="container">
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
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Shape

The `shape` attribute sets the style of the Split Button's edges.

```html preview
<div class="container">
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
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Size

The `size` attribute sets the Split Button to one of the predefined block sizes.

```html preview
<div class="container">
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
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Disabled

The `disabled` attribute sets the disabled state of the Split Button.

```html preview
<div class="container">
	<vwc-split-button
		appearance="ghost"
		label="ghost"
		disabled
	></vwc-split-button>
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
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```
