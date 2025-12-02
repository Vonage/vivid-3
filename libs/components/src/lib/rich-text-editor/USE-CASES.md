## Attachments

This is an example of handling attachments and inline images in the rich text editor.

Functionality:

- Pasting images adds them as inline images, while pasting other files adds them as attachments.
- Dragging non-images over the editor shows a drop zone covering the entire editor area, which adds files as attachments.
- When dragging images over the editor, the drop zone is limited to the bottom and allows the choice of dragging them into the editor or adding them as attachments.
- Clicking the "Upload" button simulates uploading all inline images, showing a loading placeholder during upload and an upload error for every second image.

```html preview
<style>
	.drop-area {
		position: absolute;
		inset: 8px;

		background: color-mix(in srgb, var(--vvd-color-cta-100), transparent 10%);
		border: 1px dashed var(--vvd-color-cta-300);
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: center;

		color: var(--vvd-color-neutral-600);
	}
</style>

<vwc-rich-text-editor style="block-size: 600px">
	<div slot="editor-end" id="attachments-start"></div>
	<div slot="editor-end" id="attachments-bar" style="position: sticky; inset-inline: 0; inset-block-end: 0; padding-inline: var(--editor-padding-inline); background: var(--vvd-color-canvas);">
		<vwc-divider style="position: absolute; inset-block-end: 100%; inset-inline: var(--editor-padding-inline);"></vwc-divider>
		<div style="padding-block: var(--editor-padding-block); background: var(--vvd-color-canvas); display: flex; align-items: center; justify-content: space-between">
			<span style="font-weight: bold;">Attachments</span>
			<vwc-button id="scroll-button" aria-label="Scroll to bottom" appearance="ghost" size="super-condensed" style="transition: opacity 0.3s ease-in-out;">
				<vwc-icon slot="icon" name="chevron-circle-down-line"></vwc-icon>
			</vwc-button>
		</div>
	</div>
	<div slot="editor-end" id="attachments" style="position: sticky; inset-inline: 0; padding-inline: var(--editor-padding-inline); padding-block-end: var(--editor-padding-block); display: grid; grid-template-columns: 1fr 1fr; gap: 8px;"></div>
	<div slot="editor-end" id="drop-zone" style="display: none; position: fixed; inset-inline: 0; inset-block-end: 0;">
		<div class="drop-area">Drag & drop files here</div>
	</div>
	<vwc-simple-color-picker slot="text-color-picker" id="picker"></vwc-simple-color-picker>
</vwc-rich-text-editor>

<vwc-button id="upload" style="margin: 8px" appearance="filled" label="Upload"></vwc-button>

<style>
	.image-placeholder {
		block-size: 150px;
		inline-size: 150px;
		border: 1px dashed var(--vvd-color-neutral-400);
		background: var(--vvd-color-neutral-100);
		border-radius: 8px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		vertical-align: text-bottom;
	}
</style>
<template id="loading-template">
	<div class="image-placeholder">
		<vwc-progress-ring size="-4"></vwc-progress-ring>
	</div>
</template>

<style>
	.image-error {
		border: 1px dashed var(--vvd-color-neutral-400);
		border-radius: 8px;
		display: grid;
		row-gap: 8px;
		column-gap: 16px;
		padding: 12px;
		grid-template: 'icon title' 1fr 'icon message' 1fr / min-content 1fr;
	}

	.image-error-icon {
		grid-area: icon;
		color: var(--vvd-color-alert-700);
		background-color: var(--vvd-color-neutral-50);
		border-radius: 8px;
		padding: 8px;
		font-size: 24px;
		align-self: center;
		justify-self: center;
	}

	.image-error-title {
		grid-area: title;
		font-weight: 600;
		color: var(--vvd-color-alert-700);
		align-self: end;
	}

	.image-error-message {
		grid-area: message;
		color: var(--vvd-color-neutral-700);
		align-self: start;
	}
</style>
<template id="error-template">
	<div class="image-error">
		<div class="image-error-icon">
			<vwc-icon style="display: block" name="warning-line"></vwc-icon>
		</div>
		<div class="image-error-title" data-var="title"></div>
		<div class="image-error-message" data-var="message"></div>
	</div>
</template>

<style>
	.attached-file {
		border: 1px solid var(--vvd-color-neutral-200);
		border-radius: 8px;
		display: grid;
		gap: 4px;
		column-gap: 12px;
		padding: 12px;
		grid-template: 'icon name' 1fr 'icon size' 1fr / min-content 1fr;
	}

	.attached-file-icon {
		grid-area: icon;
		color: var(--vvd-color-neutral-600);
		background-color: var(--vvd-color-neutral-50);
		border-radius: 8px;
		padding: 12px;
		font-size: 16px;
		align-self: center;
		justify-self: center;
		line-height: 16px;
	}

	.attached-file-name {
		grid-area: name;
		font-size: 12px;
		line-height: 16px;
		font-weight: 600;
		color: var(--vvd-color-neutral-900);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		align-self: end;
	}

	.attached-file-size {
		grid-area: size;
		font-size: 12px;
		line-height: 16px;
		color: var(--vvd-color-neutral-700);
		align-self: start;
	}
</style>
<template id="attached-file">
	<div class="attached-file">
		<div class="attached-file-icon">
			<vwc-icon style="display: block" name="file-line"></vwc-icon>
		</div>
		<div class="attached-file-name" data-var="name"></div>
		<div class="attached-file-size" data-var="size"></div>
	</div>
</template>

<script>
	customElements.whenDefined('vwc-simple-color-picker').then(() => {
		const swatches = [
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
		const picker = document.getElementById('picker');
		picker.swatches = swatches;
	});

	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		// --- Utilities ---
		const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		const renderTemplate = (templateId, vars = {}) => {
			const instance = document.getElementById(templateId).content.cloneNode(true).firstElementChild;
			for (const [key, value] of Object.entries(vars)) {
				instance.querySelector(`[data-var="${key}"]`).textContent = value;
			}
			return instance;
		};
		// ---

		const isFileDrop = (event) => event.dataTransfer.types.includes('Files');
		const acceptedImageMimeTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'];

		const rteComponent = document.querySelector('vwc-rich-text-editor');
		const dropZone = document.querySelector('#drop-zone');
		const scrollButton = document.querySelector('#scroll-button');
		const attachmentsBarStart = document.querySelector('#attachments-start');
		const attachments = document.querySelector('#attachments');
		const uploadButton = document.querySelector('#upload');

		for (let i = 0; i < 20; i++) {
			attachments.appendChild(renderTemplate('attached-file', { name: `File_${i + 1}.txt`, size: `${(Math.random() * 1024).toFixed(2)} KB` }));
		}

		const addAttachment = (file) => {
			const view = renderTemplate('attached-file', { name: file.name, size: `${(file.size / 1024).toFixed(2)} KB` });
			attachments.appendChild(view);
			view.scrollIntoView({ behavior: 'smooth', container: 'nearest' });
		};

		class AttachedImage {
			constructor(file) {
				this.file = file;
				this.objectUrl = URL.createObjectURL(file);
				this.state = { type: 'not-uploaded' };
				this.setupNextState();
			}

			setupNextState() {
				const { promise, resolve } = Promise.withResolvers();
				this.nextState = promise;
				this.resolveNextState = resolve;
			}

			updateState(newState) {
				const resolvePrevState = this.resolveNextState;
				this.setupNextState();
				resolvePrevState(newState);
				this.state = newState;
			}
		}

		const attachedImages = [];

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
			new RteTextColorFeature({
				defaultColor: '#000000',
			}),
			new RteAlignmentFeature(),
			new RteLinkFeature(),
			new RteToolbarFeature(),
			new RteListFeature(),
			new RteInlineImageFeature({
				resolveUrl: async function* (src) {
					const url = new URL(src);
					if (url.protocol !== 'attachment:') {
						return src;
					}
					const id = parseInt(url.host, 10);
					const attachment = attachedImages[id];

					const renderTemplateIntoSlot = (templateId, slotName, vars = {}) => {
						const instance = renderTemplate(templateId, vars);
						instance.slot = slotName;
						rteComponent.appendChild(instance);
						return () => instance.remove();
					};

					for (let state = attachment.state; true; state = await attachment.nextState) {
						switch (state.type) {
							case 'not-uploaded':
								yield attachment.objectUrl;
								break;
							case 'uploading': {
								yield {
									type: 'placeholder',
									create: (slotName) => renderTemplateIntoSlot('loading-template', slotName),
								};
								break;
							}
							case 'uploaded':
								yield attachment.objectUrl;
								break;
							case 'error': {
								yield {
									type: 'placeholder',
									create: (slotName) =>
										renderTemplateIntoSlot('error-template', slotName, {
											title: attachment.file.name,
											message: state.message,
										}),
								};
								break;
							}
						}
					}
				},
			}),
			new RteFileHandlerFeature({
				handleFiles: (files) => {
					const imageFiles = files.filter((file) => acceptedImageMimeTypes.includes(file.type));
					const nonImageFiles = files.filter((file) => !acceptedImageMimeTypes.includes(file.type));

					for (const file of nonImageFiles) {
						addAttachment(file);
					}

					const images = imageFiles.map((file) => {
						const id = attachedImages.length;
						attachedImages.push(new AttachedImage(file));
						return { type: 'inline_image', attrs: { imageUrl: `attachment://${id}`, alt: file.name } };
					});
					if (!images.length) {
						return null;
					}
					return images;
				},
			}),
			new RteDropHandlerFeature({
				onViewportDragOver: (event) => {
					if (!isFileDrop(event)) {
						return false;
					}
					const containsImages = Array.from(event.dataTransfer.items).some((item) => acceptedImageMimeTypes.includes(item.type));
					if (containsImages) {
						dropZone.style.blockSize = '30%';
					} else {
						dropZone.style.blockSize = '100%';
					}
					dropZone.style.display = 'block';
					event.preventDefault();
					return false;
				},
				onViewportDrop: (event) => {
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
				content: Array(20)
					.fill(null)
					.map((_, i) => ({
						type: 'body',
						content: [{ type: 'text', text: `Paragraph ${i + 1}` }],
					})),
			},
		});

		dropZone.addEventListener('drop', (event) => {
			const files = Array.from(event.dataTransfer.files);
			for (const file of files) {
				addAttachment(file);
			}
			event.preventDefault();
		});

		scrollButton.addEventListener('click', () => {
			attachmentsBarStart.scrollIntoView({ behavior: 'smooth', block: 'start', container: 'nearest' });
		});

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.intersectionRatio === 0) {
					scrollButton.style.opacity = '1';
					scrollButton.inert = false;
				} else {
					scrollButton.style.opacity = '0';
					scrollButton.inert = true;
				}
			},
			{
				root: rteComponent.editorViewportElement,
				threshold: [0, 1],
			}
		);

		observer.observe(attachments);

		uploadButton.addEventListener('click', async () => {
			for (const [index, image] of attachedImages.entries()) {
				if (image.state.type === 'not-uploaded') {
					image.updateState({ type: 'uploading' });

					await sleep(2000); // Simulate upload

					image.updateState(index % 2 === 0 ? { type: 'uploaded' } : { type: 'error', message: 'Failed to upload file' });
				}
			}
		});
	});
</script>
```
