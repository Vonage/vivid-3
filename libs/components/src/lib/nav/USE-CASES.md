## Nested Nav Disclosure

```html preview 260px
<!-- Feel free to edit the code below. The live preview will update as you make changes. -->
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" open>
		<vwc-nav-item href="#" text="2nd level item" onclick="onClick(event)"></vwc-nav-item>
		<vwc-nav-disclosure label="2nd level item" open>
			<vwc-nav-item href="#" text="3rd level item" onclick="onClick(event)" current></vwc-nav-item>
			<vwc-nav-item href="#" text="3rd level item" onclick="onClick(event)"></vwc-nav-item>
		</vwc-nav-disclosure>
	</vwc-nav-disclosure>
	<vwc-nav>
		<script>
			function onClick(event) {
				currentNavItem = document.querySelector('vwc-nav-item[current]');
				currentNavItem?.removeAttribute('current');
				event.currentTarget.setAttribute('current', '');
			}
		</script>
	</vwc-nav>
</vwc-nav>
```

## Navigation inside a Side Drawer

```html preview full 250px
<style>
	vwc-fab {
		position: fixed;
		inset: auto auto 8px 8px;
		z-index: 2;
	}
</style>

<vwc-side-drawer id="sideDrawer" alternate open>
	<vwc-layout gutters="small" column-basis="block">
		<vwc-nav id="sideNav">
			<vwc-nav-item href="#" text="Calls" data-value="Calls" onclick="onClick(this)" current>
				<vwc-icon slot="icon" name="call-line"></vwc-icon>
			</vwc-nav-item>
			<vwc-nav-item href="#" text="Voicemail" data-value="Voicemail" onclick="onClick(this)">
				<vwc-icon slot="icon" name="voicemail-line"></vwc-icon>
			</vwc-nav-item>
			<vwc-nav-item href="#" text="SMS" data-value="SMS" onclick="onClick(this)">
				<vwc-icon slot="icon" name="chat-line"></vwc-icon>
			</vwc-nav-item>
		</vwc-nav>
	</vwc-layout>
	<vwc-layout slot="app-content" gutters="medium"> Toggle the side drawer by clicking the FAB. </vwc-layout>
	<vwc-fab slot="app-content" onclick="sideDrawer.open = !sideDrawer.open">
		<vwc-icon slot="icon" name="menu-solid"></vwc-icon>
	</vwc-fab>
</vwc-side-drawer>

<script>
	function onClick(el) {
		currentNavItem = document.querySelector('vwc-nav-item[current]');
		currentNavItem?.removeAttribute('current');
		el.setAttribute('current', '');
	}
</script>
```
