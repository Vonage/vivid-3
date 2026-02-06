# Anchored Menu

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { VSplitButton, VMenu, VMenuItem } from '@vonage/vivid-vue';

const splitButtonRef = ref<InstanceType<typeof VSplitButton> | null>(null);
const menuRef = ref<InstanceType<typeof VMenu> | null>(null);
const menuOpen = ref(true);

onMounted(() => {
	const splitButtonEl = splitButtonRef.value?.$el;
	const menuEl = menuRef.value?.$el;
	if (menuEl && splitButtonEl?.indicator) {
		menuEl.anchor = splitButtonEl.indicator;
	}
});

function onActionClick() {
	alert('clicked on action');
}

function onIndicatorClick() {
	menuOpen.value = !menuOpen.value;
	if (menuRef.value?.$el) {
		menuRef.value.$el.open = menuOpen.value;
	}
}
</script>

<template>
	<VSplitButton ref="splitButtonRef" appearance="filled" label="A default split button" @action-click="onActionClick" @indicator-click="onIndicatorClick">
		<VMenu ref="menuRef" placement="bottom-end" :open="menuOpen">
			<VMenuItem text="Menu item 1" />
			<VMenuItem text="Menu item 2" />
		</VMenu>
	</VSplitButton>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<vwc-split-button id="splitButton" appearance="filled" label="A default split button">
	<vwc-menu id="menu" placement="bottom-end" open>
		<vwc-menu-item text="Menu item 1"></vwc-menu-item>
		<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	</vwc-menu>
</vwc-split-button>

<script>
	window.onload = function () {
		menu.anchor = splitButton.indicator;
		splitButton.addEventListener('action-click', () => {
			alert('clicked on action');
		});
		splitButton.addEventListener('indicator-click', () => {
			menu.open = !menu.open;
		});
	};
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Tooltip

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 140px
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { VSplitButton, VIcon, VTooltip } from '@vonage/vivid-vue';

const splitButtonRef = ref<InstanceType<typeof VSplitButton> | null>(null);
const tooltipRef = ref<InstanceType<typeof VTooltip> | null>(null);

onMounted(() => {
	const splitButtonEl = splitButtonRef.value?.$el;
	const tooltipEl = tooltipRef.value?.$el;
	if (tooltipEl && splitButtonEl?.action) {
		tooltipEl.anchor = splitButtonEl.action;
	}
});
</script>

<template>
	<div class="tooltip-demo">
		<VSplitButton ref="splitButtonRef" appearance="filled" aria-label="Write a new message">
			<VIcon slot="icon" name="compose-line" />
			<VTooltip ref="tooltipRef" text="Write a new message" />
		</VSplitButton>
	</div>
</template>

<style scoped>
.tooltip-demo {
	text-align: center;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 140px
<vwc-split-button id="splitButton" appearance="filled" aria-label="Write a new message">
	<vwc-icon slot="icon" name="compose-line"></vwc-icon>
	<vwc-tooltip id="tooltip" text="Write a new message"></vwc-tooltip>
</vwc-split-button>

<style>
	html {
		text-align: center;
	}
</style>

<script>
	window.onload = function () {
		tooltip.anchor = splitButton.action;
	};
</script>
```

</vwc-tab-panel>
</vwc-tabs>
