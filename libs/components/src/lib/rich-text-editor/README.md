## Usage

The Rich Text Editor provides composable and customizable rich text editing features built on top of the [ProseMirror](https://prosemirror.net/) library.
Each feature adds specific functionality to the editor (e.g. formatting, lists, links) that you can individually enable and configure.

To use the Rich Text Editor, first create a configuration with the features you want to include.

```js
import { RteConfig, RteBase, RteToolbarFeature, RteBoldFeature } from '@vonage/vivid';

const config = new RteConfig([new RteBase(), new RteToolbarFeature(), new RteBoldFeature()]);
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
	import { registerRichTextEditor, RteConfig, RteBase, RteToolbarFeature, RteBoldFeature } from '@vonage/vivid';

	registerRichTextEditor('your-prefix');

	const config = new RteConfig([new RteBase(), new RteToolbarFeature(), new RteBoldFeature()]);

	const instance = config.instantiateEditor({
		initialDocument: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
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

```vue preview
<script setup lang="ts">
import { VRichTextEditor } from '@vonage/vivid-vue';
import { RteConfig, RteBase, RteToolbarFeature, RteBoldFeature } from '@vonage/vivid';

const config = new RteConfig([new RteBase(), new RteToolbarFeature(), new RteBoldFeature()]);

const instance = config.instantiateEditor({
	initialDocument: {
		type: 'doc',
		content: [
			{
				type: 'paragraph',
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
					"type": "inlineImage",
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

A document is a single `doc` node and has the type `RteDocument`. Its children must be block nodes.

A part of a document is represented as an array of nodes and has the type `RteFragment`:

```json
[{ "type": "text", "text": "Hello" }]
```

### Persisting Documents

Since documents are JSON-serializable, they can be stored directly in a database or sent over the network. This allows loading them into the editor again or rendering them in different contexts.

The schema of a specific `RteConfig` will be stable across minor versions of Vivid. We will consider modifications to the schema as breaking changes in line with our [Release Policy](/resources/release-policy/).

However, if you make changes to your `RteConfig`, you should ensure that the editor remains compatible with previously stored documents or migrate them accordingly.

### Rendering Documents

To render documents inside a web application, you can use the Rich Text View component. It accepts a view that is created by `RteConfig`'s `instantiateView` method.

```html preview
<vwc-rich-text-view></vwc-rich-text-view>

<script>
	customElements.whenDefined('vwc-rich-text-view').then(() => {
		const config = new RteConfig([new RteBase(), new RteToolbarFeature(), new RteBoldFeature()]);

		const view = config.instantiateView({
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{ type: 'text', text: 'Hello' },
						{ type: 'text', text: ' world!', marks: [{ type: 'bold' }] },
					],
				},
			],
		});

		const viewComponent = document.querySelector('vwc-rich-text-view');
		viewComponent.view = view;
	});
</script>
```

It renders documents identically to how they appear in the editor. You can also customize the rendering of specific nodes or marks by providing the `renderChildView` option.

`renderChildView?: (view: RteView) => { dom: HTMLElement; contentDom?: HTMLElement; } | true | false;`

The function is called for each node and mark in the document. The kind is indicated by `view.type: 'node' | 'mark'`, and `view.node` or `view.mark` will contain the respective JSON representation of the node/mark.

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

You can render a custom HTML element for this node/mark by returning it as the `dom` property. If there is child content, Rich Text View will render them as children of `contentDom`, which defaults to `dom`.

If you return `false`, the view is rendered as normal.

```html preview
<vwc-rich-text-view></vwc-rich-text-view>

<script>
	customElements.whenDefined('vwc-rich-text-view').then(() => {
		const config = new RteConfig([new RteBase(), new RteToolbarFeature(), new RteBoldFeature()]);

		const view = config.instantiateView(
			{
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [
							{ type: 'text', text: 'Hello ' },
							{ type: 'text', text: 'world!', marks: [{ type: 'bold' }] },
						],
					},
				],
			},
			{
				renderChildView: (view) => {
					if (view.type === 'mark' && view.mark.type === 'bold') {
						const dom = document.createElement('button');
						dom.style.fontWeight = 'bold';
						dom.addEventListener('click', () => alert('Bold text clicked!'));
						return { dom };
					}
					return false; // use default rendering
				},
			}
		);

		const viewComponent = document.querySelector('vwc-rich-text-view');
		viewComponent.view = view;
	});
</script>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

You can render a custom content for this node/mark by returning `true` and using the `child` scoped slot. The slot receives `{ view: RteView }`.

If you return `false`, the view is rendered as normal.

To render the children of the view, render `view.children` using a nested `VRichTextView`. Since the nested view might also render using the scoped slot, you can set up a component that recursively renders itself.

```ts
renderChildView: (view) => {
	if (view.type === 'mark' && view.mark.type === 'bold') {
		return true; // uses `child` scoped slot to render
	}
	return false; // use default rendering
};
```

```html
<!-- RichText.vue -->
<script setup lang="ts">
	import { VRichTextView } from '@vonage/vivid-vue';
	import type { RteView } from '@vonage/vivid';

	const { view } = defineProps<{
		view: RteView;
	}>();

	const onClick = () => {
		window.alert('Bold text clicked!');
	};
</script>
<template>
	<VRichTextView :view="view">
		<template #child="{ view }">
			<button @click="onClick" style="font-weight: bold">
				<RichText :view="view.children" />
			</button>
		</template>
	</VRichTextView>
</template>
```

```vue preview
<script setup lang="ts">
import { VRichTextView } from '@vonage/vivid-vue';
import { RteBase, RteBoldFeature, RteConfig, RteToolbarFeature } from '@vonage/vivid';

const config = new RteConfig([new RteBase(), new RteToolbarFeature(), new RteBoldFeature()]);

const view = config.instantiateView(
	{
		type: 'doc',
		content: [
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'Hello ' },
					{ type: 'text', text: 'world!', marks: [{ type: 'bold' }] },
				],
			},
		],
	},
	{
		renderChildView: (view) => {
			if (view.type === 'mark' && view.mark.type === 'bold') {
				return true; // use child-view slot
			}
			return false; // use default rendering
		},
	}
);

const onClick = () => {
	window.alert('Bold text clicked!');
};
</script>
<template>
	<VRichTextView :view="view">
		<template #child="{ view }">
			<button @click="onClick" style="font-weight: bold">
				<VRichTextView :view="view.children" />
			</button>
		</template>
	</VRichTextView>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

### HTML Conversion

Documents can be converted to and from HTML using the `RteHtmlParser` and `RteHtmlSerializer` classes:

```ts
import { RteHtmlParser, RteHtmlSerializer } from '@vonage/vivid';

const parser = new RteHtmlParser(config);
const doc = parser.parseDocument('<p>Hello <strong>World</strong></p>');
// -> { type: 'doc', content: [...] }
const frag = parser.parseFragment('<p>Hello <strong>World</strong></p>');
// -> { type: 'paragraph', content: [...] }

const serializer = new RteHtmlSerializer(config);
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
	"type": "inlineImage",
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
const parser = new RteHtmlParser(config, {
	modifyParseRules: (rules) => {
		rules.nodes.paragraph.push({ tag: 'div.paragraph' });
		rules.marks.bold.push({ tag: 'span.bold' });
	},
});
parser.parseFragment("<div class='paragraph'><span class='bold'>Hello</span> world</div>"); // -> { type: 'paragraph', content: [...] }
```

For serialization, you can override the default serializers for nodes and marks. Serializers need to return a ProseMirror [DOMOutputSpec](https://prosemirror.net/docs/ref/#model.DOMOutputSpec):

```ts
const serializer = new RteHtmlSerializer(config, {
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
	foreignHtmlParser: new RteHtmlParser(config, {
		/* ... */
	}),
	foreignHtmlSerializer: new RteHtmlSerializer(config, {
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
getDocument(): RteDocument;
```

### replaceSelection

```ts
/**
 * Replaces the current selection with the given content. If no text is selected, this inserts the content at the cursor position.
 */
replaceSelection(
	content: RteFragment,
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
/**
 * Replaces the entire document with the given new document.
 * Unlike reset, this preserves the rest of the editor state. The undo history is preserved, so the user can undo the replacement.
 */
replaceDocument(
	newDocument: RteDocument,
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
reset(initialDocument?: RteDocument): void;
```

```html preview
<vwc-rich-text-editor style="block-size: 150px"></vwc-rich-text-editor>
<vwc-button id="replaceSelection" label="instance.replaceSelection(...)"></vwc-button>
<vwc-button id="replaceDocument" label="instance.replaceDocument(...)"></vwc-button>
<vwc-button id="reset" label="instance.reset(...)"></vwc-button>

<h3>onChange:</h3>
<output style="display: block; block-size: 300px"><pre id="output"></pre></output>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const output = document.querySelector('#output');
		const config = new RteConfig([new RteBase(), new RteToolbarFeature()]);
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
				content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Replaced document content' }] }],
			});
		});

		document.querySelector('#reset').addEventListener('click', () => {
			instance.reset({
				type: 'doc',
				content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Reset content' }] }],
			});
		});
	});
</script>
```

## feature

Some features expose a run-time API that can be accessed via the `feature` method. See the documentation of each feature for details.

```ts
instance.feature(RteToolbarFeature).hidden = true;
```

## Features

The Base feature is required for the editor to work. All other features are optional and can be combined as needed.

### RteBase

Provides basic editing functionality, undo/redo functionality and enables basic text blocks. By default, only the `paragraph` block is enabled.

**Configuration options:**

- `heading1?: boolean`: Add the `heading1` (`h1`) node. Defaults to false.
- `heading2?: boolean`: Add the `heading2` (`h2`) node. Defaults to false.
- `heading3?: boolean`: Add the `heading3` (`h3`) node. Defaults to false.
- `paragraph?: boolean`: Add the `paragraph` (`<p>`) node. Defaults to true.

**Keyboard shortcuts:**

- **Undo**: <kbd>Ctrl</kbd> + <kbd>Z</kbd> / <kbd>Cmd</kbd> + <kbd>Z</kbd>
- **Redo**: <kbd>Ctrl</kbd> + <kbd>Y</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd>
- **Convert to Paragraph**: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>0</kbd> / <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>0</kbd>
- **Convert to Heading Level &lt;X&gt;**: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>&lt;X&gt;</kbd> / <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>&lt;X&gt;</kbd>

<rte-schema>
	<rte-schema-node name="doc">
		<rte-schema-content>block+</rte-schema-content>
	</rte-schema-node>
	<rte-schema-node name="heading1">
		<rte-schema-group>block</rte-schema-group>
		<rte-schema-attrs>
			<rte-schema-textblock-attrs></rte-schema-textblock-attrs>
		</rte-schema-attrs>
		<rte-schema-content>inline*</rte-schema-content>
	</rte-schema-node>
<rte-schema-node name="heading2">
		<rte-schema-group>block</rte-schema-group>
		<rte-schema-attrs>
			<rte-schema-textblock-attrs></rte-schema-textblock-attrs>
		</rte-schema-attrs>
		<rte-schema-content>inline*</rte-schema-content>
	</rte-schema-node>
<rte-schema-node name="heading3">
		<rte-schema-group>block</rte-schema-group>
		<rte-schema-attrs>
			<rte-schema-textblock-attrs></rte-schema-textblock-attrs>
		</rte-schema-attrs>
		<rte-schema-content>inline*</rte-schema-content>
	</rte-schema-node>
<rte-schema-node name="paragraph">
		<rte-schema-group>block</rte-schema-group>
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
		const config = new RteConfig([
			new RteBase({
				heading1: true,
				heading2: true,
				heading3: true,
			}),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'heading1',
						content: [{ type: 'text', text: 'Heading 1' }],
					},
					{
						type: 'heading2',
						content: [{ type: 'text', text: 'Heading 2' }],
					},
					{
						type: 'heading3',
						content: [{ type: 'text', text: 'Heading 3' }],
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

### RteToolbarFeature

Adds the toolbar to the editor. Features automatically add their controls to the toolbar.

**Configuration options:**

- `popupDirection?: 'inward' | 'outward'`: Whether tooltips and other popups prefer to be open towards or away from the main text-editing area. Defaults to 'inward'.

**Feature API:**

- `hidden: boolean`: Whether the toolbar is hidden.

```html preview
<vwc-button id="toggleToolbar" label="Toggle Toolbar" appearance="filled"></vwc-button>
<vwc-rich-text-editor style="block-size: 250px; margin-block-end: 250px;"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([new RteBase(), new RteToolbarFeature()]);
		const instance = config.instantiateEditor();
		rteComponent.instance = instance;

		const toolbar = instance.feature(RteToolbarFeature);
		document.querySelector('#toggleToolbar').addEventListener('click', () => {
			toolbar.hidden = !toolbar.hidden;
		});
	});
</script>
```

### RtePlaceholderFeature

Adds placeholder text when the editor is empty. The placeholder is affected by the current text block and font size.

**Example usage:**

```ts
new RtePlaceholderFeature({ text: 'Start typing here...' });
```

**Configuration options:**

- `text: string` (required): The placeholder text to display when the editor is empty.

```html preview
<vwc-rich-text-editor style="block-size: 150px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([
			new RteBase({
				heading1: true,
				heading2: true,
				heading3: true,
			}),
			new RteToolbarFeature(),
			new RtePlaceholderFeature({ text: 'Start typing here...' }),
			new RteTextBlockPickerFeature({
				options: [
					{ node: 'heading1', label: 'Heading 1' },
					{ node: 'heading2', label: 'Heading 2' },
					{ node: 'heading3', label: 'Heading 3' },
					{ node: 'paragraph', label: 'Paragraph' },
				],
			}),
			new RteFontSizePickerFeature({
				options: [
					{ size: '24px', label: 'Extra Large' },
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
		]);
		rteComponent.instance = config.instantiateEditor();
	});
</script>
```

### RteHardBreakFeature

Allows inserting hard line breaks (`<br>`).

**Keyboard shortcuts:**

- **Insert Hard Break**: <kbd>Shift</kbd> + <kbd>Enter</kbd>

<rte-schema>
	<rte-schema-node name="hardBreak">
		<rte-schema-group>inline</rte-schema-group>
	</rte-schema-node>
</rte-schema>

```html preview
<vwc-rich-text-editor style="block-size: 250px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([
			new RteBase({
				heading1: true,
			}),
			new RteHardBreakFeature(),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'heading1',
						content: [{ type: 'text', text: 'Heading' }, { type: 'hardBreak' }, { type: 'text', text: 'With Hard Break' }],
					},
					{
						type: 'paragraph',
						content: [{ type: 'text', text: 'Press Shift+Enter for a hard break.' }, { type: 'hardBreak' }, { type: 'text', text: 'This is after the hard break.' }],
					},
				],
			},
		});
	});
</script>
```

### RteTextBlockPickerFeature

Provides a text block picker in the toolbar to change the current text block or range of selected blocks.

**Example usage:**

```ts
new RteTextBlockPickerFeature({
	options: [
		{ node: 'heading1', label: 'Heading 1' },
		{ node: 'heading2', label: 'Heading 2' },
		{ node: 'heading3', label: 'Heading 3' },
		{ node: 'paragraph', label: 'Paragraph' },
	],
});
```

**Configuration options:**

- `options: TextBlockOption[]`: The options to show in the text block picker.

`TextBlockOption`:

- `node: string` (required): Name of the block node.
- `label: string` (required): Label to show in the picker.

```html preview
<vwc-rich-text-editor style="block-size: 250px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([
			new RteBase({
				heading1: true,
				heading2: true,
				heading3: true,
			}),
			new RteToolbarFeature(),
			new RteTextBlockPickerFeature({
				options: [
					{ node: 'heading1', label: 'Heading 1' },
					{ node: 'heading2', label: 'Heading 2' },
					{ node: 'heading3', label: 'Heading 3' },
					{ node: 'paragraph', label: 'Paragraph' },
				],
			}),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'heading1',
						content: [{ type: 'text', text: 'Heading 1' }],
					},
					{
						type: 'heading2',
						content: [{ type: 'text', text: 'Heading 2' }],
					},
					{
						type: 'heading3',
						content: [{ type: 'text', text: 'Heading 3' }],
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

### RteFontSizePickerFeature

Adds a font size picker to the toolbar to change the font size of the selected text.

**Example usage:**

```ts
new RteFontSizeFeature({
	options: [
		{ size: '24px', label: 'Extra Large' },
		{ size: '18px', label: 'Large' },
		{ size: '14px', label: 'Normal' },
		{ size: '12px', label: 'Small' },
	],
	onBlocks: [{ node: 'heading1' }, { node: 'heading2' }, { node: 'paragraph', defaultSize: '14px' }],
});
```

**Configuration options:**

- `options: FontSizeOption[]` (required): The available font sizes from largest to smallest. Note that different font sizes can occur in the document when external HTML is pasted / dragged in.
- `onBlocks?: FontSizeOnBlock[]` (required): Which blocks the font sizes can be applied to. If not provided, the mark can be applied on all blocks.

`FontSizeOption`:

- `size: string` (required): CSS font-size value (e.g., `12px`, `1.5em`, `var(--font-size-large)`).
- `label: string` (required): Label for the font size option shown in the toolbar.

`FontSizeOnBlock`:

- `node: string` (required): Name of the block node.
- `defaultSize?: string`: Which option is selected by default on this block. If not provided, no option is selected. When font size changes from a different value back to the default, the editor will remove the mark.

**Keyboard shortcuts:**

- **Increase Font Size**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd>
- **Decrease Font Size**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>,</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>,</kbd>

<rte-schema>
	<rte-schema-mark name="fontSize">
		<rte-schema-attrs>
			<rte-schema-attr name="size" type="string" required description="CSS font-size value"></rte-schema-attr>
		</rte-schema-attrs>
	</rte-schema-mark>
</rte-schema>

**Known issues:**

- Cursor size does not adjust correctly when the cursor is in the middle of text.

```html preview
<vwc-rich-text-editor></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([
			new RteBase({
				heading1: true,
				heading2: true,
			}),
			new RteToolbarFeature(),
			new RteTextBlockPickerFeature({
				options: [
					{ node: 'heading1', label: 'Heading 1' },
					{ node: 'heading2', label: 'Heading 2' },
					{ node: 'paragraph', label: 'Paragraph' },
				],
			}),
			new RteFontSizePickerFeature({
				options: [
					{ size: '24px', label: 'Extra Large' },
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
				onBlocks: [{ node: 'heading2' }, { node: 'paragraph', defaultSize: '14px' }],
			}),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'heading1',
						content: [{ type: 'text', text: 'Text size cannot be change on this heading' }],
					},
					{
						type: 'heading2',
						content: [{ type: 'text', text: 'Text size has no default value on this heading' }],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'small ',
								marks: [{ type: 'fontSize', attrs: { size: '12px' } }],
							},
							{ type: 'text', text: 'normal ' },
							{
								type: 'text',
								text: 'large ',
								marks: [{ type: 'fontSize', attrs: { size: '18px' } }],
							},
							{
								type: 'text',
								text: 'extra large',
								marks: [{ type: 'fontSize', attrs: { size: '24px' } }],
							},
						],
					},
				],
			},
		});
	});
