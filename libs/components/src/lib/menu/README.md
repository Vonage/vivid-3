# Menu

Menu, commonly known as a "context menu", is an element that is displayed upon user interaction. It is typically used to provide a list of actions available in the current context for a user to choose from.

```js
<script type="module">import '@vonage/vivid/menu';</script>
```

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

## Members

### Open

The `open` attribute controls the visibility of the menu.

- Type: `boolean`
- Default: `false`

```html preview 150px
<vwc-menu open aria-label="Menu example">
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

### Trigger

The `trigger` attribute controls whether the menu opens and closes itself automatically.

- `auto` - The menu opens and closes automatically when the anchor is clicked. It also closes itself when the user selects a menu item with a role different from `menuitemcheckbox`.
- `legacy` (default) - The menu opens automatically when the anchor is clicked. This value is not recommended and only exists for backwards compatibility.
- `off` - The menu does not open or close automatically.

<vwc-note connotation="information" icon="info-solid" headline="Change Announcement">

We will change the default value of `trigger` to `auto` in a future major version of Vivid to make this the default behaviour.

</vwc-note>

- Type: `"auto" | "legacy" | "off"`
- Default: `"legacy"`

```html preview 300px
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
</vwc-menu>
```

### Auto Dismiss

Use the auto dismiss property to automatically close the menu when focus is moved away from it, i.e. by clicking outside the menu.

- Type: `boolean`
- Default: `false`

```html preview 200px
<div style="position: relative">
	<vwc-menu
		id="menu"
		open
		trigger="auto"
		auto-dismiss
		aria-label="Menu example"
	>
		<vwc-button
			slot="anchor"
			label="Toggle Menu"
			appearance="outlined"
		></vwc-button>
		<vwc-menu-item text="Menu item 1"></vwc-menu-item>
		<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	</vwc-menu>
</div>
```

### Placement

Use the `placement` attribute to control the position of the menu relative to its anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `'bottom'`

<vwc-note connotation="warning" icon="warning-line" headline="Bottom Placement at Viewport side">
<p>When the menu anchor is placed close to the start/end of the viewport, <code>placement</code> of <code>bottom</code> or <code>top</code> will not present well due to lack of space.</p>
<p>In such cases - prefer using bottom-start or end instead.</p></vwc-note>

```html preview 150px
<div style="position: relative; text-align: end;">
	<vwc-menu
		placement="left-start"
		open
		trigger="auto"
		aria-label="Menu example"
	>
		<vwc-button
			slot="anchor"
			label="Toggle Menu"
			appearance="outlined"
		></vwc-button>
		<vwc-menu-item text="Menu item 1"></vwc-menu-item>
		<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	</vwc-menu>
</div>
```

### Position Strategy

Add the `position-strategy` attribute to set the menu to be positioned `absolute` instead of `fixed`.

- Type: `fixed` | `absolute`
- Default: `fixed`

<vwc-note connotation="information" icon="info-solid" headline="when to use position-strategy=absolute">
When the menu is within a container that has properties such as `transform`, `perspective`, or `container-type`, which modify its containing block, it's best to use `position-strategy=absolute`.

<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block">read more about Layout and the containing block</a>

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

### Anchor

It's best to use the [`anchor` slot](#anchor-1) to set the anchor, but you can also use the `anchor` member.

Either set it to the `id` of the anchor element or pass the anchor element itself.

- Type: `string | HTMLElement`
- Default: `undefined`

```html preview center 200px
<div style="position: relative">
	<vwc-button id="button1" label="ID anchor" appearance="outlined"></vwc-button>
	<vwc-menu anchor="button1" aria-label="ID anchor menu example">
		<vwc-menu-item text="My anchor is an ID"></vwc-menu-item>
	</vwc-menu>

	<vwc-button
		id="button2"
		label="HTMLElement anchor"
		appearance="outlined"
	></vwc-button>
	<vwc-menu id="menu2" aria-label="HTML element menu example">
		<vwc-menu-item text="My anchor is an HTMLElement"></vwc-menu-item>
	</vwc-menu>
</div>

<script>
	const button2 = document.getElementById('button2');
	const menu2 = document.getElementById('menu2');

	menu2.anchor = button2;
