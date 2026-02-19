## Attachments

This is an example of handling attachments and inline images in the rich text editor.

Functionality:

- Pasting images adds them as inline images, while pasting other files adds them as attachments.
- Dragging non-images over the editor shows a drop zone covering the entire editor area, which adds files as attachments.
- When dragging images over the editor, the drop zone is limited to the bottom and allows the choice of dragging them into the editor or adding them as attachments.
- Clicking the "Upload" button simulates uploading all inline images, showing a loading placeholder during upload and an upload error for every second image.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

{% raw %}

```vue preview
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { VButton, VDivider, VIcon, VProgressRing, VRichTextEditor, VSimpleColorPicker } from '@vonage/vivid-vue';
import { RteAlignmentFeature, RteBase, RteBoldFeature, RteConfig, RteDropHandlerFeature, RteFileHandlerFeature, RteFontSizePickerFeature, RteInlineImageFeature, RteItalicFeature, RteLinkFeature, RteListFeature, RteMonospaceFeature, RteStrikethroughFeature, RteTextBlockPickerFeature, RteTextColorPickerFeature, RteToolbarFeature, RteUnderlineFeature } from '@vonage/vivid';

// --- Utilities ---
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isFileDrop = (event: DragEvent) => event.dataTransfer?.types.includes('Files') ?? false;

const acceptedImageMimeTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'];

// --- Swatches ---
const swatches = [
	{ label: 'Black', value: '#000000' },
	{ label: 'Red', value: '#E61D1D' },
	{ label: 'Yellow', value: '#FA9F00' },
	{ label: 'Green', value: '#1C8731' },
	{ label: 'Blue', value: '#0276D5' },
	{ label: 'Purple', value: '#9941FF' },
	{ label: 'Pink', value: '#D6219C' },
];

// --- Refs ---
const rteComponent = ref<InstanceType<typeof VRichTextEditor> | null>(null);
const dropZone = ref<HTMLDivElement | null>(null);
const attachmentsBarStart = ref<HTMLDivElement | null>(null);
const attachmentsContainer = ref<HTMLDivElement | null>(null);

// --- State ---
const attachedFiles = ref<{ name: string; size: string }[]>([]);
const dropZoneVisible = ref(false);
const dropZoneBlockSize = ref('100%');
const scrollButtonOpacity = ref('0');

interface AttachmentState {
	type: 'not-uploaded' | 'uploading' | 'uploaded' | 'error';
	message?: string;
}

class AttachedImage {
	file: File;
	objectUrl: string;
	state: AttachmentState;
	nextState!: Promise<AttachmentState>;
	resolveNextState!: (state: AttachmentState) => void;

	constructor(file: File) {
		this.file = file;
		this.objectUrl = URL.createObjectURL(file);
		this.state = { type: 'not-uploaded' };
		this.setupNextState();
	}

	setupNextState() {
		const { promise, resolve } = Promise.withResolvers<AttachmentState>();
		this.nextState = promise;
		this.resolveNextState = resolve;
	}

	updateState(newState: AttachmentState) {
		const resolvePrevState = this.resolveNextState;
		this.setupNextState();
		resolvePrevState(newState);
		this.state = newState;
	}
}

const attachedImages: AttachedImage[] = [];

const addAttachment = (file: File) => {
	attachedFiles.value.push({
		name: file.name,
		size: `${(file.size / 1024).toFixed(2)} KB`,
	});
	nextTick(() => {
		attachmentsContainer.value?.lastElementChild?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
		});
	});
};

const getAttachmentFromUrl = (url: string): AttachedImage | undefined => {
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== 'attachment:') return undefined;
		const id = parseInt(parsed.host, 10);
		return attachedImages[id];
	} catch {
		return undefined;
	}
};

// --- RTE ---
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
	new RteFontSizePickerFeature({
		options: [
			{ size: '24px', label: 'Extra Large' },
			{ size: '18px', label: 'Large' },
			{ size: '14px', label: 'Normal' },
			{ size: '12px', label: 'Small' },
		],
	}),
	new RteBoldFeature(),
	new RteItalicFeature(),
	new RteUnderlineFeature(),
	new RteStrikethroughFeature(),
	new RteMonospaceFeature(),
	new RteTextColorPickerFeature(),
	new RteAlignmentFeature(),
	new RteLinkFeature(),
	new RteToolbarFeature(),
	new RteListFeature({
		bulletList: true,
		numberedList: true,
	}),
	new RteInlineImageFeature({
		resolveUrl: async function* (src: string) {
			const attachment = getAttachmentFromUrl(src);
			if (!attachment) {
				return src;
			}

			for (let state = attachment.state; true; state = await attachment.nextState) {
				switch (state.type) {
					case 'not-uploaded':
					case 'uploaded':
						yield attachment.objectUrl;
						break;
					case 'uploading':
					case 'error':
						yield { type: 'placeholder' };
						break;
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
				return {
					type: 'inlineImage',
					attrs: { imageUrl: `attachment://${id}`, alt: file.name },
				};
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
			const containsImages = Array.from(event.dataTransfer?.items || []).some((item) => acceptedImageMimeTypes.includes(item.type));
			if (containsImages) {
				dropZoneBlockSize.value = '30%';
			} else {
				dropZoneBlockSize.value = '100%';
			}
			dropZoneVisible.value = true;
			event.preventDefault();
			return false;
		},
		onViewportDrop: (event) => {
			event.preventDefault();
		},
		onViewportDragFinish: () => {
			dropZoneVisible.value = false;
		},
	}),
]);

