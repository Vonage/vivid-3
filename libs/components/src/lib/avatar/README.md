## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VAvatar, VIcon } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VAvatar, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VAvatar>
		<VIcon slot="icon" name="user-line" label="User's avatar" />
	</VAvatar>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerAvatar } from '@vonage/vivid';
registerAvatar('your-prefix');
```

```html preview
<script type="module">
	import { registerAvatar } from '@vonage/vivid';
	registerAvatar('your-prefix');
</script>

<your-prefix-avatar>
	<vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon>
</your-prefix-avatar>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Icon

Use the icon slot to add an icon to the avatar.
If set, the deprecated icon attribute is ignored.

To maintain accessibility, always provide a label property for the slotted icon — read more
in the Icon component guidelines.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAvatar, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VAvatar>
		<VIcon slot="icon" name="assign-user-solid" label="Verified user's avatar" />
	</VAvatar>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-avatar>
	<vwc-icon slot="icon" name="assign-user-solid" label="Verified User's avatar"></vwc-icon>
</vwc-avatar>
```

</vwc-tab-panel>
</vwc-tabs>

### Graphic

Use the graphic slot to set any graphic media (e.g. image or SVG) as the avatar content.

<vwc-tabs gutters="none"> 
<vwc-tab label="Vue"></vwc-tab> 
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAvatar } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VAvatar shape="pill" connotation="cta">
			<img slot="graphic" src="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="woman" />
		</VAvatar>

		<VAvatar shape="pill" connotation="cta">
			<svg slot="graphic" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 349.66 349.66" fill="none">
				<path d="M258.65 229.64h-151.92c-16.65 0-35.17-13.51-41.34-30.16L1.99 30.16C-4.19 13.51 4.3 0 20.96 0h151.91c16.65 0 35.17 13.51 41.34 30.16l63.38 169.32c6.18 16.65-2.31 30.16-18.97 30.16z" fill="url(#grad)" />
				<defs>
					<linearGradient id="grad" x1="0" y1="0" x2="349.66" y2="349.66" gradientUnits="userSpaceOnUse">
						<stop stop-color="#A662FF" />
						<stop offset="1" stop-color="#57EDFD" />
					</linearGradient>
				</defs>
			</svg>
		</VAvatar>
	</div>
</template>

<style scoped>
.container {
	display: inline-flex;
	gap: 4px;
}
</style>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-avatar shape="pill" connotation="cta">
		<img slot="graphic" src="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="woman" />
	</vwc-avatar>

	<vwc-avatar shape="pill" connotation="cta">
		<svg slot="graphic" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 349.66 349.66" fill="none">
			<path d="M258.65 229.64h-151.92c-16.65 0-35.17-13.51-41.34-30.16L1.99 30.16C-4.19 13.51 4.3 0 20.96 0h151.91c16.65 0 35.17 13.51 41.34 30.16l63.38 169.32c6.18 16.65-2.31 30.16-18.97 30.16z" fill="url(#grad)" />
			<defs>
				<linearGradient id="grad" x1="0" y1="0" x2="349.66" y2="349.66" gradientUnits="userSpaceOnUse">
					<stop stop-color="#A662FF" />
					<stop offset="1" stop-color="#57EDFD" />
				</linearGradient>
			</defs>
		</svg>
	</vwc-avatar>
</div>

<style>
	.container {
		display: inline-flex;
		gap: 4px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name                                    | Type                                                      | Description                                          |
| --------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| **appearance**                          | Enum: `filled` (default), `duotone`, `outlined`, `subtle` | Sets the element's appearance                        |
| **connotation**                         | Enum: `accent` (default), `cta`                           | Sets the element's connotation                       |
| _(deprecated as of 06/25)_<br> **icon** | `string`                                                  | Sets the element's icon                              |
| **initials**                            | `string`                                                  | Sets the initials on the Avatar                      |
| **shape**                               | Enum: `rounded` (default), `pill`                         | Sets the element's shape                             |
| **size**                                | Enum: `condensed`, `normal` (default), `expanded`         | Sets the element's size                              |
| **clickable**                           | `boolean`                                                 | Indicates whether element should be a `<button>`.    |
| **href**                                | `string`                                                  | Sets the element's href, changes card tag to `<a>` . |
| **download**                            | `string`                                                  | Sets the element's download.                         |
| **hreflang**                            | `string`                                                  | Sets the element's hreflang.                         |
| **ping**                                | `string`                                                  | Sets the element's ping.                             |
| **referrerpolicy**                      | `string`                                                  | Sets the element's referrerpolicy.                   |
| **rel**                                 | `string`                                                  | Sets the element's rel.                              |
| **target**                              | _Enum_:<br/>`_self`<br/>`_blank`<br/>`_parent`<br/>`_top` | Sets the target's rel.                               |

</div>

### Slots

<div class="table-wrapper">

| Name        | Description                                              |
| ----------- | -------------------------------------------------------- |
| **graphic** | Add graphic element to card. Overrides the icon property |
| **icon**    | Add an icon to the component.                            |

</div>