</script>
```

### RteTextColorPickerFeature

Adds a text color picker to the toolbar to change the color of the selected text.

This feature adds a `text-color-picker` slot in which you need to place a [Simple Color Picker](/components/simple-color-picker).

**Example usage:**

```ts
new RteTextColorPickerFeature({
	onBlocks: [
		{ node: 'heading2' },
		{ node: 'paragraph', defaultColor: '#000000' },
	],
}),
```

**Configuration options:**

- `onBlocks?: TextColorOnBlock[]`: Which blocks the text color can be applied to. If not provided, the mark can be applied on all blocks.

`TextColorOnBlock`:

- `node: string` (required): Name of the block node.
- `defaultColor?: string`: Which color is selected by default on this block. If not provided, no color is selected. When color changes from a different value back to the default, the editor will remove the mark.

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
		const config = new RteConfig([
			new RteBase({
				heading1: true,
				heading2: true,
				heading3: true,
			}),
			new RteToolbarFeature(),
			new RteTextBlockPickerFeature({
				options: [
					{ node: 'heading1', label: 'Heading 1' },
					{ node: 'heading2', label: 'Heading 2' },
					{ node: 'heading3', label: 'Heading 3' },
					{ node: 'paragraph', label: 'Paragraph' },
				],
			}),
			new RteTextColorPickerFeature({
				onBlocks: [{ node: 'heading2' }, { node: 'paragraph', defaultColor: '#000000' }],
			}),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'heading1',
						content: [{ type: 'text', text: 'Text color cannot be changed on this heading' }],
					},
					{
						type: 'heading2',
						content: [{ type: 'text', text: 'Text color has no default on this heading' }],
					},
					{
						type: 'paragraph',
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

The `RteBoldFeature`, `RteItalicFeature`, `RteUnderlineFeature`, `RteStrikethroughFeature`, and `RteMonospaceFeature` add the corresponding text styling options to the editor.

**Configuration options:**

- `onBlocks?: Array<{ node: string }>`: The blocks on which the formatting can be applied. If not provided, the mark can be applied on all blocks.

**Keyboard shortcuts:**

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
		const config = new RteConfig([
			new RteBase({
				heading1: true,
			}),
			new RteToolbarFeature(),
			new RteTextBlockPickerFeature({
				options: [
					{ node: 'heading1', label: 'Heading 1' },
					{ node: 'paragraph', label: 'Paragraph' },
				],
			}),
			new RteBoldFeature(),
			new RteItalicFeature(),
			new RteUnderlineFeature(),
			new RteStrikethroughFeature(),
			new RteMonospaceFeature(),
		]);
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

### RteListFeature

Adds support for bullet and numbered lists.

**Configuration options:**

- `bulletList?: boolean`: Enables bullet lists. Defaults to false.
- `numberedList?: boolean`: Enables numbered lists. Defaults to false.

You must enable at least one list type.

**Keyboard shortcuts:**

- **Toggle bullet list**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>8</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>8</kbd>
- **Toggle numbered list**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>7</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>7</kbd>
- **Move to sub list**: <kbd>Tab</kbd>
- **Move out of list**: <kbd>Shift</kbd> + <kbd>Tab</kbd>
- **New list item**: <kbd>Enter</kbd>
- **Exit list**: <kbd>Enter</kbd> on empty list item

<rte-schema>
	<rte-schema-node name="bulletList">
		<rte-schema-group>block list</rte-schema-group>
		<rte-schema-content>(listItem | list)+</rte-schema-content>
	</rte-schema-node>
	<rte-schema-node name="numberedList">
		<rte-schema-group>block list</rte-schema-group>
		<rte-schema-content>(listItem | list)+</rte-schema-content>
	</rte-schema-node>
	<rte-schema-node name="listItem">
		<rte-schema-attrs>
			<rte-schema-textblock-attrs></rte-schema-textblock-attrs>
		</rte-schema-attrs>
		<rte-schema-content>inline*</rte-schema-content>
	</rte-schema-node>
</rte-schema>

```html preview
<vwc-rich-text-editor></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([
			new RteBase(),
			new RteToolbarFeature(),
			new RteListFeature({
				bulletList: true,
				numberedList: true,
			}),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'bulletList',
						content: [
							{
								type: 'listItem',
								content: [{ type: 'text', text: 'Bullet list' }],
							},
							{
								type: 'bulletList',
								content: [
									{
										type: 'listItem',
										content: [{ type: 'text', text: 'Item 1' }],
									},
									{
										type: 'listItem',
										content: [{ type: 'text', text: 'Item 2' }],
									},
									{
										type: 'listItem',
										content: [{ type: 'text', text: 'Item 3' }],
									},
								],
							},
							{
								type: 'listItem',
								content: [{ type: 'text', text: 'Numbered list' }],
							},
							{
								type: 'numberedList',
								content: [
									{
										type: 'listItem',
										content: [{ type: 'text', text: 'Item 1' }],
									},
									{
										type: 'listItem',
										content: [{ type: 'text', text: 'Item 2' }],
									},
									{
										type: 'listItem',
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

### RteAlignmentFeature

Adds the ability to change the alignment of text blocks.

**Keyboard shortcuts:**

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

```html preview
<vwc-rich-text-editor style="block-size: 200px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([
			new RteBase({
				heading1: true,
				heading2: true,
			}),
			new RteToolbarFeature(),
			new RteTextBlockPickerFeature({
				options: [
					{ node: 'heading1', label: 'Heading 1' },
					{ node: 'heading2', label: 'Heading 2' },
					{ node: 'paragraph', label: 'Paragraph' },
				],
			}),
			new RteAlignmentFeature(),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'heading1',
						attrs: { textAlign: 'center' },
						content: [
							{
								type: 'text',
								text: 'Centered Heading 1',
							},
						],
					},
					{
						type: 'heading2',
						attrs: { textAlign: 'left' },
						content: [
							{
								type: 'text',
								text: 'Left-aligned Heading 2',
							},
						],
					},
					{
						type: 'paragraph',
						attrs: { textAlign: 'right' },
						content: [
							{
								type: 'text',
								text: 'Right-aligned paragraph.',
							},
						],
					},
				],
			},
		});
	});
</script>
```

### RteLinkFeature

Adds the ability to insert links. This features requires the `RteToolbarFeature`.

**Keyboard shortcuts:**

- **Insert link**: <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd>
- Pressing Space or Enter after typing or pasting a URL will automatically convert it into a link.

<rte-schema>
	<rte-schema-mark name="link">
		<rte-schema-attrs>
			<rte-schema-attr name="href" type="string" required description="The URL the link points to."></rte-schema-attr>
		</rte-schema-attrs>
	</rte-schema-mark>
</rte-schema>

```html preview
<vwc-rich-text-editor style="block-size: 200px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([new RteBase(), new RteToolbarFeature(), new RteLinkFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'paragraph',
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

### RteInlineImageFeature

Adds support for inline images. This feature does not provide any UI for adding images by itself, however the user can paste HTML content containing images into the editor.

<rte-schema>
	<rte-schema-node name="inlineImage">
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

		const config = new RteConfig([new RteBase(), new RteToolbarFeature(), new RteInlineImageFeature()]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [
							{ type: 'text', text: 'Image: ' },
							{
								type: 'inlineImage',
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

However, storing `src` URL in the document is not always ideal, since it may need to change or may not be known at the time the image is inserted.

Instead, you can use a **logical URL** like `attachment://12345` as `imageUrl` and resolve it to a `src` URL by providing mapping functions in the configuration:

**resolveUrl**

Type: `resolveUrl: (imageUrl: string) => ResolvedUrl | AsyncGenerator<ResolvedUrl, ResolvedUrl>` (optional)

The `resolveUrl` function is called whenever the editor needs to display an image. It receives the `imageUrl` value for the image and decides how to display this image.

Possible `ResolvedUrl` values:

- `string`: Displays an image with this `src` URL.
- `null`: Displays nothing.
- `{ type: 'placeholder', create?: (slotName: string) => (() => unknown) | undefined }`: Displays arbitrary slotted placeholder content. See [Rendering Placeholders](#rendering-placeholders) for details.

`resolveUrl` can also be an async generator of resolved values. This allows you to resolve the url asynchronously or update the displayed content over time.

Keep in mind that users can duplicate images inside the editor, so `resolveUrl` may be called multiple times for the same `imageUrl`.

Here is an example that resolves `attachment://<id>` URLs with placeholders for loading and error states:

```ts
new RteInlineImageFeature({
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

Called when the document is serialized to HTML. Note that this occurs not only when you use a `HtmlSerializer`, but also when content is copied or dragged out of the editor.

For each image, it is called with the `imageUrl` and should return the `src` value of `<img>` element. If it returns `null`, the image is omitted from HTML output.

**parseUrlFromHtml**

Type: `parseUrlFromHtml: (src: string) => string | null}` (optional)

Called when HTML is parsed. Note that this occurs not only when you use a `HtmlParser`, but also when HTML content is pasted or dragged into the editor.

For each HTML `<img>` tag, it is called with the `src` attribute and should return the `imageUrl`. If it returns `null`, the image is discarded.

<vwc-note connotation="information" headline="When rendering in Rich Text View">
	<vwc-icon slot="icon" name="info-line" label="Information:"></vwc-icon>

The Rich Text View component will render images like serialized HTML. It will not invoke `resolveUrl`.

</vwc-note>

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
new RteInlineImageFeature({
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

Use the `inline-image-placeholder` scoped slot to render the placeholder content. The slot receives `{ url: string }` as props, containing the image URL.

```ts
new RteInlineImageFeature({
	resolveUrl: (url: string) => ({
		type: 'placeholder',
	}),
});
```

```html
<VRichTextEditor :instance="instance">
	<template #inline-image-placeholder="{ url }">
		<MyImagePlaceholder :url="url" />
	</template>
</VRichTextEditor>
```

</vwc-tab-panel>
</vwc-tabs>

#### Determining Used Images

You may want to know which images are still in use or detect when an image is deleted, for example to manage corresponding attachments.

In general, you cannot know when it is safe to remove the attachment since the user could restore the image from clipboard or history at a later time.

You can inspect the document to find referenced images when saving or submitting it, after which the editor should no longer be used.

### RteFileHandlerFeature

Allows you to handle files dropped or pasted into the editor.

Configuration options:

- `handleFiles: (files: File[]) => RteFragment | Promise<RteFragment> | null` (required)

Called when files are dropped or pasted into the editor. When pasting file, the returned fragment replaces the current selection. When dropping files, it is inserted at the drop location.

If it returns `null`, the files are ignored and the current selection remains unchanged.

The function is only called for files inserted into the editor content area. Files dropped or pasted into other areas (e.g. menu bar or content in the `editor-end` slot) are not handled.

### RteDropHandlerFeature

Allows you to customize drag and drop behavior over the editor viewport.

**Configuration options:**

- `onViewportDragOver: (event: DragEvent) => boolean` (optional)

Called whenever the user drags content over the editor viewport. If it returns `true`, the editor will ignore this content. No drop cursor will be displayed and `handleFiles` will not be called.
Note that users can drag content around inside the editor, and HTML or text content in from outside the editor. This will also be disabled when returning `true`, so you should ensure that you only return `true` for content you want to handle, e.g. files.

Remember to call `event.preventDefault()` if you want to allow dropping.

- `onViewportDrop: (event: DragEvent) => void` (optional)

Called whenever the user drops content over the editor viewport.

Remember to call `event.preventDefault()` to prevent the default browser behavior.

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

		const config = new RteConfig([
			new RteBase(),
			new RteToolbarFeature(),
			new RteInlineImageFeature(),
			new RteDropHandlerFeature({
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

### RteToolbarButtonFeature

Adds a button to the toolbar that performs an action when clicked.

#### Configuration

The `RteToolbarButtonFeature` constructor takes two arguments:

1. `id` (string, required): A unique identifier for this toolbar button instance.
2. `options` (object, required): Configuration options:

- `label: string` (required) - The aria-label for the button.
- `icon: string` (required) - The icon name for the button.
- `action: object` (required) - The action to perform when the button is clicked.
- `order?: number` - The order of the button in the toolbar. Lower numbers appear first. Buttons with the same order are sorted alphabetically by feature id.

**Action types:**

- `{ type: 'insert-text', text: string }` - Inserts the specified text at the cursor position.

```ts
new RteToolbarButtonFeature('mention', {
	label: 'Mention user',
	icon: 'user-line',
	action: { type: 'insert-text', text: '@' },
});
```

```html preview
<vwc-rich-text-editor></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([
			new RteBase(),
			new RteToolbarFeature(),
			new RteToolbarButtonFeature('greeting', {
				label: 'Insert greeting',
				icon: 'waving-line',
				action: { type: 'insert-text', text: 'Hello, how are you?' },
			}),
		]);
		rteComponent.instance = config.instantiateEditor();
	});
</script>
```

### RteAtomFeature

Adds support for custom inline atom nodes. Atoms are non-editable inline elements that can be used for things like variables, mentions or tags.

#### Usage

You can create multiple `RteAtomFeature` instances with different atom names to support different atom types.

Atoms have no content and a single required attribute `value`:

```js
new RteAtomFeature('mention');

const mention = { type: 'mention', attrs: { value: 'John' } };
```

By default, the atom value is rendered as plain text. Like other nodes, you can style atoms using CSS parts. See [Styling](#styling) for more information.

```html preview
<vwc-rich-text-editor></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([new RteBase(), new RteAtomFeature('mention')]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [
							{ type: 'text', text: 'Hello ' },
							{ type: 'mention', attrs: { value: 'John' } },
						],
					},
				],
			},
		});
	});