const instance = config.instantiateEditor({
	initialDocument: {
		type: 'doc',
		content: Array(20)
			.fill(null)
			.map((_, i) => ({
				type: 'paragraph',
				content: [{ type: 'text', text: `Paragraph ${i + 1}` }],
			})),
	},
});

for (let i = 0; i < 20; i++) {
	attachedFiles.value.push({
		name: `File_${i + 1}.txt`,
		size: `${(Math.random() * 1024).toFixed(2)} KB`,
	});
}

// --- Event handlers ---
const handleDropZoneDrop = (event: DragEvent) => {
	const files = Array.from(event.dataTransfer?.files || []);
	for (const file of files) {
		addAttachment(file);
	}
	event.preventDefault();
};

const handleScrollButtonClick = () => {
	attachmentsBarStart.value?.scrollIntoView({
		behavior: 'smooth',
		block: 'start',
	});
};

const handleUpload = async () => {
	for (const [index, image] of attachedImages.entries()) {
		if (image.state.type === 'not-uploaded') {
			image.updateState({ type: 'uploading' });

			await sleep(2000); // Simulate upload

			image.updateState(
				index % 2 === 0
					? { type: 'uploaded' }
					: {
							type: 'error',
							message: 'Failed to upload file',
					  }
			);
		}
	}
};

// --- Intersection observer for scroll button visibility ---
onMounted(() => {
	if (!attachmentsContainer.value || !rteComponent.value) return;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.intersectionRatio === 0) {
				scrollButtonOpacity.value = '1';
			} else {
				scrollButtonOpacity.value = '0';
			}
		},
		{
			root: rteComponent.value.element?.editorViewportElement,
			threshold: [0, 1],
		}
	);

	observer.observe(attachmentsContainer.value);
});
</script>

