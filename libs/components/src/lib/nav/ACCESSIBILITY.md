<div class="a11y-test">
  <vwc-icon name="check-solid" connotation="success" size="1"></vwc-icon> 
  <div>
    <p>No Issues found.</p>
    <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
  </div>
</div>

## Implementation

### Icons in Navigation

- Icons should be accompanied by visible text whenever possible.
- If an icon conveys meaning that is not provided by the accompanying text, provide it with a description using the `label` attribute.
- If no accompanying text is present, provide an `aria-label` on the Nav Item or Nav Disclosure so screen reader users can understand the purpose of the item.

## Keyboard Interaction

When the nav has focus:

`Enter`: activates the nav-disclosure and toggles the visibility of the content.  
`Space`: activates the nav-disclosure and toggles the visibility of the content.  
`Tab`: moves focus to the next element in the tab order.  
`Shift` + `Tab`: moves focus to the previous element in the tab order.

## Resources

- [Vivid Nav: Manual accessibility test](https://docs.google.com/spreadsheets/d/1dl4x8Qjj0Mvdvky8DgbKdYxSrKmBwTd9j6gkgoitiLc/edit?gid=1175911860#gid=1175911860)