</script>
```

You can customize the rendered content by providing the `resolveValue` configuration option:

- `resolveValue?: (value: string) => string | null | AsyncGenerator<string, string>`

```ts
new RteAtomFeature('tag', {
	resolveValue: (value) => `#${value}`,
});
```

`resolveValue` can also return an async generator, which allows you to fetch the result asynchronously or update it over time:

```ts
new RteAtomFeature('mention', {
	resolveValue: async function* (userId) {
		yield 'Loading...';
		const user = await fetchUser(userId);
		return `@${user.name}`;
	},
});

const mention = { type: 'mention', attrs: { value: '1' } };
```

#### HTML Serialization

Atoms are serialized to HTML as `<span>` elements with `data-atom-type` and `data-value` attributes:

```html
<span data-atom-type="mention" data-value="john">john</span>
```

You can customize the text of the span by providing the `serializeValueToHtml` configuration option:

- `serializeValueToHtml?: (value: string) => string | null`: Customize how the atom value is serialized to HTML. If it returns `null`, the atom is omitted from HTML output.

<rte-schema>
	<rte-schema-node name="<atomName>">
		<rte-schema-group>inline</rte-schema-group>
		<rte-schema-attrs>
			<rte-schema-attr name="value" type="string" required></rte-schema-attr>
		</rte-schema-attrs>
	</rte-schema-node>
</rte-schema>

```html preview
<style>
	::part(node--mention) {
		background-color: var(--vvd-color-cta-100);
		padding: 0 4px;
		border-radius: 4px;
	}
	::part(node--tag) {
		background-color: var(--vvd-color-success-100);
		padding: 0 4px;
		border-radius: 4px;
	}
