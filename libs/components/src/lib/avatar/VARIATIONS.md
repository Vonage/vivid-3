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
	<div>
		<vwc-avatar connotation="accent"></vwc-avatar>
		<span>filled, accent</span>
	</div>
	<div>
		<vwc-avatar connotation="cta"></vwc-avatar>
		<span>filled, cta</span>
	</div>
	<div>
		<vwc-avatar connotation="accent" appearance="subtle"></vwc-avatar>
		<span>subtle, accent</span>
	</div>
	<div>
		<vwc-avatar connotation="cta" appearance="subtle"></vwc-avatar>
		<span>subtle, cta</span>
	</div>
	<div>
		<vwc-avatar connotation="accent" appearance="duotone"></vwc-avatar>
		<span>duotone, accent</span>
	</div>
	<div>
		<vwc-avatar connotation="cta" appearance="duotone"></vwc-avatar>
		<span>duotone, cta</span>
	</div>
	<div>
		<vwc-avatar connotation="accent" appearance="outlined"></vwc-avatar>
		<span>outlined, accent</span>
	</div>
	<div>
		<vwc-avatar connotation="cta" appearance="outlined"></vwc-avatar>
		<span>outlined, cta</span>
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 200px 200px;
		align-items: center;
		gap: 8px;
	}
</style>
```

## Shape

Set the `shape` attribute to change the avatar's edges.

```html preview
<div class="grid">
	<vwc-avatar shape="rounded"></vwc-avatar><span>rounded</span>
	<vwc-avatar shape="pill"></vwc-avatar><span>pill</span>
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

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/) on the Avatar other then the default `user-line` icon.

<!-- Uncomment this when icon slot is added
<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>
-->

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
<div class="grid">
	<div>
		<vwc-avatar size="condensed" initials="JD"></vwc-avatar>
		<span>condensed (initials)</span>
	</div>
	<div>
		<vwc-avatar size="condensed" shape="pill"></vwc-avatar>
		<span>condensed (icon)</span>
	</div>
	<div>
		<vwc-avatar size="normal" initials="JD"></vwc-avatar>
		<span>normal (initials)</span>
	</div>
	<div>
		<vwc-avatar size="normal" shape="pill"></vwc-avatar>
		<span>normal (icon)</span>
	</div>
	<div>
		<vwc-avatar size="expanded" initials="JD"></vwc-avatar>
		<span>expanded (initials)</span>
	</div>
	<div>
		<vwc-avatar size="expanded" shape="pill"></vwc-avatar>
		<span>expanded (icon)</span>
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 200px 200px;
		align-items: center;
		gap: 8px;
	}
</style>
```
