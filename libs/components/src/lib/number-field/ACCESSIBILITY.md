<div class="a11y-test">
  <vwc-icon name="check-solid" connotation="success" size="1"></vwc-icon> 
  <div>
    <p>No Issues found.</p>
    <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
  </div>
</div>

## Implementation

- If no label is set - it is highly recommended that `aria-label` will be added.
- The add / subtract buttons are automatically given a localized version of the words "Increment" and "Decrement" respectively. These can be overriden using `increment-button-aria-label` and `decrement-button-aria-label`.

```html
<vwc-number-field
	aria-label="choose a number"
	increment-button-aria-label="Add"
	decrement-button-aria-label="Subtract"
></vwc-number-field>
```

## Resources

- [Vivid Number Field: Manual accessibility test](https://docs.google.com/spreadsheets/d/1HJuAWaADRbZqnvWJRArhBYP2G2aWSKWfWuAVovwsFjs/edit?gid=1175911860#gid=1175911860)
