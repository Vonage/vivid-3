<vwc-note connotation="success" headline="No issues found">
  <vwc-icon name="check-solid" connotation="success" label="Passed Accessibility Testing" slot="icon" size="0"></vwc-icon>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

## Implementation

- **Label interactive avatars**
  - Always provide an aria-label when the avatar is a link (href) or a button (clickable).
  - Use clear, descriptive text (e.g. "Profile avatar", "User profile picture").
- **Label icons in slots**
  - When using the icon slot, always provide a label property.
  - See the [Icon component guidelines](/components/icon/accessibility/#informative-vs-decorative-icons) for details.
- **Mark decorative avatars as presentation**
  - If the avatar is purely decorative and not interactive, use `role="presentation"` so it’s ignored by assistive technologies.
