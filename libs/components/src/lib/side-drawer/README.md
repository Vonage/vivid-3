# vwc-side-drawer

```js
<script type='module'>
    import '@vonage/vivid/side-drawer';
</script>
```

```html preview
<vwc-side-drawer id="sideDrawer" hasTopBar>
	<div slot="top-bar">
		<vwc-icon type="vonage-mono">VONAGE</vwc-icon>
	</div>
  <div>
    <p>	Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
		standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
		a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
		remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
		Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
		of Lorem Ipsum.</p>
  </div>
  <div slot="app-content">
	  <vwc-button id="button" appearance='filled' label='click to open'><vwc-button>
	</div>
</vwc-side-drawer>

<script>
	const sideDrawer = document.getElementById('sideDrawer');
	const toggleOpen = ({target}) => {
		sideDrawer.open = !sideDrawer.open;
  	};
	const button = document.getElementById('button');
  	button.addEventListener('click', toggleOpen);
</script>
```

