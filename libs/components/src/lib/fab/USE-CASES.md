## Fab For Collapsible Side Drawer

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
		class="vwc-fab"
		icon="menu-solid"
		slot="app-content"
		onclick="onToggle()"
		aria-label="Toggle Side Drawer"
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
