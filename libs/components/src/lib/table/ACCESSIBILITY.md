<vwc-note connotation="information" headline="Accessibility Information">
  <vwc-icon name="info-line" slot="icon" connotation="information" size="0"></vwc-icon> 
  <p>The Table component provides proper ARIA roles and keyboard navigation support following the WAI-ARIA table pattern.</p>
</vwc-note>

## Keyboard Interactions

- Navigate data-grid cells using the Arrow keys.
- If a cell contains an interactive element, it can be reached using the Tab key.
- If a header cell contains sort functionality, it can be activated using the Space or Enter key.

## Implementation

- The Table component uses `role="table"` for the root element.
- Table rows use `role="row"`.
- Header cells use `role="columnheader"` or `role="rowheader"` depending on context.
- Data cells use `role="cell"`.

## ARIA Roles

The Table component structure provides semantic meaning through ARIA roles:

- **Table (root)**: `role="table"`
- **Table Head**: No specific role (acts as container)
- **Table Body**: No specific role (acts as container)
- **Table Row**: `role="row"`
- **Table Header Cell**: `role="columnheader|rowheader"`
- **Table Cell**: `role="cell"`

## Resources

- [WAI-ARIA Authoring Practices Guide - Table Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/)
