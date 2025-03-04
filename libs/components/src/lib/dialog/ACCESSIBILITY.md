## Implementation

- A Dialog should have a heading. If for some reason it doesn't, them make sure to add `aria-label` to the dialog element.
- The dialog's role is `dialog`. When opened as a modal (via showModal) it adds `aria-modal` to the dialog.

### Dialog Dismiss

- If you disable the built-in dismiss methods, you must ensure that the way to close the dialog remains accessible.
- When setting a new value for `--dialog-min-inline-size` and `--dialog-max-inline-size` take in consideration if different values are needed for mobile, and that they are not causing horizontal scroll there.

## Manual Accessibility Test

[Dialog: Manual accessibility test](https://docs.google.com/spreadsheets/d/16swp_M0jWnndcY2KpGaJJ0q82Ln6fpon6OA5OkTGcoA/edit?gid=1066167376#gid=1066167376)