<template>
	<VRichTextEditor ref="rteComponent" :instance="instance" style="block-size: 600px">
		<template #editor-end>
			<div ref="attachmentsBarStart"></div>
			<div
				style="
					position: sticky;
					inset-inline: 0;
					inset-block-end: 0;
					padding-inline: var(--editor-padding-inline);
					background: var(--vvd-color-canvas);
				"
			>
				<VDivider
					style="
						position: absolute;
						inset-block-end: 100%;
						inset-inline: var(--editor-padding-inline);
					"
				/>
				<div
					style="
						padding-block: var(--editor-padding-block);
						background: var(--vvd-color-canvas);
						display: flex;
						align-items: center;
						justify-content: space-between;
					"
				>
					<span style="font-weight: bold">Attachments</span>
					<VButton
						aria-label="Scroll to bottom"
						appearance="ghost"
						size="super-condensed"
						:style="{
							transition: 'opacity 0.3s ease-in-out',
							opacity: scrollButtonOpacity,
						}"
						:inert="scrollButtonOpacity === '0'"
						@click="handleScrollButtonClick"
					>
						<template #icon>
							<VIcon name="chevron-circle-down-line" />
						</template>
					</VButton>
				</div>
			</div>
			<div
				ref="attachmentsContainer"
				style="
					position: sticky;
					inset-inline: 0;
					padding-inline: var(--editor-padding-inline);
					padding-block-end: var(--editor-padding-block);
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 8px;
				"
			>
				<div v-for="(file, index) in attachedFiles" :key="index" class="attached-file">
					<div class="attached-file-icon">
						<VIcon style="display: block" name="file-line" />
					</div>
					<div class="attached-file-name">{{ file.name }}</div>
					<div class="attached-file-size">{{ file.size }}</div>
				</div>
			</div>
			<div
				ref="dropZone"
				:style="{
					display: dropZoneVisible ? 'block' : 'none',
					position: 'fixed',
					insetInline: '0',
					insetBlockEnd: '0',
					blockSize: dropZoneBlockSize,
				}"
				@drop="handleDropZoneDrop"
			>
				<div class="drop-area">Drag & drop files here</div>
			</div>
		</template>
		<template #text-color-picker>
			<VSimpleColorPicker :swatches="swatches" />
		</template>
		<template #inline-image-placeholder="{ url }">
			<div v-if="getAttachmentFromUrl(url)?.state.type === 'uploading'" class="image-placeholder">
				<VProgressRing :size="-4" />
			</div>
			<div v-else-if="getAttachmentFromUrl(url)?.state.type === 'error'" class="image-error">
				<div class="image-error-icon">
					<VIcon style="display: block" name="warning-line" />
				</div>
				<div class="image-error-title">
					{{ getAttachmentFromUrl(url)?.file.name }}
				</div>
				<div class="image-error-message">
					{{ getAttachmentFromUrl(url)?.state.message }}
				</div>
			</div>
		</template>
	</VRichTextEditor>

	<VButton style="margin: 8px" appearance="filled" label="Upload" @click="handleUpload" />
</template>

<style scoped>
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
```

{% endraw %}

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

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
			attachments.appendChild(
				renderTemplate('attached-file', {
					name: `File_${i + 1}.txt`,
					size: `${(Math.random() * 1024).toFixed(2)} KB`,
				})
			);
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
			new RteFontSizePickerFeature({
				options: [
					{ size: '24px', label: 'Extra Large' },
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
			}),
			new RteBoldFeature(),
			new RteItalicFeature(),
			new RteUnderlineFeature(),
			new RteStrikethroughFeature(),
			new RteMonospaceFeature(),
			new RteTextColorPickerFeature(),
			new RteAlignmentFeature(),
			new RteLinkFeature(),
			new RteToolbarFeature(),
			new RteListFeature({
				bulletList: true,
				numberedList: true,
			}),
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
						return { type: 'inlineImage', attrs: { imageUrl: `attachment://${id}`, alt: file.name } };
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
						type: 'paragraph',
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

					image.updateState(
						index % 2 === 0
							? { type: 'uploaded' }
							: {
									type: 'error',
									message: 'Failed to upload file',
							  }
					);
				}
			}
		});
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Email Signatures

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

{% raw %}

