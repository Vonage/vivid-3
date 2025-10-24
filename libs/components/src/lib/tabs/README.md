## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerTabs, registerTab, registerTabPanel } from '@vonage/vivid';

registerTabs('your-prefix');
registerTab('your-prefix');
registerTabPanel('your-prefix');
```

```html preview
<script type="module">
	import { registerTabs, registerTab, registerTabPanel } from '@vonage/vivid';
	registerTabs('your-prefix');
	registerTab('your-prefix');
	registerTabPanel('your-prefix');
</script>

<your-prefix-tabs>
	<your-prefix-tab label="Tab one"></your-prefix-tab>
	<your-prefix-tab label="Tab two"></your-prefix-tab>
	<your-prefix-tab label="Tab three"></your-prefix-tab>
	<your-prefix-tab-panel>Tab Panel one</your-prefix-tab-panel>
	<your-prefix-tab-panel>Tab Panel two</your-prefix-tab-panel>
	<your-prefix-tab-panel>Tab Panel three</your-prefix-tab-panel>
</your-prefix-tabs>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTabs, VTab, VTabPanel } from '@vonage/vivid-vue';
</script>
<template>
	<VTabs>
		<VTab label="Tab one"></VTab>
		<VTab label="Tab two"></VTab>
		<VTab label="Tab three"></VTab>
		<VTabPanel>Tab Panel one</VTabPanel>
		<VTabPanel>Tab Panel two</VTabPanel>
		<VTabPanel>Tab Panel three</VTabPanel>
	</VTabs>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Icon Slot

The `icon` slot on the **Tab** component can be used to display a custom icon. If set, the `icon` attribute is ignored.

```html preview
<vwc-tabs>
	<vwc-tab label="Tab one">
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
	</vwc-tab>
	<vwc-tab label="Tab two">
		<vwc-icon slot="icon" name="close-circle-solid" connotation="alert"></vwc-icon>
	</vwc-tab>
	<vwc-tab-panel>Tab Panel one</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
</vwc-tabs>
```

### Action Items Slot

The `action-items` slot on the **Tabs** component can be used to add action items after the last Tab in the tabs bar.

In the example below, a Button is provided that adds a new Tab when clicked.

```html preview full
<vwc-tabs>
	<vwc-tab label="Tab one"></vwc-tab>
	<vwc-tab label="Tab two"></vwc-tab>
	<vwc-tab-panel>Tab Panel one</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
	<vwc-button slot="action-items" shape="pill" size="condensed" onclick="addTab()">
		<vwc-icon slot="icon" name="plus-line"></vwc-icon>
	</vwc-button>
</vwc-tabs>

<script>
	function addTab() {
		const tab = document.createElement('vwc-tab');
		tab.label = 'New tab';
		document.querySelector('vwc-tabs').appendChild(tab);
		const tabPanel = document.createElement('vwc-tab-panel');
		tabPanel.textContent = 'New tab content';
		document.querySelector('vwc-tabs').appendChild(tabPanel);
	}
</script>
```

## CSS Variables

### Tabs Block Size

Use the `--tabs-block-size` CSS variable to set the block-size of the `base` element.  
When using Tabs inside flex structure, setting `--tabs-block-size: 100%` with `flex:1` or with any specific block-size on Tabs will stretch the tabs to full height.

```html preview full 500px
<div class="wrapper flex">
	<vwc-tabs scrollable-panel class="tabs">
		<vwc-tab label="Comments">
			<vwc-icon slot="icon" name="chat-line"></vwc-icon>
		</vwc-tab>
		<vwc-tab label="Playlist">
			<vwc-icon slot="icon" name="playlist-line"></vwc-icon>
		</vwc-tab>
		<vwc-tab label="Favourites">
			<vwc-icon slot="icon" name="star-line"></vwc-icon>
		</vwc-tab>
		<vwc-tab-panel>
			<vwc-empty-state icon="error-solid" headline="No results" connotation="alert"> </vwc-empty-state>
		</vwc-tab-panel>
		<vwc-tab-panel>Playlist</vwc-tab-panel>
		<vwc-tab-panel>Favourites</vwc-tab-panel>
	</vwc-tabs>
</div>

<style>
	body {
		height: 100%;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		block-size: 100%;
	}

	.tabs {
		--tabs-block-size: 100%;
		flex: 1;
		block-size: 100%;
	}

	.tabs::part(tab-panel) {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
```

