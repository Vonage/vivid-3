## When to Use

Use `Flag` when you need to display a country flag as a visual identifier next to country-related content.

## Best Practices

<docs-do-dont>

<div slot="description">
Use flags as a supporting visual cue. If the country name is already present as text, omit the `label` so the flag remains decorative.
</div>

<docs-do headline="Omit the label when the text already conveys the meaning">

```html preview
<p><vwc-flag code="DE"></vwc-flag> Germany</p>
```

</docs-do>

<docs-dont headline="Don’t rely on a flag alone to convey meaning">

```html preview
<vwc-flag code="DE"></vwc-flag>
```

</docs-dont>

</docs-do-dont>

## Related Components

- [Country](/components/country/)
- [Icon](/components/icon/)
