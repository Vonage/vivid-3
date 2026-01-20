## Vertical Divider

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VActionGroup, VButton, VDivider, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VActionGroup appearance="fieldset">
		<VButton>
			<template #icon><VIcon name="transfer-line" /></template>
		</VButton>
		<VDivider orientation="vertical" />
		<VButton>
			<template #icon><VIcon name="compose-line" /></template>
		</VButton>
	</VActionGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-action-group appearance="fieldset">
	<vwc-button>
		<vwc-icon slot="icon" name="transfer-line"></vwc-icon>
	</vwc-button>
	<vwc-divider orientation="vertical"></vwc-divider>
	<vwc-button>
		<vwc-icon slot="icon" name="compose-line"></vwc-icon>
	</vwc-button>
</vwc-action-group>
```

</vwc-tab-panel>
</vwc-tabs>

## Horizontal Divider

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VButton, VCard, VDivider, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VCard class="card">
		<template #main>
			<VLayout column-basis="block" gutters="small">
				Choose the button you like best in this card :)

				<VDivider />
			</VLayout>
		</template>
		<template #footer>
			<div class="demo-footer">
				<VButton label="Cancel" appearance="outlined" />
				<VButton label="Submit" appearance="filled" />
			</div>
		</template>
	</VCard>
</template>

<style>
.card {
	width: 400px;
}
.demo-footer {
	display: flex;
	column-gap: 8px;
	justify-content: flex-end;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-card class="card">
	<vwc-layout column-basis="block" gutters="small" slot="main">
		Choose the button you like best in this card :)

		<vwc-divider></vwc-divider>
	</vwc-layout>
	<div class="demo-footer" slot="footer">
		<vwc-button label="Cancel" appearance="outlined"></vwc-button>
		<vwc-button label="Submit" appearance="filled"></vwc-button>
	</div>
</vwc-card>

<style>
	.card {
		width: 400px;
	}
	.demo-footer {
		display: flex;
		column-gap: 8px;
		justify-content: flex-end;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Decorative Divider

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDivider, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout class="layout">
		<VDivider role="presentation" class="divider" />
		More Info
		<VDivider role="presentation" class="divider" />
	</VLayout>
</template>

<style>
.layout {
	--layout-grid-template-columns: 1fr auto 1fr;
}

.divider {
	display: flex;
	align-items: center;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout class="layout">
	<vwc-divider role="presentation" class="divider"></vwc-divider>
	More Info
	<vwc-divider role="presentation" class="divider"></vwc-divider>
</vwc-layout>

<style>
	.layout {
		--layout-grid-template-columns: 1fr auto 1fr;
	}

	.divider {
		display: flex;
		align-items: center;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
