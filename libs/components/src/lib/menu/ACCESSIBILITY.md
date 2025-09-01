<div class="a11y-test">
  <vwc-icon name="check-solid" connotation="success" size="1"></vwc-icon> 
  <div>
    <p>No Issues found.</p>
    <p>This component was tested and signed off by <a href="https://www.applause.com/">Applause</a> (external accessibility specialists).</p>
  </div>
</div>

## Implementation

- The Menu requires an accessible name. It is the consumer's concern to provide an `aria-label` to the Menu.
- If you are using Menu with the `anchor` prop, it is important to place the Menu directly after the anchor element in the source code so that the correct tab order is maintained.
- The Menu will set appropriate values for the `aria-haspopup` and `aria-expanded` attribute on the anchor element.

## Keyboard Interaction

When anchor has focus:

- `Enter` - Opens the menu.
- `Space` - Opens the menu.

When the menu has focus:

- `ArrowDown` - Moves focus to the next menu item.
- `ArrowUp` - Moves focus to the previous menu item.
- `Home` - Moves focus to the first menu item.
- `End` - Moves focus to the last menu item.
- `Escape` - Closes the menu.

## Resources

- [Vivid Menu, Meni Item: Manual accessibility test](https://docs.google.com/spreadsheets/d/1EOl8Z1OoyPbHPZm1f8JdJK2qS3gcu-CdIT22s0YaEO8/edit?gid=1175911860#gid=1175911860)
