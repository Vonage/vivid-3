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

### Body Slot

This is the slot for any content that you need to display after header content (Headline, Subtitle). It can be used instead of, or in conjunction with the text attribute.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCard, VTable, VTableHead, VTableBody, VTableRow, VTableCell, VTableHeaderCell } from '@vonage/vivid-vue';
</script>

<template>
	<VCard headline="Vivid Card Component (headline)" subtitle="Extra text below the card headline (subtitle)">
		<template #body>
			<VTable>
				<VTableHead>
					<VTableRow>
						<VTableHeaderCell>Name</VTableHeaderCell>
						<VTableHeaderCell>Job Title</VTableHeaderCell>
					</VTableRow>
				</VTableHead>
				<VTableBody>
					<VTableRow>
						<VTableCell>Marty McFly</VTableCell>
						<VTableCell>Student</VTableCell>
					</VTableRow>
					<VTableRow>
						<VTableCell>Dr Emit Brown</VTableCell>
						<VTableCell>Scientist</VTableCell>
					</VTableRow>
				</VTableBody>
			</VTable>
		</template>
	</VCard>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-card headline="Vivid Card Component (headline)" subtitle="Extra text below the card headline (subtitle)">
	<vwc-table slot="body">
		<vwc-table-head>
			<vwc-table-row>
				<vwc-table-header-cell>Name</vwc-table-header-cell>
				<vwc-table-header-cell>Job Title</vwc-table-header-cell>
			</vwc-table-row>
		</vwc-table-head>
		<vwc-table-body>
			<vwc-table-row>
				<vwc-table-cell>Marty McFly</vwc-table-cell>
				<vwc-table-cell>Student</vwc-table-cell>
			</vwc-table-row>
			<vwc-table-row>
				<vwc-table-cell>Dr Emit Brown</vwc-table-cell>
				<vwc-table-cell>Scientist</vwc-table-cell>
			</vwc-table-row>
		</vwc-table-body>
	</vwc-table>
</vwc-card>
```

</vwc-tab-panel>
</vwc-tabs>


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

### Border color

The card border color can be customized using `--card-border-color`.

**Note:** this variable works **only** with `outlined` appearance.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCard } from '@vonage/vivid-vue';
</script>

<template>
	<VCard class="vwc-card" appearance="outlined" headline="Card with a custom border color" />
</template>

<style scoped>
.vwc-card {
	--card-border-color: #30a849;
	max-inline-size: 42ch;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-card class="vwc-card" appearance="outlined" headline="Card with a custom border color"></vwc-card>

<style>
	.vwc-card {
		--card-border-color: #30a849;
		max-inline-size: 42ch;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

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
