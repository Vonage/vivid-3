<div class="a11y-test">
  <vwc-icon name="check-solid" connotation="success" size="1"></vwc-icon> 
  <div>
    <p>No Issues found.</p>
    <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
  </div>
</div>

## Implementation

- When used as a collection of Selectable Boxes make sure the parent container element has a `role` of `group`.
- If there is no text content inside the Selectable Box (as in the [image based boxes use case](/selectable-box/use-cases/#image-based-boxes)) make sure the Selectable Box has an `aria-label` to give it an accessible name.

## Resources

[Selectable Box: Manual accessibility test](https://docs.google.com/spreadsheets/d/1sdjH1RUg4hRizxkIQbmIyOTvWEEpa25-mNX5IumcI78/edit?gid=1175911860#gid=1175911860)
