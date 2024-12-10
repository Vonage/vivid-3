## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/side-drawer';
```

or, if you need to use a unique prefix:

```js
import { registerSideDrawer } from '@vonage/vivid';

registerSideDrawer('your-prefix');
```

```html preview 100px
<script type="module">
	import { registerSideDrawer } from '@vonage/vivid';
	registerAlert('your-prefix');
</script>

<your-prefix-side-drawer
	open
></your-prefix-side-drawer>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VSideDrawer } from '@vonage/vivid-vue';
</script>
<template>
	<VSideDrawer open />
</template>
```

</vwc-tab-panel>
</vwc-tabs>


## Slots

### Default

The default slot sets assigned nodes to the side drawer itself.

```html preview full 150px
<vwc-side-drawer open>
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>
</vwc-side-drawer>
```

### App Content

The `app-content` slot sets assigned nodes to the main application content, the side drawer is opened next to.

```html preview full
<vwc-side-drawer open>
	<vwc-layout gutters="small" slot="app-content">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
		non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</vwc-layout>
</vwc-side-drawer>
```



## CSS Variables

### Application Content Offset

When side drawer is opened, `--side-drawer-app-content-offset` controls the offset of the side drawer's application content from the window's edge.
some designs may choose side-drawer to overlap the app-content, so the app-content should be offset by the side-drawer's width.
Additionally, as the _base_ element (which represents the actual side-drawer), is styled with `position: fixed`, customizing its inline size directly will not affect the application content offset interchangeably. Hence, using this CSS custom property is mandatory to account for side-drawer inline size altercations.

- Default: `280px`

```html preview full 150px
<style>
	vwc-side-drawer {
		--side-drawer-app-content-offset: 230px;
	}

	vwc-fab {
		position: fixed;
		inset: auto auto 8px 8px;
		z-index: 2;
	}
</style>

<vwc-side-drawer id="sidedrawer">
	<vwc-layout slot="app-content" gutters="medium">
		Toggle the side drawer by clicking the FAB.
		<br />
		Notice that the side drawer overlaps the application content.
	</vwc-layout>

	<vwc-fab
		connotation="accent"
		icon="menu-solid"
		slot="app-content"
		onclick="sidedrawer.open = !sidedrawer.open"
	></vwc-fab>
</vwc-side-drawer>
```

## CSS Parts

### Base

Select `base` part to access the component's internal _base_ element (which represents the actual side-drawer).

```html preview full 150px
<style>
	vwc-side-drawer::part(base) {
		background-color: var(--vvd-color-neutral-50);
	}
</style>

<vwc-side-drawer open>
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>
</vwc-side-drawer>
```

## API Reference

### Properties

| Name                          | Type                                                                                              | Description                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **dismiss-button-aria-label** | `string`                                                                                          | Allows setting a custom aria-label for the dismiss button.                      |
| **removable**                 | `boolean`                                                                                         | Adds a close button to the Alert.                                               |
| **placement**                 | _Enum_:<br/>`top`<br/>`top-start`<br/>`top-end`<br/>`bottom`<br/>`bottom-start`<br/>`bottom-end`  | The placement of the Alert on the screen.                                       |
| **headline**                  | `string`                                                                                          | Adds a headline to the Alert.                                                   |
| **text**                      | `string`                                                                                          | The main text of the Alert.                                                     |
| **icon**                      | _Enum_:<br/>`[icon-name]`                                                                         | The icon to display in the Alert. Takes precedence over the connotation's icon. |
| **timeoutms**                 | `number`                                                                                          | Timeout after which the Alert will close.                                       |
| **connotation**               | _Enum_:<br/>`accent`<br/>`information`<br/>`success`<br/>`warning`<br/>`announcement`<br/>`alert` | Sets an appropriate icon / icon color for the connotation.                      |
| **strategy**                  | _Enum_:<br/>`fixed`<br/>`static`                                                                  | Controls the `position` of the Alert.                                           |
| **open**                      | `boolean`                                                                                         | Open state of the Alert.                                                        |

### Slots

| Name            | Description                                |
|-----------------| ------------------------------------------ |
| **main**        | The main content of the Alert.             |
| **app-content** |  |


### Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                                                                                                                                      |
| -------- | ------------------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `open`   | `CustomEvent<undefined>` | No      | Yes      | Fired when the side drawer is opened.                                                                                                            |
| `close`  | `CustomEvent<undefined>` | No      | Yes      | Fired when the side drawer is closed.                                                                                                            |
| `cancel` | `CustomEvent<undefined>` | No      | Yes      | Fired when the user requests to close the side-drawer. You can prevent the side drawer from closing by calling `.preventDefault()` on the event. |

</div>



