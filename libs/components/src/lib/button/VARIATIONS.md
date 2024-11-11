## Label

The `label` attribute controls button's label text.

```html preview
	<vwc-button label="Button Text"></vwc-button>
```

## Appearance

The `appearance` attribute controls the style of button displayed.

```html preview 72px
<div class="container">
	<vwc-button appearance="filled" label="Filled"></vwc-button>
	<vwc-button appearance="outlined" label="Outlined"></vwc-button>
	<vwc-button appearance="outlined-light" label="Outlined Light"></vwc-button>
	<vwc-button appearance="ghost" label="Ghost"></vwc-button>
	<vwc-button appearance="ghost-light" label="Ghost Light"></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

<vwc-note connotation="information" icon="info-line">
	<p>The <code>outlined-light</code> and <code>ghost-light</code> appearances are the same as <code>outlined</code> and <code>ghost</code> except their background colours have opacity when hovered.</p>
</vwc-note>

## Connotation

The `connotation` attribute controls the purpose of the button, expressed in it's colours.

```html preview 300px
<div class="container">
	<vwc-button
		connotation="accent"
		appearance="filled"
		label="Accent"
	></vwc-button>
	<vwc-button
		connotation="accent"
		appearance="outlined"
		label="Accent"
	></vwc-button>
	<vwc-button
		connotation="accent"
		appearance="outlined-light"
		label="Accent"
	></vwc-button>
	<vwc-button
		connotation="accent"
		appearance="ghost"
		label="Accent"
	></vwc-button>
	<vwc-button
		connotation="accent"
		appearance="ghost-light"
		label="Accent"
	></vwc-button>
</div>
<div class="container">
	<vwc-button connotation="cta" appearance="filled" label="CTA"></vwc-button>
	<vwc-button connotation="cta" appearance="outlined" label="CTA"></vwc-button>
	<vwc-button
		connotation="cta"
		appearance="outlined-light"
		label="CTA"
	></vwc-button>
	<vwc-button connotation="cta" appearance="ghost" label="CTA"></vwc-button>
	<vwc-button
		connotation="cta"
		appearance="ghost-light"
		label="CTA"
	></vwc-button>
</div>
<div class="container">
	<vwc-button
		connotation="announcement"
		appearance="filled"
		label="Announcement"
	></vwc-button>
	<vwc-button
		connotation="announcement"
		appearance="outlined"
		label="Announcement"
	></vwc-button>
	<vwc-button
		connotation="announcement"
		appearance="outlined-light"
		label="Announcement"
	></vwc-button>
	<vwc-button
		connotation="announcement"
		appearance="ghost"
		label="Announcement"
	></vwc-button>
	<vwc-button
		connotation="announcement"
		appearance="ghost-light"
		label="Announcement"
	></vwc-button>
</div>
<div class="container">
	<vwc-button
		connotation="success"
		appearance="filled"
		label="Success"
	></vwc-button>
	<vwc-button
		connotation="success"
		appearance="outlined"
		label="Success"
	></vwc-button>
	<vwc-button
		connotation="success"
		appearance="outlined-light"
		label="Success"
	></vwc-button>
	<vwc-button
		connotation="success"
		appearance="ghost"
		label="Success"
	></vwc-button>
	<vwc-button
		connotation="success"
		appearance="ghost-light"
		label="Success"
	></vwc-button>
</div>
<div class="container">
	<vwc-button
		connotation="alert"
		appearance="filled"
		label="Alert"
	></vwc-button>
	<vwc-button
		connotation="alert"
		appearance="outlined"
		label="Alert"
	></vwc-button>
	<vwc-button
		connotation="alert"
		appearance="outlined-light"
		label="Alert"
	></vwc-button>
	<vwc-button connotation="alert" appearance="ghost" label="Alert"></vwc-button>
	<vwc-button
		connotation="alert"
		appearance="ghost-light"
		label="Alert"
	></vwc-button>
</div>

<style>
	.container {
		display: flex;
		flex-basis: 100%;
		width: 100%;
		gap: 8px;
		margin-block-end: 16px;
	}
