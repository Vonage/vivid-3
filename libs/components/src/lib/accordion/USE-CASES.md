## Alternative Expanded Indicators

The example below uses the `icon` and `icon-trailing` attributes to replace the chevron indicators with plus and minus icons.

```html preview 260px
<vwc-accordion id="icon-accordion" expand-mode="multi">
	<vwc-accordion-item
		icon-trailing
		icon="minus-line"
		heading="Accordion item 1"
		expanded
	>
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item icon-trailing icon="plus-line" heading="Accordion item 2">
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>

<script>
	document.getElementById('icon-accordion').addEventListener('change', (e) => {
		const iconName = e.target.getAttribute('icon');
		if (iconName === null) return;
		iconName === 'minus-line'
			? e.target.setAttribute('icon', 'plus-line')
			: e.target.setAttribute('icon', 'minus-line');
	});
</script>
```
