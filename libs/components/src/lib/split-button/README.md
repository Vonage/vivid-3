## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSplitButton } from '@vonage/vivid-vue';
</script>

<template>
	<VSplitButton label="My Button" indicator-aria-label="More actions" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerSplitButton } from '@vonage/vivid';

registerSplitButton('your-prefix');
```

```html preview
<script type="module">
	import { registerSplitButton } from '@vonage/vivid';
	registerSplitButton('your-prefix');
</script>

<your-prefix-split-button label="My Button" indicator-aria-label="More actions"></your-prefix-split-button>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Default Slot

Use the default slot to add content to be openned when clicking the secondary action.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 180px
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { VSplitButton, VMenu, VMenuItem } from '@vonage/vivid-vue';

const splitButtonRef = ref<InstanceType<typeof VSplitButton> | null>(null);
const menuRef = ref<InstanceType<typeof VMenu> | null>(null);
const menuOpen = ref(true);

onMounted(() => {
	const splitButtonEl = splitButtonRef.value?.element;
	const menuEl = menuRef.value?.element;
	if (menuEl && splitButtonEl?.indicator) {
		menuEl.anchor = splitButtonEl.indicator;
	}
});

function onActionClick() {
	alert('clicked on action');
}

function onIndicatorClick() {
	menuOpen.value = !menuOpen.value;
	if (menuRef.value?.element) {
		menuRef.value.element.open = menuOpen.value;
	}
}
</script>

<template>
	<VSplitButton ref="splitButtonRef" appearance="outlined" label="A default split button" @action-click="onActionClick" @indicator-click="onIndicatorClick">
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

```html preview 180px
<vwc-split-button id="splitButton" appearance="outlined" label="A default split button">
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

### Icon Slot

Use the `icon` slot add custom icons. If set, the icon attribute is ignored.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSplitButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VSplitButton appearance="outlined" label="submit">
		<template #icon>
			<VIcon name="check-circle-solid" connotation="success" />
		</template>
	</VSplitButton>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-split-button appearance="outlined" label="submit">
	<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
</vwc-split-button>
```

</vwc-tab-panel>
</vwc-tabs>
