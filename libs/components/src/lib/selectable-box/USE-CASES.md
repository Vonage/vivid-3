## Selectable Card

In the example below, we are using the Card component as the content for the Selectable Boxes. The Cards have their `appearance` set to `ghost` so the styles don't interfere with the Selectable Box styles.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCard, VIcon, VLayout, VSelectableBox } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout role="group" aria-label="pick your ios">
		<VSelectableBox tight clickable-box class="box">
			<VCard headline="Card Component" subtitle="My IOS is Android" appearance="ghost">
				<template #graphic><VIcon name="android-mono" class="icon icon1" /></template>
			</VCard>
		</VSelectableBox>
		<VSelectableBox tight clickable-box class="box">
			<VCard headline="Card Component" subtitle="My IOS is Apple" appearance="ghost">
				<template #graphic><VIcon name="apple-color" class="icon icon2" /></template>
			</VCard>
		</VSelectableBox>
		<VSelectableBox tight clickable-box class="box">
			<VCard headline="Card Component" subtitle="My IOS is Windows" appearance="ghost">
				<template #graphic><VIcon name="windows-color" class="icon" /></template>
			</VCard>
		</VSelectableBox>
	</VLayout>
</template>

<style>
.box {
	max-inline-size: 450px;
}
.icon {
	font-size: 44px;
}
.icon1 {
	color: #a4c439;
}
.icon2 {
	color: #555555;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout role="group" aria-label="pick your ios">
	<vwc-selectable-box tight clickable-box class="box">
		<vwc-card headline="Card Component" subtitle="My IOS is Android" appearance="ghost">
			<vwc-icon slot="graphic" name="android-mono" class="icon icon1"></vwc-icon>
		</vwc-card>
	</vwc-selectable-box>
	<vwc-selectable-box tight clickable-box class="box">
		<vwc-card headline="Card Component" subtitle="My IOS is Apple" appearance="ghost">
			<vwc-icon slot="graphic" name="apple-color" class="icon icon2"></vwc-icon>
		</vwc-card>
	</vwc-selectable-box>
	<vwc-selectable-box tight clickable-box class="box">
		<vwc-card headline="Card Component" subtitle="My IOS is Windows" appearance="ghost">
			<vwc-icon slot="graphic" name="windows-color" class="icon"></vwc-icon>
		</vwc-card>
	</vwc-selectable-box>
</vwc-layout>

<style>
	.box {
		max-inline-size: 450px;
	}
	.icon {
		font-size: 44px;
	}
	.icon1 {
		color: #a4c439;
	}
	.icon2 {
		color: #555555;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Image Based Boxes

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VLayout, VSelectableBox } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout role="group">
		<VSelectableBox aria-label="Bright ideas" tight class="box" clickable-box>
			<img class="img" src="https://doodleipsum.com/350x200?bg=C863D9&i=0b3f4112a9c5e358c439c4be74380e54" alt="Lots of ideas" />
		</VSelectableBox>
		<VSelectableBox aria-label="Take a load off" tight class="box" clickable-box>
			<img class="img" src="https://doodleipsum.com/350x200/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540" alt="Sitting on Floor" />
		</VSelectableBox>
		<VSelectableBox aria-label="Get located" tight class="box" clickable-box>
			<img class="img" src="https://doodleipsum.com/350x200?bg=7463D9&i=6af2fcb146f3b99cfa1371242b2eee55" alt="Get located" />
		</VSelectableBox>
	</VLayout>
</template>

<style>
.box {
	inline-size: fit-content;
}
.img {
	display: block;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout role="group">
	<vwc-selectable-box aria-label="Bright ideas" tight class="box" clickable-box>
		<img class="img" src="https://doodleipsum.com/350x200?bg=C863D9&i=0b3f4112a9c5e358c439c4be74380e54" alt="Lots of ideas" />
	</vwc-selectable-box>
	<vwc-selectable-box aria-label="Take a load off" tight class="box" clickable-box>
		<img class="img" src="https://doodleipsum.com/350x200/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540" alt="Sitting on Floor" />
	</vwc-selectable-box>
	<vwc-selectable-box aria-label="Get located" tight class="box" clickable-box>
		<img class="img" src="https://doodleipsum.com/350x200?bg=7463D9&i=6af2fcb146f3b99cfa1371242b2eee55" alt="Get located" />
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

</vwc-tab-panel>
</vwc-tabs>