</style>
<vwc-rich-text-editor></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const fetchUser = async (id) => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve({ id, name: 'John' });
				}, 2000);
			});
		};

		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([
			new RteBase(),
			new RteAtomFeature('tag', {
				resolveValue: (value) => `#${value}`,
			}),
			new RteAtomFeature('mention', {
				resolveValue: async function* (userId) {
					yield 'Loading...';
					const user = await fetchUser(userId);
					return `@${user.name}`;
				},
			}),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [
							{ type: 'text', text: 'Hello ' },
							{ type: 'mention', attrs: { value: '1' } },
							{ type: 'text', text: ", let's work on " },
							{ type: 'tag', attrs: { value: 'new-project' } },
						],
					},
				],
			},
		});
	});
</script>
```

### RteInputRuleFeature

Enables text replacement rules that automatically transform text as you type. Use this for features like converting text patterns to emojis, hashtags, or other content.

#### Configuration

The `RteInputRuleFeature` constructor takes two arguments:

1. `id` (string, required): A unique identifier for this input rule instance.
2. `options` (object, required): Configuration options:

- `pattern: RegExp` (required) - The regex to match against text before the cursor. Do not add a trailing `$`.
- `handler: (match: string[]) => RteFragment | null` (required) - Called when the pattern matches. Return an `RteFragment` to replace the match, or `null` to skip.
- `matchAfterWhitespace?: boolean` - When `true`, the rule triggers only on space or Enter after the match.

```html preview
<style>
	::part(node--tag) {
		background-color: var(--vvd-color-success-100);
		padding: 0 4px;
		border-radius: 4px;
	}
