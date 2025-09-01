<div class="a11y-test">
  <vwc-icon name="check-solid" connotation="success" size="1"></vwc-icon> 
  <div>
    <p>No Issues found.</p>
    <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
  </div>
</div>

## Implementation

### Icon-Only Buttons

- Always provide an `aria-label` for buttons that contain only an icon.
- The label is announced by screen readers and communicates the button’s purpose.

## Best Practices

### Avoid Disabling Buttons

- Disabled buttons cannot receive focus and don’t explain why they can’t be used.
- Instead, consider keeping the button active and use validation or error messages to guide the user.
- Don’t Use Tooltips on Disabled Buttons. Tooltips are not reliably available across devices or assistive technologies.

## Resources

- [Vivid Button: Manual accessibility test](https://docs.google.com/spreadsheets/d/14AGpqTYYsDe2E2ExjDxFCGLLRw5twWu37Gc6SiXKso8/edit?gid=419807104#gid=419807104)
- [W3C Large links, buttons and controls](https://www.w3.org/WAI/perspective-videos/controls/)
