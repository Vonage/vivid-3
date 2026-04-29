## Use Cases

### Country List

Use `Flag` alongside text in lists (for example a country picker or shipping destination list).

```html preview
<div style="display: grid; gap: 8px;">
	<div style="display: flex; gap: 8px; align-items: center;">
		<vwc-flag code="DE" label="Germany"></vwc-flag>
		<span>Germany</span>
	</div>
	<div style="display: flex; gap: 8px; align-items: center;">
		<vwc-flag code="JP" label="Japan"></vwc-flag>
		<span>Japan</span>
	</div>
	<div style="display: flex; gap: 8px; align-items: center;">
		<vwc-flag code="US" label="United States"></vwc-flag>
		<span>United States</span>
	</div>
</div>
```

### Decorative Flags in Text

If the country name is already present as text, omit `label` so the flag remains decorative.

```html preview
<p><vwc-flag code="DE"></vwc-flag> Germany</p>
<p><vwc-flag code="JP"></vwc-flag> Japan</p>
<p><vwc-flag code="US"></vwc-flag> United States</p>
```