</style>
<vwc-rich-text-editor></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const emojiMap = {
			':)': '\u{1F642}',
			':D': '\u{1F604}',
			':(': '\u{1F641}',
			';)': '\u{1F609}',
			':P': '\u{1F61B}',
			'<3': '\u{2764}\u{FE0F}',
		};

		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([
			new RteBase(),
			new RteToolbarFeature(),
			new RteInputRuleFeature('emoji', {
				pattern: /:\)|:D|:\(|;\)|:P|<3/,
				handler: (match) => {
					const emoji = emojiMap[match[0]];
					if (!emoji) return null;
					return [{ type: 'text', text: emoji }];
				},
			}),
			new RteAtomFeature('tag', {
				resolveValue: (value) => `#${value}`,
			}),
			new RteInputRuleFeature('tag', {
				pattern: /#(\w+)/,
				matchAfterWhitespace: true,
				handler: (match) => [{ type: 'tag', attrs: { value: match[1] } }],
			}),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [{ type: 'text', text: 'Type :) or :D or <3 to see emoji conversion.' }],
					},
					{
						type: 'paragraph',
						content: [
							{ type: 'text', text: 'Type #topic and press space or enter to create a ' },
							{ type: 'tag', attrs: { value: 'tag' } },
							{ type: 'text', text: '.' },
						],
					},
				],
			},
		});
	});
