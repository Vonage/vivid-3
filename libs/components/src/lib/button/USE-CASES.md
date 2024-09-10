## Use Cases

## Toggle (use cases)

Buttons may be toggled. The icon and label represents the change in the state. For example mic on and mic off or a user’s selection such as add to favorite.

```html preview center 72px
<style>
	.wrapper {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
<div class="wrapper">
	<vwc-button
		id="mute"
		icon="microphone-solid"
		appearance="filled"
		aria-label="Mute"
	></vwc-button>
	<vwc-button
		id="favorite"
		icon="star-line"
		appearance="filled"
		label="Favorite"
	></vwc-button>
</div>

<script>
	document.getElementById('mute').addEventListener('click', () => {
		mute.ariaPressed = !mute.ariaPressed;
		mute.icon = mute.ariaPressed ? 'mic-mute-solid' : 'microphone-solid';
		mute.ariaLabel = mute.ariaPressed ? 'Unmute' : 'Mute';
	});

	document.getElementById('favorite').addEventListener('click', () => {
		favorite.ariaPressed = !favorite.ariaPressed;
		favorite.icon = favorite.ariaPressed ? 'star-solid' : 'star-line';
		favorite.label = favorite.ariaPressed ? 'Unfavorite' : 'Favorite';
	});
</script>
```

<details>
<summary>Code</summary>

The `aria-pressed` attribute is used to indicate the state of the button to assistive technologies.

</details>

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

### Layout

A buttons may be wider than it's content, in which case the label and icon will be centered within the button.

```html preview
<style>
	vwc-button {
		width: 300px;
	}
</style>
<vwc-button icon="compose-line" appearance="filled" label="Edit"></vwc-button>
```

If the button is too narrow to fit the content, the label will be truncated with an ellipsis. Buttons text will never wrap to a new line.

```html preview
<style>
	vwc-button {
		width: 170px;
	}
</style>
<vwc-button
	icon="compose-line"
	appearance="filled"
	label="This is a very long button label"
></vwc-button>
```

A buttons height is determined by the `size` option and cannot be changed.