</style>
```

## Icons

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/), which can be displayed on the leading (default) or trailing side (`icon-trailing`) of the button.

Custom icons can be provided using the [icon slot](/components/button/code/#icon-slot).

```html preview 72px
<div class="container">
	<vwc-button
		appearance="outlined"
		label="Copy document"
		icon="copy-line"
	></vwc-button>
	<vwc-button
		appearance="outlined"
		label="Continue"
		icon="chevron-right-line"
		icon-trailing
	></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

### Icon Only

If the `label` is omitted, the button will be displayed as an _icon-only_ button.

```html preview 72px
<vwc-tooltip text="Send Message" placement="right-start">
	<vwc-button
		slot="anchor"
		appearance="filled"
		connotation="cta"
		icon="message-sent-line"
		aria-label="Send Message"
	></vwc-button>
</vwc-tooltip>
```

### Stacked

When using an icon, the `stacked` attribute causes the button to be displayed in a stacked format. This layout is only available with the 'rounded' [shape](#shape).

```html preview
<div class="container">
	<vwc-button
		stacked
		icon="compose-line"
		appearance="filled"
		label="Leading"
	></vwc-button>
	<vwc-button
		stacked
		icon="compose-line"
		appearance="filled"
		label="Trailing"
		icon-trailing
	></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Size

The `size` attribute controls the size of the button.

```html preview 100px
<div class="container">
	<vwc-button
		size="super-condensed"
		appearance="filled"
		label="Super-condensed"
	></vwc-button>
	<vwc-button
		size="condensed"
		appearance="filled"
		label="Condensed"
	></vwc-button>
	<vwc-button size="normal" appearance="filled" label="Normal"></vwc-button>
	<vwc-button size="expanded" appearance="filled" label="Expanded"></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Shape

The `shape` attribute controls the shape of the button.

```html preview 72px
<div class="container">
	<vwc-button appearance="filled" label="Rounded shape"></vwc-button>
	<vwc-button appearance="filled" label="Pill shape" shape="pill"></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Pending

The `pending` attribute triggers the pending state, which indicates that the action is being processed.

```html preview
<div class="container">
	<vwc-button
		icon="compose-line"
		appearance="filled"
		label="Pending"
		pending
	></vwc-button>
	<vwc-button
		icon="compose-line"
		appearance="outlined"
		label="Pending"
		pending
	></vwc-button>
	<vwc-button
		icon="compose-line"
		appearance="ghost"
		label="Pending"
		pending
	></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

<vwc-note connotation="information" icon="info-line">
	
The spinner is not displayed when using the `super-condensed` size.

</vwc-note>

## Disabled

The `disabled` attribute disables the buttons and indicates that the action is not available.

```html preview 72px
<div class="container">
	<vwc-button appearance="filled" label="Disabled" disabled></vwc-button>
	<vwc-button appearance="outlined" label="Disabled" disabled></vwc-button>
	<vwc-button appearance="ghost" label="Disabled" disabled></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Active

The `active` attribute causes the button to appear in its active state. Use it to indicate that the action was triggered by some other means.

Do not use this attribute to indicate a selected or pressed state.

```html preview 72px
<div class="container">
	<vwc-button appearance="filled" label="Active" active></vwc-button>
	<vwc-button appearance="outlined" label="Active" active></vwc-button>
	<vwc-button appearance="outlined-light" label="Active" active></vwc-button>
	<vwc-button appearance="ghost" label="Active" active></vwc-button>
	<vwc-button appearance="ghost-light" label="Active" active></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Dropdown Indicator

When the button is used to trigger a menu / dropdown, you can set `dropdown-indicator` to add a chevron to the button.

```html preview 220px
<vwc-menu trigger="auto" auto-dismiss placement="bottom-start">
	<vwc-button
		slot="anchor"
		appearance="outlined-light"
		label="Menu"
		dropdown-indicator
	></vwc-button>
	<vwc-menu-item icon="copy-line" text="Copy"></vwc-menu-item>
	<vwc-menu-item icon="inbox-line" text="Share"></vwc-menu-item>
	<vwc-menu-item icon="delete-line" text="Archive"></vwc-menu-item>
</vwc-menu>
```

<vwc-note connotation="information" icon="info-line">
	<p>When setting <code>dropdown-indicator</code> the Button's content alignment changes from center to start. You can change it back to center using <code>--button-content-alignment</code> CSS variable </p>
</vwc-note>
