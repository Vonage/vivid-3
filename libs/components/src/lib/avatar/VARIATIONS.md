## Appearance

Set the `appearance` attribute to change the avatar's appearance.

```html preview
<div class="grid">
	<vwc-avatar appearance="filled"></vwc-avatar>
	<span>filled (default) </span>
	<vwc-avatar appearance="subtle"></vwc-avatar>
	<span>subtle</span>
	<vwc-avatar appearance="duotone"></vwc-avatar>
	<span>duotone</span>
	<vwc-avatar appearance="outlined"></vwc-avatar>
	<span>outlined</span>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 40px 1fr;
		align-items: center;
		gap: 8px;
	}
</style>
```

## Connotation

Set the `connotation` attribute to set the avatar's color.  
Avatar has `accent` connotation (default) and `cta`.

```html preview
<div class="grid">
	<vwc-avatar connotation="accent"></vwc-avatar>
	<vwc-avatar connotation="cta"></vwc-avatar>
	<vwc-avatar connotation="accent" appearance="subtle"></vwc-avatar>
	<vwc-avatar connotation="cta" appearance="subtle"></vwc-avatar>
	<vwc-avatar connotation="accent" appearance="duotone"></vwc-avatar>
	<vwc-avatar connotation="cta" appearance="duotone"></vwc-avatar>
	<vwc-avatar connotation="accent" appearance="outlined"></vwc-avatar>
	<vwc-avatar connotation="cta" appearance="outlined"></vwc-avatar>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 40px 40px;
		align-items: center;
		gap: 8px;
	}
</style>
```

## Shape

Set the `shape` attribute to change the avatar's edges.

```html preview
<div>
	<vwc-avatar shape="rounded"></vwc-avatar>
	<vwc-avatar shape="pill"></vwc-avatar>
</div>
```

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/) on the Avatar other then the default `user-line` icon.

```html preview
<vwc-avatar icon="group-2-solid" aria-label="avatar for group"></vwc-avatar>
```

## Initials

Set the `initials` attribute to set avatar's initials. This will cause the avatar to present the initials as its content instead of an icon.

```html preview
<vwc-avatar initials="JD" aria-label="John Do"></vwc-avatar>
```

## Size

Use the `size` attribute/property to set the avatar's size.

```html preview
<vwc-avatar size="condensed" initials="JD"></vwc-avatar>
<vwc-avatar size="normal" initials="JD"></vwc-avatar>
<vwc-avatar size="expanded" initials="JD"></vwc-avatar>
<vwc-avatar size="condensed" shape="pill"></vwc-avatar>
<vwc-avatar size="normal" shape="pill"></vwc-avatar>
<vwc-avatar size="expanded" shape="pill"></vwc-avatar>
```