```vue preview
<script setup lang="ts">
import { computed, ref } from 'vue';
import { VRichTextEditor, VRichTextView, VTextField } from '@vonage/vivid-vue';
import type { RteView } from '@vonage/vivid';
import { RteAtomFeature, RteBase, RteBoldFeature, RteConfig, type RteDocument, RteInputRuleFeature, RteItalicFeature, RteLinkFeature, RteSuggestFeature, RteToolbarButtonFeature, RteToolbarFeature, RteUnderlineFeature } from '@vonage/vivid';

// --- Variables definition ---
interface Variable {
	name: string;
	label: string;
}
const variables: Variable[] = [
	{ name: 'first_name', label: 'First Name' },
	{ name: 'last_name', label: 'Last Name' },
	{ name: 'job_title', label: 'Job Title' },
];

// --- Variable values ---
const variableValues = ref<Record<string, string>>({
	first_name: 'John',
	last_name: 'Doe',
	job_title: 'Software Engineer',
});

// --- Email features ---
const emailFeatures = [new RteBase(), new RteToolbarFeature(), new RteBoldFeature(), new RteItalicFeature(), new RteUnderlineFeature(), new RteLinkFeature()];

// --- Signature Editor ---
const signatureConfig = new RteConfig([
	...emailFeatures,
	new RteAtomFeature('variable', {
		resolveValue: (value: string) => `{${value}}`,
	}),
	new RteInputRuleFeature('variable', {
		pattern: /\{(\w+)}/,
		handler: (match) => {
			const varName = match[1];
			if (variables.some((v) => v.name === varName)) {
				return [{ type: 'variable', attrs: { value: varName } }];
			}
			return null;
		},
	}),
	new RteSuggestFeature('variable', {
		pattern: /\{(\w*)$/,
		load: (match) => {
			const query = match[1].toLowerCase();
			return variables
				.filter((v) => v.name.includes(query) || v.label.toLowerCase().includes(query))
				.map((v) => ({
					text: `{${v.name}}`,
					textSecondary: v.label,
					data: v,
				}));
		},
		select: (suggestion) => [
			{
				type: 'variable',
				attrs: { value: (suggestion.data as Variable).name },
			},
		],
	}),
	new RteToolbarButtonFeature('variable', {
		label: 'Insert variable',
		icon: 'curly-brackets-line',
		action: { type: 'insert-text', text: '{' },
	}),
]);
const signature = ref<RteDocument>({
	type: 'doc',
	content: [
		{
			type: 'paragraph',
			content: [{ type: 'text', text: 'Best regards,' }],
		},
		{
			type: 'paragraph',
			content: [
				{ type: 'variable', attrs: { value: 'first_name' } },
				{ type: 'text', text: ' ' },
				{ type: 'variable', attrs: { value: 'last_name' } },
				{ type: 'text', text: ' | ' },
				{
					type: 'variable',
					marks: [{ type: 'bold' }],
					attrs: { value: 'job_title' },
				},
			],
		},
	],
});
const signatureInstance = signatureConfig.instantiateEditor({
	initialDocument: signature.value,
	onChange: () => {
		signature.value = signatureInstance.getDocument();
	},
});

// --- Email Editor Config ---
const emailConfig = new RteConfig(emailFeatures);
const emailInstance = emailConfig.instantiateEditor({
	initialDocument: {
		type: 'doc',
		content: [
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Hi there,' }],
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'I wanted to follow up on our conversation...',
					},
				],
			},
			{
				type: 'paragraph',
				content: [],
			},
		],
	},
});

// --- Signature View ---
const signatureViewConfig = new RteConfig([...emailFeatures, new RteAtomFeature('variable')]);
const signatureView = computed(() =>
	signatureViewConfig.instantiateView(signature.value, {
		renderChildView: (view: RteView) => view.type === 'node' && view.node.type === 'variable',
	})
);
</script>

<template>
	<div class="section">
		<h4>Signature Template</h4>
		<VRichTextEditor id="signature-editor" :instance="signatureInstance">
			<template #suggestions-empty="{ id }">
				<span v-if="id === 'variable'">No matching variables</span>
			</template>
		</VRichTextEditor>
	</div>

	<div class="section">
		<h4>Variable Values</h4>
		<VTextField v-model="variableValues.first_name" label="First Name" />
		<VTextField v-model="variableValues.last_name" label="Last Name" />
		<VTextField v-model="variableValues.job_title" label="Job Title" />
	</div>

	<div class="section">
		<h4>Compose Email</h4>
		<VRichTextEditor id="email-editor" :instance="emailInstance">
			<template #editor-end>
				<div
					style="
						margin-block-start: calc(0px - var(--editor-padding-block));
						padding-inline: var(--editor-padding-inline);
						padding-block-end: var(--editor-padding-block);
					"
				>
					<VRichTextView id="signature-view" :view="signatureView">
						<template #child="{ view }">{{ variableValues[view.node.attrs.value] }}</template>
					</VRichTextView>
				</div>
			</template>
		</VRichTextEditor>
	</div>
</template>

<style scoped>
.section {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.section + .section {
	margin-top: 40px;
}

h4 {
	margin: 0 !important;
}

#signature-editor::part(node--variable) {
	background-color: var(--vvd-color-information-100);
	padding: 0 4px;
	border-radius: 4px;
	font-family: monospace;
}

::part(node--paragraph) {
	margin-block: 0;
}
</style>
```

{% endraw %}

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<style>
	.section {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.section + .section {
		margin-top: 40px;
	}

	h4 {
		margin: 0 !important;
	}

	#signature-editor::part(node--variable) {
		background-color: var(--vvd-color-information-100);
		padding: 0 4px;
		border-radius: 4px;
		font-family: monospace;
	}

	::part(node--paragraph) {
		margin-block: 0;
	}
</style>

<div class="section">
	<h4>Signature Template</h4>
	<vwc-rich-text-editor id="signature-editor">
		<span slot="variable-suggestions-empty">No matching variables</span>
	</vwc-rich-text-editor>
</div>

