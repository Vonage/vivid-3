## Implementation

- It is **highly recommended** to provide a descriptive `label` attribute for each color swatch, which will be announced by screen readers.

## Keyboard Interactions

When the [anchor element](/code/#anchor-slot) has focus:

- `Enter` – Opens the Color Picker.
- `Space` – Opens the Color Picker.

When the swatches grid has focus:

- `ArrowRight`/`ArrowLeft` – Moves focus one swatch horizontally within the current row; no movement occurs beyond grid edges.
- `ArrowDown`/`ArrowUp` – Moves focus one row down/up in the same column; no movement occurs beyond grid edges.
- `PageDown` – Moves focus to the same column in the last row.
- `PageUp` – Moves focus to the same column in the first row.
- `Home` – Moves focus to the first swatch of the current row; with `Ctrl`, moves to the first swatch in the grid.
- `End` – Moves focus to the last swatch of the current row; with `Ctrl`, moves to the last swatch in the grid.
- `Enter`/`Space` – Selects the focused swatch, closes the Color Picker, and returns focus to the anchor.
- `Escape` – Closes the Color Picker and returns focus to the anchor.
- `Tab` – Closes the Color Picker and lets focus move per normal tab order.
