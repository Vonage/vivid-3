## In a Form

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDatePicker, VLayout, VButton } from '@vonage/vivid-vue';
</script>

<template>
	<form>
		<VLayout column-spacing="small" column-basis="block">
			<div>
				<VDatePicker name="date" label="Start date" required />
			</div>
			<div class="buttons">
				<VButton label="Reset" appearance="outlined" type="reset" />
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
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<form>
	<vwc-layout column-spacing="small" column-basis="block">
		<div>
			<vwc-date-picker name="date" label="Start date" required></vwc-date-picker>
		</div>
		<div class="buttons">
			<vwc-button label="Reset" appearance="outlined" type="reset"></vwc-button>
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
