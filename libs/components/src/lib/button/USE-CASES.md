## Use Cases

### Toggle Button

```html preview
<vwc-button
	id="button"
	connotation="cta"
	shape="pill"
	icon="microphone-solid"
	aria-label="Mute"
></vwc-button>

<script>
	document.getElementById('button').addEventListener('click', () => {
		button.ariaPressed = !button.ariaPressed;
		button.icon = button.ariaPressed ? 'mic-mute-solid' : 'microphone-solid';
		button.ariaLabel = button.ariaPressed ? 'Unmute' : 'Mute';
	});
</script>
```

### Full-width Button

```html preview
<style>
	.button-width {
		display: block;
	}
</style>
<vwc-button
	class="button-width"
	label="I'm full width"
	icon="message-sent-line"
	shape="pill"
	appearance="filled"
></vwc-button>
```
