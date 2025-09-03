<vwc-note connotation="success" headline="No issues found">
  <vwc-icon name="check-solid" connotation="success" label="Passed Accessibility Testing" slot="icon" size="0"></vwc-icon>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

## Implementation

The Progress Ring component has a `role` of `progressbar` which means it needs an accessible label.

`aria-label` must be provided to give the component some context for screen reader users.

## Resources

- [Progress, Progress Ring: Manual accessibility test](https://docs.google.com/spreadsheets/d/1T0GBJe_YJuBjMMNcEaQ-HSKcJ7SDQu0WRWQnRQRCtzE/edit?gid=1175911860#gid=1175911860)
