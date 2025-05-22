# Anchored Menu

```html preview 200px
<vwc-split-button
	id="splitButton"
	appearance="filled"
	label="A default split button"
>
	<vwc-menu id="menu" placement="bottom-end" open>
		<vwc-menu-item text="Menu item 1"></vwc-menu-item>
		<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	</vwc-menu>
</vwc-split-button>

<script>
	window.onload = function () {
		menu.anchor = splitButton.indicator;
		splitButton.addEventListener('action-click', () => {
			alert('clicked on action');
		});
		splitButton.addEventListener('indicator-click', () => {
			menu.open = !menu.open;
		});
	};
</script>
```

## Tooltip

```html preview 140px
<vwc-split-button
	id="splitButton"
	appearance="filled"
	aria-label="Write a new message"
>
	<vwc-icon slot="icon" name="compose-line"></vwc-icon>
	<vwc-tooltip id="tooltip" text="Write a new message"></vwc-tooltip>
</vwc-split-button>

<style>
	html {
		text-align: center;
	}
</style>

<script>
	window.onload = function () {
		tooltip.anchor = splitButton.action;
	};
</script>
```
