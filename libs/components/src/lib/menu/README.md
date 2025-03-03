## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/layout';
```

or, if you need to use a unique prefix:

```js
import { registerMenu, registerMenuItem } from '@vonage/vivid';

registerMenu('your-prefix');
registerMenuItem('your-prefix');
```

```html preview 200px
<script type="module">
	import {
		registerMenu,
		registerMenuItem,
		registerButton,
	} from '@vonage/vivid';
	const prefix = 'your-prefix';
	registerMenu(prefix);
	registerMenuItem(prefix);

	registerButton(prefix);
</script>

<your-prefix-menu
	open
	aria-label="Menu example"
	placement="bottom-end"
	trigger="auto"
>
	<your-prefix-button
		slot="anchor"
		icon="more-vertical-line"
		aria-label="Open menu"
		appearance="outlined"
	></your-prefix-button>
	<your-prefix-menu-item text="Menu item 1"></your-prefix-menu-item>
	<your-prefix-menu-item text="Menu item 2"></your-prefix-menu-item>
</your-prefix-menu>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VMenu, VMenuItem, VButton } from '@vonage/vivid-vue';
</script>
<template>
	<VMenu open ariaLabel="Menu example" placement="bottom-end">
		<VButton
			slot="anchor"
			icon="more-vertical-line"
			aria-Label="Open menu"
			appearance="outlined"
		/>
		<VMenuItem text="Menu item 1" />
		<VMenuItem text="Menu item 2" />
	</VMenu>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Trigger

The `trigger` attribute on **Menu** controls whether the Menu opens and closes itself automatically.

- `auto` - The menu opens and closes automatically when the anchor is clicked. It also closes itself when the user selects a menu item with a role different from `menuitemcheckbox`.
- `legacy` (default) - The menu opens automatically when the anchor is clicked. This value is not recommended and only exists for backwards compatibility.
- `off` - The menu does not open or close automatically.

<vwc-note connotation="information" icon="info-solid" headline="Change Announcement">

We will change the default value of `trigger` to `auto` in a future major version of Vivid to make this the default behaviour.

</vwc-note>

```html preview 340px
<vwc-menu aria-label="Menu example" trigger="auto" placement="bottom-end">
	<vwc-button
		slot="anchor"
		icon="more-vertical-line"
		aria-label="Open menu"
		appearance="outlined"
	></vwc-button>
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item role="menuitemcheckbox" text="Option 1"></vwc-menu-item>
	<vwc-menu-item role="menuitemcheckbox" text="Option 2"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item role="menuitemradio" text="Option 1"></vwc-menu-item>
	<vwc-menu-item role="menuitemradio" text="Option 2"></vwc-menu-item>
</vwc-menu>
```

## Auto Dismiss

The `auto-dismiss` attribute on **Menu** sets it to automatically close when focus is moved away from it, i.e. by clicking outside the menu.

```html preview 200px
<div style="position: relative">
	<vwc-menu
		auto-dismiss
		id="menu"
		open
		trigger="auto"
		aria-label="Menu example"
	>
		<vwc-button
			slot="anchor"
			label="Toggle Menu"
			appearance="outlined"
			dropdown-indicator
		></vwc-button>
		<vwc-menu-item text="Menu item 1"></vwc-menu-item>
		<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	</vwc-menu>
</div>
```

## Position Strategy

The `position-strategy` attribute on the **Menu** sets the position strategy. It can be set to `fixed` (default) or `absolute`.

<vwc-note connotation="information" icon="info-solid" headline="Prefer using the default position strategy (fixed)">

In vivid version 4.12.0, popover attribute was added to menu, using the power of <a href="https://developer.mozilla.org/en-US/docs/Glossary/Top_layer">top-layer</a>, eliminating the effect of change in the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block">containing block</a>.

<p style="padding-block-start: 16px">We will remove the <code>position-strategy</code> in a future major version of Vivid to make this the default behaviour.</p>

</vwc-note>

```html preview 200px
<div style="position: absolute; container-type: inline-size;">
	<vwc-menu
		position-strategy="absolute"
		trigger="auto"
		aria-label="Menu example"
		placement="bottom-end"
	>
		<vwc-button
			slot="anchor"
			icon="more-vertical-line"
			aria-label="Open menu"
			appearance="outlined"
		></vwc-button>
		<vwc-menu-item text="Menu item 1"></vwc-menu-item>
		<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	</vwc-menu>
</div>
```

## Anchor

<vwc-note connotation="warning" icon="warning-line" headline="Prefer using the anchot slot">

