## Usage

The Rich Text Editor provides composable and customizable rich text editing features built on top of the [ProseMirror](https://prosemirror.net/) library.
Each feature adds specific functionality to the editor (e.g. formatting, lists, links) and you can individually enable or configure it.

To use it, first create a configuration with the features you want to include.

```js
import { RTEConfig, RTECore, RTEFreeformStructure, RTEToolbarFeature, RTEBoldFeature } from '@vonage/vivid';

const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature(), new RTEBoldFeature()]);
```

See the [features documentation](#features) for a list of available features.

Then, create an editor instance from the config, optionally with an initial document.

```js
const instance = config.instantiateEditor({
	initialDocument: {
		/* ... */
	},
});
```

To render it, pass the instance to the Rich Text Editor component.

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerRichTextEditor } from '@vonage/vivid';

registerRichTextEditor('your-prefix');

const rteComponent = document.querySelector('your-prefix-rich-text-editor');
rteComponent.instance = instance;
```

```html preview
<your-prefix-rich-text-editor></your-prefix-rich-text-editor>

<script type="module">
	import { registerRichTextEditor, RTEConfig, RTECore, RTEFreeformStructure, RTEToolbarFeature, RTEBoldFeature } from '@vonage/vivid';

	registerRichTextEditor('your-prefix');

	const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature(), new RTEBoldFeature()]);

	const instance = config.instantiateEditor({
		initialDocument: {
			type: 'doc',
			content: [
				{
					type: 'text_line',
					content: [
						{ type: 'text', text: 'Hello' },
						{ type: 'text', text: ' world!', marks: [{ type: 'bold' }] },
					],
				},
			],
		},
	});

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
import { RTEConfig, RTECore, RTEFreeformStructure, RTEToolbarFeature, RTEBoldFeature } from '@vonage/vivid';

const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature(), new RTEBoldFeature()]);

const instance = config.instantiateEditor({
	initialDocument: {
		type: 'doc',
		content: [
			{
				type: 'text_line',
				content: [
					{ type: 'text', text: 'Hello' },
					{ type: 'text', text: ' world!', marks: [{ type: 'bold' }] },
				],
			},
		],
	},
});
</script>
<template>
	<VRichTextEditor :instance="instance" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Guide

### Document Model

Documents are represented as JSON objects following the ProseMirror document model.

An example document could look like this:

```json
{
	"type": "doc",
	"content": [
		{
			"type": "paragraph",
			"content": [
				{
					"type": "text",
					"text": "Hello"
				},
				{
					"type": "text",
					"text": " world!",
					"marks": [
						{
							"type": "bold"
						}
					]
				},
				{
					"type": "text",
					"text": "Click me",
					"marks": [
						{
							"type": "link",
							"attrs": {
								"href": "https://vonage.com"
							}
						}
					]
				},
				{
					"type": "inline_image",
					"attrs": {
						"imageUrl": "/vonage.png",
						"alt": "Vonage Logo",
						"size": null,
						"natualWidth": 100,
						"naturalHeight": 50
					}
				}
			]
		}
	]
}
```

