## Appearance

Set the `appearance` attribute to change the action-group's appearance.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VActionGroup, VButton } from '@vonage/vivid-vue';
</script>

<template>
	<div>
		<p>fieldset appearance (default)</p>
		<VActionGroup appearance="fieldset">
			<VButton label="edit" />
			<VButton label="copy" />
			<VButton label="paste" />
			<VButton label="submit" />
		</VActionGroup>
		<p>ghost appearance</p>
		<VActionGroup appearance="ghost">
			<VButton label="edit" appearance="filled" />
			<VButton label="copy" appearance="filled" />
			<VButton label="paste" appearance="filled" />
			<VButton label="submit" appearance="filled" />
		</VActionGroup>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p>fieldset appearance (default)</p>
<vwc-action-group appearance="fieldset">
	<vwc-button label="edit"></vwc-button>
	<vwc-button label="copy"></vwc-button>
	<vwc-button label="paste"></vwc-button>
	<vwc-button label="submit"></vwc-button>
</vwc-action-group>
<p>ghost appearance</p>
<vwc-action-group appearance="ghost">
	<vwc-button label="edit" appearance="filled"></vwc-button>
	<vwc-button label="copy" appearance="filled"></vwc-button>
	<vwc-button label="paste" appearance="filled"></vwc-button>
	<vwc-button label="submit" appearance="filled"></vwc-button>
</vwc-action-group>
```

</vwc-tab-panel>
</vwc-tabs>

## Shape

Use the `shape` attribute to set the action-group's border-radius.  
When using shape, remember to also set it on any slotted elements.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VActionGroup, VButton } from '@vonage/vivid-vue';
</script>

<template>
	<VActionGroup shape="pill">
		<VButton label="edit" shape="pill" />
		<VButton label="copy" shape="pill" />
		<VButton label="paste" shape="pill" />
		<VButton label="submit" shape="pill" />
	</VActionGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-action-group shape="pill">
	<vwc-button shape="pill" label="edit"></vwc-button>
	<vwc-button shape="pill" label="copy"></vwc-button>
	<vwc-button shape="pill" label="paste"></vwc-button>
	<vwc-button shape="pill" label="submit"></vwc-button>
</vwc-action-group>
```

</vwc-tab-panel>
</vwc-tabs>

## Tight

Set the `tight` attribute if no outer padding or gaps between slotted item are needed

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VLayout, VTextField, VButton, VActionGroup, VAudioPlayer } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout column-basis="block" column-spacing="small" style="--layout-grid-template-columns: 290px">
		<VTextField name="username" aria-label="Username" placeholder="Username" />
		<VActionGroup appearance="fieldset" tight>
			<VButton icon="flag-uruguay" />
			<VTextField appearance="ghost" aria-label="Phone number" placeholder="Phone number" name="phone" autocomplete="" style="flex-grow: 1" />
		</VActionGroup>
		<VActionGroup appearance="fieldset" tight>
			<VAudioPlayer class="audio" src="https://download.samplelib.com/mp3/sample-6s.mp3" />
			<VButton size="condensed" aria-label="delete" class="delete" icon="delete-solid" />
		</VActionGroup>
	</VLayout>
</template>

<style>
.audio {
	min-inline-size: 250px;
}
.delete {
	margin-inline-end: 8px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout column-basis="block" column-spacing="small" style="--layout-grid-template-columns: 290px">
	<vwc-text-field name="username" aria-label="Username" placeholder="Username"></vwc-text-field>
	<vwc-action-group appearance="fieldset" tight>
		<vwc-button icon="flag-uruguay"></vwc-button>
		<vwc-text-field appearance="ghost" aria-label="Phone number" placeholder="Phone number" name="phone" autocomplete="" style="flex-grow: 1"></vwc-text-field>
	</vwc-action-group>
	<vwc-action-group tight appearance="fieldset">
		<vwc-audio-player class="audio" src="https://download.samplelib.com/mp3/sample-6s.mp3"> </vwc-audio-player>
		<vwc-button size="condensed" aria-label="delete" class="delete">
			<vwc-icon slot="icon" name="delete-solid"></vwc-icon>
		</vwc-button>
	</vwc-action-group>
</vwc-layout>

<style>
	.audio {
		min-inline-size: 250px;
	}
	.delete {
		margin-inline-end: 8px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
