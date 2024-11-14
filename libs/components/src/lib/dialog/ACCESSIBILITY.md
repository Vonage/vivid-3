## Accessibility

- The dialog's role is `dialog`. When opened as a modal (via showModal) it adds `aria-modal` to the dialog.
- It is the consumer's concern to add `aria-label` to the dialog element.
- The dismiss button is automatically given a localized version of the word "Close". This can be overridden using `dismiss-button-aria-label`.
- If you disable the built-in dismiss methods, you must ensure that the way to close the dialog remains accessible.