It is a tree structure of nodes similar to HTML. However, unlike HTML, markup like `bold` is attached to nodes as "marks". You can learn more about the format in the [ProseMirror documentation](https://prosemirror.net/docs/guide/#doc).

The exact schema of which nodes and marks can be in the document depends on the features you have enabled. Each feature documents how it extends the document model.

A document is a single `doc` node and has the type `RTEDocument`.

A part of a document is represented as an array of nodes and has the type `RTEFragment`:

```json
[{ "type": "text", "text": "Hello" }]
```

### Persisting Documents

Since documents are JSON-serializable, they can be stored directly in a database or sent over the network. This allows loading them into the editor again or rendering them in different contexts.

The schema of a specific `RTEConfig` will be stable across minor versions of Vivid. We will consider modifications to the schema as breaking changes in line with our [Release Policy](/resources/release-policy/).

However, if you make changes to your `RTEConfig`, you should ensure that the editor remains compatible with previously stored documents or migrate them accordingly.

### Rendering Documents

To render documents inside a web application, you will be able to use the Rich Text component. It will allow you to use custom components for rendering specific nodes or marks.

### HTML Conversion

Documents can be converted to and from HTML using the `RTEHtmlParser` and `RTEHtmlSerializer` classes:

```ts
import { RTEHtmlParser, RTEHtmlSerializer } from '@vonage/vivid';

const parser = new RTEHtmlParser(config);
const doc = parser.parseDocument('<p>Hello <strong>World</strong></p>'); // -> { type: 'doc', content: [...] }
const frag = parser.parseFragment('<p>Hello <strong>World</strong></p>'); // -> { type: 'paragraph', content: [...] }

const serializer = new RTEHtmlSerializer(config);
serializer.serializeDocument(doc); // -> '<p>Hello <strong>World</strong></p>'
serializer.serializeFragment(frag); // -> '<p>Hello <strong>World</strong></p>'
```

When parsing HTML, the input will be sanitized using the [DOMPurify](https://github.com/cure53/DOMPurify) library to strip out potentially dangerous HTML.

The default parser will make a best-effort attempt to parse arbitrary HTML, ignoring unsupported tags and attributes. The default serializer attempts to produce idiomatic and widely compatible HTML that can be converted back into the same document.

Their exact behaviour and output is undefined and may change between minor versions.

It's guaranteed that parsing the output of the serializer will yield the original document, even across minor versions.
If we make a change that break this guarantee, we will consider it a breaking change in line with our [Release Policy](/resources/release-policy/).

#### Customizing HTML Conversion

You can provide a `modifyDom` function to manipulate the DOM before it is parsed or serialized:

```ts
const fragment = parser.parseFragment('<img data-attachment-id="1">', {
	modifyDom: (dom) => {
		for (const img of dom.querySelectorAll('img[data-attachment-id]').values()) {
			img.setAttribute('src', `attachment://${img.getAttribute('data-attachment-id')}`);
		}
	},
}); /* -> [{
	"type": "inline_image",
	"attrs": {
		"imageUrl": "attachment://1",
		...
	},
}] */

serializer.serializeFragment(fragment, {
	modifyDom: (dom) => {
		for (const img of dom.querySelectorAll('img[src]').values()) {
			const url = new URL(img.getAttribute('src')!);
			img.setAttribute('data-attachment-id', url.hostname);
		}
	},
}); // -> '<img src="attachment://1" alt="" data-attachment-id="1">'
```

You can also customize the ProseMirror parsing and serialization logic directly.

For parsing, the `modifyParseRules` function allows you to modify the ProseMirror [ParseRules](https://prosemirror.net/docs/ref/#model.ParseRule) used:

```ts
const parser = new RTEHtmlParser(config, {
	modifyParseRules: (rules) => {
		rules.nodes.paragraph.push({ tag: 'div.paragraph' });
		rules.marks.bold.push({ tag: 'span.bold' });
	},
});
parser.parseFragment("<div class='paragraph'><span class='bold'>Hello</span> world</div>"); // -> { type: 'paragraph', content: [...] }
```

For serialization, you can override the default serializers for nodes and marks. Serializers need to return a ProseMirror [DOMOutputSpec](https://prosemirror.net/docs/ref/#model.DOMOutputSpec):

```ts
const serializer = new RTEHtmlSerializer(config, {
	serializers: {
		nodes: {
			paragraph: () => ['div', { class: 'paragraph' }, 0],
		},
		marks: {
			bold: () => ['span', { class: 'bold' }, 0],
		},
	},
});
```

## Editor Instance API

The editor instance holds all the state and functionality of the editor, but does not render anything on its own. To display it, pass it to a Rich Text Editor component.

You can use the instance to get and modify the document programmatically.

```html preview
<vwc-rich-text-editor style="block-size: 150px"></vwc-rich-text-editor>
<vwc-button id="replaceSelection" label="replaceSelection"></vwc-button>
<vwc-button id="replaceDocument" label="replaceDocument"></vwc-button>
<vwc-button id="reset" label="reset"></vwc-button>
<output style="display: block; block-size: 300px"><pre id="output"></pre></output>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const output = document.querySelector('#output');
		const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature()]);
		const instance = config.instantiateEditor({
			onChange: () => {
				console.log('Document changed:', instance.getDocument());
				output.textContent = JSON.stringify(instance.getDocument(), null, 2);
			},
		});
		rteComponent.instance = instance;

		document.querySelector('#replaceSelection').addEventListener('click', () => {
			instance.replaceSelection([{ type: 'text', text: 'Replaced selection' }]);
		});

		document.querySelector('#replaceDocument').addEventListener('click', () => {
			instance.replaceDocument({
				type: 'doc',
				content: [{ type: 'text_line', content: [{ type: 'text', text: 'Replaced document content' }] }],
			});
		});

		document.querySelector('#reset').addEventListener('click', () => {
			instance.reset({
				type: 'doc',
				content: [{ type: 'text_line', content: [{ type: 'text', text: 'Reset content' }] }],
			});
		});
	});
