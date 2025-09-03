<vwc-note connotation="warning" headline="Passed with the following exceptions">
  <vwc-icon name="check-solid" slot="icon" connotation="warning" size="0"></vwc-icon> 
  <ul>
    <li><b>Min and max values are not announced.</b><br />All the correct aria attributes and values are present. Deemed to be a screen reader limitation.</li>
  </ul>
  <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
</vwc-note>

## Implementation

Both thumbs have a `role` of `slider`, which needs an accessible label. By default, they use a localized version of "min" and "max".
You can change the labels by setting the `aria-start-label` and `aria-end-label` attributes.

Vivid automatically sets the `aria-valuetext` attribute on the thumbs. The attribute is read by assistive technology. You can control its format using the `valueTextFormatter` property for a more human-readable value.

## Resources

- [Vivid Tabs: Manual accessibility test](https://docs.google.com/spreadsheets/d/15J0sHxVUlmjv7HwT2b0gGNJFP_vsjAByzgRP_4oWYKk/edit?gid=1175911860#gid=1175911860)
