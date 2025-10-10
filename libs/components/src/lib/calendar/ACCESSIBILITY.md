<vwc-note connotation="success" headline="No issues found">
  <vwc-icon name="check-solid" connotation="success" label="Passed Accessibility Testing" slot="icon" size="0"></vwc-icon>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

## Implementation

### Descriptive Heading for Calendar

#### 1. Provide a Clear, Descriptive Heading for the Visible Date Range

The heading should describe the current scope of the displayed calendar view: “October 6th – 12th 2025”.

#### 2. Associate the Heading with the Calendar Region

Use appropriate landmark or ARIA attributes to help assistive technologies identify the heading as the label for the calendar.

```
<section aria-labelledby="calendar-heading">
  <h2 id="calendar-heading">October 6th – 12th 2025</h2>
  <!-- calendar grid here -->
  <vwc-calendar datetime="2025-10-06"></vwc-calendaar>
</section>
```

This ensures that screen readers announce the heading as the label for the calendar region, providing immediate context.

#### 3. Update the Heading Programmatically

When the visible date range changes (for example, if navigation has been implemented to navigate to the next or previous week/month), update the heading text dynamically so screen readers announce the new context.

#### 4. Maintain Semantic Heading Hierarchy

- Use a heading level (`<h2>`, `<h3>`, etc.) that fits logically within the page’s overall structure.
- Avoid skipping heading levels, as this can confuse screen reader navigation.

#### 5. Avoid Redundant Labels

- Do not repeat the same heading text in both visual and ARIA labels.
- If the visual heading is sufficient, do not add an aria-label unless extra clarification is required.