</script>
```

### Configuration Options

#### onChange

The `onChange` callback is called whenever the document changes.

```ts
const instance = config.instantiateEditor([], {
	onChange: () => {
		console.log('Document changed:', instance.getDocument());
	},
});
```

#### foreignHtmlParser / foreignHtmlSerializer

Users can copy or drag arbitrary HTML content in or out of the editor.

The editor uses the `foreignHtmlParser` and `foreignHtmlSerializer` to handle this content.

When not provided, it uses a default parser and serializer.

```ts
config.instantiateEditor({
	foreignHtmlParser: new RTEHtmlParser(config, {
		/* ... */
	}),
	foreignHtmlSerializer: new RTEHtmlSerializer(config, {
		/* ... */
	}),
});
```

### Methods

### getDocument

```ts
/**
 * Returns the current document state.
 */
getDocument(): RTEDocument;
```

### replaceSelection

```ts
/**
 * Replaces the current selection with the given content. If no text is selected, this inserts the content at the cursor position.
 */
replaceSelection(
	content: RTEFragment,
	options?: {
		/**
		 * Controls where the cursor is placed after the replacement:
		 * - 'end': places the cursor at the end of the inserted content (default)
		 * - 'start': places the cursor at the start of the inserted content
		 */
		cursorPlacement?: 'end' | 'start';
		/**
		 * If true, selects the inserted content after replacement. Defaults to false.
		 */
		selectContent?: boolean;
	}
): void;
```

### replaceDocument

```ts
replaceDocument(
	newDocument: RTEDocument,
	options?: {
		/**
		 * Controls where the cursor is placed after the replacement:
		 * - 'start': places the cursor at the start of document (default)
		 * - 'end': places the cursor at the end of the document
		 */
		cursorPlacement?: 'start' | 'end';
		/**
		 * If true, selects the whole document after replacement. Defaults to false.
		 */
		selectContent?: boolean;
	}
): void;
```

#### reset

```ts
/**
 * Reset the editor to its initial state. Optionally, an initial document can be provided.
 */
reset(initialDocument?: RTEDocument): void;
```

## Features

The Core feature and a structure feature are required for the editor to work. All other features are optional and can be combined as needed.

### RTECore

Provides basic editing functionality and undo/redo functionality.

Keyboard shortcuts:

- **Undo**: <kbd>Ctrl</kbd> + <kbd>Z</kbd> / <kbd>Cmd</kbd> + <kbd>Z</kbd>
- **Redo**: <kbd>Ctrl</kbd> + <kbd>Y</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd>

### RTEFreeformStructure

Allows text input without any structure, similar to a regular text area.

<rte-schema>
	<rte-schema-node name="doc">
		<rte-schema-content>block+</rte-schema-content>
	</rte-schema-node>
	<rte-schema-node name="text_line">
		<rte-schema-group>block</rte-schema-group>
		<rte-schema-content>inline*</rte-schema-content>
	</rte-schema-node>
</rte-schema>

```html preview
<vwc-rich-text-editor style="block-size: 150px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature()]);
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

<rte-schema>
	<rte-schema-node name="doc">
		<rte-schema-content>block+</rte-schema-content>
	</rte-schema-node>
	<rte-schema-node name="heading">
		<rte-schema-group>block</rte-schema-group>
		<rte-schema-attrs>
			<rte-schema-attr name="level" type="number" required description="The heading level (1-6)."></rte-schema-attr>
			<rte-schema-textblock-attrs></rte-schema-textblock-attrs>
		</rte-schema-attrs>
		<rte-schema-marks>None</rte-schema-marks>
		<rte-schema-content>inline*</rte-schema-content>
	</rte-schema-node>
	<rte-schema-node name="paragraph">
		<rte-schema-group>block</rte-schema-group>
		<rte-schema-attrs>
			<rte-schema-textblock-attrs></rte-schema-textblock-attrs>
		</rte-schema-attrs>
		<rte-schema-content>inline*</rte-schema-content>
	</rte-schema-node>
	<rte-schema-node name="hard_break">
		<rte-schema-group>inline</rte-schema-group>
	</rte-schema-node>
