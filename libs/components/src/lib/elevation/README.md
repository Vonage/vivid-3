# Elevation

## TESTING NEW TOKENS

## Members

### DP

Use the `dp` attribute to change the elevation's level in Density-Independent Pixels (DP).

- Type: `0`|`2`|`4`|`8`|`12`|`16`|`24`
- Default: `2`

```html preview blocks
<style>
	.card {
		padding: 20px;
		text-align: center;
		border-radius: 6px;
	}
</style>
<div
	style="display: flex; gap: 50px; padding: 32px; background-color: var(--vvd-color-neutral-tint-50); "
>
	<div style="display: flex; flex-direction: column; gap: 20px;">
		<vwc-elevation dp="0" class="new-shadow">
			<div class="card">New elevation with DP 0</div>
		</vwc-elevation>
		<vwc-elevation dp="2" class="new-shadow">
			<div class="card">New elevation with DP 2</div>
		</vwc-elevation>
		<vwc-elevation dp="4" class="new-shadow">
			<div class="card">New elevation with DP 4</div>
		</vwc-elevation>
		<vwc-elevation dp="8" class="new-shadow">
			<div class="card">New elevation with DP 8</div>
		</vwc-elevation>
		<vwc-elevation dp="12" class="new-shadow">
			<div class="card">New elevation with DP 12</div>
		</vwc-elevation>
		<vwc-elevation dp="16" class="new-shadow">
			<div class="card">New elevation with DP 16</div>
		</vwc-elevation>
		<vwc-elevation dp="24" class="new-shadow">
			<div class="card">New elevation with DP 24</div>
		</vwc-elevation>
	</div>
	<div style="display: flex; flex-direction: column; gap: 20px;">
		<vwc-elevation dp="0">
			<div class="card">Original elevation with DP 0</div>
		</vwc-elevation>
		<vwc-elevation dp="2">
			<div class="card">Original elevation with DP 2</div>
		</vwc-elevation>
		<vwc-elevation dp="4">
			<div class="card">Original elevation with DP 4</div>
		</vwc-elevation>
		<vwc-elevation dp="8">
			<div class="card">Original elevation with DP 8</div>
		</vwc-elevation>
		<vwc-elevation dp="12">
			<div class="card">Original elevation with DP 12</div>
		</vwc-elevation>
		<vwc-elevation dp="16">
			<div class="card">Original elevation with DP 16</div>
		</vwc-elevation>
		<vwc-elevation dp="24">
			<div class="card">Original elevation with DP 24</div>
		</vwc-elevation>
	</div>
</div>
```

## Nested Components

```html preview blocks
<style>
	.card {
		padding: 20px;
		text-align: center;
		border-radius: 6px;
	}
</style>
<div
	style="display: flex; flex-direction: column; gap: 32px; padding: 32px; background-color: var(--vvd-color-neutral-tint-50); "
>
	<vwc-elevation dp="4" class="new-shadow">
		<div class="card">
			This is the content inside the elevation with DP 4
			<vwc-button
				appearance="outlined"
				label="Toggle Dialog Open"
				onclick="dialog1.open = !dialog1.open"
			></vwc-button>
			<vwc-menu aria-label="Menu example" trigger="auto" placement="bottom-end">
				<vwc-button
					slot="anchor"
					icon="more-vertical-line"
					aria-label="Open menu"
					appearance="outlined"
				></vwc-button>
				<vwc-menu-item text="Menu item 1"></vwc-menu-item>
				<vwc-menu-item text="Menu item 2"></vwc-menu-item>
			</vwc-menu>
			<vwc-card
				headline="Parent Has Class With New Tokens"
				icon="chat-line"
			></vwc-card>
		</div>
		<vwc-dialog
			modal
			id="dialog1"
			headline="Headline"
			subtitle="subtitle"
		></vwc-dialog>
	</vwc-elevation>

	<vwc-elevation dp="8">
		<div class="card">
			This is the content inside the elevation with DP 4 no new class
			<vwc-button
				appearance="outlined"
				label="Toggle Dialog Open"
				onclick="dialog2.open = !dialog2.open"
			></vwc-button>
			<vwc-menu aria-label="Menu example" trigger="auto" placement="bottom-end">
				<vwc-button
					slot="anchor"
					icon="more-vertical-line"
					aria-label="Open menu"
					appearance="outlined"
				></vwc-button>
				<vwc-menu-item text="Menu item 1"></vwc-menu-item>
				<vwc-menu-item text="Menu item 2"></vwc-menu-item>
			</vwc-menu>
			<vwc-card
				elevation="8"
				headline="Vivid Card Component"
				icon="chat-line"
			></vwc-card>
		</div>

		<vwc-dialog
			modal
			id="dialog2"
			headline="Headline"
			subtitle="subtitle"
		></vwc-dialog>
	</vwc-elevation>
</div>
```

Represents underlying _elevation_ custom element.
Applies a perceived visual elevation to a direct child element.

```js
<script type="module">import '@vonage/vivid/elevation';</script>
```

```html preview
<style>
	#card {
		padding: 20px;
		text-align: center;
		border-radius: 6px;
	}
</style>

<vwc-elevation id="elevation">
	<div id="card">Hover me!</div>
</vwc-elevation>

<script>
	elevation.addEventListener('mouseenter', this.onMouseEnter);
	elevation.addEventListener('mouseleave', this.onMouseLeave);

	function onMouseEnter() {
		elevation.setAttribute('dp', '24');
		card.innerText = 'Get OFF of me!';
	}

	function onMouseLeave() {
		elevation.removeAttribute('dp');
		card.innerText = 'Hover me!';
	}
</script>
```
