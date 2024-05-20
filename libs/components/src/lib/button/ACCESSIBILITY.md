## Accessibility Considerations

### Include aria labels for icon-only buttons

Include alternative text using the aria-label prop when using icon-only buttons.
When using an icon alongside text, do not add a label to the icon. Doing so will unnecessarily repeat labels for people using screen readers.

### Avoid disabling buttons

Avoid using disabled buttons, especially in forms. Disabled buttons don't explain why the button isn't usable, and they aren't focusable at all for people using keyboard navigation.

Instead, keep the button pressable, and use validation and errors to explain what needs to be done to proceed.

### Don't put tooltips on disabled buttons

This is not accessible. Disabled buttons aren't reachable in the tab order and don't receive hover, focus, or click events. Don't attempt to create workarounds. If you are an Atlassian, Accessibility QA will make you redesign these implementations.

Some questions you should ask if you feel you need a tooltip on a disabled button:

Is this information essential to the user experience? If so, don’t hide it behind a tooltip. Tooltips aren’t easy to discover and aren’t accessible on mobile. If it isn’t essential, consider whether you need to show it at all.
Is this information actionable? Being shown things that you can’t use without any actionable next step can be frustrating or confusing. Consider only showing UI that a user is able to interact with, or replacing the disabled button with text that has the same content you were going to put in the tooltip. If you do this, you can make things even more actionable for the user by providing a link to a next step that they can take, or further information.
We know that disabled buttons with tooltips are sometimes used to promote feature discovery. We are working to provide guidance for this use case in the future.

### Focus behavior

By default tabIndex={0} is added when the component prop is specified, so the button element can get browser focus regardless of the element type used.

On a mousedown, event.preventDefault() is always called to prevent the button from getting focus. This is questionable behavior that we hope to change in future.

When a native `<button>` is disabled, it loses browser focus and cannot be focused. We replicate this behavior by setting tabIndex={-1} on the button element and calling element.blur() when a button becomes disabled (isDisabled prop is set to true).
