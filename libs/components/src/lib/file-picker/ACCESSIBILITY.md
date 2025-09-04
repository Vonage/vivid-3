<vwc-note connotation="success" headline="No issues found">
  <vwc-icon name="check-solid" connotation="success" label="Passed Accessibility Testing" slot="icon" size="0"></vwc-icon>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

## Implementation

- If [label](#label) attribute is set, the aria-label will be updated automatically.
- If no label is set - it is highly recommended to add a `aria-label` as below.

```html
<vwc-file-picker aria-label="Upload Files">
	Drag & Drop or click to upload
</vwc-file-picker>
```