## CSS Parts

### Tab Panel

Use the CSS part `tab-panel` to provide custom styling to the Tab Panel components.

```html preview full
<vwc-tabs class="tabs">
	<vwc-tab label="Tab one"></vwc-tab>
	<vwc-tab label="Tab two"></vwc-tab>
	<vwc-tab label="Tab three"></vwc-tab>
	<vwc-tab-panel>Tab Panel one</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel two</vwc-tab-panel>
	<vwc-tab-panel>Tab Panel three</vwc-tab-panel>
</vwc-tabs>

<style>
	.tabs::part(tab-panel) {
		background-color: var(--vvd-color-cta-50);
	}
</style>
```

## API Reference

### Tabs

#### Properties

<div class="table-wrapper">

| Name                 | Type                               | Description                                                                            |
| -------------------- | ---------------------------------- | -------------------------------------------------------------------------------------- |
| **activeid**         | `string`                           | Match with an `id` set on a Tab to mark it as active on initial load                   |
| **connotation**      | `accent` (default), `cta`          | Sets the connotation color of the active tab                                           |
| **gutters**          | `none`, `small` (default)          | Sets the spacing inside the Tab Panels                                                 |
| **orientation**      | `horizontal` (default), `vertical` | Sets axis on which the tabs are aligned                                                |
| **scrollable-panel** | `boolean`                          | Sets whether the Tab Panel will be scrollable (if content height exceeds `block-size`) |

</div>

#### Slots

<div class="table-wrapper">

| Name             | Description                                            |
| ---------------- | ------------------------------------------------------ |
| **default**      | For **Tab** and **Tab Panel** components               |
| **action-items** | To add action items after the last Tab in the tabs bar |

</div>

#### Events

<div class="table-wrapper">

| Name     | Type                       | Bubbles | Composed | Description                                               |
| -------- | -------------------------- | ------- | -------- | --------------------------------------------------------- |
| `change` | `CustomEvent<HTMLElement>` | Yes     | Yes      | Fired when a tab is clicked or during keyboard navigation |

</div>

### Tab

#### Properties

<div class="table-wrapper">

| Name                                   | Type                         | Description                                                                                                     |
| -------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **disabled**                           | `boolean`                    | Sets the disabled state                                                                                         |
| _(deprecated as of 05/25)_<br>**icon** | Enum: `[icon-name]`          | A decorative icon the custom element should have. See the Vivid Icon Gallery for available icons and icon-names |
| **icon-trailing**                      | `boolean`                    | Places the icon after the label text                                                                            |
| **label**                              | `string`                     | Sets the label text                                                                                             |
| **removable**                          | `boolean`                    | Adds a close button                                                                                             |
| **shape**                              | `rounded` (default), `sharp` | Shape of the background when hovered                                                                            |

</div>

#### Slots

<div class="table-wrapper">

| Name     | Description      |
| -------- | ---------------- |
| **icon** | For custom icons |

</div>

#### Events

<div class="table-wrapper">

| Name      | Type          | Bubbles | Composed | Description                                                                                    |
| --------- | ------------- | ------- | -------- | ---------------------------------------------------------------------------------------------- |
| **close** | `CustomEvent` | Yes     | Yes      | When `removable` is set, fired when the close button is clicked or the `DELETE` key is pressed |

</div>

### Tab Panel

#### Slots

<div class="table-wrapper">

| Name        | Description           |
| ----------- | --------------------- |
| **default** | For Tab Panel content |

</div>
