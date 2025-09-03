<vwc-note connotation="success" headline="No issues found">
  <vwc-icon name="check-solid" connotation="success" label="Passed Accessibility Testing" slot="icon" size="0"></vwc-icon>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

## Implementation

- `aria-label` - When icon-only button is used, an [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) should be provided to ensure that the user can understand the button's purpose.

- `indicator-aria-label` - The indicator has a default `aria-label`, which will be a localised version of "Show more actions". You can override this by setting the `indicator-aria-label` attribute.

## Resources

- [Vivid Split Button: Manual accessibility test](https://docs.google.com/spreadsheets/d/10Htdms6Xh9bCWH2YRa-XrbZeBb5g_GABLRwMDL3OPTw/edit?gid=1175911860#gid=1175911860)
