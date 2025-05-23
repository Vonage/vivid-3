## Implementation

### Informative vs Decorative Icons

**Informative icons** convey information not otherwise present in the page's text.

You must set the `label` attribute on informative icons to provide an accessible name.

```html preview
<div class="number">
	<vwc-icon name="telephone-line" label="Telephone:"></vwc-icon> 0123 456 7890
</div>
<div class="number">
	<vwc-icon name="fax-line" label="Fax:"></vwc-icon> 0123 456 7890
</div>

<style>
	.number {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 8px;
	}
</style>
```

**Decorative icons** duplicate information already present in the text or are purely aesthetic. They are used to enhance the visual appearance of the content.

There is no need to provide the Icon with a `label` as the icon's meaning is already described by the visible text. When `label` is not provided, the `aria-hidden` is set to `true` automatically, so there is no need for you to set it.

```html preview
<p><vwc-icon name="flag-united-states"></vwc-icon> United States</p>
```

## Best Practices

### Icons Are Non-Interactive

Icons are non-interactive elements. You cannot use them to trigger actions or place a tooltip on them.

If you need an interactive component, use an [icon-only Button](/components/button/#icon-only) instead.

## Resources

- [WAI Images Tutorial: Decorative vs Informative Icons](https://www.w3.org/WAI/tutorials/images/)
