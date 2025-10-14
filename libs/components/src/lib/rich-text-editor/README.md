## Usage

To use the Rich Text Editor, you first need to create a configuration with the features you want to include.

```js
import {
	RTEConfig,
	RTECore,
	RTEFreeformStructure,
	RTEToolbarFeature,
	RTEBoldFeature,
} from '@vonage/vivid';

const config = new RTEConfig([
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEToolbarFeature(),
	new RTEBoldFeature(),
]);
```

See the [features documentation](#features) for a list of available features.

To render an editor, create an editor instance from the config, optionally with an initial document.

```js
const instance = config.instantiateEditor([
	{ type: 'text', text: 'Hello' },
	{ type: 'text', text: ' world!', marks: [{ type: 'bold' }] },
]);
```

Then, pass the instance to the Rich Text Editor component.

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import {
	registerRichTextEditor,
	RTEConfig,
	RTECore,
	RTEFreeformStructure,
	RTEToolbarFeature,
	RTEBoldFeature,
} from '@vonage/vivid';

registerRichTextEditor('your-prefix');

const config = new RTEConfig([
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEToolbarFeature(),
	new RTEBoldFeature(),
]);

const instance = config.instantiateEditor([
	{ type: 'text', text: 'Hello' },
	{ type: 'text', text: ' world!', marks: [{ type: 'bold' }] },
]);
```

```html preview
<your-prefix-rich-text-editor></your-prefix-rich-text-editor>

<script type="module">
	import {
		registerRichTextEditor,
		RTEConfig,
		RTECore,
		RTEFreeformStructure,
		RTEToolbarFeature,
		RTEBoldFeature,
	} from '@vonage/vivid';

	registerRichTextEditor('your-prefix');

	const config = new RTEConfig([
		new RTECore(),
		new RTEFreeformStructure(),
		new RTEToolbarFeature(),
		new RTEBoldFeature(),
	]);

	const instance = config.instantiateEditor([
		{ type: 'text', text: 'Hello' },
		{ type: 'text', text: ' world!', marks: [{ type: 'bold' }] },
	]);

	const rteComponent = document.querySelector('your-prefix-rich-text-editor');
	rteComponent.instance = instance;
</script>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue
<script setup lang="ts">
import { VRichTextEditor } from '@vonage/vivid-vue';
import {
	RTEConfig,
	RTECore,
	RTEFreeformStructure,
	RTEToolbarFeature,
	RTEBoldFeature,
} from '@vonage/vivid';

const config = new RTEConfig([
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEToolbarFeature(),
	new RTEBoldFeature(),
]);

const instance = config.instantiateEditor([
	{ type: 'text', text: 'Hello' },
	{ type: 'text', text: ' world!', marks: [{ type: 'bold' }] },
]);
</script>
<template>
	<VRichTextEditor :instance="instance" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Features

The Core feature and a structure feature are required for the editor to work. All other features are optional and can be combined as needed.

### RTECore

Provides basic editing functionality and undo/redo functionality.

Keyboard shortcuts:

- **Undo**: <kbd>Ctrl</kbd> + <kbd>Z</kbd> / <kbd>Cmd</kbd> + <kbd>Z</kbd>
- **Redo**: <kbd>Ctrl</kbd> + <kbd>Y</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd>

### RTEFreeformStructure

Allows text input without any structure, similar to a regular text area.

```html preview
<vwc-rich-text-editor style="block-size: 150px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([
			new RTECore(),
			new RTEFreeformStructure(),
			new RTEToolbarFeature(),
		]);
		rteComponent.instance = config.instantiateEditor();
	});
</script>
```

### RTETextBlockStructure

Structures the document into text blocks, such as paragraphs and headings.

Currently, the list of block types is predefined and cannot be changed. Headings cannot be styled with other text styles features.

Keyboard shortcuts:

- **Paragraph**: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>0</kbd> / <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>0</kbd>
- **Heading Level &lt;X&gt;**: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>&lt;X&gt;</kbd> / <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>&lt;X&gt;</kbd>
- **Hard Break**: <kbd>Shift</kbd> + <kbd>Enter</kbd>

```html preview
<vwc-rich-text-editor style="block-size: 200px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([
			new RTECore(),
			new RTETextBlockStructure(),
			new RTEToolbarFeature(),
		]);
		rteComponent.instance = config.instantiateEditor([
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
				content: [{ type: 'text', text: 'This is a paragraph.' }],
			},
		]);
	});
</script>
```

### RTEToolbarFeature

Adds the toolbar to the editor, which provides controls for the available features.

### RTEFontSizeFeature

Adds the ability to change the text size.

Currently, the list of font sizes is predefined and cannot be changed.

Keyboard shortcuts:

- **Increase Font Size**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd>
- **Decrease Font Size**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>,</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>,</kbd>

Known issues:

- Cursor size does not adjust correctly when the cursor is in the middle of text.

```html preview
<vwc-rich-text-editor style="block-size: 150px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([
			new RTECore(),
			new RTETextBlockStructure(),
			new RTEToolbarFeature(),
			new RTEFontSizeFeature(),
		]);
		rteComponent.instance = config.instantiateEditor([
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'small ',
						marks: [{ type: 'fontSize', attrs: { size: 'small' } }],
					},
					{ type: 'text', text: 'normal ' },
					{
						type: 'text',
						text: 'large ',
						marks: [{ type: 'fontSize', attrs: { size: 'large' } }],
					},
					{
						type: 'text',
						text: 'extra large',
						marks: [{ type: 'fontSize', attrs: { size: 'extra-large' } }],
					},
				],
			},
		]);
	});
</script>
```

### Text Style Features

The `RTEBoldFeature`, `RTEItalicFeature`, `RTEUnderlineFeature`, `RTEStrikethroughFeature`, and `RTEMonospaceFeature` add the corresponding text styling options to the editor.

Keyboard shortcuts:

- **Bold**: <kbd>Ctrl</kbd> + <kbd>B</kbd> / <kbd>Cmd</kbd> + <kbd>B</kbd>
- **Italic**: <kbd>Ctrl</kbd> + <kbd>I</kbd> / <kbd>Cmd</kbd> + <kbd>I</kbd>
- **Underline**: <kbd>Ctrl</kbd> + <kbd>U</kbd> / <kbd>Cmd</kbd> + <kbd>U</kbd>
- **Strikethrough**: <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>5</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>
- **Monospace**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>M</kbd>

```html preview
<vwc-rich-text-editor></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([
			new RTECore(),
			new RTETextBlockStructure(),
			new RTEToolbarFeature(),
			new RTEBoldFeature(),
			new RTEItalicFeature(),
			new RTEUnderlineFeature(),
			new RTEStrikethroughFeature(),
			new RTEMonospaceFeature(),
		]);
		rteComponent.instance = config.instantiateEditor([
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'bold ', marks: [{ type: 'bold' }] },
					{ type: 'text', text: 'italic ', marks: [{ type: 'italic' }] },
					{ type: 'text', text: 'underline ', marks: [{ type: 'underline' }] },
					{
						type: 'text',
						text: 'strikethrough ',
						marks: [{ type: 'strikethrough' }],
					},
					{ type: 'text', text: 'monospace ', marks: [{ type: 'monospace' }] },
				],
			},
		]);
	});
</script>
```

### RTEAlignmentFeature

Adds the ability to change the alignment of text blocks.

Keyboard shortcuts:

- **Align Left**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd>
- **Align Center**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd>
- **Align Right**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

Since there are no text blocks in the freeform structure, it is recommended to use this feature together with the `RTETextBlockStructure`.

</vwc-note>

```html preview
<vwc-rich-text-editor style="block-size: 200px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([
			new RTECore(),
			new RTETextBlockStructure(),
			new RTEToolbarFeature(),
			new RTEAlignmentFeature(),
		]);
		rteComponent.instance = config.instantiateEditor([
			{
				type: 'heading',
				attrs: { level: 1, textAlign: 'center' },
				content: [
					{
						type: 'text',
						text: 'Centered Title',
					},
				],
			},
			{
				type: 'heading',
				attrs: { level: 2, textAlign: 'left' },
				content: [
					{
						type: 'text',
						text: 'Left-aligned Subtitle',
					},
				],
			},
			{
				type: 'paragraph',
				attrs: { textAlign: 'right' },
				content: [
					{
						type: 'text',
						text: 'This paragraph is right-aligned.',
					},
				],
			},
		]);
	});
</script>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name            | Type          | Description                                                                             |
| --------------- | ------------- | --------------------------------------------------------------------------------------- |
| **instance**    | `RTEInstance` | The editor instance created from the RTEConfig. Without it, the editor will not render. |
| **placeholder** | `string`      | A placeholder text to display when the editor is empty.                                 |

</div>