</script>
```

## Slots

### Default

The default slot for the menu items.

While any DOM content is permissible as a child of the menu, only `vwc-menu-item`'s and slotted content with a role of menu `item`, `menuitemcheckbox`, or `menuitemradio` will receive keyboard support.

```html preview 150px
<vwc-menu open aria-label="Menu example">
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

### Anchor

The menu positions itself relative to an anchor element. Place it inside the `anchor` slot of the menu.

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

### Header

Use the `header` slot in order to add additional content to the top of the menu.

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

### Action Items

Use the `action-items` slot to add action items to the bottom of the menu.

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

## CSS Variables

### Maximum Inline Size

Use the `--menu-max-inline-size` variable to set the menu's inline size.

- Default: `max-content`

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

Use the `--menu-min-inline-size` variable to set the menu's inline size.

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

Use the `--menu-block-size` variable to set the menu's block size.

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

## Events

<div class="table-wrapper">

| Name    | Type                     | Bubbles | Composed | Description                   |
| ------- | ------------------------ | ------- | -------- | ----------------------------- |
| `open`  | `CustomEvent<undefined>` | No      | Yes      | Fired when the menu is opened |
| `close` | `CustomEvent<undefined>` | No      | Yes      | Fired when the menu is closed |

</div>

## Methods

<div class="table-wrapper">

| Name                   | Returns | Description                         |
| ---------------------- | ------- | ----------------------------------- |
| `focus`                | `void`  | Focuses the first item in the menu. |
| `collapseExpandedItem` | `void`  | Collapses any expanded menu items.  |

</div>

## Accessibility

The Menu requires an accessible name. It is the consumer's concern to provide an `aria-label` to the Menu.

If you are using menu with the `anchor` prop, it is important to place the menu directly after the anchor element in the source code so that the correct tab order is maintained.

The menu will set appropriate values for the `aria-haspopup` and `aria-expanded` attribute on the anchor element.

## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Menu component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a menu component to top other elements z-axis, is to utilise a service that dynamically appends a menu component to the end of the body element, when called for.

This helps ensure elements don't render on top of a menu undesirably.

## Keyboard Interaction

When anchor has focus:

- `Enter` - Opens the menu.
- `Space` - Opens the menu.

When the menu has focus:

- `ArrowDown` - Moves focus to the next menu item.
- `ArrowUp` - Moves focus to the previous menu item.
- `Home` - Moves focus to the first menu item.
- `End` - Moves focus to the last menu item.
- `Escape` - Closes the menu.

## Use Cases

### Dropdown menu with checkbox

```html preview 350px
<vwc-menu
	placement="bottom-start"
	open
	trigger="auto"
	aria-label="Menu example"
>
	<vwc-button slot="anchor" label="Select" appearance="filled"></vwc-button>
	<vwc-text-field
		slot="header"
		placeholder="Search"
		icon="search"
	></vwc-text-field>
	<vwc-menu-item role="menuitemcheckbox" text="Checkbox 1"></vwc-menu-item>
	<vwc-menu-item role="menuitemcheckbox" text="Checkbox 2"></vwc-menu-item>
	<vwc-menu-item role="menuitemcheckbox" text="Checkbox 3"></vwc-menu-item>
	<vwc-button
		slot="action-items"
		appearance="outlined"
		label="Close"
	></vwc-button>
	<vwc-button
		slot="action-items"
		appearance="filled"
		label="Select"
	></vwc-button>
</vwc-menu>
```

### Menu Anchor

```html preview 250px
<vwc-menu placement="bottom-start" open aria-label="Menu example">
	<vwc-button slot="anchor" icon="close-line"></vwc-button>
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item
			role="presentation"
			text="My Addresses"
			icon="address-book-line"
		></vwc-menu-item>
	</a>
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item
			role="presentation"
			text="My Profile"
			icon="profile-line"
		></vwc-menu-item>
	</a>
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item
			role="presentation"
			text="Team"
			icon="group-line"
		></vwc-menu-item>
	</a>
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item
			role="presentation"
			text="Logout"
			icon="quit-line"
		></vwc-menu-item>
	</a>
</vwc-menu>
```