It is recommended use the [`anchor` slot](#anchor-slot-menu) to set the anchor.

</vwc-note>

The `anchor` attribute should be set to the `id` value of the anchor element or pass the anchor element itself.

```html preview center 200px
<div style="position: relative">
	<vwc-button id="button1" label="ID anchor" appearance="outlined"></vwc-button>
	<vwc-menu anchor="button1" aria-label="ID anchor menu example" auto-dismiss>
		<vwc-menu-item text="My anchor is an ID"></vwc-menu-item>
	</vwc-menu>

	<vwc-button
		id="button2"
		label="HTMLElement anchor"
		appearance="outlined"
	></vwc-button>
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

<vwc-note connotation="warning" icon="warning-line">

**Pay attention to the source order** the components to ensure they can be operated logically using only a keyboard.

</vwc-note>

## Slots

### Default Slot (Menu)

The default slot in **Menu** is for the menu items.

While any DOM content is permissible as a child of the Menu, only **Menu Items** and slotted content with a role of `menuitem`, `menuitemcheckbox`, or `menuitemradio` will receive keyboard support.

```html preview 130px
<vwc-menu open aria-label="Menu example">
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

### Anchor Slot (Menu)

The **Menu** positions itself relative to an anchor element. Place it inside the `anchor` slot of the **Menu**. It is recommended to use the [Button](/components/button/) component as the anchor element.

```html preview 200px
<vwc-menu open aria-label="Menu example" placement="bottom-end">
	<vwc-button
		slot="anchor"
		icon="more-vertical-line"
		aria-label="Open menu"
		appearance="outlined"
	></vwc-button>
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

### Header Slot (Menu)

Use the `header` slot in **Menu** to add additional content to the top of the menu.

```html preview 200px
<vwc-menu open aria-label="Menu example">
	<vwc-text-field
		slot="header"
		placeholder="Search"
		icon="search"
	></vwc-text-field>
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

### Action Items Slot (Menu)

The `action-items` slot on **Menu** allows the addition of action items (in this case, a Button) to the bottom of the Menu.

```html preview 200px
<vwc-menu open aria-label="Menu example">
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	<vwc-button
		slot="action-items"
		appearance="filled"
		label="Action"
	></vwc-button>
</vwc-menu>
```

### Meta Slot (Menu Item)

Use the `meta` slot on **Menu Item** to add an element (like a badge or an additional icon).

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

### Trailing Meta Slot (Menu Item)

se the `trailing-meta` slot on **Menu Item** to add an element (like a badge or an additional icon) to the end of Menu Item.

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

### Submenu Slot (Menu Item)

Assign a Menu to **Menu Item**'s `submenu` slot to create a submenu.

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
			<vwc-menu-item text="Menu item 2.2"></vwc-menu-item>
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

### Maximum Inline Size

Use the `--menu-max-inline-size` variable to set the **Menu**'s inline size.

- Default: `max-content`

<vwc-note connotation="information" icon="info-solid">
<p>When setting a value to the <code>max-inline-size</code> - make sure the Menu is OK in small resolutions as well. </p>
<p>In mobile, the <code>max-inline-size</code> is <code>300px</code> by default, but can be changed with the css-variable. </p>
</vwc-note>

```html preview 150px
<style>
	vwc-menu {
		--menu-max-inline-size: 300px;
	}
</style>

<vwc-menu open aria-label="Menu example">
	<vwc-menu-item
		text="Lorem ipsum dolor sit amet conse ctetur adipisicing elit"
	></vwc-menu-item>
</vwc-menu>
```

### Minimum Inline Size

Use the `--menu-min-inline-size` variable to set the **Menu**'s inline size.

- Default: `auto`

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

### Menu Block Size

Use the `--menu-block-size` variable to set the **Menu**'s block size.

- Default: `408px`

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

### Line Clamp

Line clamp on **Menu Item** by default is set to one line.

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

### Menu

#### Properties

<div class="table-wrapper">

| Name                 | Type                                                                                                                                                                    | Description                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **anchor**           | `string`, `HTMLElement`                                                                                                                                                 | `id` or the anchor element itself                                     |
| **auto-dismiss**     | `boolean`                                                                                                                                                               | Sets the Menu to close when focus is lost                             |
| **open**             | `boolean`                                                                                                                                                               | Sets the open state of the Menu                                       |
| **placement**        | `left-start`, `left-center` `left-end`, `right-start`, `right-center`, `right-end`, `top-start`, `top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end` | Sets the desired position of the Menu relative to it's anchor element |
| **position-stategy** | `fixed` (deafult), `absolute`                                                                                                                                           | Sets the position strategy                                            |
| **trigger**          | `none`, `legacy` (default), `auto`                                                                                                                                      | Sets trigger method of Menu                                           |

</div>

#### Slots

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

#### Methods

<div class="table-wrapper">

| Name                     | Returns | Description                                                                                                                                        |
| ------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **focus**                | `void`  | Moves focus into the Menu. If there is a child with the `autofocus` attribute, it will be focused. Otherwise, the first Menu Item will be focused. |
| **collapseExpandedItem** | `void`  | Collapses any expanded Menu Items.                                                                                                                 |

</div>

### Menu Item

#### Properties

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

#### Slots

<div class="table-wrapper">

| Name        | Description                                                             |
| ----------- | ----------------------------------------------------------------------- |
| **meta**    | For Menu Item components or HTML elements with the `role` or `menuitem` |
| **submenu** | To add Menus as sub-menus                                               |

</div>

#### Events

<div class="table-wrapper">

| Name                | Type                       | Bubbles | Composed | Description                                                                                                                        |
| ------------------- | -------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **expanded-change** | `CustomEvent<HTMLElement>` | No      | Yes      | Fires a custom 'expanded-change' event when the expanded state changes                                                             |
| **change**          | `CustomEvent<undefined>`   | No      | Yes      | Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked |

</div>
