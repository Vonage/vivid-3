<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { ref } from 'vue';
import { VRichTextEditor, VRichTextView, VActionGroup, VAccordion, VAccordionItem, VSimpleColorPicker } from '@vonage/vivid-vue';
import { RteConfig, RteBase, RteTextBlockPickerFeature, RteToolbarFeature, RtePlaceholderFeature, RteFontSizePickerFeature, RteBoldFeature, RteItalicFeature, RteUnderlineFeature, RteStrikethroughFeature, RteMonospaceFeature, RteTextColorPickerFeature, RteListFeature, RteAlignmentFeature, RteLinkFeature, RteInlineImageFeature } from '@vonage/vivid';

const swatches = [
	{ label: 'Black', value: '#000000' },
	{ label: 'Red', value: '#E61D1D' },
	{ label: 'Yellow', value: '#FA9F00' },
	{ label: 'Green', value: '#1C8731' },
	{ label: 'Blue', value: '#0276D5' },
	{ label: 'Purple', value: '#9941FF' },
	{ label: 'Pink', value: '#D6219C' },
];

const config = new RteConfig([
	new RteBase({
		heading1: true,
		heading2: true,
	}),
	new RteTextBlockPickerFeature({
		options: [
			{ node: 'heading1', label: 'Title' },
			{ node: 'heading2', label: 'Subtitle' },
			{ node: 'paragraph', label: 'Body' },
		],
	}),
	new RteToolbarFeature(),
	new RtePlaceholderFeature({ text: 'Start typing here...' }),
	new RteFontSizePickerFeature({
		options: [
			{ size: '24px', label: 'Extra Large' },
			{ size: '18px', label: 'Large' },
			{ size: '14px', label: 'Normal' },
			{ size: '12px', label: 'Small' },
		],
		onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
	}),
	new RteBoldFeature(),
	new RteItalicFeature(),
	new RteUnderlineFeature(),
	new RteStrikethroughFeature(),
	new RteMonospaceFeature(),
	new RteTextColorPickerFeature({
		onBlocks: [
			{ node: 'heading1', defaultColor: '#000000' },
			{ node: 'heading2', defaultColor: '#000000' },
			{ node: 'paragraph', defaultColor: '#000000' },
		],
	}),
	new RteListFeature({
		bulletList: true,
		numberedList: true,
	}),
	new RteAlignmentFeature(),
	new RteLinkFeature(),
	new RteInlineImageFeature(),
]);

const view = ref(config.instantiateView({ type: 'doc', content: [] }));

function updateView() {
	view.value = config.instantiateView(instance.getDocument());
}

const instance = config.instantiateEditor({
	initialDocument: {
		type: 'doc',
		content: [
			{
				type: 'heading1',
				attrs: { textAlign: 'center' },
				content: [{ type: 'text', text: 'Rich Text Editor' }],
			},
			{
				type: 'paragraph',
				attrs: { textAlign: 'center' },
				content: [
					{
						type: 'text',
						text: 'Lets users ',
					},
					{
						type: 'text',
						marks: [
							{
								type: 'bold',
							},
						],
						text: 'create and format',
					},
					{
						type: 'text',
						text: ' ',
					},
					{
						type: 'text',
						marks: [
							{
								type: 'textColor',
								attrs: {
									color: '#D6219C',
								},
							},
						],
						text: 'styled text',
					},
					{
						type: 'text',
						text: ' content, and embed rich media such as ',
					},
					{
						type: 'text',
						marks: [
							{
								type: 'link',
								attrs: {
									href: 'https://vonage.com',
								},
							},
						],
						text: 'links',
					},
					{
						type: 'text',
						text: ' and images.',
					},
				],
			},
			{
				type: 'paragraph',
				attrs: { textAlign: 'center' },
				content: [
					{
						type: 'inlineImage',
						attrs: {
							imageUrl: '/assets/images/large.jpg',
							alt: 'Landscape image',
							size: '300px',
						},
					},
				],
			},
		],
	},
	onChange: updateView,
});

// Initialize the view
updateView();
</script>

<template>
	<VRichTextEditor :instance="instance">
		<template #text-color-picker>
			<VSimpleColorPicker :swatches="swatches" />
		</template>
	</VRichTextEditor>

	<VActionGroup style="display: block; margin-top: 20px">
		<VAccordion expand-mode="multi" style="inline-size: 100%">
			<VAccordionItem heading="Rich Text View (live view)" :expanded="false">
				<VRichTextView :view="view" />
			</VAccordionItem>
		</VAccordion>
	</VActionGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-rich-text-editor>
	<vwc-simple-color-picker slot="text-color-picker"></vwc-simple-color-picker>
</vwc-rich-text-editor>

<vwc-action-group style="display: block; margin-top: 20px">
	<vwc-accordion expand-mode="multi" style="inline-size: 100%">
		<vwc-accordion-item heading="Rich Text View (live view)" expanded="false">
			<vwc-rich-text-view></vwc-rich-text-view>
		</vwc-accordion-item>
	</vwc-accordion>
</vwc-action-group>

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
			new RteBase({
				heading1: true,
				heading2: true,
			}),
			new RteTextBlockPickerFeature({
				options: [
					{ node: 'heading1', label: 'Title' },
					{ node: 'heading2', label: 'Subtitle' },
					{ node: 'paragraph', label: 'Body' },
				],
			}),
			new RteToolbarFeature(),
			new RtePlaceholderFeature({ text: 'Start typing here...' }),
			new RteFontSizePickerFeature({
				options: [
					{ size: '24px', label: 'Extra Large' },
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			new RteBoldFeature(),
			new RteItalicFeature(),
			new RteUnderlineFeature(),
			new RteStrikethroughFeature(),
			new RteMonospaceFeature(),
			new RteTextColorPickerFeature({
				onBlocks: [
					{ node: 'heading1', defaultColor: '#000000' },
					{ node: 'heading2', defaultColor: '#000000' },
					{ node: 'paragraph', defaultColor: '#000000' },
				],
			}),
			new RteListFeature({
				bulletList: true,
				numberedList: true,
			}),
			new RteAlignmentFeature(),
			new RteLinkFeature(),
			new RteInlineImageFeature(),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'heading1',
						attrs: { textAlign: 'center' },
						content: [{ type: 'text', text: 'Rich Text Editor' }],
					},
					{
						type: 'paragraph',
						attrs: { textAlign: 'center' },
						content: [
							{
								type: 'text',
								text: 'Lets users ',
							},
							{
								type: 'text',
								marks: [
									{
										type: 'bold',
									},
								],
								text: 'create and format',
							},
							{
								type: 'text',
								text: ' ',
							},
							{
								type: 'text',
								marks: [
									{
										type: 'textColor',
										attrs: {
											color: '#D6219C',
										},
									},
								],
								text: 'styled text',
							},
							{
								type: 'text',
								text: ' content, and embed rich media such as ',
							},
							{
								type: 'text',
								marks: [
									{
										type: 'link',
										attrs: {
											href: 'https://vonage.com',
										},
									},
								],
								text: 'links',
							},
							{
								type: 'text',
								text: ' and images.',
							},
						],
					},
					{
						type: 'paragraph',
						attrs: { textAlign: 'center' },
						content: [
							{
								type: 'inlineImage',
								attrs: {
									imageUrl: '/assets/images/large.jpg',
									alt: 'Landscape image',
									size: '300px',
								},
							},
						],
					},
				],
			},
			onChange: updateView,
		});

		const viewComponent = document.querySelector('vwc-rich-text-view');
		function updateView() {
			viewComponent.view = config.instantiateView(rteComponent.instance.getDocument());
		}
		updateView();
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>
