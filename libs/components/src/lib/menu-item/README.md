## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/menu';
import '@vonage/vivid/menu-item';
```

or, if you need to use a unique prefix:

```js
import { registerMenu, registerMenuItem } from '@vonage/vivid';

registerMenu('your-prefix');
registerMenuItem('your-prefix');
```

```html preview 200px
<script type="module">
	import { registerMenu, registerMenuItem } from '@vonage/vivid';
	const prefix = 'your-prefix';
	registerMenu(prefix);
	registerMenuItem(prefix);
</script>

<your-prefix-menu
	open
	aria-label="Menu example"
	placement="bottom-end"
	trigger="auto"
>
	<your-prefix-menu-item text="Menu item 1"></your-prefix-menu-item>
	<your-prefix-menu-item text="Menu item 2"></your-prefix-menu-item>
</your-prefix-menu>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
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
</vwc-tabs>

## Slots

### Meta Slot

Use the `meta` slot to add an element (like a badge or an additional icon).

Using this slot it sets the icon, checkbox or radio to be trailing.

```html preview 200px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item text="Available" role="menuitemradio">
		<vwc-badge
			slot="meta"
			appearance="filled"
			connotation="success"
			shape="pill"
			icon="check-solid"
		></vwc-badge>
	</vwc-menu-item>
	<vwc-menu-item text="Away" role="menuitemradio">
		<vwc-badge
			slot="meta"
			appearance="filled"
			connotation="warning"
			shape="pill"
			icon="clock-line"
		></vwc-badge>
	</vwc-menu-item>
	<vwc-menu-item text="Busy" role="menuitemradio" checked>
		<vwc-badge
			slot="meta"
			appearance="filled"
			connotation="alert"
			shape="pill"
			icon="minus-solid"
		></vwc-badge>
	</vwc-menu-item>
</vwc-menu>
```

### Trailing Meta Slot

Use the `trailing-meta` slot to add an element (like a badge or an additional icon) to the end of Menu Item.

```html preview 170px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item role="menuitemcheckbox" text="Checkbox 1"> </vwc-menu-item>
	<vwc-menu-item role="menuitemcheckbox" text="Checkbox 2">
		<vwc-badge
			slot="trailing-meta"
			appearance="subtle"
			connotation="cta"
			text="New"
		></vwc-badge>
	</vwc-menu-item>
</vwc-menu>
```

### Submenu Slot

Assign a Menu to the `submenu` slot to create a submenu.

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

<vwc-note headline="Focus Management" connotation="information" icon="info-line">

When the Menu opens or `.focus()` is called, focus moves to the first Menu Item by default. If there is a child with the `autofocus` attribute, it will be focused instead.

</vwc-note>

## CSS Variables

### Line Clamp

Line clamp by default is set to one line.

This can be changed by setting a css-variable to a fixed number of lines or `auto`

- `--text-primary-line-clamp` for the primary text.
- `--text-secondary-line-clamp` for the secondary text.

```html preview 200px
<style>
	.menu {
		--text-primary-line-clamp: auto;
		--text-secondary-line-clamp: auto;
		--menu-max-inline-size: 200px;
	}
</style>

<vwc-menu open aria-label="Example menu" class="menu">
	<vwc-menu-item
		text="primary text with long text and auto line clamp"
		text-secondary="secondary text and auto line clamp"
	></vwc-menu-item>
</vwc-menu>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                 | Type                                                                      | Description                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **check-appearance** | `normal` (default), `tick-only`                                           | Sets the appearance of the check element                                                                                                   |
| **checked**          | `boolean`                                                                 | Sets the checked state                                                                                                                     |
| **check-trailing**   | `boolean`                                                                 | Sets the check element to appear at the end of the Menu Item                                                                               |
| **connotation**      | `accent` (default), `cta`                                                 | Sets the connotation that appears when checked                                                                                             |
| **disabled**         | `boolean`                                                                 | Sets the disabled state                                                                                                                    |
| **icon**             | _Enum_:<br/>`[icon-name]`                                                 | A decorative icon the custom element should have. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`s |
| **role**             | `menuitem` (default), `menuitemcheckbox`, `menuitemradio`, `presentation` | Sets the role                                                                                                                              |
| **secondary-text**   | `string`                                                                  | Give more context to the text                                                                                                              |
| **text**             | `string`                                                                  | Text content                                                                                                                               |

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

| Name                | Type                       | Bubbles | Composed | Description                                                                                                                        |
| ------------------- | -------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **expanded-change** | `CustomEvent<HTMLElement>` | No      | Yes      | Fires a custom 'expanded-change' event when the expanded state changes                                                             |
| **change**          | `CustomEvent<undefined>`   | No      | Yes      | Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked |
| **click**           | `CustomEvent<undefined>`   | No      | Yes      | Fires a custom 'click' event its `role` is `presentation`                                                                          |

</div>
