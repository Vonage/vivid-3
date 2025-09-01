<div class="a11y-test">
  <vwc-icon name="check-solid" connotation="success" size="1"></vwc-icon> 
  <div>
    <p>No Issues found.</p>
    <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
  </div>
</div>

This component follows the [Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) from the W3C.

## Implementation

### Heading Levels

- Use one h1 per page.
- Nest subsequent headings (h2–h6) in order to create a logical outline.
- Headings must be descriptive and scannable, supporting both accessibility and SEO.

#### Accordion Item Headings

- Use the [`heading-level` attribute](/components/code/#heading-level) to set the correct heading level for Accordion Items.
- Match the Accordion heading level to the page hierarchy (don’t skip levels).

## Resources

- [Accordion: Manual accessibility test](https://docs.google.com/spreadsheets/d/1qyCSugoJUf2hWklnAeSYoSlDDiFTl6WFerEGIUHInAM/edit?gid=1175911860#gid=1175911860)
- [WAI: Headings](https://www.w3.org/WAI/tutorials/page-structure/headings/)
- [Accordions Are Not Always the Answer for Complex Content on Desktops](https://www.nngroup.com/articles/accordions-complex-content/)
