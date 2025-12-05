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
		const config = new RteConfig([
			new RteCore(),
			new RteFreeformStructure(),
			new RteToolbarFeature(),
			new RteFontSizeFeature({
				options: [
					{ size: '24px', label: 'Extra Large' },
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
				defaultSize: '14px',
			}),
			new RteBoldFeature(),
			new RteItalicFeature(),
			new RteUnderlineFeature(),
			new RteStrikethroughFeature(),
			new RteMonospaceFeature(),
			new RteTextColorFeature({ defaultColor: '#000000' }),
			new RteListFeature(),
			new RteLinkFeature(),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'textLine',
						content: [{ type: 'text', text: 'First line' }],
					},
					{
						type: 'textLine',
						content: [{ type: 'text', text: 'Second line' }],
					},
				],
			},
		});
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
		const config = new RteConfig([
			new RteCore(),
			new RteTextBlockStructure({
				blocks: [
					{ id: 'title', label: 'Title', semanticRole: 'heading-1', stylePreset: 'h5' },
					{ id: 'subtitle', label: 'Subtitle', semanticRole: 'heading-2', stylePreset: 'h6' },
					{ id: 'body', label: 'Body', semanticRole: 'paragraph', stylePreset: 'body-2', marksAllowed: true },
				],
			}),
			new RteToolbarFeature(),
			new RteFontSizeFeature({
				options: [
					{ size: '24px', label: 'Extra Large' },
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
				defaultSize: '14px',
			}),
			new RteBoldFeature(),
			new RteItalicFeature(),
			new RteUnderlineFeature(),
			new RteStrikethroughFeature(),
			new RteMonospaceFeature(),
			new RteTextColorFeature({ defaultColor: '#000000' }),
			new RteListFeature(),
			new RteAlignmentFeature(),
			new RteLinkFeature(),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'title',
						content: [{ type: 'text', text: 'Title' }],
					},
					{
						type: 'subtitle',
						content: [{ type: 'text', text: 'Subtitle' }],
					},
					{
						type: 'body',
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
		const config = new RteConfig([
			new RteCore(),
			new RteTextBlockStructure({
				blocks: [
					{ id: 'title', label: 'Title', semanticRole: 'heading-1', stylePreset: 'h5' },
					{ id: 'subtitle', label: 'Subtitle', semanticRole: 'heading-2', stylePreset: 'h6' },
					{ id: 'body', label: 'Body', semanticRole: 'paragraph', stylePreset: 'body-2', marksAllowed: true },
				],
			}),
			new RteFontSizeFeature({
				options: [
					{ size: '24px', label: 'Extra Large' },
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
				defaultSize: '14px',
			}),
			new RteBoldFeature(),
			new RteItalicFeature(),
			new RteUnderlineFeature(),
			new RteStrikethroughFeature(),
			new RteMonospaceFeature(),
			new RteToolbarFeature(),
		]);
		rteComponent.instance = config.instantiateEditor();
	});
</script>
```
