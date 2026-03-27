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

## When to Use

- To group related information into sections.
- To keep pages shorter when content is **not essential to read in full**.
- When space is limited (e.g. mobile layouts or side panels) and long content cannot be shown all at once.
- Single Expand Mode
  - content sections are mutually exclusive
  - users should focus on one section at a time
  - you want to reduce visual noise and scrolling
- Multi Expand Mode
  - users may need to compare or reference multiple sections
  - content is not mutually exclusive
  - users are likely to open several sections in one session
- Default state: All collapsed
  - you want to keep the interface compact
  - users are expected to choose what to explore
- Default state: Pre-expanded
  - there is a recommended or most important section
  - content is time-sensitive or critical
  - you want to reduce interaction for common tasks
- Heading levels
  - the accordion is part of a structured page layout
  - you need to maintain a logical and accessible heading hierarchy

## When Not to Use

- For large, nested sets of information—use a [tree view](/components/tree-view/) instead.
- When users are likely to read all content—a full scrolling page with clear headings is easier than forcing extra clicks.
- Content must be read in sequence
- Sections are highly interdependent
- Most users need to read all content

In these cases, consider displaying content directly instead.

## Content Structure

Accordion content should be organised into clear, meaningful sections.

### Short, scannable sections

Best suited for:

- FAQs
- settings panels
- grouped information

### Nested Content

Accordions can contain complex layouts and other components within each section.

Use this when:

- sections contain structured content (forms, tables, lists)
- you need to group related UI under a collapsible heading

Avoid nested accordions, as this can make navigation and comprehension more difficult.

## Decide Between Accordion and Tabs

Both Accordion and [Tabs](/components/tabs/) allow users to reveal content on demand. They serve different interaction patterns and should not be nested.

Use the guidance below to choose the right component for your use case.

Use Accordion when:

- Users may need to view multiple sections at the same time
- Content benefits from a vertical, scrollable layout
- Sections are independent and do not need to be compared side-by-side
- You have a larger number of sections or varying content lengths

Use Tabs when:

- Users need to switch quickly between sections
- Only one section is relevant at a time
- Content should stay in a fixed layout without shifting the page
- You have a small number of sections (typically 3–5)
