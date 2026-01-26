## Fab For Collapsible Side Drawer

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full 250px
<script setup lang="ts">
import { ref } from 'vue';
import { VFab, VIcon, VLayout, VNav, VNavItem, VSideDrawer } from '@vonage/vivid-vue';

const navItems = [
	{ text: 'Calls', value: 'Calls', icon: 'call-line' },
	{ text: 'Voicemail', value: 'Voicemail', icon: 'voicemail-line' },
	{ text: 'SMS', value: 'SMS', icon: 'chat-line' },
];

const isCollapsed = ref(false);
const currentItem = ref('Calls');

function onToggle() {
	isCollapsed.value = !isCollapsed.value;
}

function onClick(value: string) {
	currentItem.value = value;
}
</script>

<template>
	<VSideDrawer class="vwc-side-drawer" :class="{ collapsed: isCollapsed }" alternate open>
		<VLayout gutters="small" column-basis="block">
			<VNav>
				<VNavItem v-for="item in navItems" :key="item.value" href="#" :text="isCollapsed ? '' : item.text" :aria-label="isCollapsed ? item.text : undefined" :current="currentItem === item.value" :style="{ alignSelf: isCollapsed ? 'flex-end' : '' }" @click="onClick(item.value)">
					<template #icon>
						<VIcon :name="item.icon" />
					</template>
				</VNavItem>
			</VNav>
		</VLayout>
		<template #app-content>
			<VLayout gutters="medium"> Toggle the side drawer by clicking the FAB. </VLayout>
			<VFab class="vwc-fab" @click="onToggle()" aria-label="Toggle Side Drawer">
				<template #icon>
					<VIcon name="menu-solid" />
				</template>
			</VFab>
		</template>
	</VSideDrawer>
</template>

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
<vwc-tab label="Web component"></vwc-tab>
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
	<vwc-fab class="vwc-fab" slot="app-content" onclick="onToggle()" aria-label="Toggle Side Drawer">
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
