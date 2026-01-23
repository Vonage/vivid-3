## Dropdown Menu with Checkbox

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 350px
<script setup lang="ts">
import { VButton, VMenu, VMenuItem, VTextField } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu placement="bottom-start" open aria-label="Menu example">
		<template #anchor><VButton label="Select" appearance="filled" dropdown-indicator /></template>
		<template #header><VTextField slot="header" placeholder="Search" icon="search" autofocus /></template>
		<VMenuItem control-type="checkbox" text="Checkbox 1" />
		<VMenuItem control-type="checkbox" text="Checkbox 2" />
		<VMenuItem control-type="checkbox" text="Checkbox 3" />
		<VButton slot="action-items" appearance="outlined" label="Close" />
		<VButton slot="action-items" appearance="filled" label="Select" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 350px
<vwc-menu placement="bottom-start" open aria-label="Menu example">
	<vwc-button slot="anchor" label="Select" appearance="filled" dropdown-indicator></vwc-button>
	<vwc-text-field slot="header" placeholder="Search" icon="search" autofocus></vwc-text-field>
	<vwc-menu-item control-type="checkbox" text="Checkbox 1"></vwc-menu-item>
	<vwc-menu-item control-type="checkbox" text="Checkbox 2"></vwc-menu-item>
	<vwc-menu-item control-type="checkbox" text="Checkbox 3"></vwc-menu-item>
	<vwc-button slot="action-items" appearance="outlined" label="Close"></vwc-button>
	<vwc-button slot="action-items" appearance="filled" label="Select"></vwc-button>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## Links Menu

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VButton, VIcon, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu placement="bottom-start" open aria-label="Menu example">
		<template #anchor>
			<VButton aria-label="Close menu">
				<template #icon><VIcon name="close-line" /></template>
			</VButton>
		</template>
		<a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
			<VMenuItem text="My Addresses" icon="address-book-line" />
		</a>
		<a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
			<VMenuItem text="My Profile" icon="profile-line" />
		</a>
		<a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
			<VMenuItem text="Team" icon="group-line" />
		</a>
		<a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
			<VMenuItem text="Logout" icon="quit-line" />
		</a>
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-menu placement="bottom-start" open aria-label="Menu example">
	<vwc-button slot="anchor" aria-label="Close menu">
		<vwc-icon slot="icon" name="close-line"></vwc-icon>
	</vwc-button>
	<a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
		<vwc-menu-item text="My Addresses" icon="address-book-line"></vwc-menu-item>
	</a>
	<a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
		<vwc-menu-item text="My Profile" icon="profile-line"></vwc-menu-item>
	</a>
	<a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
		<vwc-menu-item text="Team" icon="group-line"></vwc-menu-item>
	</a>
	<a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
		<vwc-menu-item text="Logout" icon="quit-line"></vwc-menu-item>
	</a>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>
