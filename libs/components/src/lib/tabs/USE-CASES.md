## Dynamic Tabs

The `removable` attribute on the **Tab** component can used along with the `action-items` slot on the **Tabs** component to create functionality where Tabs can be added and removed by the user.

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
