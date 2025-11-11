## Usage

To use the Rich Text Editor, you first need to create a configuration with the features you want to include.

```js
import { RTEConfig, RTECore, RTEFreeformStructure, RTEToolbarFeature, RTEBoldFeature } from '@vonage/vivid';

const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature(), new RTEBoldFeature()]);
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
import { registerRichTextEditor, RTEConfig, RTECore, RTEFreeformStructure, RTEToolbarFeature, RTEBoldFeature } from '@vonage/vivid';

registerRichTextEditor('your-prefix');

const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature(), new RTEBoldFeature()]);

const instance = config.instantiateEditor([
	{ type: 'text', text: 'Hello' },
	{ type: 'text', text: ' world!', marks: [{ type: 'bold' }] },
]);
```

```html preview
<your-prefix-rich-text-editor></your-prefix-rich-text-editor>

<script type="module">
	import { registerRichTextEditor, RTEConfig, RTECore, RTEFreeformStructure, RTEToolbarFeature, RTEBoldFeature } from '@vonage/vivid';

	registerRichTextEditor('your-prefix');

	const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature(), new RTEBoldFeature()]);

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
import { RTEConfig, RTECore, RTEFreeformStructure, RTEToolbarFeature, RTEBoldFeature } from '@vonage/vivid';

const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature(), new RTEBoldFeature()]);

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

```html preview
<vwc-rich-text-editor style="block-size: 200px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature()]);
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
		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature(), new RTEFontSizeFeature()]);
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

### RTETextColorFeature

Adds support for different text colors.

This feature adds a `text-color-picker` slot in which you can place a [Simple Color Picker](/components/simple-color-picker).

Configuration options:

- `defaultColor: string` (required): The default color of unstyled text. The editor will not actually apply this color to any text, so you need to ensure that this matches the current CSS `color`.

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
		rteComponent.instance = config.instantiateEditor([
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
		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature(), new RTEBoldFeature(), new RTEItalicFeature(), new RTEUnderlineFeature(), new RTEStrikethroughFeature(), new RTEMonospaceFeature()]);
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

### RTEListFeature

Adds support for bullet and numbered lists.

Keyboard shortcuts:

- **Toggle bullet list**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>8</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>8</kbd>
- **Toggle numbered list**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>7</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>7</kbd>

```html preview
<vwc-rich-text-editor style="block-size: 250px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature(), new RTEListFeature()]);
		rteComponent.instance = config.instantiateEditor([
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

The alignment feature cannot be used with `RTETextBlockStructure`, since there are no text blocks to align.

</vwc-note>

```html preview
<vwc-rich-text-editor style="block-size: 200px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature(), new RTEAlignmentFeature()]);
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

### RTELinkFeature

Adds the ability to insert links.

```html preview
<vwc-rich-text-editor style="block-size: 250px"></vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const config = new RTEConfig([new RTECore(), new RTEFreeformStructure(), new RTEToolbarFeature(), new RTELinkFeature()]);
		rteComponent.instance = config.instantiateEditor([
			{
				type: 'text',
				text: 'Learn more on ',
			},
			{
				type: 'text',
				text: 'our website',
				marks: [{ type: 'link', attrs: { href: 'https://www.vonage.com' } }],
			},
		]);
	});
</script>
```

### RTEInlineImageFeature

Adds support for inline images. This feature does not provide any UI for adding images by itself, however the user can paste HTML content containing images into the editor.

```html preview
<vwc-rich-text-editor style="block-size: 500px"> </vwc-rich-text-editor>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const rteComponent = document.querySelector('vwc-rich-text-editor');

		const config = new RTEConfig([new RTECore(), new RTETextBlockStructure(), new RTEToolbarFeature(), new RTEInlineImageFeature()]);
		rteComponent.instance = config.instantiateEditor([
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
		]);
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
		rteComponent.instance = config.instantiateEditor([
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Drag files into the editor.' }],
			},
		]);
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
		rteComponent.instance = config.instantiateEditor(
			Array(10)
				.fill(null)
				.map((_, i) => ({
					type: 'paragraph',
					content: [{ type: 'text', text: `Paragraph ${i + 1}` }],
				}))
		);
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
		rteComponent.instance = config.instantiateEditor(
			Array(10)
				.fill(null)
				.map((_, i) => ({
					type: 'paragraph',
					content: [{ type: 'text', text: `Paragraph ${i + 1}` }],
				}))
		);
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
		rteComponent.instance = config.instantiateEditor(
			Array(10)
				.fill(null)
				.map((_, i) => ({
					type: 'paragraph',
					content: [{ type: 'text', text: `Paragraph ${i + 1}` }],
				}))
		);
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
		rteComponent.instance = config.instantiateEditor(
			Array(10)
				.fill(null)
				.map((_, i) => ({
					type: 'paragraph',
					content: [{ type: 'text', text: `Paragraph ${i + 1}` }],
				}))
		);

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
