## Implementation

- The component displays the **country code** (e.g. "UK", "US") as the visible text when **code** is set, or the **label** when provided; that text is available to assistive technologies.
- The default flag (from flag-icons) is **decorative** and has `aria-hidden="true"` so it is not announced.
- If you use the **icon** slot with a custom image: use `alt=""` when the flag is decorative (e.g. when the country code or context already conveys the country). Use a short `alt` (e.g. "UK flag") when the image conveys information that is not available in the text.