</rte-schema>

```html preview
<vwc-rich-text-editor style="block-size: 200px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature()]);
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
						content: [{ type: 'text', text: 'This is a paragraph.' }],
					},
				],
			},
		});
	});
</script>
```

### RTEToolbarFeature

Adds the toolbar to the editor, which provides controls for the available features.

Configuration options:

- `popupDirection?: 'inward' | 'outward'`: Whether tooltips and other popups prefer to be open towards or away from the main text-editing area. Defaults to 'inward'.

```html preview
<vwc-rich-text-editor style="block-size: 250px; margin-block-end: 250px;"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([
			new RTECore(),
			new RTEFreeformStructure(),
			new RTEToolbarFeature({
				popupDirection: 'outward',
			}),
			new RTEFontSizeFeature(),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'text_line',
						content: [{ type: 'text', text: 'Tooltips and menus open outwards in this editor.' }],
					},
				],
			},
		});
	});
</script>
```

### RTEFontSizeFeature

Adds the ability to change the text size.

Currently, the list of font sizes is predefined and cannot be changed.

Keyboard shortcuts:

- **Increase Font Size**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd>
- **Decrease Font Size**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>,</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>,</kbd>

<rte-schema>
	<rte-schema-mark name="fontSize">
		<rte-schema-attrs>
			<rte-schema-attr name="size" type="'small' | 'normal' | 'large' | 'extra-large'" default="'normal'"></rte-schema-attr>
		</rte-schema-attrs>
	</rte-schema-mark>
</rte-schema>

Known issues:

- Cursor size does not adjust correctly when the cursor is in the middle of text.

```html preview
<vwc-rich-text-editor style="block-size: 150px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature(), new RTEFontSizeFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
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
				],
			},
		});
	});
</script>
```

### RTETextColorFeature

Adds support for different text colors.

This feature adds a `text-color-picker` slot in which you can place a [Simple Color Picker](/components/simple-color-picker).

Configuration options:

- `defaultColor: string` (required): The default color of unstyled text. The editor will not actually apply this color to any text, so you need to ensure that this matches the current CSS `color`.

<rte-schema>
	<rte-schema-mark name="textColor">
		<rte-schema-attrs>
			<rte-schema-attr name="color" type="string" required description="The text color as a CSS color value (e.g., '#FF0000', 'rgb(255, 0, 0)')."></rte-schema-attr>
		</rte-schema-attrs>
	</rte-schema-mark>
</rte-schema>

<vwc-note connotation="warning" headline="Colors in Alternate Theme">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

When using the alternate theme the colors may no longer have sufficient contrast.

</vwc-note>

```html preview
<vwc-rich-text-editor style="block-size: 150px">
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
		const config = new RTEConfig([
			new RTECore(),
			new RTEFreeformStructure(),
			new RTEToolbarFeature(),
			new RTETextColorFeature({
				defaultColor: '#000000',
			}),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'text_line',
						content: [
							{
								type: 'text',
								text: 'Red ',
								marks: [{ type: 'textColor', attrs: { color: '#E61D1D' } }],
							},
							{
								type: 'text',
								text: 'Yellow ',
								marks: [{ type: 'textColor', attrs: { color: '#FA9F00' } }],
							},
							{
								type: 'text',
								text: 'Green',
								marks: [{ type: 'textColor', attrs: { color: '#1C8731' } }],
							},
						],
					},
				],
			},
		});
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

<rte-schema>
	<rte-schema-mark name="bold">
		<rte-schema-empty></rte-schema-empty>
	</rte-schema-mark>
	<rte-schema-mark name="italic">
		<rte-schema-empty></rte-schema-empty>
	</rte-schema-mark>
	<rte-schema-mark name="underline">
		<rte-schema-empty></rte-schema-empty>
	</rte-schema-mark>
	<rte-schema-mark name="strikethrough">
		<rte-schema-empty></rte-schema-empty>
	</rte-schema-mark>
	<rte-schema-mark name="monospace">
		<rte-schema-empty></rte-schema-empty>
	</rte-schema-mark>
</rte-schema>

```html preview
<vwc-rich-text-editor></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature(), new RTEBoldFeature(), new RTEItalicFeature(), new RTEUnderlineFeature(), new RTEStrikethroughFeature(), new RTEMonospaceFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
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
				],
			},
		});
	});
