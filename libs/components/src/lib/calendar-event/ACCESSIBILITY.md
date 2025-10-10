<vwc-note connotation="success" headline="No issues found">
  <vwc-icon name="check-solid" connotation="success" label="Passed Accessibility Testing" slot="icon" size="0"></vwc-icon>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

## Implementation

### Event Focus Order

Ensure events within a calendar day are added in chronological order, as this determines their keyboard focus sequence.

For example, if an 8 AM event is added after a 2 PM event in the DOM, keyboard focus will move to the 2 PM event first, which can confuse users navigating by keyboard.
