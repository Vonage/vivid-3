# Navigation

A navigation component makes it easy for users to navigate through your application.
The vwc-nav accepts [vwc-nav-item](/components/nav-item/) and [vwc-nav-disclosure](/components/nav-disclosure/) elements as children.

```js
<script type="module">import '@vonage/vivid/nav';</script>
```

## Slots

### Default

Read more about [vwc-nav-item](/components/nav-item/).

```html preview
<vwc-nav>
	<vwc-nav-item
		href="#"
		text="1st level item"
		onclick="onClick(event)"
		aria-current="page"
	></vwc-nav-item>
	<vwc-nav-item
		href="#"
		text="1st level item"
		onclick="onClick(event)"
	></vwc-nav-item>
	<vwc-nav-item
		href="#"
		text="1st level item"
		onclick="onClick(event)"
	></vwc-nav-item>
	<vwc-nav>
		<script>
			function onClick(event) {
				currentNavItem = document.querySelector(
					'vwc-nav-item[aria-current="page"]'
				);
				currentNavItem?.removeAttribute('aria-current');
				event.currentTarget.setAttribute('aria-current', 'page');
			}
		</script></vwc-nav
	></vwc-nav
>
```

### Navigation Disclosure

Read more about [vwc-nav-disclosure](/components/nav-disclosure/).

```html preview
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" open>
		<vwc-nav-item
			href="#"
			text="2nd level item"
			onclick="onClick(event)"
		></vwc-nav-item>
		<vwc-nav-disclosure label="2nd level item" open>
			<vwc-nav-item
				href="#"
				text="3rd level item"
				onclick="onClick(event)"
				aria-current="page"
			></vwc-nav-item>
			<vwc-nav-item
				href="#"
				text="3rd level item"
				onclick="onClick(event)"
			></vwc-nav-item>
		</vwc-nav-disclosure>
	</vwc-nav-disclosure>
	<vwc-nav>
		<script>
			function onClick(event) {
				currentNavItem = document.querySelector(
					'vwc-nav-item[aria-current="page"]'
				);
				currentNavItem?.removeAttribute('aria-current');
				event.currentTarget.setAttribute('aria-current', 'page');
			}
		</script></vwc-nav
	></vwc-nav
>
```

## Keyboard Interaction

When the nav has focus:

`Enter`: activates the nav-disclosure and toggles the visibility of the content.
`Space`: activates the nav-disclosure and toggles the visibility of the content.
`Tab`: moves focus to the next element in the tab order.
`Shift` + `Tab`: moves focus to the previous element in the tab order.

## Use Cases

### Navigation inside a Side Drawer

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
		icon="menu-solid"
		slot="app-content"
		onclick="sideDrawer.open = !sideDrawer.open"
	></vwc-fab>
</vwc-side-drawer>

<script>
	function onClick(el) {
		currentNavItem = document.querySelector(
			'vwc-nav-item[aria-current="page"]'
		);
		currentNavItem?.removeAttribute('aria-current');
		el.setAttribute('aria-current', 'page');
	}
</script>
```
