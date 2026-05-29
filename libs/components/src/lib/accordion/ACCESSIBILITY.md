<vwc-note connotation="success" headline="No issues found">
  <vwc-icon name="check-solid" connotation="success" label="Passed Accessibility Testing" slot="icon" size="0"></vwc-icon>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

This component follows the [Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) from the W3C.

## What’s built in

Vivid Accordion provides the core accordion interaction pattern for expanding and collapsing related sections of content. Accordion headers should behave like interactive controls, and the expected keyboard interaction for the pattern includes activating a section with `Enter` or `Space`. The W3C pattern also defines optional navigation between accordion headers using `Up Arrow`, `Down Arrow`, `Home`, and `End`.

Consumers should not need to recreate the expand/collapse interaction or invent custom keyboard behaviour on top of the component.

## What you need to do

### Use the correct heading level

Set the `heading-level` on each Accordion Item so it fits the page structure. Use one `h1` per page, then nest headings in order without skipping levels. Accordion headings should be descriptive and scannable. Your current docs already call this out, and the variation page points consumers to use `heading-level` specifically for accessible heading structure.

### Write clear, descriptive headings

Each accordion heading should help users understand what content is inside before opening it. This helps screen reader users, keyboard users, and anyone scanning the page visually. The current Vivid guidance already says headings should be descriptive and scannable.

### Make sure hidden content is not essential to discoverability

Important information should not be buried in an accordion if most users will need to read all of it anyway. Accordions add interaction cost and reduce content visibility.

## Best practices

### Use accordions for grouped, related sections

Accordions work best when content can be broken into clear peer sections and users are likely to open only the parts they need. That aligns with the WAI definition of the accordion pattern as a set of related expandable sections.

### Avoid accordions when users need most or all of the content

If people are likely to consume nearly all the content on the page, showing it directly is often easier than hiding it behind expandable sections. Nielsen Norman Group specifically advises avoiding accordions in these cases because they increase interaction cost.

### Avoid overly complex content structures

Do not use accordions for content with many nested levels, dense dependencies between sections, or reading flows that should remain uninterrupted.

### Choose the right expand mode for the task

Use single-expand mode when users should focus on one section at a time. Use multi-expand mode when it is helpful to compare or reference multiple sections together. Vivid supports both `single` and `multi`, with `single` as the default.

## Keyboard support

- `Enter` / `Space`: expands or collapses the focused section header.
- `Tab` / `Shift+Tab`: moves through the accordion and any focusable content in the normal page tab order.
- ``Up Arrow`/ `Down Arrow`: may move focus between accordion headers.
- `Home` / `End`: may move focus to the first or last accordion header.

## Before shipping

Check that:

- each Accordion Item uses the correct `heading-level`
- headings are unique, descriptive, and meaningful out of context
- the chosen expand mode matches the use case
- keyboard users can open, close, and move through the component as expected
- content is still understandable when sections are opened in a different order
- the page would not be clearer if the content were shown without an accordion

## Resources

- [Accordion: Manual accessibility test](https://docs.google.com/spreadsheets/d/1qyCSugoJUf2hWklnAeSYoSlDDiFTl6WFerEGIUHInAM/edit?gid=1175911860#gid=1175911860)
- [W3C: Accordion Pattern (Sections With Show/Hide Functionality)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [W3C: Page structure: Headings](https://www.w3.org/WAI/tutorials/page-structure/headings/)
- [Neilson Group: Accordions for Complex Website Content on Desktops](https://www.nngroup.com/articles/accordions-complex-content)
- [Neilson Group: Accordions on Desktop: When and How to Use](https://www.nngroup.com/articles/accordions-on-desktop/)
- [Accordions Are Not Always the Answer for Complex Content on Desktops](https://www.nngroup.com/articles/accordions-complex-content/)
