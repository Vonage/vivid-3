## Fab For Collapsible Side Drawer

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full 250px
<script setup lang="ts">
import { ref } from 'vue';
import { VFab, VIcon, VSideDrawer, VLayout, VNav, VNavItem } from '@vonage/vivid-vue';

const isCollapsed = ref(false);
const currentNavItem = ref<string>('Calls');

const onToggle = () => {
	isCollapsed.value = !isCollapsed.value;
};

const onClick = (value: string) => {
	currentNavItem.value = value;
};
</script>

<template>
	<VSideDrawer :class="['vwc-side-drawer', { collapsed: isCollapsed }]" alternate open>
		<VLayout gutters="small" column-basis="block">
			<VNav class="nav-expanded">
				<VNavItem href="#" text="Calls" :current="currentNavItem === 'Calls'" @click="onClick('Calls')">
					<template #icon><VIcon name="call-line" /></template>
				</VNavItem>
				<VNavItem href="#" text="Voicemail" :current="currentNavItem === 'Voicemail'" @click="onClick('Voicemail')">
					<template #icon><VIcon name="voicemail-line" /></template>
				</VNavItem>
				<VNavItem href="#" text="SMS" :current="currentNavItem === 'SMS'" @click="onClick('SMS')">
					<template #icon><VIcon name="chat-line" /></template>
				</VNavItem>
			</VNav>
			<VNav class="nav-collapsed">
				<VNavItem href="#" :current="currentNavItem === 'Calls'" @click="onClick('Calls')" aria-label="Calls">
					<template #icon><VIcon name="call-line" /></template>
				</VNavItem>
				<VNavItem href="#" :current="currentNavItem === 'Voicemail'" @click="onClick('Voicemail')" aria-label="Voicemail">
					<template #icon><VIcon name="voicemail-line" /></template>
				</VNavItem>
				<VNavItem href="#" :current="currentNavItem === 'SMS'" @click="onClick('SMS')" :aria-label="SMS">
					<template #icon><VIcon name="chat-line" /></template>
				</VNavItem>
			</VNav>
		</VLayout>
		<VLayout slot="app-content" gutters="medium"> Toggle the side drawer by clicking the FAB. </VLayout>
		<VFab class="vwc-fab" slot="app-content" @click="onToggle" aria-label="Toggle Side Drawer">
			<template #icon><VIcon name="menu-solid" /></template>
		</VFab>
	</VSideDrawer>
</template>

<style scoped>
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

	.nav-expanded {
		display: block;
	}
	.nav-collapsed {
		display: none;
	}
}
.vwc-side-drawer.collapsed {
	--demo-drawer-transform: translateX(calc(-100% + 70px));
	--side-drawer-app-content-offset: 70px;

	.nav-expanded {
		display: none;
	}
	.nav-collapsed {
		display: block;
		width: 70px;
	}
}

.vwc-side-drawer.collapsed::part(base) {
	width: 70px;
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