<div class="section">
	<h4>Variable Values</h4>
	<vwc-text-field id="var-first_name" label="First Name" value="John"></vwc-text-field>
	<vwc-text-field id="var-last_name" label="Last Name" value="Doe"></vwc-text-field>
	<vwc-text-field id="var-job_title" label="Job Title" value="Software Engineer"></vwc-text-field>
</div>

<div class="section">
	<h4>Compose Email</h4>
	<vwc-rich-text-editor id="email-editor">
		<div slot="editor-end" style="margin-block-start: calc(0px - var(--editor-padding-block)); padding-inline: var(--editor-padding-inline); padding-block-end: var(--editor-padding-block);">
			<vwc-rich-text-view id="signature-view"></vwc-rich-text-view>
		</div>
	</vwc-rich-text-editor>
</div>

<script>
	customElements.whenDefined('vwc-rich-text-editor').then(() => {
		const variables = [
			{ name: 'first_name', label: 'First Name' },
			{ name: 'last_name', label: 'Last Name' },
			{ name: 'job_title', label: 'Job Title' },
		];
		const getVariableValues = () => {
			const values = {};
			for (const v of variables) {
				values[v.name] = document.getElementById(`var-${v.name}`).value;
			}
			return values;
		};

		const emailFeatures = [new RteBase(), new RteToolbarFeature(), new RteBoldFeature(), new RteItalicFeature(), new RteUnderlineFeature(), new RteLinkFeature()];

		const signatureConfig = new RteConfig([
			...emailFeatures,
			new RteAtomFeature('variable', {
				resolveValue: (value) => `{${value}}`,
			}),
			new RteInputRuleFeature('variable', {
				pattern: /\{(\w+)\}/,
				matchAfterWhitespace: false,
				handler: (match) => {
					const varName = match[1];
					if (variables.some((v) => v.name === varName)) {
						return [{ type: 'variable', attrs: { value: varName } }];
					}
					return null;
				},
			}),
			new RteSuggestFeature('variable', {
				pattern: /\{(\w*)$/,
				load: (match) => {
					const query = match[1].toLowerCase();
					return variables
						.filter((v) => v.name.includes(query) || v.label.toLowerCase().includes(query))
						.map((v) => ({
							text: `{${v.name}}`,
							textSecondary: v.label,
							data: v,
						}));
				},
				select: (suggestion) => [{ type: 'variable', attrs: { value: suggestion.data.name } }],
			}),
			new RteToolbarButtonFeature('variable', {
				label: 'Insert variable',
				icon: 'curly-brackets-line',
				action: { type: 'insert-text', text: '{' },
			}),
		]);

		const signatureEditor = document.getElementById('signature-editor');
		const signatureInstance = signatureConfig.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [{ type: 'text', text: 'Best regards,' }],
					},
					{
						type: 'paragraph',
						content: [
							{ type: 'variable', attrs: { value: 'first_name' } },
							{ type: 'text', text: ' ' },
							{ type: 'variable', attrs: { value: 'last_name' } },
							{ type: 'text', text: ' | ' },
							{ type: 'variable', marks: [{ type: 'bold' }], attrs: { value: 'job_title' } },
						],
					},
				],
			},
			onChange: updateSignaturePreview,
		});
		signatureEditor.instance = signatureInstance;

		const emailConfig = new RteConfig(emailFeatures);

		const emailEditor = document.getElementById('email-editor');
		emailEditor.instance = emailConfig.instantiateEditor({
			initialDocument: {
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [{ type: 'text', text: 'Hi there,' }],
					},
					{
						type: 'paragraph',
						content: [{ type: 'text', text: 'I wanted to follow up on our conversation...' }],
					},
					{
						type: 'paragraph',
						content: [],
					},
				],
			},
		});

		const signatureView = document.getElementById('signature-view');

		function createSignatureViewConfig() {
			const values = getVariableValues();
			return new RteConfig([
				...emailFeatures,
				new RteAtomFeature('variable', {
					serializeValueToHtml: (varName) => values[varName],
				}),
			]);
		}

		function updateSignaturePreview() {
			const doc = signatureInstance.getDocument();
			const viewConfig = createSignatureViewConfig();
			signatureView.view = viewConfig.instantiateView(doc);
		}
		updateSignaturePreview();

		// Update preview when variable values change
		for (const v of variables) {
			const input = document.getElementById(`var-${v.name}`);
			input.addEventListener('input', updateSignaturePreview);
		}
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>
