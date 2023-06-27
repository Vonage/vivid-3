# Navigation Item

This element's attributes include the [anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) attributes.

```js
<script type="module">
  import '@vonage/vivid/nav-item';
</script>
```

## Members

### Text

- Type: `string`
- Default: `''`

Add a `text` attribute to add text to the nav item.

```html preview
<vwc-nav>
  <vwc-nav-item href="#" text="Account"></vwc-nav-item>
</vwc-nav>
```

### Icon

Use `icon` to set an icon to the nav item.
View list of available icon at the [vivid icons gallery](../../designs/icons-gallery).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label`, `aria-labelledby` or `title` must be provided to ensure that the user can understand the nav item's purpose.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-nav>
	<vwc-nav-item href="#" icon="profile" text="Account"></vwc-nav-item>
	<vwc-nav-item href="#" icon="profile" aria-label="Account"></vwc-nav-item>
</vwc-nav>
```

### Aria Current

- Type: `boolean`
- Default: `false`

Within a set of pagination links, set a nav item `aria-current` value to *page* to indicate the currently active link.

```html preview
<vwc-nav>
  <vwc-nav-item href="#" text="Account" onclick="onClick(this)"></vwc-nav-item>
  <vwc-nav-item href="#" text="Shop" onclick="onClick(this)" aria-current="page"></vwc-nav-item>
  <vwc-nav-item href="#" text="My Cart" onclick="onClick(this)"></vwc-nav-item>
</vwc-nav>

<script>
  function onClick(el) {
    currentNavItem = document.querySelector('vwc-nav-item[aria-current="page"]');
    currentNavItem?.removeAttribute('aria-current');
    el.setAttribute('aria-current', 'page');
  }
</script>
```

## Slots

### Meta

Use the `meta` slot to add additional content to the nav item.

```html preview
<vwc-nav>
	<vwc-nav-item href="#" text="Account">
		<vwc-badge slot="meta" text="beta" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
	</vwc-nav-item>
</vwc-nav>
```

## Use cases

### Navigation Menu
```html preview
<vwc-nav>
  <vwc-nav-item href="#" icon="profile" text="Account" onclick="onClick(this)" aria-current="page" ></vwc-nav-item>
  <vwc-nav-item href="#" icon="inbox-line" text="Inbox" onclick="onClick(this)">
		<vwc-badge slot="meta" text="21" connotation="alert" appearance="subtle" shape="pill"></vwc-badge>
	</vwc-nav-item>
  <vwc-nav-item href="#" icon="ai" text="AI Studio" onclick="onClick(this)">
		<vwc-badge slot="meta" text="new" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
	</vwc-nav-item>
	<vwc-nav-item href="#" icon="books-line" text="Documentation" onclick="onClick(this)">
		<vwc-icon slot="meta" name="open-solid"></vwc-icon>
	</vwc-nav-item>
</vwc-nav>

<script>
  function onClick(el) {
    currentNavItem = document.querySelector('vwc-nav-item[aria-current="page"]');
    currentNavItem?.removeAttribute('aria-current');
    el.setAttribute('aria-current', 'page');
  }
</script>
```

