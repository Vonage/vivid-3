## Alternative Expanded Indicators

The example below uses the `icon` and `icon-trailing` attributes to replace the chevron indicators with plus and minus icons.

```html preview 260px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item
		class="accordion-item"
		icon-trailing
		icon="minus-line"
		heading="Accordion item 1"
		expanded
	>
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item
		class="accordion-item"
		icon-trailing
		icon="plus-line"
		heading="Accordion item 2"
	>
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>

<script>
	document.querySelectorAll('.accordion-item').forEach((item) => {
		item.addEventListener('change', (e) => {
			if (e.target !== item) {
				return;
			}
			const iconName = item.getAttribute('icon');
			iconName === 'minus-line'
				? item.setAttribute('icon', 'plus-line')
				: item.setAttribute('icon', 'minus-line');
		});
	});
</script>
```

## Single Accordion Items

The example below shows how a single Accordion Item can be used inside an [Action Group component](/components/action-group/) (which provides the border) to create a stand alone expandable section of content.

```html preview 160px
<vwc-action-group class="action-group">
	<vwc-accordion-item class="accordion-item" heading="Expandable Section">
		This is the content for the expandable section.
	</vwc-accordion-item>
</vwc-action-group>

<style>
	.action-group,
	.accordion-item {
		display: block;
		inline-size: 100%;
	}
</style>
```
