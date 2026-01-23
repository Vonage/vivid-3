## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VMenu, VMenuItem, VButton } from '@vonage/vivid-vue';
</script>
<template>
	<VMenu open ariaLabel="Menu example" placement="bottom-end">
		<template #anchor>
			<VButton icon="more-vertical-line" aria-Label="Open menu" appearance="outlined" />
		</template>
		<VMenuItem text="Menu item 1" />
		<VMenuItem text="Menu item 2" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerMenu, registerMenuItem } from '@vonage/vivid';

registerMenu('your-prefix');
registerMenuItem('your-prefix');
```

```html preview 200px
<script type="module">
	import { registerMenu, registerMenuItem, registerButton, registerIcon } from '@vonage/vivid';
	const prefix = 'your-prefix';
	registerMenu(prefix);
	registerMenuItem(prefix);
	registerIcon(prefix);

	registerButton(prefix);
</script>

<your-prefix-menu open aria-label="Menu example" placement="bottom-end">
	<your-prefix-button slot="anchor" aria-label="Open menu" appearance="outlined">
		<your-prefix-icon slot="icon" name="more-vertical-line"></your-prefix-icon>
	</your-prefix-button>
	<your-prefix-menu-item text="Menu item 1"></your-prefix-menu-item>
	<your-prefix-menu-item text="Menu item 2"></your-prefix-menu-item>
</your-prefix-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## Trigger

The `trigger` attribute controls whether the Menu opens and closes itself automatically.

