## Implementation

### Icon Only Buttons

Use the `aria-label` attribute to provide alternative text for _icon-only_ buttons. This text is read by screen readers and lets the user know the purpose of the button.

### Disabled Buttons

When you set the `disabled` attribute on the Button component, the `aria-disabled` attribute on the button element. This allows the button to receive focus so that it can be announced (as a disabled button) by a screen reader.

## Best Practices

### Never Put Tooltips/Toggletips on Disabled Buttons

Tooltips/Toggletips can't be reached on all devices or by some assitive technologies, and they should never appear on elements that aren't interactable.

## Resources

- [Vivid Button: Manual accessibility test](https://docs.google.com/spreadsheets/d/1ndRrFCSNSNEOrBgTxmjUjU5URP5DGRdPzRqRJ2Q9Rew/edit?gid=1175911860#gid=1175911860)
- [W3C Large links, buttons and controls](https://www.w3.org/WAI/perspective-videos/controls/)