</script>
```

### RteSuggestFeature

Enables regex-based suggestions for implementing features like variables (`{name}`), mentions (`@user`), tags (`#topic`) or emojis (`:smile:`). The feature watches for text patterns before the cursor and can either auto-replace them or show a suggestions popover.

This feature works well together with `RteAtomFeature` - use `RteSuggestFeature` to trigger the suggestion UI and insert atoms into the document.

#### Configuration

The `RteSuggestFeature` constructor takes two arguments:

1. `id` (string, required): A unique identifier for this suggest feature instance.
2. `options` (object, required): Configuration options:

- `pattern: RegExp` (required) - The regex to match against text before the cursor. The regex should end with `$` to match at cursor position.
- `load: (match: string[]) => Suggestion[] | Promise<Suggestion[]>` (required) - Called when regex matches. Receives the full match array including capture groups. The returned suggestions are displayed in a popover. If a promise is returned, a loading indicator is shown.
- `select: (suggestion: Suggestion) => RteFragment` (required) - Called when a suggestion is selected. The matched text is replaced by the returned `RteFragment`.

The `Suggestion` type has the following properties:

```ts
interface Suggestion {
	text: string;
	textSecondary?: string;
	data?: unknown;
}
```

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

You can customize the empty state message when no suggestions are found by providing the `<id>-suggestions-empty` slot:

