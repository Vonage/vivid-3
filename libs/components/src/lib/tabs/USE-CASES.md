## Dynamic Tabs

The `removable` attribute on the **Tab** component can used along with the `action-items` slot on the **Tabs** component to create functionality where Tabs can be added and removed by the user.

```html preview 300px
<vwc-tabs>
	<vwc-tab label="Task" removable></vwc-tab>
	<vwc-tab-panel>Task content</vwc-tab-panel>
	<vwc-tab label="Event" removable></vwc-tab>
	<vwc-tab-panel>Event content</vwc-tab-panel>
	<vwc-menu
		slot="action-items"
		trigger="auto"
		auto-dismiss
		placement="bottom-end"
	>
		<vwc-button
			slot="anchor"
			icon="plus-line"
			shape="pill"
			size="condensed"
		></vwc-button>
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
		tab.removable = true;
		document.querySelector('vwc-tabs').appendChild(tab);
		const tabPanel = document.createElement('vwc-tab-panel');
		tabPanel.textContent = `${name} content`;
		document.querySelector('vwc-tabs').appendChild(tabPanel);
	}
</script>
```
