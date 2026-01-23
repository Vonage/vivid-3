## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>
<template>
	<VMenu open ariaLabel="Menu example" placement="bottom-end">
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

```html preview 150px
<script type="module">
	import { registerMenu, registerMenuItem } from '@vonage/vivid';
	const prefix = 'your-prefix';
	registerMenu(prefix);
	registerMenuItem(prefix);
</script>

<your-prefix-menu open aria-label="Menu example" placement="bottom-end">
	<your-prefix-menu-item text="Menu item 1"></your-prefix-menu-item>
	<your-prefix-menu-item text="Menu item 2"></your-prefix-menu-item>
</your-prefix-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Meta Slot

Use the `meta` slot to add an element (like a badge or an additional icon).

Using this slot sets the icon, checkbox or radio to be trailing.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VBadge, VIcon, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu">
		<VMenuItem text="Available" control-type="radio">
			<template #meta
				><VBadge appearance="filled" connotation="success" shape="pill">
					<template #icon><VIcon name="check-solid" /></template></VBadge
			></template>
		</VMenuItem>
		<VMenuItem text="Away" control-type="radio">
			<template #meta
				><VBadge appearance="filled" connotation="warning" shape="pill">
					<template #icon><VIcon name="clock-line" /></template></VBadge
			></template>
		</VMenuItem>
		<VMenuItem text="Busy" control-type="radio" checked>
			<template #meta
				><VBadge appearance="filled" connotation="alert" shape="pill">
					<template #icon><VIcon name="minus-solid" /></template></VBadge
			></template>
		</VMenuItem>
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item text="Available" control-type="radio">
		<vwc-badge slot="meta" appearance="filled" connotation="success" shape="pill">
			<vwc-icon slot="icon" name="check-solid"></vwc-icon>
		</vwc-badge>
	</vwc-menu-item>
	<vwc-menu-item text="Away" control-type="radio">
		<vwc-badge slot="meta" appearance="filled" connotation="warning" shape="pill">
			<vwc-icon slot="icon" name="clock-line"></vwc-icon>
		</vwc-badge>
	</vwc-menu-item>
	<vwc-menu-item text="Busy" control-type="radio" checked>
		<vwc-badge slot="meta" appearance="filled" connotation="alert" shape="pill">
			<vwc-icon slot="icon" name="minus-solid"></vwc-icon>
		</vwc-badge>
	</vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

### Trailing Meta Slot

Use the `trailing-meta` slot to add an element (like a badge or an additional icon) to the end of Menu Item.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 170px
<script setup lang="ts">
import { VBadge, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu">
		<VMenuItem control-type="checkbox" text="Checkbox 1" />
		<VMenuItem control-type="checkbox" text="Checkbox 2">
			<template #trailing-meta><VBadge appearance="subtle" connotation="cta" text="New" /></template>
		</VMenuItem>
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 170px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item control-type="checkbox" text="Checkbox 1"> </vwc-menu-item>
	<vwc-menu-item control-type="checkbox" text="Checkbox 2">
		<vwc-badge slot="trailing-meta" appearance="subtle" connotation="cta" text="New"></vwc-badge>
	</vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

### Submenu Slot

Assign a Menu to the `submenu` slot to create a submenu.

<vwc-note headline="Focus Management" connotation="information">
	<vwc-icon slot="icon" name="info-solid" label="Note:"></vwc-icon>

When the Menu opens or `.focus()` is called, focus moves to the first Menu Item by default. If there is a child with the `autofocus` attribute, it will be focused instead.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu">
		<VMenuItem text="Menu item 1">
			<template #submenu
				><VMenu>
					<VMenuItem text="Menu item 1.1" />
					<VMenuItem text="Menu item 1.2" />
					<VMenuItem text="Menu item 1.3" /> </VMenu
			></template>
		</VMenuItem>
		<VMenuItem text="Menu item 2">
			<template #submenu
				><VMenu>
					<VMenuItem text="Menu item 2.1" />
					<VMenuItem text="Menu item 2.2">
						<template #submenu
							><VMenu>
								<VMenuItem text="Menu item 2.2.1">
									<template #submenu
										><VMenu>
											<VMenuItem text="Menu item 2.2.1.1" />
											<VMenuItem text="Menu item 2.2.1.2" /> </VMenu
									></template>
								</VMenuItem>
								<VMenuItem text="Menu item 2.2.2" />
								<VMenuItem text="Menu item 2.2.3" /> </VMenu
						></template>
					</VMenuItem>
					<VMenuItem text="Menu item 2.3" /> </VMenu
			></template>
		</VMenuItem>
		<VMenuItem text="Menu item 3">
			<template #submenu
				><VMenu>
					<VMenuItem text="Menu item 3.1" />
					<VMenuItem text="Menu item 3.2" />
					<VMenuItem text="Menu item 3.3" /> </VMenu
			></template>
		</VMenuItem>
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item text="Menu item 1">
		<vwc-menu slot="submenu">
			<vwc-menu-item text="Menu item 1.1"></vwc-menu-item>
			<vwc-menu-item text="Menu item 1.2"></vwc-menu-item>
			<vwc-menu-item text="Menu item 1.3"></vwc-menu-item>
		</vwc-menu>
	</vwc-menu-item>
	<vwc-menu-item text="Menu item 2">
		<vwc-menu slot="submenu">
			<vwc-menu-item text="Menu item 2.1"></vwc-menu-item>
			<vwc-menu-item text="Menu item 2.2">
				<vwc-menu slot="submenu">
					<vwc-menu-item text="Menu item 2.2.1">
						<vwc-menu slot="submenu">
							<vwc-menu-item text="Menu item 2.2.1.1"></vwc-menu-item>
							<vwc-menu-item text="Menu item 2.2.1.2"></vwc-menu-item>
						</vwc-menu-item>
					<vwc-menu-item text="Menu item 2.2.2"></vwc-menu-item>
					<vwc-menu-item text="Menu item 2.2.3"></vwc-menu-item>
				</vwc-menu>
			</vwc-menu-item>
			<vwc-menu-item text="Menu item 2.3"></vwc-menu-item>
		</vwc-menu>
	</vwc-menu-item>
	<vwc-menu-item text="Menu item 3">
		<vwc-menu slot="submenu">
			<vwc-menu-item text="Menu item 3.1"></vwc-menu-item>
			<vwc-menu-item text="Menu item 3.2"></vwc-menu-item>
			<vwc-menu-item text="Menu item 3.3"></vwc-menu-item>
		</vwc-menu>
	</vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Line Clamp

Line clamp by default is set to one line.

This can be changed by setting a css-variable to a fixed number of lines or `auto`

- `--text-primary-line-clamp` for the primary text.
- `--text-secondary-line-clamp` for the secondary text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu" class="menu">
		<VMenuItem text="primary text with long text and auto line clamp" text-secondary="secondary text and auto line clamp" />
	</VMenu>
</template>

<style>
.menu {
	--text-primary-line-clamp: auto;
	--text-secondary-line-clamp: auto;
	--menu-max-inline-size: 200px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<style>
	.menu {
		--text-primary-line-clamp: auto;
		--text-secondary-line-clamp: auto;
		--menu-max-inline-size: 200px;
	}
</style>

<vwc-menu open aria-label="Example menu" class="menu">
	<vwc-menu-item text="primary text with long text and auto line clamp" text-secondary="secondary text and auto line clamp"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## Presentational

If the Menu Item is not a direct descendant of a Menu, it will automatically become presentational. That means it used only for visual purposes and no longer semantically or functionally act as a Menu Item.

You must wrap it in an element with `role="menuitem"` to provide the menu item functionality.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

Previously you needed to specify `role="presentation"` in this case. This is no longer necessary as the component will handle it automatically.

</vwc-note>

### Anchored Menu Item

To create a Menu Item that is anchored to a URL do the following:

- Wrap the vwc-menu-item in an anchor tag.
- Set the role attribute to menuitem on the anchor tag.

If you are using a framework, just wrap the menu item in any routing component/directive as done with the anchor tag.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 100px
<script setup lang="ts">
import { VIcon, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu">
		<a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
			<VMenuItem text="Go to Vonage" icon="vonage-solid">
				<template #trailing-meta><VIcon name="open-line" slot="trailing-meta" size="-5" /></template>
			</VMenuItem>
		</a>
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
		<vwc-menu-item text="Go to Vonage" icon="vonage-solid">
			<vwc-icon name="open-line" slot="trailing-meta" size="-5"></vwc-icon>
		</vwc-menu-item>
	</a>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name                 | Type                            | Description                                                                                                                                |
| -------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **control-type**     | `checkbox`, `radio`             | Whether the menu item should behave as a checkbox or radio button.                                                                         |
| **check-appearance** | `normal` (default), `tick-only` | Sets the appearance of the check element                                                                                                   |
| **checked**          | `boolean`                       | Sets the checked state                                                                                                                     |
| **check-trailing**   | `boolean`                       | Sets the check element to appear at the end of the Menu Item                                                                               |
| **connotation**      | `accent` (default), `cta`       | Sets the connotation that appears when checked                                                                                             |
| **disabled**         | `boolean`                       | Sets the disabled state                                                                                                                    |
| **icon**             | _Enum_:<br/>`[icon-name]`       | A decorative icon the custom element should have. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`s |
| **secondary-text**   | `string`                        | Give more context to the text                                                                                                              |
| **text**             | `string`                        | Text content                                                                                                                               |

</div>

### Slots

<div class="table-wrapper">

| Name              | Description                                           |
| ----------------- | ----------------------------------------------------- |
| **meta**          | For additional elements at the start of the Menu Item |
| **submenu**       | To add Menus as sub-menus                             |
| **trailing-meta** | For additional elements at the end of the Menu Item   |

</div>

### Events

<div class="table-wrapper">

| Name                | Type                       | Bubbles | Composed | Description                                                                              |
| ------------------- | -------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------- |
| **expanded-change** | `CustomEvent<HTMLElement>` | No      | Yes      | Fired when the expanded state changes.                                                   |
| **change**          | `CustomEvent<undefined>`   | No      | Yes      | Fired when the item is triggered. Does not fire when a submenu is collapsed or expanded. |

</div>
