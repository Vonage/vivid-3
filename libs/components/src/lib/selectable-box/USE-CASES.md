## Selectable Card

In the example below, we are using the Card component as the content for the Selectable Boxes. The Cards have their `appearance` set to `ghost` so the styles don't interfere with the Selectable Box styles.

```html preview
<vwc-layout role="group" aria-label="pick your ios">
	<vwc-selectable-box tight clickable-box class="box">
		<vwc-card
			headline="Card Component"
			subtitle="My IOS is Android"
			appearance="ghost"
		>
			<vwc-icon
				slot="graphic"
				name="android-mono"
				class="icon icon1"
			></vwc-icon>
		</vwc-card>
	</vwc-selectable-box>
	<vwc-selectable-box tight clickable-box class="box">
		<vwc-card
			headline="Card Component"
			subtitle="My IOS is Apple"
			appearance="ghost"
		>
			<vwc-icon
				slot="graphic"
				name="apple-color"
				class="icon icon2"
			></vwc-icon>
		</vwc-card>
	</vwc-selectable-box>
	<vwc-selectable-box tight clickable-box class="box">
		<vwc-card
			headline="Card Component"
			subtitle="My IOS is Windows"
			appearance="ghost"
		>
			<vwc-icon
				slot="graphic"
				name="windows-color"
				class="icon"
			></vwc-icon>
		</vwc-card>
	</vwc-selectable-box>
</vwc-layout>

<style>
	.box {
		max-inline-size: 450px
	}
	
	.icon {
		font-size: 44px;
	}
	.icon1 {
		color: #A4C439;
	}
	.icon2 {
		color: #555555;
	}
</style>
```

## Image Based Boxes

```html preview
<vwc-layout role="group">
	<vwc-selectable-box
		aria-label="Bright ideas"
		tight
		class="box"
		clickable-box
	>
		<img
			class="img"
			src="https://doodleipsum.com/350x200?bg=C863D9&i=0b3f4112a9c5e358c439c4be74380e54"
			alt="Lots of ideas"
		/>
	</vwc-selectable-box>
	<vwc-selectable-box
		aria-label="Take a load off"
		tight
		class="box"
		clickable-box
	>
		<img
			class="img"
			src="https://doodleipsum.com/350x200/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540"
			alt="Sitting on Floor"
		/>
	</vwc-selectable-box>
	<vwc-selectable-box
		aria-label="Get located"
		tight
		class="box"
		clickable-box
	>
		<img
			class="img"
			src="https://doodleipsum.com/350x200?bg=7463D9&i=6af2fcb146f3b99cfa1371242b2eee55"
			alt="Get located"
		/>
	</vwc-selectable-box>
</vwc-layout>

<style>
	.box {
		inline-size: fit-content;
	}

	.img {
		display: block;
	}
</style>
```
