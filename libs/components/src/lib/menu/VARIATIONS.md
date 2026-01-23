### Open

The `open` attribute controls the open state.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Menu example">
		<VMenuItem text="Menu item 1" />
		<VMenuItem text="Menu item 2" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 150px
<vwc-menu open aria-label="Menu example">
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

### Placement

The `placement` attribute controls the position of the Menu relative to its anchor element. See the [API Reference](/component/menu/code/#menu) for all possibile values.

<vwc-note connotation="warning" headline="Bottom Placement at Viewport side">
	<vwc-icon name="warning-line" slot="icon" label="Warning:"></vwc-icon>

When the menu anchor is placed close to the start/end of the viewport, `placement` of `bottom` or `top` will not present well due to lack of space.

In such cases - prefer using `bottom-start` or `end` instead.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VButton, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<div style="position: relative; text-align: end;">
		<VMenu placement="left-start" open aria-label="Menu example">
			<template #anchor><VButton label="Toggle Menu" appearance="outlined" /></template>
			<VMenuItem text="Menu item 1" />
			<VMenuItem text="Menu item 2" />
		</VMenu>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 150px
<div style="position: relative; text-align: end;">
	<vwc-menu placement="left-start" open aria-label="Menu example">
		<vwc-button slot="anchor" label="Toggle Menu" appearance="outlined"></vwc-button>
		<vwc-menu-item text="Menu item 1"></vwc-menu-item>
		<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	</vwc-menu>
</div>
```

</vwc-tab-panel>
</vwc-tabs>

### Offset

Use the `offset` attribute to add a gap (in `px`) between the trigger element and the menu.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VAvatar, VHeader, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VHeader alternate>
		Application Title
		<template #action-items>
			<VMenu placement="bottom-end" open aria-label="Menu example" :offset="12">
				<template #anchor><VAvatar aria-label="Open profile menu" appearance="subtle" clickable /></template>
				<VMenuItem text="My Profile" icon="profile-line" />
				<VMenuItem text="My Addresses" icon="address-book-line" />
				<VMenuItem text="Logout" icon="exit-line" />
			</VMenu>
		</template>
	</VHeader>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-header alternate>
	Application Title
	<vwc-menu placement="bottom-end" open aria-label="Menu example" offset="12" slot="action-items">
		<vwc-avatar slot="anchor" aria-label="Open profile menu" appearance="subtle" clickable></vwc-avatar>
		<vwc-menu-item text="My Profile" icon="profile-line"></vwc-menu-item>
		<vwc-menu-item text="My Addresses" icon="address-book-line"></vwc-menu-item>
		<vwc-menu-item text="Logout" icon="exit-line"></vwc-menu-item>
	</vwc-menu>
</vwc-header>
```

</vwc-tab-panel>
</vwc-tabs>
