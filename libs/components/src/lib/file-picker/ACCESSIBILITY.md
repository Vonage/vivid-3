<div class="a11y-test">
  <vwc-icon name="check-solid" connotation="success" size="1"></vwc-icon> 
  <div>
    <p>No Issues found.</p>
    <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
  </div>
</div>

## Implementation

- If [label](#label) attribute is set, the aria-label will be updated automatically.
- If no label is set - it is highly recommended to add a `aria-label` as below.

```html
<vwc-file-picker aria-label="Upload Files">
	Drag & Drop or click to upload
</vwc-file-picker>
```
