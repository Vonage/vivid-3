# Menu

Menu, commonly known as a "context menu", is an element that is displayed upon user interaction. It is typically used to provide a list of actions available in the current context for a user to choose from.

```js
<script type="module">
  import '@vonage/vivid/menu';
</script>
```

```html preview
<vwc-menu open aria-label="Menu example">
  <vwc-menu-item text="Menu item 1"></vwc-menu-item>
  <vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

## Members

### Open

The `open` attribute controls the visibility of the menu.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-menu open aria-label="Menu example">
  <vwc-menu-item text="Menu item 1"></vwc-menu-item>
  <vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

### Anchor

Use the `anchor` attribute to link the menu to the element responsible for showing and hiding it. It can be the ID or a reference to said element.

The anchor must be clickable and in most cases, will be a button displaying an information glyph as in the example below.

- Type: `string | HTMLElement`
- Default: `undefined`

```html preview center
<style>
  html { /* for demo purposes */
		block-size: 200px;
	}
</style>

<div style="position: relative">
  <vwc-button id="button1" label="ID anchor" appearance="outlined"></vwc-button>
  <vwc-menu id="menu1" anchor="button1" aria-label="ID anchor menu example">
    <vwc-menu-item text="My anchor is an ID"></vwc-menu-item>
  </vwc-menu>

  <vwc-button id="button2" label="HTMLElement anchor" appearance="outlined"></vwc-button>
  <vwc-menu id="menu2" aria-label="HTML elelemt menu example">
    <vwc-menu-item text="My anchor is an HTMLElement"></vwc-menu-item>
  </vwc-menu>
</div>

<script>
	const button1 = document.getElementById('button1');
	const button2 = document.getElementById('button2');
	const menu1 = document.getElementById('menu1');
	const menu2 = document.getElementById('menu2');
	
  button1.addEventListener('click', () => menu1.open = !menu1.open);
  button2.addEventListener('click', () => menu2.open = !menu2.open);
	menu2.anchor = button2;
</script>
```

### Auto Dismiss

Use the auto dismiss property to automatically close the menu when the user clicks outside of it.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  html { /* for demo purposes */
		block-size: 200px;
	}
</style>
<div style="position: relative">
  <vwc-button id="button" label="Toggle Menu" appearance="outlined"></vwc-button>

  <vwc-menu id="menu" anchor="button" open auto-dismiss aria-label="Menu example">
    <vwc-menu-item text="Menu item 1"></vwc-menu-item>
    <vwc-menu-item text="Menu item 2"></vwc-menu-item>
 </vwc-menu>
</div>

<script>
	const button = document.getElementById('button');
	const menu = document.getElementById('menu');

	button.addEventListener('click', () => menu.open = !menu.open);
</script>
```

### Placement

Use the `placement` attribute to control the position of the menu relative to its anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `'bottom'`

```html preview
<div style="position: relative; text-align: end;">
  <vwc-button id="button" label="Toggle Menu" appearance="outlined"></vwc-button>

  <vwc-menu id="menu" anchor="button" placement="left-start" open aria-label="Menu example">
    <vwc-menu-item text="Menu item 1"></vwc-menu-item>
    <vwc-menu-item text="Menu item 2"></vwc-menu-item>
  </vwc-menu>
</div>

<script>
	const button = document.getElementById('button');
	const menu = document.getElementById('menu');
  	
	button.addEventListener('click', () => menu.open = !menu.open);
</script>
```

## Slots

### Default

The default slot for the menu items.

While any DOM content is permissible as a child of the menu, only `vwc-menu-item`'s and slotted content with a role of menu `item`, `menuitemcheckbox`, or `menuitemradio` will receive keyboard support.

```html preview
<vwc-menu open aria-label="Menu example">
  <vwc-menu-item text="Menu item 1"></vwc-menu-item>
  <vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

### Header

Use the `header` slot in order to add additional content to the top of the menu.

```html preview
<style>
  html { /* for demo purposes */
		block-size: 200px;
	}
</style>

