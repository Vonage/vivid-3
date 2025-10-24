```html preview 350px
<vwc-accordion>
	<vwc-accordion-item heading="Section 1 title">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</vwc-accordion-item>
	<vwc-accordion-item heading="Section 2 title">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</vwc-accordion-item>
	<vwc-accordion-item heading="Section 3 title">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</vwc-accordion-item>
</vwc-accordion>
```

### When to Use

- To group related information into sections.
- To keep pages shorter when content is **not essential to read in full**.
- When space is limited (e.g. mobile layouts or side panels) and long content cannot be shown all at once.

### When Not to Use

- For large, nested sets of information—use a [tree view](/components/tree-view/) instead.
- When users are likely to read all content—a full scrolling page with clear headings is easier than forcing extra clicks.

### Decide Between Accordions and Tabs

Both the Accordion and [Tabs](/components/tabs/) components hide content that users can choose to reveal. Do not nest them inside one another.

When deciding which to use, consider:

- **Need to view multiple sections at once** → Use an accordion, since several panels can be open simultaneously.
- **Need to switch quickly between sections** → Use tabs, since they allow rapid switching without pushing content down the page.
- **Number of sections** → Use an accordion for larger sets of sections (vertical layout). Tabs work best for a smaller set of sections (horizontal layout).
