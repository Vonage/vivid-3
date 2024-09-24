# Tab

Represents a tab custom element.

```js
<script type="module">import '@vonage/vivid/tab';</script>
```

## Members

### Label

Add a `label` attribute to add label to the tab.

- Type: `string`
- Default: `''`

```html preview
<vwc-tabs>
	<vwc-tab label="Tab" id="tab"></vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
```

### Icon

Use `icon` to set an icon to the tab.
View list of available icon at the [vivid icons gallery](/icons/icons-gallery/).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label` or `title` must be provided to ensure that the user can understand the tab's context.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-tabs>
	<vwc-tab icon="chat-line" aria-label="tab" id="tab"></vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
```

### Icon with Label

Tab label can be affixed by a decorative icon, either by its start or end.  
Use `icon-trailing` to place the icon after the label.

```html preview
<vwc-tabs>
	<vwc-tab icon="chat-line" label="Tab" id="tab"></vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
<vwc-tabs>
	<vwc-tab icon-trailing icon="chat-line" label="Tab" id="tab"></vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
```

### Shape

Use the `shape` attribute in order to set `rounded` and `sharp` to the background in hover state.

- Type: `'rounded'` | `'sharp'`
- Default: `'rounded'`

```html preview
<vwc-tabs>
	<vwc-tab shape="sharp" label="Tab" id="tab"></vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
```

### Closable

Use the `closable` attribute to add a _close button_ to the tab.

Clicking the close button or pressing the `DELETE` key when focussed on the tab will emit the `close` event.

<vwc-note connotation="warning" icon="warning-line">
	<p>Triggering ther <code>close</code> event does not automatically close the tab and tab panel. This needs to be handled in the consuming application as in the example below.</p>
</vwc-note>

```html preview full
<vwc-tabs>
	<vwc-tab label="Tab one" closable></vwc-tab>
	<vwc-tab label="Tab two" closable></vwc-tab>
	<vwc-tab label="Tab three" closable></vwc-tab>
	<vwc-tab-panel>Tab one content</vwc-tab-panel>
	<vwc-tab-panel>Tab two content</vwc-tab-panel>
	<vwc-tab-panel>Tab three content</vwc-tab-panel>
</vwc-tabs>

<script>
	document.querySelector('vwc-tabs').addEventListener('close', (e) => {
		const tab = e.srcElement;
		const tabPanelId = tab.getAttribute('aria-controls');
		const tabPanel = document.getElementById(tabPanelId);
		if (tabPanel) {
			tabPanel.remove();
			e.srcElement.remove();
		}
	});
</script>
```

### Disabled

The disabled state of the element.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tabs>
	<vwc-tab disabled label="Disabled Tab" id="tab"></vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel">
		<vwc-icon
			slot="icon"
			name="check-circle-solid"
			connotation="success"
		></vwc-icon>
	</vwc-tab-panel>
</vwc-tabs>
```

## Slots

### Icon

Set the `icon` slot to show an icon in the tab.
If set, the `icon` attribute is ignored.

```html preview
<vwc-tabs>
	<vwc-tab label="Tab with custom icon" id="tab">
		<vwc-icon
			slot="icon"
			name="check-circle-solid"
			connotation="success"
		></vwc-icon>
	</vwc-tab>
	<vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
```

## Events

<div class="table-wrapper">

| Name    | Type          | Bubbles | Composed | Description                                                                                  |
| ------- | ------------- | ------- | -------- | -------------------------------------------------------------------------------------------- |
| `close` | `CustomEvent` | Yes     | Yes      | Fires a custom 'close' event when the close button is clicked or the `DELETE` key is pressed |

</div>
