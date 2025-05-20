## Collapsible Side Drawer

```html preview full 250px
<vwc-side-drawer id="sideDrawer" class="vwc-side-drawer" alternate open>
	<vwc-layout gutters="small" column-basis="block">
		<vwc-nav id="sideNav">
			<vwc-nav-item
				href="#"
				text="Calls"
				icon="call-line"
				data-value="Calls"
				onclick="onClick(this)"
				aria-current="page"
			></vwc-nav-item>
			<vwc-nav-item
				href="#"
				text="Voicemail"
				icon="voicemail-line"
				data-value="Voicemail"
				onclick="onClick(this)"
			></vwc-nav-item>
			<vwc-nav-item
				href="#"
				text="SMS"
				icon="chat-line"
				data-value="SMS"
				onclick="onClick(this)"
			></vwc-nav-item>
		</vwc-nav>
	</vwc-layout>
	<vwc-layout slot="app-content" gutters="medium">
		Toggle the side drawer by clicking the FAB.
	</vwc-layout>
	<vwc-fab
		aria-label="Toggle Side Drawer"
		class="vwc-fab"
		icon="menu-solid"
		slot="app-content"
		onclick="onToggle()"
	></vwc-fab>
</vwc-side-drawer>

<script>
	function onToggle() {
		sideDrawer.classList.toggle('collapsed');
		const isCollapsed = sideDrawer.classList.contains('collapsed');

		for (let i = 0; i < sideNav.children.length; i++) {
			const value = sideNav.children[i].dataset.value;
			sideNav.children[i].text = isCollapsed ? '' : value;
			sideNav.children[i].style.alignSelf = isCollapsed ? 'flex-end' : '';
			// There must be an aria-label on nav-items with only an icon
			sideNav.children[i].ariaLabel = isCollapsed ? value : '';
		}
	}

	function onClick(el) {
		currentNavItem = document.querySelector(
			'vwc-nav-item[aria-current="page"]'
		);
		currentNavItem?.removeAttribute('aria-current');
		el.setAttribute('aria-current', 'page');
	}
</script>

<style>
	.vwc-fab {
		position: fixed;
		inset: auto auto 8px 8px;
		z-index: 2;
	}
	.vwc-side-drawer::part(base) {
		transform: var(--demo-drawer-transform);
	}
	.vwc-side-drawer {
		--demo-drawer-transform: translateX(0);
		--side-drawer-app-content-offset: 280px;
	}
	.vwc-side-drawer.collapsed {
		--demo-drawer-transform: translateX(calc(-100% + 70px));
		--side-drawer-app-content-offset: 70px;
	}
</style>
```

## Full Content Height

```html preview full 250px
<vwc-side-drawer class="side-drawer" open>
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>
	<div class="content" slot="app-content">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</div>
</vwc-side-drawer>

<style>
	.side-drawer {
		block-size: 100vh;
	}
	.content {
		display: flex;
		align-items: center;
		background-color: var(--vvd-color-information-50);
		block-size: 100%;
		padding: 16px;
		box-sizing: border-box;
	}
</style>
```

## Side Drawer Overlap Content

```html preview full 150px
<vwc-side-drawer class="vwc-side-drawer" id="sidedrawer">
	<vwc-layout slot="app-content" gutters="medium">
		Toggle the side drawer by clicking the FAB.
		<br />
		Notice that the side drawer overlaps the application content.
	</vwc-layout>

	<vwc-fab
		aria-label="Toggle Side Drawer"
		class="vwc-fab"
		connotation="accent"
		icon="menu-solid"
		slot="app-content"
		onclick="sidedrawer.open = !sidedrawer.open"
	></vwc-fab>
</vwc-side-drawer>

<style>
	.vwc-side-drawer {
		--side-drawer-app-content-offset: 100px;
	}

	.vwc-fab {
		position: fixed;
		inset: auto auto 8px 8px;
		z-index: 2;
	}
</style>
```
