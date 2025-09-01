<div class="a11y-test">
  <vwc-icon name="check-solid" connotation="success" size="1"></vwc-icon> 
  <div>
    <p>No Issues found.</p>
    <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
  </div>
</div>

## Implementation

### Informative vs Decorative Icons

- **Informative icons**
  - Convey information not otherwise present in the page's text.
  - Must set the `label` attribute on informative icons to provide an accessible name.

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

- **Decorative icons**
  - Duplicate information already present in the text, or are purely aesthetic.
  - Do not require a `label`.
  - When no `label` is provided, `aria-hidden="true"` is automatically applied.

```html preview
<p><vwc-icon name="flag-united-states"></vwc-icon> United States</p>
```

## Best Practices

### Icons Are Non-Interactive

- Icons must not be used as interactive elements.
- Do not use icons to trigger actions or attach tooltips.
- If you need an interactive icon, use an [icon-only Button](/components/button/#icon-only).

## Resources

- [WAI Images Tutorial: Decorative vs Informative Icons](https://www.w3.org/WAI/tutorials/images/)
