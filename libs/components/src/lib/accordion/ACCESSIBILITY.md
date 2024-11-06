## Implementation

### Icon-only Buttons

Use the `aria-label` attribute to provide alternative text for _icon-only_ buttons. This text is read by screen readers and lets the user know the purpose of the button.

### Pending Buttons

When using the button in a [pending](/components/button/#pending) state, provide a label or aria-label to describe what is happening. Eg. 'Loading more search results'.

## Best Practices

### Avoid Disabling Buttons

Disabled buttons don't explain why the button isn't usable, and they aren't focusable at all for people using keyboard navigation.

Instead, keep the button pressable, and use validation and errors to explain what needs to be done to proceed.

### Never Put Tooltips on Disabled Buttons

Tooltips can't be reached on all devices or by some assitive technologies, and they should never appear on elements that aren't interactable.

## Resources

- [Vivid Button: Manual accessibility test](https://docs.google.com/spreadsheets/d/1ndRrFCSNSNEOrBgTxmjUjU5URP5DGRdPzRqRJ2Q9Rew/edit?gid=1175911860#gid=1175911860)
- [W3C Large links, buttons and controls](https://www.w3.org/WAI/perspective-videos/controls/)
