# Navigation Item

This element's attributes include the [anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) attributes.

```js
<script type="module">import '@vonage/vivid/nav-item';</script>
```

## Members

### Text

- Type: `string`
- Default: `''`

Add a `text` attribute to add text to the nav item.

```html preview
<vwc-nav>
	<vwc-nav-item text="Account"></vwc-nav-item>
</vwc-nav>
```

### Href

Use `href` to set the URL that the nav item links to.

{% clientSideNavigationHint %}

- Type: `string`
- Default: `undefined`

```html preview
<vwc-nav>
	<vwc-nav-item href="#" text="Account"></vwc-nav-item>
</vwc-nav>
```

### Icon

Use `icon` to set an icon to the nav item.
View list of available icon at the [vivid icons gallery](/icons/icons-gallery/).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label` or `title` must be provided to ensure that the user can understand the nav item's purpose.

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

Within a set of pagination links, set a nav item `aria-current` value to _page_ to indicate the currently active link.

```html preview
<vwc-nav>
	<vwc-nav-item href="#" text="Account" aria-current="page"></vwc-nav-item>
</vwc-nav>
```

### Appearance

Set the `appearance` attribute to change the nav-item's appearance.

- Type: `'ghost'` | `'ghost-light'`
- Default: `'ghost'`

```html preview
<vwc-nav>
	<vwc-nav-item
		appearance="ghost-light"
		href="#"
		icon="profile"
		text="Account"
	></vwc-nav-item>
	<vwc-nav-item
		appearance="ghost-light"
		href="#"
		aria-current="page"
		icon="gear-line"
		text="Settings"
	></vwc-nav-item>
</vwc-nav>
```

### Connotation

Set the `connotation` attribute to change the nav-item's connotation.

- Type: `'accent'` | `'cta'`
- Default: `'accent'`

```html preview
<vwc-nav>
	<vwc-nav-item
		appearance="ghost-light"
		connotation="cta"
		href="#"
		icon="profile"
		text="Account"
	></vwc-nav-item>
	<vwc-nav-item
		appearance="ghost-light"
		connotation="cta"
		href="#"
		aria-current="page"
		icon="gear-line"
		text="Settings"
	></vwc-nav-item>
</vwc-nav>
<hr>
<vwc-nav>
	<vwc-nav-item
		appearance="ghost"
		connotation="cta"
		href="#"
		icon="profile"
		text="Account"
	></vwc-nav-item>
	<vwc-nav-item
		appearance="ghost"
		connotation="cta"
		href="#"
		aria-current="page"
		icon="gear-line"
		text="Settings"
	></vwc-nav-item>
</vwc-nav>
```

## Slots

### Meta

Use the `meta` slot to add additional content to the nav item.

```html preview
<vwc-nav>
	<vwc-nav-item href="#" text="Account">
		<vwc-badge
			slot="meta"
			text="beta"
			connotation="success"
			appearance="subtle"
			shape="pill"
		></vwc-badge>
	</vwc-nav-item>
</vwc-nav>
```

### Icon

Set the `icon` slot to show an icon before the nav-item's text.
If set, the `icon` attribute is ignored.

```html preview
<vwc-nav>
	<vwc-nav-item href="#" text="Account">
		<vwc-icon
			slot="icon"
			name="check-circle-solid"
			connotation="success"
		></vwc-icon>
	</vwc-nav-item>
	<vwc-nav-item href="#">
		<vwc-icon
			slot="icon"
			name="check-circle-solid"
			connotation="success"
		></vwc-icon>
	</vwc-nav-item>
</vwc-nav>
```
