## Open

Use the `open` attribute to indicate whether the side drawer is open.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full
<script setup lang="ts">
import { VSideDrawer, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VSideDrawer open>
		<VLayout gutters="small">
			<p>Side Drawer content</p>
		</VLayout>

		<VLayout gutters="small" slot="app-content">
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</VLayout>
	</VSideDrawer>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview full
<vwc-side-drawer open>
	<vwc-layout gutters="small">
		<p>Side Drawer content</p>
	</vwc-layout>

	<vwc-layout gutters="small" slot="app-content">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
	</vwc-layout>
</vwc-side-drawer>
```

</vwc-tab-panel>
</vwc-tabs>

## Modal

Use the `modal` attribute to set the side drawer's type to modal.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full
<script setup lang="ts">
import { ref } from 'vue';
import { VSideDrawer, VLayout, VFab, VIcon } from '@vonage/vivid-vue';

const isOpen = ref(true);

function toggleSideDrawer() {
	isOpen.value = !isOpen.value;
}
</script>

<template>
	<VSideDrawer modal :open="isOpen">
		<VLayout gutters="small">Side Drawer content</VLayout>

		<VLayout gutters="small" slot="app-content">
			<div class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
		</VLayout>
	</VSideDrawer>

	<VFab class="fab" connotation="accent" aria-label="Toggle side drawer" @click="toggleSideDrawer">
		<VIcon slot="icon" name="menu-solid" />
	</VFab>
</template>

<style scoped>
.content {
	padding-inline-end: 40px;
}
.fab {
	position: fixed;
	inset: auto 8px 8px auto;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview full
<vwc-side-drawer modal open id="sidedrawer">
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>

	<vwc-layout gutters="small" slot="app-content">
		<div class="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
	</vwc-layout>
</vwc-side-drawer>
<vwc-fab aria-label="Close side drawer" class="fab" id="fab" connotation="accent" onclick="toggleSideDrawer()">
	<vwc-icon slot="icon" name="menu-solid"></vwc-icon>
</vwc-fab>

<script>
	function toggleSideDrawer() {
		if (sidedrawer.open) {
			sidedrawer.open = false;
			fab.ariaLabel = 'Open side drawer';
		} else {
			sidedrawer.open = true;
			fab.ariaLabel = 'Close side drawer';
		}
	}
</script>

<style>
	.content {
		padding-inline-end: 40px;
	}
	.fab {
		position: fixed;
		inset: auto 8px 8px auto;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Alternate

Use `alternate` to apply an alternate color-scheme, alternate applies on all assigned Vivid components.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full
<script setup lang="ts">
import { VSideDrawer, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VSideDrawer alternate open>
		<VLayout gutters="small">Side Drawer content</VLayout>

		<VLayout gutters="small" slot="app-content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </VLayout>
	</VSideDrawer>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview full
<vwc-side-drawer alternate open>
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>

	<vwc-layout gutters="small" slot="app-content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </vwc-layout>
</vwc-side-drawer>
```

</vwc-tab-panel>
</vwc-tabs>

## Trailing

Use the `trailing` attribute to set the side of the drawer.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full
<script setup lang="ts">
import { VSideDrawer, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VSideDrawer trailing open>
		<VLayout gutters="small">Side Drawer content</VLayout>

		<VLayout gutters="small" slot="app-content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </VLayout>
	</VSideDrawer>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview full
<vwc-side-drawer trailing open>
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>

	<vwc-layout gutters="small" slot="app-content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </vwc-layout>
</vwc-side-drawer>
```

</vwc-tab-panel>
</vwc-tabs>
