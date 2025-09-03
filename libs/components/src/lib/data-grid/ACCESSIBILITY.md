<vwc-note connotation="warning" headline="Passed with the following exceptions">
  <vwc-icon name="check-solid" slot="icon" connotation="warning" size="0"></vwc-icon> 
  <ul>
    <li><b>Sort functionality is not announced when header cell is focussed.</b><br />We have an item on the backlog to address this improvement.</li>
  </ul>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

## Keyboard Interactions

- Navigate data-grid cells using the Arrow keys.
- If a cell contains an interactive element, it can be reached using the Tab key.
- If a header cell contains sort functionality, it can be activated using the Space or Enter key.

## Implementation

- Usage of `selected` attribute defines the `aria-selected` value.
- Similarly, usage of `sort-direction` attribute is reflected in `aria-sort` value.
- When a cell is sorted but not according to ascending or descending algorithm, use `sort-direction="other"`.

## Resources

- [Data Grid: Manual accessibility test](https://docs.google.com/spreadsheets/d/1Nw_VbECQvdHzTkwdBiHncPX7B_9rFsUKcsurU0QIEng/edit?gid=1175911860#gid=1175911860)
