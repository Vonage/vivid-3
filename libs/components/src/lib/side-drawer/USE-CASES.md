## Collapsible Side Drawer

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full 250px
<template>
	<div class="container">
		<VSideDrawer class="drawer" :class="{ collapsed: !open }" open alternate>
			<VLayout gutters="small" column-basis="block">
				<VNav>
					<VNavItem class="item" href="#" :text="open ? 'Calls' : ''" :data-label="open ? '' : 'Calls'" icon="call-line" :aria-current="selected === 'calls' ? 'page' : null" @click.prevent="selected = 'calls'" />
					<VNavItem class="item" href="#" :text="open ? 'Voicemail' : ''" :data-label="open ? '' : 'Voicemail'" icon="voicemail-line" :aria-current="selected === 'voicemail' ? 'page' : null" @click.prevent="selected = 'voicemail'" />
					<VNavItem class="item" href="#" :text="open ? 'SMS' : ''" :data-label="open ? '' : 'SMS'" icon="chat-line" :aria-current="selected === 'sms' ? 'page' : null" @click.prevent="selected = 'sms'" />
				</VNav>
			</VLayout>
			<VLayout slot="app-content" gutters="medium"> Toggle the side drawer by clicking the FAB. </VLayout>
			<VFab slot="app-content" class="fab" icon="menu-solid" @click="open = !open" />
		</VSideDrawer>
	</div>
</template>

<script setup lang="ts">
import { VFab, VLayout, VNav, VNavItem, VSideDrawer } from '@vonage/vivid-vue';
import { ref } from 'vue';

const open = ref(true);
const selected = ref('calls');
</script>

<style lang="scss" scoped>
.container {
	/* for demo purposes */
	block-size: 250px;
	overflow: hidden;
}

.fab {
	position: fixed;
	inset: auto auto 8px 8px;
	z-index: 2;
}

.drawer::part(base) {
	transform: var(--demo-drawer-transform);
}

.drawer {
	--demo-drawer-transform: translateX(0);
	--side-drawer-app-content-offset: 280px;
}

.drawer.collapsed {
	--demo-drawer-transform: translateX(calc(-100% + 70px));
	--side-drawer-app-content-offset: 70px;

	.item {
		align-self: flex-end;
	}
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview full 250px
<vwc-side-drawer id="sideDrawer" class="vwc-side-drawer" alternate open>
	<vwc-layout gutters="small" column-basis="block">
		<vwc-nav id="sideNav">
			<vwc-nav-item href="#" text="Calls" data-value="Calls" onclick="onClick(this)" current>
				<vwc-icon slot="icon" name="call-line"></vwc-icon>
			</vwc-nav-item>
			<vwc-nav-item href="#" text="Voicemail" data-value="Voicemail" onclick="onClick(this)">
				<vwc-icon slot="icon" name="voicemail-line"></vwc-icon>
			</vwc-nav-item>
			<vwc-nav-item href="#" text="SMS" data-value="SMS" onclick="onClick(this)">
				<vwc-icon slot="icon" name="chat-line"></vwc-icon>
			</vwc-nav-item>
		</vwc-nav>
	</vwc-layout>
	<vwc-layout slot="app-content" gutters="medium"> Toggle the side drawer by clicking the FAB. </vwc-layout>
	<vwc-fab aria-label="Toggle Side Drawer" class="vwc-fab" slot="app-content" onclick="onToggle()">
		<vwc-icon slot="icon" name="menu-solid"></vwc-icon>
	</vwc-fab>
</vwc-side-drawer>

<script>
	function onToggle() {
		sideDrawer.classList.toggle('collapsed');
		const isCollapsed = sideDrawer.classList.contains('collapsed');

		for (let i = 0; i < sideNav.children.length; i++) {
			const value = sideNav.children[i].dataset.value;
			sideNav.children[i].text = isCollapsed ? '' : value;
			sideNav.children[i].style.alignSelf = isCollapsed ? 'flex-end' : '';
			// There must be an aria-label on nav-items with only an icon
			sideNav.children[i].ariaLabel = isCollapsed ? value : '';
		}
	}

	function onClick(el) {
		currentNavItem = document.querySelector('vwc-nav-item[current]');
		currentNavItem?.removeAttribute('current');
		el.setAttribute('current', '');
	}
</script>

<style>
	.vwc-fab {
		position: fixed;
		inset: auto auto 8px 8px;
		z-index: 2;
	}
	.vwc-side-drawer::part(base) {
		transform: var(--demo-drawer-transform);
	}
	.vwc-side-drawer {
		--demo-drawer-transform: translateX(0);
		--side-drawer-app-content-offset: 280px;
	}
	.vwc-side-drawer.collapsed {
		--demo-drawer-transform: translateX(calc(-100% + 70px));
		--side-drawer-app-content-offset: 70px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Full Content Height

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full 250px
<script setup lang="ts">
import { VSideDrawer, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VSideDrawer class="side-drawer" open>
		<VLayout gutters="small">Side Drawer content</VLayout>
		<div class="content" slot="app-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
	</VSideDrawer>
</template>

<style scoped>
.side-drawer {
	block-size: 100vh;
}
.content {
	display: flex;
	align-items: center;
	background-color: var(--vvd-color-information-50);
	block-size: 100%;
	padding: 16px;
	box-sizing: border-box;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview full 250px
<vwc-side-drawer class="side-drawer" open>
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>
	<div class="content" slot="app-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
</vwc-side-drawer>

<style>
	.side-drawer {
		block-size: 100vh;
	}
	.content {
		display: flex;
		align-items: center;
		background-color: var(--vvd-color-information-50);
		block-size: 100%;
		padding: 16px;
		box-sizing: border-box;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Side Drawer Overlap Content

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full 150px
<script setup lang="ts">
import { ref } from 'vue';
import { VSideDrawer, VLayout, VFab, VIcon } from '@vonage/vivid-vue';

const isOpen = ref(false);
</script>

<template>
	<VSideDrawer class="vwc-side-drawer" :open="isOpen">
		<VLayout slot="app-content" gutters="medium">
			Toggle the side drawer by clicking the FAB.
			<br />
			Notice that the side drawer overlaps the application content.
		</VLayout>

		<VFab slot="app-content" class="vwc-fab" connotation="accent" aria-label="Toggle Side Drawer" @click="isOpen = !isOpen">
			<VIcon slot="icon" name="menu-solid" />
		</VFab>
	</VSideDrawer>
</template>

<style scoped>
.vwc-side-drawer {
	--side-drawer-app-content-offset: 100px;
}

.vwc-fab {
	position: fixed;
	inset: auto auto 8px 8px;
	z-index: 2;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview full 150px
<vwc-side-drawer class="vwc-side-drawer" id="sidedrawer">
	<vwc-layout slot="app-content" gutters="medium">
		Toggle the side drawer by clicking the FAB.
		<br />
		Notice that the side drawer overlaps the application content.
	</vwc-layout>

	<vwc-fab aria-label="Toggle Side Drawer" class="vwc-fab" connotation="accent" slot="app-content" onclick="sidedrawer.open = !sidedrawer.open">
		<vwc-icon slot="icon" name="menu-solid"></vwc-icon>
	</vwc-fab>
</vwc-side-drawer>

<style>
	.vwc-side-drawer {
		--side-drawer-app-content-offset: 100px;
	}

	.vwc-fab {
		position: fixed;
		inset: auto auto 8px 8px;
		z-index: 2;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