</script>
```

### RTEListFeature

Adds support for bullet and numbered lists.

Keyboard shortcuts:

- **Toggle bullet list**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>8</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>8</kbd>
- **Toggle numbered list**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>7</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>7</kbd>

<rte-schema>
	<rte-schema-node name="bullet_list">
		<rte-schema-group>block list</rte-schema-group>
		<rte-schema-content>(list_item | list)+</rte-schema-content>
	</rte-schema-node>
	<rte-schema-node name="numbered_list">
		<rte-schema-group>block list</rte-schema-group>
		<rte-schema-content>(list_item | list)+</rte-schema-content>
	</rte-schema-node>
	<rte-schema-node name="list_item">
		<rte-schema-attrs>
			<rte-schema-textblock-attrs></rte-schema-textblock-attrs>
		</rte-schema-attrs>
		<rte-schema-content>inline*</rte-schema-content>
	</rte-schema-node>
</rte-schema>

```html preview
<vwc-rich-text-editor style="block-size: 250px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature(), new RTEListFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'bullet_list',
						content: [
							{
								type: 'list_item',
								content: [{ type: 'text', text: 'Bullet list' }],
							},
							{
								type: 'bullet_list',
								content: [
									{
										type: 'list_item',
										content: [{ type: 'text', text: 'Item 1' }],
									},
									{
										type: 'list_item',
										content: [{ type: 'text', text: 'Item 2' }],
									},
									{
										type: 'list_item',
										content: [{ type: 'text', text: 'Item 3' }],
									},
								],
							},
							{
								type: 'list_item',
								content: [{ type: 'text', text: 'Numbered list' }],
							},
							{
								type: 'numbered_list',
								content: [
									{
										type: 'list_item',
										content: [{ type: 'text', text: 'Item 1' }],
									},
									{
										type: 'list_item',
										content: [{ type: 'text', text: 'Item 2' }],
									},
									{
										type: 'list_item',
										content: [{ type: 'text', text: 'Item 3' }],
									},
								],
							},
						],
					},
				],
			},
		});
	});
</script>
```

### RTEAlignmentFeature

Adds the ability to change the alignment of text blocks.

Keyboard shortcuts:

- **Align Left**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd>
- **Align Center**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd>
- **Align Right**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>

<rte-schema>
	<rte-schema-textblock-attr name="textAlign">
		<rte-schema-attrs>
			<rte-schema-attr name="textAlign" type="'left' | 'center' | 'right'" default="'left'" description="The text alignment of the block."></rte-schema-attr>
		</rte-schema-attrs>
	</rte-schema-textblock-attr>
</rte-schema>

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

The alignment feature cannot be used with `RTETextBlockStructure`, since there are no text blocks to align.

</vwc-note>

```html preview
<vwc-rich-text-editor style="block-size: 200px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature(), new RTEAlignmentFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
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
				],
			},
		});
	});
</script>
```

### RTELinkFeature

Adds the ability to insert links.

<rte-schema>
	<rte-schema-mark name="link">
		<rte-schema-attrs>
			<rte-schema-attr name="href" type="string" required description="The URL the link points to."></rte-schema-attr>
		</rte-schema-attrs>
	</rte-schema-mark>
</rte-schema>

```html preview
<vwc-rich-text-editor style="block-size: 250px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature(), new RTELinkFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'text_line',
						content: [
							{
								type: 'text',
								text: 'Learn more on ',
							},
							{
								type: 'text',
								text: 'our website',
								marks: [{ type: 'link', attrs: { href: 'https://www.vonage.com' } }],
							},
						],
					},
				],
			},
		});
	});
