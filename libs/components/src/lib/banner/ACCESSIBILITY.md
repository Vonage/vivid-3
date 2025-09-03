<vwc-note connotation="success" headline="No issues found">
  <vwc-icon name="check-solid" connotation="success" label="Passed Accessibility Testing" slot="icon" size="0"></vwc-icon>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

## Implementation

- **Default behavior**
  - `role="status"`
  - `aria-live="polite"`
  - Updates are announced once the user is idle.
- **Changing the behavior**
  - You can override both `role` and `aria-live` to fit the context.
  - For critical information, use `role="alert"` so assistive technologies interrupt and announce immediately.
- **Dismissal**
  - Users can dismiss the banner with the **Escape key** when it is focused.

### When to Use status vs. alert

- Use `status` (default) for non-critical updates, confirmations, or informational messages (e.g., “Settings saved”).
- Use `alert` for urgent, time-sensitive, or error messages that require immediate attention (e.g., “Payment failed”).
- Do not overuse `alert` — frequent interruptions can overwhelm users.

## Resources

[Vivid Banner: Manual accessibility test](https://docs.google.com/spreadsheets/d/1o7qO79yNLTEMN0w2vc9YYMZ5DF1FyxH_42150yoDPIo/edit?gid=1066167376#gid=1066167376)