- `auto` (default) - The menu opens and closes automatically when the anchor is clicked. It also closes itself when the user selects a menu item with a role different from `menuitemcheckbox`.
- `legacy` - The menu opens automatically when the anchor is clicked. This value is not recommended and only exists for backwards compatibility.
- `off` - The menu does not open or close automatically.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 340px
<script setup lang="ts">
import { VButton, VDivider, VIcon, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu aria-label="Menu example" placement="bottom-end">
		<template #anchor>
			<VButton aria-label="Open menu" appearance="outlined">
				<template #icon><VIcon slot="icon" name="more-vertical-line" /></template>
			</VButton>
		</template>
		<VMenuItem text="Menu item 1" />
		<VMenuItem text="Menu item 2" />
		<VDivider />
		<VMenuItem control-type="checkbox" text="Option 1" />
		<VMenuItem control-type="checkbox" text="Option 2" />
		<VDivider />
		<VMenuItem control-type="radio" text="Option 1" />
		<VMenuItem control-type="radio" text="Option 2" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 340px
<vwc-menu aria-label="Menu example" placement="bottom-end">
	<vwc-button slot="anchor" aria-label="Open menu" appearance="outlined">
		<vwc-icon slot="icon" name="more-vertical-line"></vwc-icon>
	</vwc-button>
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item control-type="checkbox" text="Option 1"></vwc-menu-item>
	<vwc-menu-item control-type="checkbox" text="Option 2"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item control-type="radio" text="Option 1"></vwc-menu-item>
	<vwc-menu-item control-type="radio" text="Option 2"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## Auto Dismiss

The `auto-dismiss` attribute sets it to automatically close when focus is moved away from it, i.e. by clicking outside the menu.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VButton, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<div style="position: relative">
		<VMenu auto-dismiss id="menu" open aria-label="Menu example">
			<template #anchor>
				<VButton label="Toggle Menu" appearance="outlined" dropdown-indicator />
			</template>
			<VMenuItem text="Menu item 1" />
			<VMenuItem text="Menu item 2" />
		</VMenu>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<div style="position: relative">
	<vwc-menu auto-dismiss id="menu" open aria-label="Menu example">
		<vwc-button slot="anchor" label="Toggle Menu" appearance="outlined" dropdown-indicator></vwc-button>
		<vwc-menu-item text="Menu item 1"></vwc-menu-item>
		<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	</vwc-menu>
</div>
```

</vwc-tab-panel>
</vwc-tabs>

## Position Strategy

The `position-strategy` attribute sets the position strategy. It can be set to `fixed` (default) or `absolute`.

<vwc-note connotation="information" headline="Prefer using the default position strategy (fixed)">
	<vwc-icon slot="icon" name="info-solid" label="Note:"></vwc-icon>

In vivid version 4.12.0, popover attribute was added to menu, using the power of <a href="https://developer.mozilla.org/en-US/docs/Glossary/Top_layer">top-layer</a>, eliminating the effect of change in the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block">containing block</a>.

<p style="padding-block-start: 16px">We will remove the <code>position-strategy</code> in a future major version of Vivid to make this the default behaviour.</p>

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VButton, VIcon, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<div style="position: absolute; container-type: inline-size;">
		<VMenu position-strategy="absolute" aria-label="Menu example" placement="bottom-end">
			<template #anchor>
				<VButton aria-label="Open menu" appearance="outlined">
					<template #icon><VIcon name="more-vertical-line" /></template>
				</VButton>
			</template>
			<VMenuItem text="Menu item 1" />
			<VMenuItem text="Menu item 2" />
		</VMenu>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<div style="position: absolute; container-type: inline-size;">
	<vwc-menu position-strategy="absolute" aria-label="Menu example" placement="bottom-end">
		<vwc-button slot="anchor" aria-label="Open menu" appearance="outlined">
			<vwc-icon slot="icon" name="more-vertical-line"></vwc-icon>
		</vwc-button>
		<vwc-menu-item text="Menu item 1"></vwc-menu-item>
		<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	</vwc-menu>
</div>
```

</vwc-tab-panel>
</vwc-tabs>

## Anchor

<vwc-note connotation="information" headline="Prefer using the anchot slot">
	<vwc-icon slot="icon" name="info-solid" label="Note:"></vwc-icon>

It is recommended use the [`anchor` slot](#anchor-slot-menu) to set the anchor.

</vwc-note>

The `anchor` attribute should be set to the `id` value of the anchor element or pass the anchor element itself.

<vwc-note connotation="warning">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

**Pay attention to the source order** the components to ensure they can be operated logically using only a keyboard.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 200px
<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue';
import { VButton, VMenu, VMenuItem } from '@vonage/vivid-vue';

const button2 = useTemplateRef('button2');
const menu2 = useTemplateRef('menu2');

onMounted(() => {
	if (menu2.value && button2.value) {
		menu2.value.element.anchor = button2.value.element;
	}
});
</script>

<template>
	<div style="position: relative">
		<VButton id="button1" label="ID anchor" appearance="outlined" />
		<VMenu anchor="button1" aria-label="ID anchor menu example" auto-dismiss>
			<VMenuItem text="My anchor is an ID" />
		</VMenu>

		<VButton ref="button2" label="HTMLElement anchor" appearance="outlined" />
		<VMenu ref="menu2" aria-label="HTML element menu example" auto-dismiss>
			<VMenuItem text="My anchor is an HTMLElement" />
		</VMenu>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview center 200px
<div style="position: relative">
	<vwc-button id="button1" label="ID anchor" appearance="outlined"></vwc-button>
	<vwc-menu anchor="button1" aria-label="ID anchor menu example" auto-dismiss>
		<vwc-menu-item text="My anchor is an ID"></vwc-menu-item>
	</vwc-menu>

	<vwc-button id="button2" label="HTMLElement anchor" appearance="outlined"></vwc-button>
	<vwc-menu id="menu2" aria-label="HTML element menu example" auto-dismiss>
		<vwc-menu-item text="My anchor is an HTMLElement"></vwc-menu-item>
	</vwc-menu>
</div>

<script>
	const button2 = document.getElementById('button2');
	const menu2 = document.getElementById('menu2');

	menu2.anchor = button2;
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Default Slot

Place menu items and dividers between them in the default slot.

Only Menu Item, Divider and HTML elements with `role` of `menuitem` or `separator` are allowed. They must be direct descendants of the Menu, and cannot be nested inside other elements.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Menu example">
		<VMenuItem text="Menu item 1" />
		<VMenuItem text="Menu item 2" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<vwc-menu open aria-label="Menu example">
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

### Anchor Slot

The Menu positions itself relative to an anchor element. Place it inside the `anchor` slot. It is recommended to use the [Button](/components/button/) component as the anchor element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VButton, VIcon, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Menu example" placement="bottom-end">
		<template #anchor>
			<VButton aria-label="Open menu" appearance="outlined">
				<template #icon><VIcon name="more-vertical-line" /></template>
			</VButton>
		</template>
		<VMenuItem text="Menu item 1" />
		<VMenuItem text="Menu item 2" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<vwc-menu open aria-label="Menu example" placement="bottom-end">
	<vwc-button slot="anchor" aria-label="Open menu" appearance="outlined">
		<vwc-icon slot="icon" name="more-vertical-line"></vwc-icon>
	</vwc-button>
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

### Header Slot

Use the `header` slot to add additional content to the top of the menu.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VMenu, VMenuItem, VTextField } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Menu example">
		<template #header>
			<VTextField placeholder="Search" icon="search" />
		</template>
		<VMenuItem text="Menu item 1" />
		<VMenuItem text="Menu item 2" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<vwc-menu open aria-label="Menu example">
	<vwc-text-field slot="header" placeholder="Search" icon="search"></vwc-text-field>
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

### Action Items Slot

The `action-items` slot allows the addition of action items (in this case, a Button) to the bottom of the Menu.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VButton, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Menu example">
		<VMenuItem text="Menu item 1" />
		<VMenuItem text="Menu item 2" />
		<template #action-items>
			<VButton appearance="filled" label="Action" />
		</template>
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<vwc-menu open aria-label="Menu example">
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	<vwc-button slot="action-items" appearance="filled" label="Action"></vwc-button>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Maximum Inline Size

Use the `--menu-max-inline-size` variable to set the maximum inline size.

- Default: `max-content`

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-solid" label="Note:"></vwc-icon>
	<p>When setting a value to the <code>max-inline-size</code> - make sure the Menu is OK in small resolutions as well. </p>
	<p>In mobile, the <code>max-inline-size</code> is <code>300px</code> by default, but can be changed with the css-variable. </p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open class="menu" aria-label="Menu example">
		<VMenuItem text="Lorem ipsum dolor sit amet conse ctetur adipisicing elit" />
	</VMenu>
</template>

<style>
.menu {
	--menu-max-inline-size: 300px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 150px
<style>
	vwc-menu {
		--menu-max-inline-size: 300px;
	}
</style>

<vwc-menu open aria-label="Menu example">
	<vwc-menu-item text="Lorem ipsum dolor sit amet conse ctetur adipisicing elit"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

### Minimum Inline Size

Use the `--menu-min-inline-size` variable to set th minimum inline size.

- Default: `auto`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open class="menu" aria-label="Menu example">
		<VMenuItem text="Menu Item" />
	</VMenu>
</template>

<style>
.menu {
	--menu-min-inline-size: 300px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 150px
<style>
	vwc-menu {
		--menu-min-inline-size: 300px;
	}
</style>

<vwc-menu open aria-label="Menu example">
	<vwc-menu-item text="Menu Item"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

### Menu Block Size

Use the `--menu-block-size` variable to set the block size.

- Default: `408px`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open class="menu" aria-label="Menu example">
		<VMenuItem text="Menu Item" />
		<VMenuItem text="Menu Item" />
		<VMenuItem text="Menu Item" />
		<VMenuItem text="Menu Item" />
		<VMenuItem text="Menu Item" />
		<VMenuItem text="Menu Item" />
		<VMenuItem text="Menu Item" />
	</VMenu>
</template>

<style>
.menu {
	--menu-block-size: 100px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 150px
<style>
	vwc-menu {
		--menu-block-size: 100px;
	}
</style>

<vwc-menu open aria-label="Menu example">
	<vwc-menu-item text="Menu Item"></vwc-menu-item>
	<vwc-menu-item text="Menu Item"></vwc-menu-item>
	<vwc-menu-item text="Menu Item"></vwc-menu-item>
	<vwc-menu-item text="Menu Item"></vwc-menu-item>
	<vwc-menu-item text="Menu Item"></vwc-menu-item>
	<vwc-menu-item text="Menu Item"></vwc-menu-item>
	<vwc-menu-item text="Menu Item"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name                 | Type                                                                                                                                                                    | Description                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **anchor**           | `string`, `HTMLElement`                                                                                                                                                 | `id` or the anchor element itself                                     |
| **auto-dismiss**     | `boolean`                                                                                                                                                               | Sets the Menu to close when focus is lost                             |
| **open**             | `boolean`                                                                                                                                                               | Sets the open state of the Menu                                       |
| **placement**        | `left-start`, `left-center` `left-end`, `right-start`, `right-center`, `right-end`, `top-start`, `top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end` | Sets the desired position of the Menu relative to it's anchor element |
| **position-stategy** | `fixed` (deafult), `absolute`                                                                                                                                           | Sets the position strategy                                            |
| **trigger**          | `none`, `legacy`, `auto`(default)                                                                                                                                       | Sets trigger method of Menu                                           |

</div>

### Slots

<div class="table-wrapper">

| Name             | Description                                                             |
| ---------------- | ----------------------------------------------------------------------- |
| **default**      | For Menu Item components or HTML elements with the `role` or `menuitem` |
| **anchor**       | For the anchor element                                                  |
| **header**       | Add content to the top of Menu                                          |
| **action-items** | Add action items to the end of Menu                                     |

</div>

#### Events

<div class="table-wrapper">

| Name      | Type                     | Bubbles | Composed | Description                   |
| --------- | ------------------------ | ------- | -------- | ----------------------------- |
| **open**  | `CustomEvent<undefined>` | No      | Yes      | Fired when the menu is opened |
| **close** | `CustomEvent<undefined>` | No      | Yes      | Fired when the menu is closed |

</div>

### Methods

<div class="table-wrapper">

| Name                     | Returns | Description                                                                                                                                        |
| ------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **focus**                | `void`  | Moves focus into the Menu. If there is a child with the `autofocus` attribute, it will be focused. Otherwise, the first Menu Item will be focused. |
| **collapseExpandedItem** | `void`  | Collapses any expanded Menu Items.                                                                                                                 |

</div>
