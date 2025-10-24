## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerNav, registerNavItem, registerNavDisclosure } from '@vonage/vivid';

registerNav('your-prefix');
registerNavItem('your-prefix');
registerNavDisclosure('your-prefix');
```

```html preview 160px
<script type="module">
	import { registerNav, registerNavItem, registerNavDisclosure } from '@vonage/vivid';
	registerNav('your-prefix');
	registerNavItem('your-prefix');
	registerNavDisclosure('your-prefix');
</script>

<your-prefix-nav>
	<your-prefix-nav-item text="Naviarion item"></your-prefix-nav-item>
	<your-prefix-nav-disclosure label="Naviarion Disclosure">
		<your-prefix-nav-item text="Naviarion item"></your-prefix-nav-item>
	</your-prefix-nav-disclosure>
</your-prefix-nav>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNav, VNavItem, VNavDisclosure } from '@vonage/vivid-vue';
</script>
<template>
	<VNav>
		<VNavItem text="navigation" />
		<VNavDisclosure label="disclosure">
			<VNavItem text="navigation" />
		</VNavDisclosure>
	</VNav>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Href

Use `href` to set the URL that the **Nav Item** links to.

```html preview
<vwc-nav>
	<vwc-nav-item href="#" text="Variations"></vwc-nav-item>
</vwc-nav>
```

## Current

Use the `current` attribute on **Nav Item** to indicate the currently active link.

```html preview
<vwc-nav>
	<vwc-nav-item href="#" text="Current Nav Item" current></vwc-nav-item>
	<vwc-nav-item href="#" text="Nav Item"></vwc-nav-item>
</vwc-nav>
```

Use the `current` attribute on **Nav Disclosure** to indicate the currently active disclosure.  
Only when the **Nav Disclosure** is closed the `current` will be set.

```html preview 150px
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" current>
		<vwc-icon slot="icon" name="profile"></vwc-icon>
		<vwc-nav-item href="#" text="2nd level item" current></vwc-nav-item>
	</vwc-nav-disclosure>
</vwc-nav>
```

<vwc-note connotation="warning" headline="Deprecated Prop: aria-current">
	<vwc-icon slot="icon" name="warning-line"></vwc-icon>

The `aria-current` prop is deprecated in both **Nav Item** and **Nav Disclosure** (as of 05/25) and directly replaced with `current`. `aria-current` is still functional in the component, but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

## Open

Use the `open` attribute to toggle the **Nav Disclosure** open state.

```html preview
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" open>
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
```

## Slots

### Meta Slot

Use the `meta` slot to add additional content to the **Nav Item** and the **Nav Disclosure**.

```html preview 150px
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" open>
		<vwc-badge slot="meta" text="beta" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
		<vwc-nav-item href="#" text="2nd level item">
			<vwc-badge slot="meta" text="in progress" connotation="warning" appearance="subtle" shape="pill"></vwc-badge>
		</vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
```

### Icon Slot

Set the `icon` slot to add an icon to the **Nav Item** and the **Nav Disclosure**.
If set, the `icon` attribute is ignored.

```html preview 150px
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" open>
		<vwc-icon
			slot="icon"
			name="check-circle-solid"
			connotation="success"
		></vwc-icon>
		<vwc-nav-item href="#" text="2nd level item">
				<vwc-icon
			slot="icon"
			name="close-circle-solid"
			connotation="alert"
		></vwc-icon>
		</vwc-nav-item>
	</vwc-nav-disclosure>
</vwc-nav>
</vwc-nav>
```

## API Reference

### Nav

#### Slots

<div class="table-wrapper">

| Name        | Description                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------- |
| **default** | Nav accepts [Nav Item](#nav-item/) and [Nav Disclosure](#nav-disclosure/) as slotted elements. |

</div>

### Nav Item

#### Properties

<div class="table-wrapper">

| Name            | Type                                                      | Description                                         |
| --------------- | --------------------------------------------------------- | --------------------------------------------------- |
| **appearance**  | _Enum_: `ghost` (default) `ghost-light`                   | Sets the nav item's appearance                      |
| **current**     | `boolean`                                                 | Indicates the currently active nav item             |
| **connotation** | _Enum_: `accent` (default), `cta`                         | Sets the connotation color of the selected nav item |
| **icon**        | _Enum_: `[icon-name]`                                     | Sets the element's icon                             |
| **href**        | `string`                                                  | The URL the hyperlink references                    |
| **target**      | _Enum_:<br/>`_self`<br/>`_blank`<br/>`_parent`<br/>`_top` | The URL the hyperlink opening options               |
| **text**        | `string`                                                  | text of the nav item                                |

</div>

#### Slots

<div class="table-wrapper">

| Name     | Description                                   |
| -------- | --------------------------------------------- |
| **icon** | Add an icon to the component.                 |
| **meta** | Add Meta information to the Nav Item end side |

</div>

### Nav Disclosure

#### Properties

<div class="table-wrapper">

| Name            | Type                                    | Description                                               |
| --------------- | --------------------------------------- | --------------------------------------------------------- |
| **appearance**  | _Enum_: `ghost` (default) `ghost-light` | Sets the nav disclosure's appearance                      |
| **current**     | `boolean`                               | Indicates there's a nested active nav item                |
| **connotation** | _Enum_: `accent` (default), `cta`       | Sets the connotation color of the selected nav disclosure |
| **icon**        | _Enum_: `[icon-name]`                   | Sets the element's icon                                   |
| **label**       | `string`                                | Label of the nav disclosure                               |
| **open**        | `boolean`                               | Sets the element open value                               |

</div>

#### Slots

<div class="table-wrapper">

| Name     | Description                                         |
| -------- | --------------------------------------------------- |
| **icon** | Add an icon to the component.                       |
| **meta** | Add Meta information to the Nav Disclosure end side |

</div>

#### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                       |
| ---------- | ------------------------ | ------- | -------- | ------------------------------------------------- |
| **toggle** | `CustomEvent<undefined>` | No      | Yes      | Event emitted when the nav disclosure is toggled. |

</div>