<vwc-menu open aria-label="Menu example">
  <vwc-text-field slot="header" placeholder="Search" icon="search"></vwc-text-field>
  <vwc-menu-item text="Menu item 1"></vwc-menu-item>
  <vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

### Action Items

Use the `action-items` slot to add action items to the bottom of the menu.

```html preview
<style>
  html { /* for demo purposes */
		block-size: 200px;
	}
</style>

<vwc-menu open aria-label="Menu example">
  <vwc-menu-item text="Menu item 1"></vwc-menu-item>
  <vwc-menu-item text="Menu item 2"></vwc-menu-item>
	<vwc-button slot="action-items" appearance="filled" label="Action"></vwc-button>
</vwc-menu>
```

## CSS Variables

### Maximum Inline Size

Use the `--menu-max-inline-size` variable to set the menu's inline size.

- Default: `max-content`

```html preview
<style>
  vwc-menu {
    --menu-max-inline-size: 300px;
  }
</style>

<vwc-menu open aria-label="Menu example">
  <vwc-menu-item text="Lorem ipsum dolor sit amet conse ctetur adipisicing elit"></vwc-menu-item>
</vwc-menu>
```

### Minimum Inline Size

Use the `--menu-min-inline-size` variable to set the menu's inline size.

- Default: `auto`

```html preview
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

```html preview
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

| Name    | Description                                      |
| ------- | ------------------------------------------------ |
| `open`  | The `open` event fires when the menu is opened.  |
| `close` | The `close` event fires when the menu is closed. |

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

## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Menu component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a menu component to top other elements z-axis, is to utilise a service that dynamically appends a menu component to the end of the body element, when called for.

This helps ensure elements don't render on top of a menu undesirably.

## Use Cases

### Dropdown menu with checkbox

```html preview
<style>
  html { /* for demo purposes */
		block-size: 350px;
	}
</style>
<div style="position: relative">
  <vwc-button id="button" label="Select" appearance="filled"></vwc-button>

  <vwc-menu id="menu" anchor="button" placement="bottom-start" open aria-label="Menu example">
    <vwc-text-field slot="header" placeholder="Search" icon="search"></vwc-text-field>
    <vwc-menu-item role="menuitemcheckbox" text="Checkbox 1"></vwc-menu-item>
    <vwc-menu-item role="menuitemcheckbox" text="Checkbox 2"></vwc-menu-item>
    <vwc-menu-item role="menuitemcheckbox" text="Checkbox 3"></vwc-menu-item>
    <vwc-button slot="action-items" appearance="outlined" label="Close"></vwc-button>
    <vwc-button slot="action-items" appearance="filled" label="Select"></vwc-button>
  </vwc-menu>
</div>

<script>
	const menu = document.getElementById('menu');
	const button = document.getElementById('button');

	button.addEventListener('click', () => menu.open = !menu.open);
</script>
```

### Menu Anchor

```html preview
<style>
  html { /* for demo purposes */
		block-size: 250px;
	}
</style>
<div style="position: relative">
  <vwc-menu id="menu" anchor="button" placement="bottom-start" open aria-label="Menu example">
   <a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
  	<vwc-menu-item role="presentation" text="My Addresses" icon="address-book-line"></vwc-menu-item>
	 </a>
   <a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
  	<vwc-menu-item role="presentation" text="My Profile" icon="profile-line"></vwc-menu-item>
	 </a>
   <a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
  	<vwc-menu-item role="presentation" text="Team" icon="group-line"></vwc-menu-item>
	 </a>
   <a role="menuitem" href="https://www.vonage.com" target="_blank" rel="noopener noreferrer">
  	<vwc-menu-item role="presentation" text="Logout" icon="quit-line"></vwc-menu-item>
	 </a>
  </vwc-menu>
  <vwc-button id="button" icon="close-line"></vwc-button>
</div>

<script>
	const menu = document.getElementById('menu');
	const button = document.getElementById('button');

	button.addEventListener('click', () => menu.open = !menu.open);
</script>
```