```html
<vwc-rich-text-editor>
	<div slot="mention-suggestions-empty">No users found</div>
</vwc-rich-text-editor>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

You can customize the empty state message when no suggestions are found with the `suggestions-empty` scoped slot. The slot receives `{ id: string }` as props, where `id` is the feature ID (e.g., `"mention"`):

```html
<VRichTextEditor :instance="instance">
	<template #suggestions-empty="{ id }">
		<span v-if="id === 'mention'">No users found</span>
		<span v-else-if="id === 'emoji'">No emojis found</span>
	</template>
</VRichTextEditor>
```

</vwc-tab-panel>
</vwc-tabs>

**Keyboard shortcuts:**

- **Navigate between suggestions**: <kbd>Arrow Up</kbd> / <kbd>Arrow Down</kbd>
- **Select the highlighted suggestion**: <kbd>Enter</kbd>
- **Close suggestions popover**: <kbd>Escape</kbd>

```html preview
<style>
	::part(node--mention) {
		background-color: var(--vvd-color-cta-100);
		padding: 0 4px;
		border-radius: 4px;
	}
</style>
<vwc-rich-text-editor style="block-size: 500px">
	<span slot="mention-suggestions-empty">No users found. Try "Alice", "Bob", or "Carol".</span>
</vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const emojis = [
			{ shortcode: 'smile', emoji: '\u{1F642}' },
			{ shortcode: 'grin', emoji: '\u{1F604}' },
			{ shortcode: 'sad', emoji: '\u{1F641}' },
			{ shortcode: 'wink', emoji: '\u{1F609}' },
			{ shortcode: 'heart', emoji: '\u{2764}\u{FE0F}' },
			{ shortcode: 'thumbsup', emoji: '\u{1F44D}' },
			{ shortcode: 'fire', emoji: '\u{1F525}' },
			{ shortcode: 'rocket', emoji: '\u{1F680}' },
		];

		const users = [
			{ id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
			{ id: '2', name: 'Bob Smith', email: 'bob@example.com' },
			{ id: '3', name: 'Carol White', email: 'carol@example.com' },
		];

		const fetchUsers = async (query) => {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 500));
			const searchTerm = query.toLowerCase();
			return users
				.filter((u) => u.name.toLowerCase().includes(searchTerm) || u.email.toLowerCase().includes(searchTerm))
				.map((u) => ({
					text: u.name,
					textSecondary: u.email,
					data: u,
				}));
		};

		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RteConfig([
			new RteBase(),
			new RteToolbarFeature(),
			new RteSuggestFeature('emoji', {
				pattern: /:(\w*)$/,
				load: (match) => {
					const query = match[1].toLowerCase();
					return emojis
						.filter((e) => e.shortcode.includes(query))
						.map((e) => ({
							text: `${e.emoji} :${e.shortcode}:`,
							data: e,
						}));
				},
				select: (suggestion) => [{ type: 'text', text: suggestion.data.emoji }],
			}),
			new RteToolbarButtonFeature('emoji', {
				label: 'Insert emoji',
				icon: 'emoji-line',
				action: { type: 'insert-text', text: ':' },
			}),
			new RteAtomFeature('mention', {
				resolveValue: (userId) => {
					const user = users.find((u) => u.id === userId);
					return user ? `@${user.name}` : `@Unknown`;
				},
			}),
			new RteSuggestFeature('mention', {
				pattern: /@(\w*)$/,
				load: (match) => fetchUsers(match[1]),
				select: (suggestion) => [{ type: 'mention', attrs: { value: suggestion.data.id } }],
			}),
			new RteToolbarButtonFeature('mention', {
				label: 'Mention user',
				icon: 'user-line',
				action: { type: 'insert-text', text: '@' },
			}),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [{ type: 'text', text: 'Type :smile or :heart to insert emojis.' }],
					},
					{
						type: 'paragraph',
						content: [{ type: 'text', text: 'Type @ to mention a user.' }],
					},
				],
			},
		});
	});
