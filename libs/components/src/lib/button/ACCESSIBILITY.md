<vwc-note connotation="success" headline="No issues found">
  <vwc-icon name="check-solid" connotation="success" label="Passed Accessibility Testing" slot="icon" size="0"></vwc-icon>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

## Implementation

### Icon-Only Buttons

- Always provide an `aria-label` for buttons that contain only an icon.
- The label is announced by screen readers and communicates the button’s purpose.

### Disabled Buttons

When you set the `disabled` attribute on the Button component, the `aria-disabled` attribute on the button element. This allows the button to receive focus so that it can be announced (as a disabled button) by a screen reader.

## Best Practices

### Never Put Tooltips/Toggletips on Disabled Buttons

- Disabled buttons cannot receive focus and don’t explain why they can’t be used.
- Instead, consider keeping the button active and use validation or error messages to guide the user.
- Don’t Use Tooltips on Disabled Buttons. Tooltips are not reliably available across devices or assistive technologies.

## Resources

- [Vivid Button: Manual accessibility test](https://docs.google.com/spreadsheets/d/1ndRrFCSNSNEOrBgTxmjUjU5URP5DGRdPzRqRJ2Q9Rew/edit?gid=1175911860#gid=1175911860)
- [W3C Large links, buttons and controls](https://www.w3.org/WAI/perspective-videos/controls/)
