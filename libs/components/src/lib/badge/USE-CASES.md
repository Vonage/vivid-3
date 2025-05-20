## Trim Text

```html preview
<vwc-badge class="badge-trim" text="overflowing text"></vwc-badge>

<style>
	.badge-trim {
		inline-size: 60px;
	}
</style>
```

## Custom Width

```html preview
<vwc-badge class="badge-inline-size" text="with min-width"></vwc-badge>

<style>
	.badge-inline-size {
		min-width: 300px;
	}
</style>
```

## Usage With Buttons

If you need to use the badge together with buttons (e.g. in toolbars), use an `expanded` size of the badge with a `super-condensed` button. This will make both components the same height and vertical alignment, improving layout consistency.

```html preview
<vwc-action-group>
	<vwc-badge
		appearance="subtle"
		size="expanded"
		text="Example badge"
	></vwc-badge>
	<vwc-button
		size="super-condensed"
		label="Example button"
		appearance="filled"
	></vwc-button>
</vwc-action-group>
```
