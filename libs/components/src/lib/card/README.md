## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { VCard } from '@vonage/vivid-vue';
```

```vue preview
<template>
	<VCard headline="I'm a card"></VCard>
</template>

<script setup lang="ts">
import { VCard } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerCard } from '@vonage/vivid';

registerCard('your-prefix');
```

```html preview
<script type="module">
	import { registerCard } from '@vonage/vivid';
	registerCard('your-prefix');
</script>

<your-prefix-card headline="I'm a card"></your-prefix-text-card>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Graphic Slot

Use the `graphic` slot for **Icons** or custom images.
The `graphic` slot overrides the icon property.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCard, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VCard headline="Vivid Card Component" subtitle="Extra text below the card headline">
		<template #graphic>
			<VIcon name="android-mono" style="font-size: 44px; color: #A4C439"></VIcon>
		</template>
	</VCard>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-card headline="Vivid Card Component" subtitle="Extra text below the card headline">
	<vwc-icon slot="graphic" name="android-mono" style="font-size: 44px; color: #A4C439"></vwc-icon>
</vwc-card>
```

</vwc-tab-panel>
</vwc-tabs>

### Media Slot

The media slot can be used to display images or video content above the card header.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCard } from '@vonage/vivid-vue';
</script>

<template>
	<VCard headline="Card with Media Slot" subtitle="Extra text below the card headline" class="card-media">
		<template #media>
			<img src="https://doodleipsum.com/300x150/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540" alt="Sitting on Floor" style="width: 100%; height: 150px; object-fit: cover;" />
		</template>
	</VCard>
</template>

<style scoped>
.card-media {
	max-inline-size: 300px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-card headline="Card with Media Slot" subtitle="Extra text below the card headline" class="card-media">
	<img slot="media" src="https://doodleipsum.com/300x150/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540" alt="Sitting on Floor" style="width: 100%; height: 150px; object-fit: cover;" />
</vwc-card>

<style>
	.card-media {
		max-inline-size: 300px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Meta Slot

The meta slot is for action content in the card header.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 220px
<script setup lang="ts">
import { VCard, VMenu, VMenuItem, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VCard headline="Card with Meta Slot" subtitle="Extra text below the card headline">
		<template #meta>
			<VMenu aria-label="Card options" placement="bottom-start">
				<VButton slot="anchor" aria-label="Open menu" appearance="outlined">
					<VIcon slot="icon" name="more-vertical-line"></VIcon>
				</VButton>
				<VMenuItem text="save card"></VMenuItem>
				<VMenuItem text="remove card"></VMenuItem>
			</VMenu>
		</template>
	</VCard>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 220px
<vwc-card headline="Card with Meta Slot" subtitle="Extra text below the card headline">
	<div slot="meta">
		<vwc-menu aria-label="Card options" placement="bottom-start">
			<vwc-button slot="anchor" aria-label="Open menu" appearance="outlined">
				<vwc-icon slot="icon" name="more-vertical-line"></vwc-icon>
			</vwc-button>
			<vwc-menu-item text="save card"></vwc-menu-item>
			<vwc-menu-item text="remove card"></vwc-menu-item>
		</vwc-menu>
	</div>
</vwc-card>
```

</vwc-tab-panel>
</vwc-tabs>

### Footer Slot

The footer slot is for content in the card footer.  
Use it for adding buttons or action items.  
By default - items inside footer slot are aligned to the end.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCard, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VCard headline="Card with Footer Slot" subtitle="Extra text below the card headline">
		<template #footer>
			<VButton shape="pill" label="Action" appearance="outlined" icon-trailing>
				<VIcon slot="icon" name="arrow-bold-right-line"></VIcon>
			</VButton>
		</template>
	</VCard>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-card headline="Card with Footer Slot" subtitle="Extra text below the card headline">
	<vwc-button slot="footer" shape="pill" label="Action" appearance="outlined" icon-trailing>
		<vwc-icon slot="icon" name="arrow-bold-right-line"></vwc-icon>
	</vwc-button>
