<vwc-note connotation="success" headline="No issues found">
  <vwc-icon name="check-solid" connotation="success" label="Passed Accessibility Testing" slot="icon" size="0"></vwc-icon>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

This component follows the [Alert and Message Dialogs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) from the W3C.

## Implementation

### Use the timeoutms attribute cautiously.

Some users — particularly those with disabilities—may need extra time to read and understand the content.

- If the Alert contains interactive elements (e.g., links or buttons), avoid using timeoutms altogether.
- Automatic dismissal can prevent users from completing their task or accessing important information.

For guidance, see [WCAG SC 2.2.3: No Timing](https://www.w3.org/WAI/WCAG22/Understanding/no-timing).

## Resources

- [Alert: Manual accessibility test](https://docs.google.com/spreadsheets/d/1Jo0Vn2V-A2K_NKSBwE78-Pn-P_l7VDzQwZ0rD1CNo-0/edit?gid=1175911860#gid=1175911860)
- [ARIA APG Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
