## Error on Save

```html preview 300px
<vwc-alert connotation="alert" headline="Message not sent" text="There seems to be a problem with your connection. Please try again later." removable></vwc-alert>

<vwc-layout column-spacing="small" column-basis="block" style="display: block; max-inline-size: 420px">
	<vwc-text-area label="Message"></vwc-text-area>

	<div>
		<vwc-button appearance="filled" label="Send" onclick="simulateSend(this)"></vwc-button>
	</div>
</vwc-layout>

<script>
	function simulateSend(button) {
		button.pending = true;
		setTimeout(() => {
			button.pending = false;
			document.querySelector('vwc-alert').open = true;
		}, 2000);
	}
</script>
```