</script>
```

## Styling

The basic text blocks `heading-<level>` and `paragraph` are exposed as a shadow DOM part, which allows you to customize its styling using CSS.

This applies to both the Rich Text Editor and Rich Text View components, so styling can be shared.

```html preview
<style>
	::part(node--heading1) {
		color: var(--vvd-color-neutral-700);
	}

	::part(node--heading2) {
		color: var(--vvd-color-neutral-500);
	}

	::part(node--paragraph) {
		font: var(--vvd-typography-base-extended);
	}
</style>

<vwc-rich-text-editor></vwc-rich-text-editor>
<vwc-divider style="margin-block: 24px"></vwc-divider>
<vwc-rich-text-view style="display: block; background: var(--vvd-color-canvas); padding: 8px 16px;"></vwc-rich-text-view>

<script>
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
			new RteFontSizePickerFeature({
				options: [
					{ size: '24px', label: 'Extra Large' },
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
				onBlocks: [
					{ node: 'paragraph', defaultSize: '18px' }, // Defaults to Large now
				],
			}),
		]);
		rteComponent.instance = config.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'heading1',
						content: [{ type: 'text', text: 'Title' }],
					},
					{
						type: 'heading2',
						content: [{ type: 'text', text: 'Subtitle' }],
					},
					{
						type: 'paragraph',
						content: [{ type: 'text', text: 'Body.' }],
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

		const config = new RteConfig([new RteBase(), new RteToolbarFeature()]);
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

		const config = new RteConfig([new RteBase(), new RteToolbarFeature()]);
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

		const config = new RteConfig([new RteBase(), new RteToolbarFeature()]);
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

		const config = new RteConfig([new RteBase(), new RteToolbarFeature()]);
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

### Rich Text Editor

#### Properties

<div class="table-wrapper">

| Name         | Type          | Description                                                                             |
| ------------ | ------------- | --------------------------------------------------------------------------------------- |
| **instance** | `RteInstance` | The editor instance created from the RteConfig. Without it, the editor will not render. |

</div>

### Rich Text View

#### Properties

<div class="table-wrapper">

| Name     | Type      | Description                                      |
| -------- | --------- | ------------------------------------------------ |
| **view** | `RteView` | The view to display, created from the RteConfig. |

</div>
