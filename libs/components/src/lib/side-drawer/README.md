## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerSideDrawer } from '@vonage/vivid';

registerSideDrawer('your-prefix');
```

```html preview 100px
<script type="module">
	import { registerSideDrawer } from '@vonage/vivid';
	registerSideDrawer('your-prefix');
</script>

<your-prefix-side-drawer open>
	<p>Side Drawer</p>
</your-prefix-side-drawer>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<VSideDrawer open>
		<VLayout gutters="small">
			<p>Side Drawer content</p>
		</VLayout>

		<template #app-content>
			<VLayout gutters="small">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</VLayout>
		</template>
	</VSideDrawer>
</template>

<script lang="ts" setup>
import { VSideDrawer, VLayout } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Default

Use the `default` slot to add content to the side drawer itself.

```html preview full 150px
<vwc-side-drawer open>
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>
</vwc-side-drawer>
```

### App Content

Use the `app-content` slot for the main application content, the side drawer is opened next to.

```html preview full
<vwc-side-drawer open>
	<vwc-layout gutters="small" slot="app-content">
		<h3>App Content</h3>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	</vwc-layout>
</vwc-side-drawer>
```

## CSS Parts

### Base

Use the CSS part `base` to provide custom styling to the Side-Drawer.

```html preview full 150px
<vwc-side-drawer open>
	<vwc-layout gutters="small">Side Drawer content</vwc-layout>
</vwc-side-drawer>

<style>
	vwc-side-drawer::part(base) {
		background-color: var(--vvd-color-neutral-50);
	}
</style>
```

## CSS Variables

### Application Content Offset

Use `--side-drawer-app-content-offset` to set a value different from `280px` to the offset of side drawer's application content.  
This is needed if a custom width is set on the side-drawer, or if side-drawer needs to overlap content [see use-case](/components/side-drawer/use-cases/#side-drawer-overlap-content)

```html preview full 150px
<vwc-side-drawer class="side-drawer" open>
	<vwc-layout slot="app-content" gutters="medium"> narrow side drawer with 100px width </vwc-layout>
</vwc-side-drawer>

<style>
	.side-drawer {
		--side-drawer-app-content-offset: 100px;
	}
	.side-drawer::part(base) {
		inline-size: 100px;
	}
</style>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name          | Type      | Description                               |
| ------------- | --------- | ----------------------------------------- |
| **alternate** | `boolean` | applies scheme alternate region           |
| **modal**     | `boolean` | sets the side drawer's type to modal      |
| **open**      | `boolean` | indicates whether the side drawer is open |
| **trailing**  | `boolean` | sets the side of the side drawer          |

</div>

### Slots

<div class="table-wrapper">

| Name            | Description                                                                             |
| --------------- | --------------------------------------------------------------------------------------- |
| **default**     | Sets assigned nodes to the side drawer itself.                                          |
| **app-content** | Sets assigned nodes to the main application content, the side drawer is opened next to. |

</div>

### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                                                                                                                      |
| ---------- | ------------------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **open**   | `CustomEvent<undefined>` | No      | Yes      | Fired when the side drawer is opened.                                                                                                            |
| **close**  | `CustomEvent<undefined>` | No      | Yes      | Fired when the side drawer is closed.                                                                                                            |
| **cancel** | `CustomEvent<undefined>` | No      | Yes      | Fired when the user requests to close the side-drawer. You can prevent the side drawer from closing by calling `.preventDefault()` on the event. |

</div>