</script>
```

### RTEInlineImageFeature

Adds support for inline images. This feature does not provide any UI for adding images by itself, however the user can paste HTML content containing images into the editor.

<rte-schema>
	<rte-schema-node name="inline_image">
		<rte-schema-group>inline</rte-schema-group>
		<rte-schema-attrs>
			<rte-schema-attr name="imageUrl" type="string" required description="A URL representing the image to display."></rte-schema-attr>
			<rte-schema-attr name="alt" type="string" default="''" description="The alt text for the image."></rte-schema-attr>
			<rte-schema-attr name="naturalWidth" type="number | null" default="null" description="The original width of the image in pixels. Automatically updated when the image loads."></rte-schema-attr>
			<rte-schema-attr name="naturalHeight" type="number | null" default="null" description="The original height of the image in pixels. Automatically updated when the image loads."></rte-schema-attr>
			<rte-schema-attr name="size" type="string | null" default="null" description="The max width of the image as a CSS value (e.g., '100px' or '50%'). If null, uses natural dimensions."></rte-schema-attr>
		</rte-schema-attrs>
	</rte-schema-node>
</rte-schema>

```html preview
<vwc-rich-text-editor style="block-size: 500px"> </vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');

		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature(), new RTEInlineImageFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [
							{ type: 'text', text: 'Image: ' },
							{
								type: 'inline_image',
								attrs: {
									imageUrl: '/assets/images/large.jpg',
									alt: 'Landscape image',
									size: '100%',
								},
							},
						],
					},
				],
			},
		});
	});
</script>
```

The `inline_image` node type has the following attributes:

- `imageUrl: string` (required): A URL representing the image to display. By default, this corresponds to the `src` attribute of the HTML `<img>` element.
- `alt: string` (optional): The alt text for the image. Defaults to an empty string.
- `naturalWidth: string | null` (optional): The original width of the image. If not provided, the editor will update the document once the image has loaded.
- `naturalHeight: string | null` (optional): The original height of the image. If not provided, the editor will update the document once the image has loaded.
- `size: string | null` (optional): The max width of the image as a CSS value (e.g. `100px` or `50%`). If not provided, the image will use its natural dimensions.

#### Image Size

When selecting an image, the editor will show options to change the `size` to one of the following sizes:

- `Original`: `null` - natural dimensions
- `Fit`: `100%` - fit to the width of the editor
- `Small`: `<min(300px, 0.5 * naturalWidth)>`

#### Image URL

To display an image, the editor needs a URL to use as the `src` attribute of the HTML `<img>` tag. For example, this could be one of the following:

- HTTP URL: `https://example.com/image.jpg` or `/api/attachments/12345`
- [Blob URL](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/blob): `blob:https://example.com/abcd-efgh-ijkl-mnop`
- [Data URL](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data): `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...`

By default, the editor will use the `imageUrl` as the `src` attribute of the `<img>` tag.

However, storing `src` URLs in the document is not always ideal, since they may need to change or may not be known at the time the image is inserted.

Instead, you can use a **logical URL** like `attachment://12345` as `imageUrl` and resolve it to a `src` URL by providing mapping functions in the configuration:

**resolveUrl**

Type: `resolveUrl: (imageUrl: string) => ResolvedUrl | AsyncGenerator<ResolvedUrl, ResolvedUrl>` (optional)

The `resolveUrl` function is called whenever the editor needs to display an image. It receives the `imageUrl` value for the image and decides how to display this image.

Possible `ResolvedUrl` values:

