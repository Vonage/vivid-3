## Freeform

```html preview
<vwc-rich-text-editor style="block-size: 250px">
	<vwc-simple-color-picker slot="text-color-picker"></vwc-simple-color-picker>
</vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-simple-color-picker').then(() => {
		document.querySelector('vwc-simple-color-picker').swatches = [
			{
				label: 'Black',
				value: '#000000',
			},
			{
				label: 'Red',
				value: '#E61D1D',
			},
			{
				label: 'Yellow',
				value: '#FA9F00',
			},
			{
				label: 'Green',
				value: '#1C8731',
			},
			{
				label: 'Blue',
				value: '#0276D5',
			},
			{
				label: 'Purple',
				value: '#9941FF',
			},
			{
				label: 'Pink',
				value: '#D6219C',
			},
		];
	});

	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature(), new RTEFontSizeFeature(), new RTEBoldFeature(), new RTEItalicFeature(), new RTEUnderlineFeature(), new RTEStrikethroughFeature(), new RTEMonospaceFeature(), new RTETextColorFeature({ defaultColor: '#000000' }), new RTEListFeature(), new RTELinkFeature()]);
		rteComponent.instance = config.instantiateEditor({
		initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'text_line',
						content: [{ type: 'text', text: 'First line' }],
					}
			{
				type: 'text_line',
				content: [{ type: 'text', text: 'Second line' }],
			},
		]
	}});
	});
</script>
```

## Text Blocks

```html preview
<vwc-rich-text-editor style="block-size: 250px">
	<vwc-simple-color-picker slot="text-color-picker"></vwc-simple-color-picker>
</vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-simple-color-picker').then(() => {
		document.querySelector('vwc-simple-color-picker').swatches = [
			{
				label: 'Black',
				value: '#000000',
			},
			{
				label: 'Red',
				value: '#E61D1D',
			},
			{
				label: 'Yellow',
				value: '#FA9F00',
			},
			{
				label: 'Green',
				value: '#1C8731',
			},
			{
				label: 'Blue',
				value: '#0276D5',
			},
			{
				label: 'Purple',
				value: '#9941FF',
			},
			{
				label: 'Pink',
				value: '#D6219C',
			},
		];
	});

	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature(), new RTEFontSizeFeature(), new RTEBoldFeature(), new RTEItalicFeature(), new RTEUnderlineFeature(), new RTEStrikethroughFeature(), new RTEMonospaceFeature(), new RTETextColorFeature({ defaultColor: '#000000' }), new RTEListFeature(), new RTEAlignmentFeature(), new RTELinkFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'heading',
						attrs: { level: 1 },
						content: [{ type: 'text', text: 'Title' }],
					},
					{
						type: 'heading',
						attrs: { level: 2 },
						content: [{ type: 'text', text: 'Subtitle' }],
					},
					{
						type: 'paragraph',
						content: [{ type: 'text', text: 'Body' }],
					},
				],
			},
		});
	});
</script>
```

## Placeholder

The `placeholder` attribute allows you to set a placeholder text that will be displayed when the editor is empty.

```html preview
<vwc-rich-text-editor style="block-size: 150px" placeholder="Enter rich text..."></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEFontSizeFeature(), new RTEBoldFeature(), new RTEItalicFeature(), new RTEUnderlineFeature(), new RTEStrikethroughFeature(), new RTEMonospaceFeature(), new RTEToolbarFeature()]);
		rteComponent.instance = config.instantiateEditor();
	});
</script>
```
