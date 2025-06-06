## Toggle

Buttons may be toggled. Change icon and label to indicate the state of the button.

```html preview center 72px
<div class="container">
	<vwc-button id="mute" appearance="filled" label="Unmute" aria-pressed="true">
		<vwc-icon slot="icon" name="mic-mute-solid"></vwc-icon>
	</vwc-button>
	<vwc-button id="favorite" appearance="filled" label="Favorite">
		<vwc-icon slot="icon" name="star-line"></vwc-icon>
	</vwc-button>
</div>

<script>
	function toggleButton(e, { label, icon, pressedLabel, pressedIcon }) {
		const pressed = !e.currentTarget.ariaPressed;
		e.currentTarget.ariaPressed = pressed;
		e.currentTarget.icon = pressed ? pressedIcon : icon;
		e.currentTarget.label = pressed ? pressedLabel : label;
	}

	document.getElementById('mute').addEventListener('click', (e) => {
		toggleButton(e, {
			label: 'Mute',
			icon: 'microphone-line',
			pressedLabel: 'Unmute',
			pressedIcon: 'mic-mute-solid',
		});
	});

	document.getElementById('favorite').addEventListener('click', (e) => {
		toggleButton(e, {
			label: 'Favourite',
			icon: 'star-line',
			pressedLabel: 'Unfavourite',
			pressedIcon: 'star-solid',
		});
	});
</script>

<style>
	.container {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
```

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>

Use the `aria-pressed` attribute to indicate the state of the button to assistive technologies.

</vwc-note>

## Custom Width

A button's width can be easily customised by attaching styles to the button component directly.

```html preview
<vwc-button
	appearance="filled"
	label="Full width button"
	class="full-width"
></vwc-button>
<br />
<vwc-button
	appearance="outlined"
	label="Custom width button"
	class="custom-width"
></vwc-button>

<style>
	.full-width {
		display: block;
	}

	.custom-width {
		width: 160px;
	}
</style>
```

<vwc-note connotation="warning" headline="Use custom width buttons with caution">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

When there is not enough space for the `label` text, the content will be truncated as in the example above.

</vwc-note>

## Toolbars

Toolbars can be created using ghost buttons contained inside an [action-group](/components/action-group) component.

```html preview 115px
<div class="container">
	<vwc-action-group role="region" aria-label="Main toolbar">
		<vwc-button size="super-condensed" label="File"></vwc-button>
		<vwc-button size="super-condensed" label="Edit"></vwc-button>
		<vwc-button size="super-condensed" label="View"></vwc-button>
		<vwc-button size="super-condensed" label="Help"></vwc-button>
	</vwc-action-group>

	<vwc-action-group role="region" aria-label="Text formatting">
		<vwc-tooltip text="Bold" placement="bottom-start">
			<vwc-button onclick="onClick(event)" slot="anchor" size="condensed">
				<vwc-icon slot="icon" name="bold-solid"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
		<vwc-tooltip text="Italic">
			<vwc-button
				aria-pressed="true"
				slot="anchor"
				size="condensed"
				appearance="filled"
				onclick="onClick(event)"
			>
				<vwc-icon slot="icon" name="italic-solid"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
		<vwc-tooltip text="Underline">
			<vwc-button onclick="onClick(event)" size="condensed" slot="anchor">
				<vwc-icon slot="icon" name="underline-solid"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
		<vwc-tooltip text="Strikethrough" placement="bottom-end">
			<vwc-button size="condensed" onclick="onClick(event)" slot="anchor">
				<vwc-icon slot="icon" name="strikethrough-solid"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
	</vwc-action-group>
</div>

<script>
	function onClick(event) {
		const btn = event.currentTarget;
		if (btn.hasAttribute('appearance')) {
			btn.removeAttribute('appearance');
			btn.setAttribute('aria-pressed', 'false');
		} else {
			btn.setAttribute('appearance', 'filled');
			btn.setAttribute('aria-pressed', 'true');
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		align-items: start;
	}
</style>
```