- `string`: Displays an image with this `src` URL.
- `null`: Displays nothing.
- `{ type: 'placeholder', create: (slotName: string) => (() => unknown) | undefined }`: Displays arbitrary slotted placeholder content. See [Rendering Placeholders](#rendering-placeholders) for details.

`resolveUrl` can also be an async generator of resolved values. This allows you to resolve the url asynchronously and update the displayed content over time.

Keep in mind that users can duplicate images inside the editor, so `resolveUrl` may be called multiple times for the same `imageUrl`.

Here is an example that resolves `attachment://<id>` URLs with placeholders for loading and error states:

```ts
new RTEInlineImageFeature({
	resolveUrl: async function* (imageUrl) {
		const url = new URL(imageUrl);
		if (url.protocol !== 'attachment:') {
			return imageUrl; // regular src URL
		}

		const attachmentId = parseInt(url.host, 10);

		yield {
			type: 'placeholder',
			create: (slotName) => {
				/* display loading placeholder */
			},
		};

		try {
			return await getAttachmentUrlOnceUploaded(attachmentId);
		} catch (error) {
			return {
				type: 'placeholder',
				create: (slotName) => {
					/* display error placeholder */
				},
			};
		}
	},
});
```

**parseUrlFromHtml**

Type: `serializeUrlToHtml: (imageUrl: string) => string | null`

Called when the document is serialized to HTML. Note that this occurs not only when you call `toHTML`, but also when content is copied or dragged out of the editor.

For each image, it is called with the `imageUrl` and should return the `src` value of `<img>` element. If it returns `null`, the image is omitted from HTML output.

**parseUrlFromHtml**

Type: `parseUrlFromHtml: (src: string) => string | null}` (optional)

Called when HTML is parsed. Note that this occurs not only when you call `parseHTML`, but also when HTML content is pasted or dragged into the editor.

For each HTML `<img>` tag, it is called with the `src` attribute and should return the `imageUrl`. If it returns `null`, the image is discarded.

#### Rendering Placeholders

Resolving an `imageUrl` to a placeholder allows you to display custom slotted content in place of the image.

The placeholder content must be non-interactive.

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

When rendering a placeholder, the editor will create a slot with a unique name (e.g. `inline-image-placeholder-1`) and call the provided `create` function with this slot name.

You can optionally return a cleanup function from `create`, which will be called when the placeholder slot is removed.

Placeholders are never reused, so `create` and `cleanup` will be called at most once.

```ts
new RTEInlineImageFeature({
	resolveUrl: (url: string) => ({
		type: 'placeholder',
		create: (slotName: string) => {
			const placeholder = document.createElement('div');
			placeholder.slot = slotName;
			richTextEditor.appendChild(placeholder);

			return () => {
				placeholder.remove();
			};
		},
	}),
});
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

Not yet implemented: Use the `xxx` scoped slot to render the placeholder content. The `data` property can contain custom data that is passed to the slot.

```ts
new RTEInlineImageFeature({
	resolveUrl: (url: string) => ({
		type: 'placeholder',
		data: { type: 'error', title: 'Image failed to load', message: 'Please try again later.' },
	}),
});
```

```html
<VRichTextEditor :instance="instance">
	<template #xxx="xxxProps">
		<MyErrorPlaceholder v-if="xxxProps.type === 'inline-image-placeholder' && xxxProps.data.type === 'error'" :title="xxxProps.data.title" :message="xxxProps.data.message" />
	</template>
</VRichTextEditor>
```

</vwc-tab-panel>
</vwc-tabs>

#### Determining Used Images

You may want to know which images are still in use or detect when an image is deleted, for example to manage corresponding attachments.

In general, you cannot know when it is safe to remove the attachment since the user could restore the image from clipboard or history at a later time.

You can inspect the document to find referenced images when saving or submitting it, after which the editor will no longer be used.

### RTEFileHandlerFeature

Allows you to handle files dropped or pasted into the editor.

Configuration options:

- `handleFiles: (files: File[]) => RTEFragment | Promise<RTEFragment> | null` (required)

Called when files are dropped or pasted into the editor. When pasting file, the returned fragment replaces the current selection. When dropping files, it is inserted at the drop location.

If it returns `null`, the files are ignored and the current selection remains unchanged.

The function is only called for files inserted into the editor content area. Files dropped or pasted into other areas (e.g. menu bar or content in the `editor-end` slot) are not handled.

### RTEDropHandlerFeature

Allows you to customize drag and drop behavior over the editor viewport.

Configuration options:

- `onViewportDragOver: (event: DragEvent) => boolean` (optional)

Called whenever the user drags content over the editor viewport. If it returns `true`, the editor will ignore this content. No drop cursor will be displayed and `handleFiles` will not be called.
Note that users can drag content around inside the editor, and HTML or text content in from outside the editor. This will also be disabled when returning `true`, so you should ensure that you only return `true` for content you want to handle, e.g. files.

- `onViewportDrop: (event: DragEvent) => void` (optional)

Called whenever the user drops content over the editor viewport.

- `onViewportDragEnd: () => void` (optional)

Called whenever dragging over the viewport ends, including after a drop.

In this example, we display a drop zone overlay when files are dragged over the editor viewport:

```html preview
<vwc-rich-text-editor style="block-size: 300px">
	<div id="drop-zone" slot="editor-end" style="display: none; position: fixed; inset: 0;">
		<div style="position: absolute; inset-inline: var(--editor-padding-inline); inset-block: var(--editor-padding-block); background-color: var(--vvd-color-alert-50); border-radius: 8px; border: 1px dashed var(--vvd-color-cta-500); display: flex; justify-content: center; align-items: center;"><span>Drop files here to upload</span></div>
	</div>
</vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const isFileDrop = (event) => event.dataTransfer.types.includes('Files');

		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const dropZone = document.querySelector('#drop-zone');

		const config = new RTEConfig([
			new RTECore(),
			new RTETextBlockStructure(),
			new RTEToolbarFeature(),
			new RTEInlineImageFeature(),
			new RTEDropHandlerFeature({
				onViewportDragOver: (event) => {
					if (!isFileDrop(event)) {
						return false;
					}
					dropZone.style.display = 'block';
					event.preventDefault();
					return true;
				},
				onViewportDrop: (event) => {
					if (!isFileDrop(event)) {
						return;
					}
					const files = Array.from(event.dataTransfer.files);
					for (const file of files) {
						console.log('Dropped file:', file.name);
					}

					event.preventDefault();
				},
				onViewportDragFinish: () => {
					dropZone.style.display = 'none';
				},
			}),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [{ type: 'text', text: 'Drag files into the editor.' }],
					},
				],
			},
		});
	});
