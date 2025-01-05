## Separator

Use [Divider](/components/divider/) for adding separator between the action elements

```html preview
<vwc-action-group appearance="fieldset">
	<vwc-button icon="reply-line"></vwc-button>
	<vwc-divider orientation="vertical"></vwc-divider>
	<vwc-button icon="compose-line"></vwc-button>
</vwc-action-group>
```

## Toggle buttons

```html preview
<vwc-action-group role="region" aria-label="Text Alignment">
	<vwc-button
		icon="align-left-line"
		aria-label="Text Align Left"
		onclick="onClick(event)"
	></vwc-button>
	<vwc-button
		aria-pressed="true"
		icon="align-center-line"
		aria-label="Text Align Center"
		appearance="filled"
		onclick="onClick(event)"
	></vwc-button>
	<vwc-button
		icon="align-right-line"
		aria-label="Text Align Right"
		onclick="onClick(event)"
	></vwc-button>
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
	<vwc-button
		label="Action"
		appearance="ghost"
		icon="chevron-down-solid"
		icon-trailing
		shape="pill"
	></vwc-button>
	<vwc-divider orientation="vertical"></vwc-divider>
	<vwc-text-field
		icon="search-line"
		placeholder="Search..."
		appearance="ghost"
		shape="pill"
		style="min-width: 160px;"
	></vwc-text-field>
</vwc-action-group>
```
