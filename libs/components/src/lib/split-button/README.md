## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/split-button';
```

or, if you need to use a unique prefix:

```js
import { registerSplitButton } from '@vonage/vivid';

registerSplitButton('your-prefix');
```

```html preview
<script type="module">
	import { registerSplitButton } from '@vonage/vivid';
	registerSplitButton('your-prefix');
</script>

<your-prefix-split-button
	label="My Button"
	indicator-aria-label="More actions"
></your-prefix-split-button>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VSplitButton } from '@vonage/vivid-vue';
</script>
<template>
	<VSplitButton
		appearance="filled"
		label="My Button"
		indicator-aria-label="More actions"
	/>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Default Slot

Use the default slot to add content to be openned when clicking the secondary action.

```html preview 180px
<vwc-split-button
	id="splitButton"
	appearance="outlined"
	label="A default split button"
>
	<vwc-menu id="menu" placement="bottom-end" open>
		<vwc-menu-item text="Menu item 1"></vwc-menu-item>
		<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	</vwc-menu>
</vwc-split-button>

<script>
	window.onload = function () {
		menu.anchor = splitButton.indicator;
		splitButton.addEventListener('action-click', () => {
			alert('clicked on action');
		});
		splitButton.addEventListener('indicator-click', () => {
			menu.open = !menu.open;
		});
	};
</script>
```

### Icon Slot

Use the `icon` slot add custom icons. If set, the icon attribute is ignored.

```html preview
<vwc-split-button appearance="outlined" label="submit">
	<vwc-icon
		slot="icon"
		name="check-circle-solid"
		connotation="success"
	></vwc-icon>
</vwc-split-button>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                     | Type                                                           | Description                                                       |
| ------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| **appearance**           | `ghost` (default), `filled`, `outlined`                        | Sets the appearance                                               |
| **action**               | `HTMLButtonElement`                                            | A read-only HTML button element that represents the left button.  |
| **connotation**          | `accent` (default), `cta`, `announcement`, `success`, `alert`  | Sets the connotation                                              |
| **disabled**             | `boolean`                                                      | Sets the disabled state                                           |
| **icon**                 | `string`                                                       | Icon for the primary action                                       |
| **indicator**            | `HTMLButtonElement`                                            | A read-only HTML button element that represents the right button. |
| **indicator-aria-label** | `string`                                                       | Accessible label for the secondary action                         |
| **icon**                 | `string`                                                       | Icon for the primary action                                       |
| **shape**                | `rounded` (default), `pill`                                    | Sets the shape                                                    |
| **size**                 | `normal` (default), `super-condensed`, `condensed`, `expanded` | Sets the size                                                     |
| **split-indicator**      | `string`                                                       | Icon for the secondary action                                     |

</div>

### Slots

<div class="table-wrapper">

| Name        | Description                                             |
| ----------- | ------------------------------------------------------- |
| **default** | Content to be openned by the secondary action (eg Menu) |
| **icon**    | For custom icons                                        |

</div>

### Events

<div class="table-wrapper">

| Name                | Type                     | Bubbles | Composed | Description                                        |
| ------------------- | ------------------------ | ------- | -------- | -------------------------------------------------- |
| **action-click**    | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when the action button is clicked    |
| **indicator-click** | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when the indicator button is clicked |

</div>
