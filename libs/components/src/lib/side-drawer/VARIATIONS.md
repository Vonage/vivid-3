## Open

Use the `open` attribute to indicate whether the side drawer is open.
You can also close the side drawer by pressing the `ESC` key.

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
Click on the `scrim` or press the `ESC` key (while drawer is focused) to close the modal side-drawer.

```html preview full
<vwc-side-drawer modal open>
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

### Alternate

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

### Trailing

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
