## Open

Use the `open` attribute to indicate whether the side drawer is open.

```html preview full
<vwc-side-drawer open>
	<vwc-layout gutters="small">
		<p>Side Drawer content</p>
	</vwc-layout>

	<vwc-layout gutters="small" slot="app-content">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
			velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
			cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
			est laborum.
		</p>
	</vwc-layout>
</vwc-side-drawer>
```

## Modal

Use the `modal` attribute to set the side drawer's type to modal.

```html preview full
<vwc-side-drawer modal open id="sidedrawer">
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>

	<vwc-layout gutters="small" slot="app-content">
		<div class="content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
			velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
			cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
			est laborum.
		</div>
	</vwc-layout>
</vwc-side-drawer>
<vwc-fab
	aria-label="Close side drawer"
	class="fab"
	id="fab"
	connotation="accent"
	onclick="toggleSideDrawer()"
>
	<vwc-icon slot="icon" name="menu-solid"></vwc-icon>
</vwc-fab>

<script>
	function toggleSideDrawer() {
		if (sidedrawer.open) {
			sidedrawer.open = false;
			fab.ariaLabel = 'Open side drawer';
		} else {
			sidedrawer.open = true;
			fab.ariaLabel = 'Close side drawer';
		}
	}
</script>

<style>
	.content {
		padding-inline-end: 40px;
	}
	.fab {
		position: fixed;
		inset: auto 8px 8px auto;
	}
</style>
```

## Alternate

Use `alternate` to apply an alternate color-scheme, alternate applies on all assigned vivid components.

```html preview full
<vwc-side-drawer alternate open>
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>

	<vwc-layout gutters="small" slot="app-content">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</vwc-layout>
</vwc-side-drawer>
```

## Trailing

Use the `trailing` attribute to set the side of the drawer.

```html preview full
<vwc-side-drawer trailing open>
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>

	<vwc-layout gutters="small" slot="app-content">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</vwc-layout>
</vwc-side-drawer>
```
