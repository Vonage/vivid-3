<vwc-note connotation="information" headline="Accessibility Information">
  <vwc-icon name="info-line" slot="icon" connotation="information" size="0"></vwc-icon> 
  <p>The Table component follows the same accessibility patterns as the Data Grid component, providing proper ARIA roles and keyboard navigation support.</p>
</vwc-note>

## Keyboard Interactions

- Navigate table cells using the Tab key to move between interactive elements.

## Implementation

- The Table component uses `role="grid"` for the root element.
- Table rows use `role="row"`.
- Header cells use `role="columnheader"`.
- Data cells use `role="gridcell"`.

## ARIA Roles

The Table component structure provides semantic meaning through ARIA roles:

- **Table (root)**: `role="grid"`
- **Table Head**: No specific role (acts as container)
- **Table Body**: No specific role (acts as container)
- **Table Row**: `role="row"`
- **Table Header Cell**: `role="columnheader"`
- **Table Cell**: `role="gridcell"`

## Resources

- [WAI-ARIA Authoring Practices Guide - Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [Data Grid: Manual accessibility test](https://docs.google.com/spreadsheets/d/1Nw_VbECQvdHzTkwdBiHncPX7B_9rFsUKcsurU0QIEng/edit?gid=1175911860#gid=1175911860)
