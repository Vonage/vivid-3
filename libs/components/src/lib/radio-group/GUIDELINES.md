## Usage

<docs-do-dont>
<docs-do slot="description" headline="Use Checkboxes to select multiple options">

```html preview example
<div class="options">
	<h5>Email Preferences</h5>
	<vwc-checkbox label="Billing issues"></vwc-checkbox>
	<vwc-checkbox label="Product updates"></vwc-checkbox>
	<vwc-checkbox label="Price changes"></vwc-checkbox>
</div>

<style>
	.options {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
```

</docs-do>
<docs-do headline="Use checkboxes for a single item">

```html preview example
<vwc-checkbox label="I agree to the terms and conditions"></vwc-checkbox>
```

</docs-do>
</docs-do-dont>

## Labelling

### Label

<docs-do-dont>
<docs-do slot="description" headline="Use the label attribute whenever possible">

```html preview example
<vwc-checkbox label="Use signed Webhooks"></vwc-checkbox>
```

</docs-do>
<docs-do dont headline="Avoid Checkboxes without visible label">

```html preview example
<vwc-checkbox aria-label="Use signed Webhooks"></vwc-checkbox>
```

</docs-do>
</docs-do-dont>

## Related Components

- [Switch](/components/switch/)
- [Searchable Select](/components/searchable-select/)
- [Radio](/components/radio/)
