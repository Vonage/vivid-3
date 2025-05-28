## Separator

Use [Divider](/components/divider/) for adding separator between the action elements

```html preview
<vwc-action-group appearance="fieldset">
	<vwc-button>
		<vwc-icon slot="icon" name="reply-line"></vwc-icon>
	</vwc-button>
	<vwc-divider orientation="vertical"></vwc-divider>
	<vwc-button>
		<vwc-icon slot="icon" name="compose-line"></vwc-icon>
	</vwc-button>
</vwc-action-group>
```

## Toggle buttons

```html preview
<vwc-action-group role="region" aria-label="Text Alignment">
	<vwc-button aria-label="Text Align Left" onclick="onClick(event)">
		<vwc-icon slot="icon" name="align-left-line"></vwc-icon>
	</vwc-button>
	<vwc-button
		aria-pressed="true"
		aria-label="Text Align Center"
		appearance="filled"
		onclick="onClick(event)"
	>
		<vwc-icon slot="icon" name="align-center-line"></vwc-icon>
	</vwc-button>
	<vwc-button aria-label="Text Align Right" onclick="onClick(event)">
		<vwc-icon slot="icon" name="align-right-line"></vwc-icon>
	</vwc-button>
</vwc-action-group>

<script>
	function onClick(event) {
		currentPressed = document.querySelector('vwc-button[aria-pressed="true"]');
		currentPressed?.removeAttribute('aria-pressed');
		currentPressed?.removeAttribute('appearance');
		event.currentTarget.setAttribute('aria-pressed', 'true');
		event.currentTarget.setAttribute('appearance', 'filled');
	}
</script>
```

## Composed Search

```html preview
<vwc-action-group shape="pill">
	<vwc-button label="Action" appearance="ghost" icon-trailing shape="pill">
		<vwc-icon slot="icon" name="chevron-down-solid"></vwc-icon>
	</vwc-button>
	<vwc-divider orientation="vertical"></vwc-divider>
	<vwc-text-field
		placeholder="Search..."
		appearance="ghost"
		shape="pill"
		style="min-width: 160px;"
	>
		<vwc-icon slot="icon" name="search-line"></vwc-icon>
	</vwc-text-field>
</vwc-action-group>
```
