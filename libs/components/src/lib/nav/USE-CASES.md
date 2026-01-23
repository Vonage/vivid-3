## Nested Nav Disclosure

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 260px
<script setup lang="ts">
import { ref } from 'vue';
import { VNav, VNavItem, VNavDisclosure } from '@vonage/vivid-vue';
const activeItemId = ref('level-3-item-1');
const menuItems = [
	{
		type: 'item',
		id: 'level-2-item',
		text: '2nd level item',
	},
	{
		type: 'group',
		label: '2nd level group',
		children: [
			{ id: 'level-3-item-1', text: '3rd level item' },
			{ id: 'level-3-item-2', text: '3rd level item' },
		],
	},
];

function isCurrent(id: string) {
	return activeItemId.value === id;
}

function onClick(event: MouseEvent) {
	const target = event.currentTarget as HTMLElement;
	activeItemId.value = target.id;
}
</script>

<template>
	<VNav>
		<VNavDisclosure label="1st level item" open>
			<template v-for="(item, index) in menuItems" :key="index">
				<VNavDisclosure v-if="item.type === 'group'" :label="item.label" open>
					<VNavItem v-for="child in item.children" :key="child.id" :id="child.id" href="#" :text="child.text" :current="isCurrent(child.id)" @click="onClick" />
				</VNavDisclosure>
				<VNavItem v-else :id="item.id" href="#" :text="item.text" :current="isCurrent(item.id)" @click="onClick" />
			</template>
		</VNavDisclosure>
	</VNav>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 260px
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" open>
		<vwc-nav-item href="#" text="2nd level item" onclick="onClick(event)"></vwc-nav-item>
		<vwc-nav-disclosure label="2nd level item" open>
			<vwc-nav-item href="#" text="3rd level item" onclick="onClick(event)" current></vwc-nav-item>
			<vwc-nav-item href="#" text="3rd level item" onclick="onClick(event)"></vwc-nav-item>
		</vwc-nav-disclosure>
	</vwc-nav-disclosure>
</vwc-nav>
<script>
	function onClick(event) {
		currentNavItem = document.querySelector('vwc-nav-item[current]');
		currentNavItem?.removeAttribute('current');
		event.currentTarget.setAttribute('current', '');
	}
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Navigation inside a Side Drawer

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

const currentItem = ref('Calls');
const isDrawerOpen = ref(true);

function onClick(value: string) {
	currentItem.value = value;
}
</script>

<template>
	<VSideDrawer alternate :open="isDrawerOpen">
		<VLayout gutters="small" column-basis="block">
			<VNav>
				<VNavItem v-for="item in navItems" :key="item.value" href="#" :text="item.text" :current="currentItem === item.value" @click="onClick(item.value)">
					<template #icon>
						<VIcon :name="item.icon" />
					</template>
				</VNavItem>
			</VNav>
		</VLayout>
		<template #app-content>
			<VLayout gutters="medium"> Toggle the side drawer by clicking the FAB. </VLayout>
			<VFab class="fab" @click="isDrawerOpen = !isDrawerOpen">
				<template #icon>
					<VIcon name="menu-solid" />
				</template>
			</VFab>
		</template>
	</VSideDrawer>
</template>

<style>
.fab {
	position: fixed;
	inset: auto auto 8px 8px;
	z-index: 2;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview full 250px
<style>
	vwc-fab {
		position: fixed;
		inset: auto auto 8px 8px;
		z-index: 2;
	}
</style>

<vwc-side-drawer id="sideDrawer" alternate open>
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
	<vwc-fab slot="app-content" onclick="sideDrawer.open = !sideDrawer.open">
		<vwc-icon slot="icon" name="menu-solid"></vwc-icon>
	</vwc-fab>
</vwc-side-drawer>

<script>
	function onClick(el) {
		currentNavItem = document.querySelector('vwc-nav-item[current]');
		currentNavItem?.removeAttribute('current');
		el.setAttribute('current', '');
	}
</script>
```

</vwc-tab-panel>
</vwc-tabs>
