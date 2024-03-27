# Navigation Disclosure

By using the nav-disclosure, you can either collapse (hide) or expand (show) the content.
It has two elements: a disclosure button and a section of content whose visibility is controlled by the button.
The arrow points down when the controlled content is hidden, indicating that pressing the button will reveal additional content.
The arrow points up when the content is visible.

```js
<script type="module">import '@vonage/vivid/nav-disclosure';</script>
```

## Members

### Label

- Type: `string`
- Default: `''`

Add a `label` attribute to add label to the nav disclosure.

```html preview
<vwc-nav>
	<vwc-nav-disclosure label="1st level item">
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
```

### Open

- Type: `boolean`
- Default: `false`

You can toggle the nav-disclosure by using the `open` attribute.

```html preview
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" open>
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
```

### Icon

- Type: `string`
- Default: `''`

Nav disclosure label can be prefixed by a decorative icon.
Use the `icon` attribute to add an icon.

```html preview
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" icon="profile">
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
```

### Icon Only

If label is not applied.

```html preview
<vwc-nav>
	<vwc-nav-disclosure icon="profile">
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
```

### Aria Current

- Type: `string` | `undefined`
- Default: `undefined`

Within a set of pagination links, set a nav disclosure `aria-current` value to `"true"` to indicate the currently active disclosure.  
Only when the navigation disclosure is closed the `aria-current` will be set.

```html preview
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" icon="profile" aria-current="true">
		<vwc-nav-item
			href="#"
			text="2nd level item"
			aria-current="page"
		></vwc-nav-item>
	</vwc-nav-disclosure>
</vwc-nav>
```

## Events

<div class="table-wrapper">

| Name     | Description                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `toggle` | The `toggle` event is dispatched when the open/closed state of the nav-disclosure is toggled. This event does not bubble. |

</div>

## Slots

### Icon

Set the `icon` slot to show an icon before the nav-disclosure's label.
If set, the `icon` attribute is ignored.

```html preview
<vwc-nav>
	<vwc-nav-disclosure label="1st level item">
		<vwc-icon
			slot="icon"
			name="check-circle-solid"
			connotation="success"
		></vwc-icon>
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
```

### Meta

Use the `meta` slot to add additional content to the nav-disclosure.

```html preview
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" icon="profile">
		<vwc-badge
			slot="meta"
			text="beta"
			connotation="success"
			appearance="subtle"
			shape="pill"
		></vwc-badge>
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
```

### USE CASE FOR VQA ONLY

```html preview
<style>
	.wrapper {
		width: 200px;
		padding: 8px;
		background-color: var(--vvd-color-cta-50);
	}
</style>
<div class="wrapper">
	<vwc-nav>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-disclosure
			label="1st level item"
			icon="profile"
			aria-current="true"
		>
			<vwc-nav-item
				href="#"
				text="2nd level item"
				aria-current="page"
			></vwc-nav-item>
			<vwc-nav-item href="#" text="item"></vwc-nav-item>
			<vwc-nav-item href="#" text="item"></vwc-nav-item>
		</vwc-nav-disclosure>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
	</vwc-nav>
</div>
<div class="wrapper vvd-theme-alternate">
	<vwc-nav>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-disclosure
			label="1st level item"
			icon="profile"
			aria-current="true"
		>
			<vwc-nav-item
				href="#"
				text="2nd level item"
				aria-current="page"
			></vwc-nav-item>
			<vwc-nav-item href="#" text="item"></vwc-nav-item>
			<vwc-nav-item href="#" text="item"></vwc-nav-item>
		</vwc-nav-disclosure>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
	</vwc-nav>
</div>
```

### - White labeling

```html preview
<style>
	.vvd-root {
		--vvd-color-cta-50: #f9f2f4;
		--vvd-color-cta-100: #f4e1e7;
		--vvd-color-cta-200: #efbfcd;
		--vvd-color-cta-300: #ec9cb4;
		--vvd-color-cta-400: #e86693;
		--vvd-color-cta-500: #e20e75;
		--vvd-color-cta-600: #c02066;
		--vvd-color-cta-700: #88294d;
		--vvd-color-cta-800: #552233;
		--vvd-color-cta-900: #29131a;
		--vvd-color-cta-950: #150a0d;
	}
	.wrapper {
		width: 200px;
		padding: 8px;
		background-color: var(--vvd-color-cta-50);
	}
</style>
<div class="wrapper">
	<vwc-nav>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-disclosure
			label="1st level item"
			icon="profile"
			aria-current="true"
		>
			<vwc-nav-item
				href="#"
				text="2nd level item"
				aria-current="page"
			></vwc-nav-item>
			<vwc-nav-item href="#" text="item"></vwc-nav-item>
			<vwc-nav-item href="#" text="item"></vwc-nav-item>
		</vwc-nav-disclosure>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
	</vwc-nav>
</div>
```

### - White labeling - DARK

```html preview
<style>
	.vvd-theme-alternate {
		--vvd-color-cta-50: #150a0d;
		--vvd-color-cta-100: #29131a;
		--vvd-color-cta-200: #efbfcd;
		--vvd-color-cta-300: #552233;
		--vvd-color-cta-400: #88294d;
		--vvd-color-cta-500: #c02066;
		--vvd-color-cta-600: #e20e75;
		--vvd-color-cta-700: #e86693;
		--vvd-color-cta-800: #ec9cb4;
		--vvd-color-cta-900: #f4e1e7;
		--vvd-color-cta-950: #f9f2f4;
	}
	.wrapper {
		width: 200px;
		padding: 8px;
		background-color: var(--vvd-color-cta-50);
	}
</style>
<div class="wrapper vvd-theme-alternate">
	<vwc-nav>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-disclosure
			label="1st level item"
			icon="profile"
			aria-current="true"
		>
			<vwc-nav-item
				href="#"
				text="2nd level item"
				aria-current="page"
			></vwc-nav-item>
			<vwc-nav-item href="#" text="item"></vwc-nav-item>
			<vwc-nav-item href="#" text="item"></vwc-nav-item>
		</vwc-nav-disclosure>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
		<vwc-nav-item href="#" text="item"></vwc-nav-item>
	</vwc-nav>
</div>
```
