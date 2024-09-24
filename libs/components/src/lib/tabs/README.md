# Tabs

Represents a tabs custom element.
The vwc-tabs accepts [vwc-tab](/components/tab/) and `vwc-tab-panel` elements as children. Read more about `tabs` [here](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/).

```js
<script type="module">import '@vonage/vivid/tabs';</script>
```

## Members

### Gutters

Use the `gutters` attribute to control the tabs panel padding.

- Type: `'small'` | `'none'`

- Default: `small`

```html preview full
<vwc-tabs gutters="none">
	<vwc-tab label="Tab one" id="one"></vwc-tab>
	<vwc-tab label="Tab two" id="two"></vwc-tab>
	<vwc-tab label="Tab three" id="tree"></vwc-tab>
	<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
	<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
	<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
</vwc-tabs>
```

### Orientation

Add a `orientation` attribute to control the orientation.

- Type: `'horizontal'`, `'vertical'`
- Default: `'horizontal'`

```html preview full
<vwc-tabs orientation="vertical">
	<vwc-tab label="Tab one" id="one"></vwc-tab>
	<vwc-tab label="Tab two" id="two"></vwc-tab>
	<vwc-tab label="Tab three" id="tree"></vwc-tab>
	<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
	<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
	<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
</vwc-tabs>
```

### Connotation

- Type: `'accent' | 'cta'`
- Default: `accent`

Setting a connotation will only affect the active tab

```html preview full
<vwc-tabs connotation="cta">
	<vwc-tab label="Tab one" id="one"></vwc-tab>
	<vwc-tab label="Tab two" id="two"></vwc-tab>
	<vwc-tab label="Tab three" id="tree"></vwc-tab>
	<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
	<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
	<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
</vwc-tabs>
```

### Activeid

Add an `activeid` attribute of the active tab.

- Type: `string`
- Default: `''`

```html preview full
<vwc-tabs activeid="two">
	<vwc-tab label="Tab one" id="one"></vwc-tab>
	<vwc-tab label="Tab two" id="two"></vwc-tab>
	<vwc-tab label="Tab three" id="tree"></vwc-tab>
	<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
	<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
	<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
</vwc-tabs>
```

### Panel Scroll

Add `scrollable-panel` to allow scroll.  
Add `block-size` to `vwc-tabs` to make it scroll.

#### horizontal

```html preview full
<style>
	.tabs {
		block-size: 200px;
	}
</style>
<vwc-tabs class="tabs" scrollable-panel>
	<vwc-tab label="Tab one" id="one"></vwc-tab>
	<vwc-tab label="Tab two" id="two"></vwc-tab>
	<vwc-tab label="Tab three" id="tree"></vwc-tab>
	<vwc-tab-panel id="onePanel">
		<div class="my-panel">
			<ol>
				<li>Stuffed artichokes</li>
				<li>Bruschetta</li>
				<li>Oven-baked polenta</li>
				<li>Salami and Fig Crostini with Ricotta</li>
				<li>Rosemary-Potato Focaccia with Goat Cheese</li>
				<li>Stuffed artichokes</li>
				<li>Bruschetta</li>
				<li>Oven-baked polenta</li>
				<li>Salami and Fig Crostini with Ricotta</li>
				<li>Rosemary-Potato Focaccia with Goat Cheese</li>
			</ol>
		</div>
	</vwc-tab-panel>
	<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
	<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
</vwc-tabs>
```

#### Vertical

```html preview full
<style>
	.tabs {
		block-size: 150px;
	}
</style>
<vwc-tabs class="tabs" scrollable-panel orientation="vertical">
	<vwc-tab label="Tab one" id="one"></vwc-tab>
	<vwc-tab label="Tab two" id="two"></vwc-tab>
	<vwc-tab label="Tab three" id="tree"></vwc-tab>
	<vwc-tab-panel id="onePanel">
		<div class="my-panel">
			<ol>
				<li>Stuffed artichokes</li>
				<li>Bruschetta</li>
				<li>Oven-baked polenta</li>
				<li>Salami and Fig Crostini with Ricotta</li>
				<li>Rosemary-Potato Focaccia with Goat Cheese</li>
				<li>Stuffed artichokes</li>
				<li>Bruschetta</li>
				<li>Oven-baked polenta</li>
				<li>Salami and Fig Crostini with Ricotta</li>
				<li>Rosemary-Potato Focaccia with Goat Cheese</li>
			</ol>
		</div>
	</vwc-tab-panel>
	<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
	<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
</vwc-tabs>
```

### Slots

Each `tab panel` has an associated [vwc-tab](/components/tab/) element, that when activated, displays the `tab panel`.

## CSS Parts

### Tab-Panel

The tab panel part inside the tabs component.

```html preview full
<style>
	.panel::part(tab-panel) {
		background-color: var(--vvd-color-cta-50);
	}
</style>
<vwc-tabs class="panel">
	<vwc-tab label="Tab one" id="one"></vwc-tab>
	<vwc-tab label="Tab two" id="two"></vwc-tab>
	<vwc-tab label="Tab three" id="tree"></vwc-tab>
	<vwc-tab-panel id="onePanel">Tab one content</vwc-tab-panel>
	<vwc-tab-panel id="twoPanel">Tab two content</vwc-tab-panel>
	<vwc-tab-panel id="threePanel">Tab three content</vwc-tab-panel>
</vwc-tabs>
```

## Events

<div class="table-wrapper">

| Name     | Type                       | Bubbles | Composed | Description                                                                       |
| -------- | -------------------------- | ------- | -------- | --------------------------------------------------------------------------------- |
| `change` | `CustomEvent<HTMLElement>` | Yes     | Yes      | Fires a custom 'change' event when a tab is clicked or during keyboard navigation |

</div>

## Use cases

### Closable tabs

```html preview full
<vwc-tabs orientation="vertical">
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
