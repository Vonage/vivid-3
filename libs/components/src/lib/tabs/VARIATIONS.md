For **Tabs** to function correctly they must include corresponding **[Tab](/components/tabs/code/#tab)** and **[Tab Panel](/components/tabs/code/#tab-panel)** components.

## Label

The `label` attribute on the **Tab** component provides the Tab with label text.

```html preview full
<vwc-tabs>
	<vwc-tab label="Tab one"></vwc-tab>
	<vwc-tab label="Tab two"></vwc-tab>
	<vwc-tab label="Tab three"></vwc-tab>
	<vwc-tab-panel>Tab Panel one</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel three</vwc-tab-panel>
</vwc-tabs>
```

## Icon

The `icon` attribute on the **Tab** component displays an icon from the [icon library](/icons/icons-gallery/) on the Tab.

Custom icons can be provided using the [icon slot](/components/tabs/code/#icon-slot).

<vwc-note connotation="information" icon="accessibility-line" headline="Accessibility Tip">

When an element has no visible text, provide an accessible name using the <nobr><code>aria-label</code></nobr>attribute. This ensures screen reader users can understand the element’s purpose, even when it's represented only by an icon or visual styling.

</vwc-note>

```html preview full
<vwc-tabs>
	<vwc-tab icon="chat-line" label="Comments"></vwc-tab>
	<vwc-tab icon="playlist-line" label="Playlist"></vwc-tab>
	<vwc-tab icon="star-line" label="Favourites"></vwc-tab>
	<vwc-tab-panel>Comments</vwc-tab-panel>
	<vwc-tab-panel>Playlist</vwc-tab-panel>
	<vwc-tab-panel>Favourites</vwc-tab-panel>
</vwc-tabs>
```

### Icon Trailing

The `icon-trailing` attribute on the **Tab** component positions the icon after the label text.

```html preview full
<vwc-tabs>
	<vwc-tab icon-trailing icon="chat-line" label="Comments"></vwc-tab>
	<vwc-tab icon-trailing icon="playlist-line" label="Playlist"></vwc-tab>
	<vwc-tab icon-trailing icon="star-line" label="Favourites"></vwc-tab>
	<vwc-tab-panel>Comments</vwc-tab-panel>
	<vwc-tab-panel>Playlist</vwc-tab-panel>
	<vwc-tab-panel>Favourites</vwc-tab-panel>
</vwc-tabs>
```

## Removable

The `removable` attribute on the **Tab** component adds a close button to the tab.

Clicking the close button or pressing the `DELETE` key when focussed on the tab will emit the `close` event.

```html preview full
<vwc-tabs>
	<vwc-tab label="Tab one" removable></vwc-tab>
	<vwc-tab label="Tab two" removable></vwc-tab>
	<vwc-tab label="Tab three" removable></vwc-tab>
	<vwc-tab-panel>Tab one content</vwc-tab-panel>
	<vwc-tab-panel>Tab two content</vwc-tab-panel>
	<vwc-tab-panel>Tab three content</vwc-tab-panel>
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
</script>
```

<vwc-note connotation="warning" icon="warning-line">
	<p>Triggering the <code>close</code> event does not automatically close the tab and tab panel. This needs to be handled in the consuming application as in the example below.</p>
	<p>The consuming application must also handle whether the user can close all the tabs or not.</p>
</vwc-note>

## Disabled

The `disabled` attribute on the **Tab** component disables the Tab.

```html preview full
<vwc-tabs>
	<vwc-tab label="Tab one"></vwc-tab>
	<vwc-tab disabled label="Disabled tab"></vwc-tab>
	<vwc-tab label="Tab three"></vwc-tab>
	<vwc-tab-panel>Tab Panel one</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel three</vwc-tab-panel>
</vwc-tabs>
```

## Shape

The `shape` attribute on the **Tab** component controls the style of the background in hover state. It can be `rounded` or `shape`.

```html preview full
<vwc-tabs>
	<vwc-tab shape="rounded" label="Rounded"></vwc-tab>
	<vwc-tab shape="sharp" label="Sharp"></vwc-tab>
	<vwc-tab-panel>Tab Panel one</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
</vwc-tabs>
```

<vwc-note connotation="information" icon="info-line">
	<p>The <code>shape</code> variations should not be used in the tab set of tabs. The example above is for demonstration purposes only.</p>
</vwc-note>

## Orientation

The `orientation` attribute on the **Tabs** component controls which axis the tabs are aligned. Below is an example of vertical alignment.

```html preview full
<vwc-tabs orientation="vertical">
	<vwc-tab label="Tab one"></vwc-tab>
	<vwc-tab label="Tab two"></vwc-tab>
	<vwc-tab label="Tab three"></vwc-tab>
	<vwc-tab-panel>Tab Panel one</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel three</vwc-tab-panel>
</vwc-tabs>
```

## Connotation

Use the `connotation` attribute on the **Tabs** component to control the color of the active tab. Below it is set to `cta`.

```html preview full
<vwc-tabs connotation="cta">
	<vwc-tab label="Tab one"></vwc-tab>
	<vwc-tab label="Tab two"></vwc-tab>
	<vwc-tab label="Tab three"></vwc-tab>
	<vwc-tab-panel>Tab Panel one</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel three</vwc-tab-panel>
</vwc-tabs>
```

## Active ID

Use the `activeid` attribute on the **Tabs** component to control which tab is active on first render. The `activeid` attribute must match an `id` given to the **Tab** component.

```html preview full
<vwc-tabs activeid="tab-2">
	<vwc-tab label="Tab one" id="tab-1"></vwc-tab>
	<vwc-tab label="Tab two" id="tab-2"></vwc-tab>
	<vwc-tab label="Tab three" id="tab-3"></vwc-tab>
	<vwc-tab-panel>Tab Panel one</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel three</vwc-tab-panel>
</vwc-tabs>
```

## Gutters

Use the `gutters` attribute on the **Tabs** component to control the spacing inside the Tab Panels. It can be set to `small` (default) or `none` (demonstrated in the example below).

```html preview full
<vwc-tabs gutters="none">
	<vwc-tab label="Tab one"></vwc-tab>
	<vwc-tab label="Tab two"></vwc-tab>
	<vwc-tab label="Tab three"></vwc-tab>
	<vwc-tab-panel>Tab Panel one</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel three</vwc-tab-panel>
</vwc-tabs>
```

## Tabs Layout

The `tabs-layout` attribute on the **Tabs** component controls the tabs layout. When set to `stretch`, the tabs will stretch to fill the available space. It will have no effect when the tabs are in a vertical orientation.

```html preview full
<vwc-tabs tabs-layout="stretch">
	<vwc-tab label="Tab one"></vwc-tab>
	<vwc-tab label="Tab two"></vwc-tab>
	<vwc-tab label="Tab three"></vwc-tab>
	<vwc-tab-panel>Tab Panel one</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel three</vwc-tab-panel>
</vwc-tabs>
```

## Scrollable Panel

Use the `scrollable-panel` attribute combined with setting a `block-size` style to the **Tabs** component to make the content scrollable.

### Horizontal

```html preview full
<vwc-tabs class="tabs" scrollable-panel>
	<vwc-tab label="Tab one"></vwc-tab>
	<vwc-tab label="Tab two"></vwc-tab>
	<vwc-tab label="Tab three"></vwc-tab>
	<vwc-tab-panel>
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
	</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel three</vwc-tab-panel>
</vwc-tabs>

<style>
	.tabs {
		block-size: 200px;
	}
</style>
```

### Vertical

```html preview full
<vwc-tabs scrollable-panel orientation="vertical" class="tabs">
	<vwc-tab label="Tab one"></vwc-tab>
	<vwc-tab label="Tab two"></vwc-tab>
	<vwc-tab label="Tab three"></vwc-tab>
	<vwc-tab-panel>
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
	</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel three</vwc-tab-panel>
</vwc-tabs>

<style>
	.tabs {
		block-size: 150px;
	}
</style>
```
