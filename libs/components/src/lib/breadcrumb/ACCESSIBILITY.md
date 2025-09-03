<vwc-note connotation="success" headline="No issues found">
  <vwc-icon name="check-solid" connotation="success" label="Passed Accessibility Testing" slot="icon" size="0"></vwc-icon>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

## Implementation

- `aria-current`
  - Always add `aria-current="page"` to the last Breadcrumb Item when it has a href.
  - This identifies the current page within the breadcrumb trail.
- `aria-label`
  - By default, the Breadcrumbs component uses `aria-label="breadcrumbs"`.
  - You can override this value if a different label is more descriptive in context.

## Resources

- [Alert: Manual Breadcrumb test](https://docs.google.com/spreadsheets/d/1ILdhuGdyNf4x6_u_UgWA5WPEacgfaNueWtoGSh0l63k/edit?gid=1861562795#gid=1861562795)
- [ARIA APG Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)
