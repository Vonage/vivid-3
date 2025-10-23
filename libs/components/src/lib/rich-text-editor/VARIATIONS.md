## Freeform

```html preview
<vwc-rich-text-editor style="block-size: 250px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([
			new RTECore(),
			new RTEFreeformStructure(),
			new RTEToolbarFeature(),
			new RTEFontSizeFeature(),
			new RTEBoldFeature(),
			new RTEItalicFeature(),
			new RTEUnderlineFeature(),
			new RTEStrikethroughFeature(),
			new RTEMonospaceFeature(),
			new RTEListFeature(),
			new RTELinkFeature(),
		]);
		rteComponent.instance = config.instantiateEditor();
	});
</script>
```

## Text Blocks

```html preview
<vwc-rich-text-editor style="block-size: 250px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([
			new RTECore(),
			new RTETextBlockStructure(),
			new RTEToolbarFeature(),
			new RTEFontSizeFeature(),
			new RTEBoldFeature(),
			new RTEItalicFeature(),
			new RTEUnderlineFeature(),
			new RTEStrikethroughFeature(),
			new RTEMonospaceFeature(),
			new RTEListFeature(),
			new RTEAlignmentFeature(),
			new RTELinkFeature(),
		]);
		rteComponent.instance = config.instantiateEditor();
	});
</script>
```

## Placeholder

The `placeholder` attribute allows you to set a placeholder text that will be displayed when the editor is empty.

```html preview
<vwc-rich-text-editor
	style="block-size: 150px"
	placeholder="Enter rich text..."
></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([
			new RTECore(),
			new RTETextBlockStructure(),
			new RTEFontSizeFeature(),
			new RTEBoldFeature(),
			new RTEItalicFeature(),
			new RTEUnderlineFeature(),
			new RTEStrikethroughFeature(),
			new RTEMonospaceFeature(),
			new RTEToolbarFeature(),
		]);
		rteComponent.instance = config.instantiateEditor();
	});
</script>
```
