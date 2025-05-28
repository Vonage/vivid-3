## Cards Inside a Layout

When placing cards inside Layout component or inside flex parent the cards are stretched to fit the highest card.

```html preview
<vwc-layout>
	<vwc-card
		class="card-item"
		headline="Computer App"
		subtitle="all about our web app"
		text="Neque porro quisquam est qui dolorem ipsum."
	>
		<vwc-icon slot="icon" name="app-line"></vwc-icon>
		<div class="image-wrapper" slot="media">
			<img
				src="https://fastly.picsum.photos/id/48/367/267.jpg?hmac=fENUWb0yT2VgcvIXjwzBiAZ6QqdYG4rt2q8gok9VrZ0"
				alt=""
			/>
		</div>
		<vwc-button slot="meta" appearance="filled" aria-label="unpin item">
			<vwc-icon slot="icon" name="pin-2-line"></vwc-icon>
		</vwc-button>
		<vwc-button
			slot="footer"
			class="learn-more"
			icon-trailing
			shape="pill"
			label="Learn More"
			appearance="outlined"
		>
			<vwc-icon slot="icon" name="arrow-bold-right-line"></vwc-icon>
		</vwc-button>
	</vwc-card>
	<vwc-card
		class="card-item"
		headline="Computer and Books"
		subtitle="all about the books and the computer"
		text="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
	>
		<vwc-icon slot="icon" name="ai-line"></vwc-icon>
		<div class="image-wrapper" slot="media">
			<img
				src="https://fastly.picsum.photos/id/20/367/267.jpg?hmac=h8YwkzRUiuyBhJ-zQTrSCYop1hhNGtW00nITwHy1V4I"
				alt=""
			/>
		</div>
		<vwc-badge
			slot="meta"
			class="card-badge"
			text="AI Studio"
			shape="pill"
			appearance="subtle"
			connotation="information"
		></vwc-badge>
		<vwc-button
			slot="footer"
			class="learn-more"
			icon-trailing
			shape="pill"
			label="Learn More"
			appearance="outlined"
		>
			<vwc-icon slot="icon" name="arrow-bold-right-line"></vwc-icon>
		</vwc-button>
	</vwc-card>
	<vwc-card
		class="card-item"
		headline="Comunication API"
		subtitle="all about the comunication"
		text="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Porro quisquam est qui dolorem ipsum quia dolor."
	>
		<vwc-icon slot="icon" name="plug-line"></vwc-icon>
		<div class="image-wrapper" slot="media">
			<img
				src="https://fastly.picsum.photos/id/180/367/267.jpg?hmac=XAmHD3CeF1SZodNhSTtrCVFsSUnlee5bjFyJsrqxyCM"
				alt=""
			/>
		</div>
		<vwc-badge
			slot="meta"
			class="card-badge"
			text="API"
			shape="pill"
			appearance="subtle"
			connotation="information"
		></vwc-badge>
		<vwc-button
			slot="footer"
			class="learn-more"
			icon-trailing
			shape="pill"
			label="Learn More"
			appearance="outlined"
		>
			<vwc-icon slot="icon" name="arrow-bold-right-line"></vwc-icon>
		</vwc-button>
	</vwc-card>
	<vwc-card
		class="card-item"
		headline="Computer App"
		subtitle="all about our web app"
		text="Neque porro quisquam est qui dolorem ipsum."
	>
		<vwc-icon slot="icon" name="app-line"></vwc-icon>
		<div class="image-wrapper" slot="media">
			<img
				src="https://fastly.picsum.photos/id/48/367/267.jpg?hmac=fENUWb0yT2VgcvIXjwzBiAZ6QqdYG4rt2q8gok9VrZ0"
				alt=""
			/>
		</div>
		<vwc-badge
			slot="meta"
			class="card-badge"
			text="VBC"
			shape="pill"
			appearance="subtle"
			connotation="information"
		></vwc-badge>
		<vwc-button
			slot="footer"
			class="learn-more"
			icon-trailing
			shape="pill"
			label="Learn More"
			appearance="outlined"
		>
			<vwc-icon slot="icon" name="arrow-bold-right-line"></vwc-icon>
		</vwc-button>
	</vwc-card>
</vwc-layout>

<style>
	.image-wrapper {
		inline-size: 100%;
		block-size: 200px;
		overflow: hidden;
	}
	.image-wrapper img {
		inline-size: 100%;
	}
	.card-badge {
		margin-block-start: 0;
	}
	.learn-more {
		margin-block-start: 24px;
	}
</style>
```

## Selectable Cards

You can slot a card with `appearance="ghost"` inside selectable box

```html preview
<vwc-layout class="card-layout" role="group" aria-label="pick your ios">
	<vwc-selectable-box tight clickable-box>
		<vwc-card
			headline="Android"
			subtitle="My IOS is Android"
			appearance="ghost"
		>
			<vwc-icon
				class="card-icon"
				slot="graphic"
				name="android-mono"
				style="--card-icon-color: #A4C439"
			></vwc-icon>
		</vwc-card>
	</vwc-selectable-box>
	<vwc-selectable-box tight clickable-box>
		<vwc-card headline="Apple" subtitle="My IOS is Apple" appearance="ghost">
			<vwc-icon
				class="card-icon"
				slot="graphic"
				name="apple-color"
				style="--card-icon-color: #555555"
			></vwc-icon>
		</vwc-card>
	</vwc-selectable-box>
	<vwc-selectable-box tight clickable-box>
		<vwc-card
			headline="Windows"
			subtitle="My IOS is Windows"
			appearance="ghost"
		>
			<vwc-icon
				class="card-icon"
				slot="graphic"
				name="windows-color"
			></vwc-icon>
		</vwc-card>
	</vwc-selectable-box>
</vwc-layout>

<style>
	.card-layout {
		--layout-grid-template-columns: repeat(
			var(--_auto-sizing),
			minmax(220px, 1fr)
		);
	}
	.card-icon {
		color: var(--card-icon-color);
		font-size: 40px;
	}
</style>
```

<vwc-note connotation="warning" headline="Do not use clickable cards inside selectable box">
	 <vwc-icon slot="icon" name="warning-line"></vwc-icon>

You should not use the `href` or `clickable-card` attributes when slotting a card within the selectable box.

</vwc-note>