</vwc-card>
```

</vwc-tab-panel>
</vwc-tabs>

### Main Slot

Card has predefined content style template.  
Use the `main` slot to fully override a card's predefined template with your own. When using main - only appearance and elevation are applied on the card.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCard, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VCard>
		<template #main>
			<VLayout gutters="small"> Assign custom template using "main" slot. </VLayout>
		</template>
	</VCard>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-card>
	<vwc-layout gutters="small" slot="main"> Assign custom template using "main" slot. </vwc-layout>
</vwc-card>
```

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Trim headline

The card headline can be trimmed to your preferable number of lines.
The number of lines is controlled by the css variable `--headline-line-clamp`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCard } from '@vonage/vivid-vue';
</script>

<template>
	<VCard class="vwc-card" headline="Card with long headline that has trim into one line"></VCard>
</template>

<style scoped>
.vwc-card {
	--headline-line-clamp: 1;
	max-inline-size: 42ch;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-card class="vwc-card" headline="Card with long headline that has trim into one line"></vwc-card>

<style>
	.vwc-card {
		--headline-line-clamp: 1;
		max-inline-size: 42ch;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Trim subtitle

The card subtitle can be trimmed to your preferable number of lines.
The number of lines is controlled by css variable `--subtitle-line-clamp`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCard } from '@vonage/vivid-vue';
</script>

<template>
	<VCard class="vwc-card" headline="Card with Trimmed Subtitle" subtitle="This subtitle is extremely long and will be trimmed after 2 lines. This way you can control the size of the card."></VCard>
</template>

<style scoped>
.vwc-card {
	--subtitle-line-clamp: 2;
	max-inline-size: 42ch;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-card class="vwc-card" headline="Card with Trimmed Subtitle" subtitle="This subtitle is extremely long and will be trimmed after 2 lines. This way you can control the size of the card."></vwc-card>

<style>
	.vwc-card {
		--subtitle-line-clamp: 2;
		max-inline-size: 42ch;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name               | Type                                                      | Description                                          |
| ------------------ | --------------------------------------------------------- | ---------------------------------------------------- |
| **appearance**     | `elevated` (default), `outlined`, `ghost`                 | Sets the element's appearance.                       |
| **elevation**      | `2`, `4` (default), `8`, `12`, `16`, `24`                 | Sets the element's elevation.                        |
| **headline**       | `string`                                                  | Sets the element's headline.                         |
| **icon**           | `string`                                                  | Sets the element's icon.                             |
| **subtitle**       | `string`                                                  | Sets the element's subtitle.                         |
| **text**           | `string`                                                  | Sets the element's text.                             |
| **clickable-card** | `boolean`                                                 | Indicates whether card should be a `<button>`.       |
| **href**           | `string`                                                  | Sets the element's href, changes card tag to `<a>` . |
| **download**       | `string`                                                  | Sets the element's download.                         |
| **hreflang**       | `string`                                                  | Sets the element's hreflang.                         |
| **ping**           | `string`                                                  | Sets the element's ping.                             |
| **referrerpolicy** | `string`                                                  | Sets the element's referrerpolicy.                   |
| **rel**            | `string`                                                  | Sets the element's rel.                              |
| **target**         | _Enum_:<br/>`_self`<br/>`_blank`<br/>`_parent`<br/>`_top` | Sets the target's rel.                               |

</div>

### Events

The following events are available when the `clickable-card` attribute is set:

<div class="table-wrapper">

| Name        | Event Type      | Description                                                                                                                                                |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **click**   | `MouseEvent`    | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`    | Fires when the element receives focus.                                                                                                                     |
| **blur**    | `FocusEvent`    | Fires when the element loses focus.                                                                                                                        |
| **keydown** | `KeyboardEvent` | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent` | Fires when a key is released.                                                                                                                              |
| **input**   | `Event`         | Fires when the value of an element has been changed.                                                                                                       |

</div>

### Slots

<div class="table-wrapper">

| Name        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| **Graphic** | Add graphic element to card. Overrides the icon property     |
| **Media**   | Use to display images or video content above the card header |
| **Meta**    | Use for adding action content, of info in the card header    |
| **Footer**  | Content in the card footer.                                  |
| **Main**    | Override a card's predefined template                        |

</div>
