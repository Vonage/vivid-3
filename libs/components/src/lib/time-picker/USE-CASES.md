## In a Form

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 360px
<script setup lang="ts">
import { VButton, VLayout, VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<form>
		<VLayout column-spacing="small" column-basis="block">
			<div>
				<VTimePicker name="time" label="Start time" required />
			</div>
			<div class="buttons">
				<VButton label="Reset" type="reset" appearance="outlined" />
				<VButton label="Submit" appearance="filled" type="submit" />
			</div>
		</VLayout>
	</form>
</template>

<style scoped>
.buttons {
	display: flex;
	gap: 12px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<form>
	<vwc-layout column-spacing="small" column-basis="block">
		<div>
			<vwc-time-picker name="time" label="Start time" required></vwc-time-picker>
		</div>
		<div class="buttons">
			<vwc-button label="Reset" type="reset" appearance="outlined"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
		</div>
	</vwc-layout>
</form>

<style>
	.buttons {
		display: flex;
		gap: 12px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
