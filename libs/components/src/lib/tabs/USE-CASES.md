## Dynamic Tabs

The `removable` attribute on the **Tab** component can used along with the `action-items` slot on the **Tabs** component to create functionality where Tabs can be added and removed by the user.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 300px
<script setup lang="ts">
import { ref } from 'vue';
import { VButton, VIcon, VMenu, VMenuItem, VTab, VTabs, VTabPanel } from '@vonage/vivid-vue';

interface TabItem {
	id: string;
	label: string;
	content: string;
}

const tabs = ref<TabItem[]>([
	{ id: 'tab-1', label: 'Task', content: 'Task content' },
	{ id: 'tab-2', label: 'Event', content: 'Event content' },
]);

const activeTabId = ref('tab-1');

function handleClose(e: Event) {
	const tabId = (e.target as HTMLElement).id;
	tabs.value = tabs.value.filter((tab) => tab.id !== tabId);
}

function addTab(name: string) {
	const newId = `tab-${Math.random()}`;
	tabs.value.push({
		id: newId,
		label: name,
		content: `${name} content`,
	});
	activeTabId.value = newId;
}
</script>

<template>
	<VTabs v-if="tabs.length" :activeid="activeTabId" @close="handleClose">
		<template v-for="tab in tabs" :key="tab.id">
			<VTab :label="tab.label" :id="tab.id" removable />
			<VTabPanel v-text="tab.content" />
		</template>
		<template #action-items>
			<VMenu auto-dismiss placement="bottom-end">
				<template #anchor>
					<VButton shape="pill" size="condensed">
						<template #icon>
							<VIcon name="plus-line" />
						</template>
					</VButton>
				</template>
				<VMenuItem text="New Task" @click="addTab('Task')" />
				<VMenuItem text="New Event" @click="addTab('Event')" />
			</VMenu>
		</template>
	</VTabs>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 300px
<vwc-tabs activeid="tab-1">
	<vwc-tab label="Task" id="tab-1" removable></vwc-tab>
	<vwc-tab-panel>Task content</vwc-tab-panel>
	<vwc-tab id="tab-2" label="Event" removable></vwc-tab>
	<vwc-tab-panel>Event content</vwc-tab-panel>
	<vwc-menu slot="action-items" auto-dismiss placement="bottom-end">
		<vwc-button slot="anchor" shape="pill" size="condensed">
			<vwc-icon slot="icon" name="plus-line"></vwc-icon>
		</vwc-button>
		<vwc-menu-item text="New Task" onclick="addTab('Task')"></vwc-menu-item>
		<vwc-menu-item text="New Event" onclick="addTab('Event')"></vwc-menu-item>
	</vwc-menu>
</vwc-tabs>

<script>
	document.querySelector('vwc-tabs').addEventListener('close', (e) => {
		const tab = e.srcElement;
		const tabs = tab.parentElement;
		const tabPanelId = tab.getAttribute('aria-controls');
		const tabPanel = document.getElementById(tabPanelId);
		if (tabs.querySelectorAll('vwc-tab').length === 1) {
			tabs.remove();
			return;
		}
		if (tabPanel) {
			tabPanel.remove();
			e.srcElement.remove();
		}
	});

	function addTab(name) {
		const tab = document.createElement('vwc-tab');
		tab.label = name;
		const id = `tab-${Math.random()}`;
		tab.id = id;
		tab.removable = true;
		const tabs = document.querySelector('vwc-tabs');
		tabs.appendChild(tab);
		const tabPanel = document.createElement('vwc-tab-panel');
		tabPanel.textContent = `${name} content`;
		tabs.appendChild(tabPanel);
		tabs.activeid = id;
	}
</script>
```

</vwc-tab-panel>
</vwc-tabs>
