<div class="a11y-test">
  <vwc-icon name="check-solid" connotation="success" size="1"></vwc-icon> 
  <div>
    <p>No Issues found.</p>
    <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
  </div>
</div>

## Implementation

- Badges are informational only and must not be interactive.
- If you need an interactive element, use a [Tag](/components/tag/) instead.

### Icon-Only Badges

- For badges that contain only an icon, always set the [Icon’s label attribute](/components/icon/code/#label).
- The label provides alternative text for screen readers, describing the purpose of the badge.