</script>
```

## Slots

### editor-start / editor-end

Content placed in these slots is displayed at the start or end of the scrollable editor area.

You can use the `--editor-padding-inline` and `--editor-padding-block` CSS variables to match the padding of the editor content.

```html preview
<vwc-rich-text-editor style="block-size: 300px">
	<div slot="editor-start" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Start Content</div>
	<div slot="editor-end" style="background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor End Content</div>
</vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');

		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: Array(10)
					.fill(null)
					.map((_, i) => ({
						type: 'paragraph',
						content: [{ type: 'text', text: `Paragraph ${i + 1}` }],
					})),
			},
		});
	});
</script>
```

Content with `position` of `sticky` / `fixed` / `absolute` is positioned relative to the editor viewport:

```html preview
<vwc-rich-text-editor style="block-size: 300px">
	<div slot="editor-start" style="position: sticky; inset-block-start: 0; z-index: 1; background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor Start Content</div>
	<div slot="editor-end" style="position: sticky; inset-block-end: 0; background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">Editor End Content</div>
</vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');

		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: Array(10)
					.fill(null)
					.map((_, i) => ({
						type: 'paragraph',
						content: [{ type: 'text', text: `Paragraph ${i + 1}` }],
					})),
			},
		});
	});
</script>
```

### status

Content placed in this slot is displayed between the editor viewport and the toolbar.

```html preview
<vwc-rich-text-editor style="block-size: 200px">
	<div slot="status" style="padding: 8px; background: var(--vvd-color-alert-50); color: var(--vvd-color-alert-500); font-weight: bold;">File upload failed. Please try again.</div>
</vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');

		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: Array(10)
					.fill(null)
					.map((_, i) => ({
						type: 'paragraph',
						content: [{ type: 'text', text: `Paragraph ${i + 1}` }],
					})),
			},
		});
	});
</script>
```

## Properties

### editorViewportElement

The `editorViewportElement` property provides access to the scrollable editor viewport element. You can use this to determine the scroll position.

```html preview
<vwc-rich-text-editor style="block-size: 300px">
	<div slot="editor-start" style="block-size: 100px; flex: none; background-color: var(--vvd-color-alert-50); padding-inline: var(--editor-padding-inline); padding-block: var(--editor-padding-block);">This example observes whether this content is in the viewport.</div>
	<div slot="status" style="padding: 8px; background-color: var(--vvd-color-information-50);"></div>
</vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');

		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: Array(10)
					.fill(null)
					.map((_, i) => ({
						type: 'paragraph',
						content: [{ type: 'text', text: `Paragraph ${i + 1}` }],
					})),
			},
		});

		const slottedContent = document.querySelector('[slot="editor-start"]');
		const status = document.querySelector('[slot="status"]');

		const observer = new IntersectionObserver(
			([entry]) => {
				status.textContent = `In viewport: ${(entry.intersectionRatio * 100).toFixed(0)}%`;
			},
			{
				root: rteComponent.editorViewportElement,
				threshold: [0, 0.25, 0.5, 0.75, 1],
			}
		);

		observer.observe(slottedContent);
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
