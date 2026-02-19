import { type Node, type NodeSpec } from 'prosemirror-model';
import {
	type Command,
	type EditorState,
	NodeSelection,
	Plugin,
} from 'prosemirror-state';
import type { EditorView, NodeView } from 'prosemirror-view';
import {
	featureFacade,
	RteFeatureImpl,
	type SchemaContribution,
} from '../feature';
import type { RteInstanceImpl } from '../instance';
import { escapeCssProperty, sanitizeImageSrc } from '../utils/sanitization';
import { Popover } from '../../popover';
import { createButton, createDiv, createDivider, UiCtx } from '../utils/ui';
import {
	dispatchSlottableRequest,
	removeSymbol,
} from '../../../../shared/utils/slottable-request';
import inlineImageCss from './inline-image.style.scss?inline';

type SizeOption = 'small' | 'fit' | 'original';

type ContentDestroyedHandler = () => unknown;
export type ResolvedUrl =
	| string
	| null
	| {
			type: 'placeholder';
			/**
			 * Called with a unique slot name that will be rendered in place of the image. A returned callback will be called when the slot is removed.
			 */
			create?: (slotName: string) => ContentDestroyedHandler | undefined;
	  };
type ResolvedUrlGenerator = AsyncGenerator<ResolvedUrl, ResolvedUrl>;
const isGenerator = (
	value: ResolvedUrl | ResolvedUrlGenerator
): value is ResolvedUrlGenerator =>
	value !== null && Boolean((value as any)['next']);

export interface RteInlineImageConfig {
	/**
	 * Called whenever the editor needs to display an image. The return value determines what is displayed for the given image URL.
	 */
	resolveUrl?: (imageUrl: string) => ResolvedUrl | ResolvedUrlGenerator;
	/**
	 * Called whenever the editor needs to serialize an image to HTML.
	 * If it returns `null` for the given image URL, the image is ignored.
	 */
	serializeUrlToHtml?: (imageUrl: string) => string | null;
	/**
	 * Called whenever the editor needs to parse an image from HTML.
	 * If it returns `null` for the given <img> src URL, the image is ignored.
	 */
	parseUrlFromHtml?: (src: string) => string | null;
}

let uniqueId = 1;
const generateUniqueId = () => uniqueId++;

class InlineImageView implements NodeView {
	dom: HTMLDivElement;
	img: HTMLImageElement;
	imageUrl: string;

	constructor(
		node: Node,
		protected readonly view: EditorView,
		protected readonly getPos: () => number | undefined,
		protected readonly config: RteInlineImageConfig
	) {
		this.dom = document.createElement('div');
		this.dom.className = 'inline-image-wrapper';
		this.imageUrl = node.attrs.imageUrl;

		this.img = document.createElement('img');
		this.initializeImg(node);

		const resolveResult = this.config.resolveUrl
			? this.config.resolveUrl(this.imageUrl)
			: this.imageUrl;
		const initialResolvedUrl = isGenerator(resolveResult)
			? null
			: resolveResult;
		this.handleResolvedUrl(initialResolvedUrl);

		if (isGenerator(resolveResult)) {
			this.handleResolvedUrlGenerator(resolveResult);
		}
	}

	/// What is currently rendered inside the node view
	content: HTMLElement | null = null;
	onContentDestroy?: () => void;
	setContent(
		content: HTMLElement | null,
		{
			onDestroy,
			allowPopover,
		}: Partial<{ onDestroy: () => void; allowPopover: boolean }> = {}
	) {
		this.content?.remove();
		this.onContentDestroy?.();
		this.content = content;
		if (content) {
			this.onContentDestroy = onDestroy;
			this.dom.appendChild(content);
		}
		Popover.setBlockPopover(this.dom, !allowPopover);
	}

	async handleResolvedUrlGenerator(generator: ResolvedUrlGenerator) {
		const iterator = generator[Symbol.asyncIterator]();
		let result;
		do {
			result = await iterator.next();
			this.handleResolvedUrl(result.value);
		} while (!result.done);
	}

	handleResolvedUrl(result: ResolvedUrl) {
		if (typeof result === 'string') {
			this.renderImg(result);
		} else if (result?.type === 'placeholder') {
			const slotName = `inline-image-placeholder-${generateUniqueId()}`;
			const slot = document.createElement('slot');
			slot.className = 'inline-image-placeholder';
			slot.name = slotName;

			const onDestroy = result.create?.(slotName);

			const host = (this.view.dom.getRootNode() as ShadowRoot).host;
			dispatchSlottableRequest(host, 'inline-image-placeholder', slotName, {
				url: this.imageUrl,
			});

			this.setContent(slot, {
				onDestroy: () => {
					dispatchSlottableRequest(
						host,
						'inline-image-placeholder',
						slotName,
						removeSymbol
					);
					onDestroy?.();
				},
			});
		} else {
			this.setContent(null);
		}
	}

	initializeImg(node: Node) {
		this.img.className = 'inline-image';
		this.update(node);
		this.img.addEventListener('load', () => {
			const pos = this.getPos?.();

			if (pos) {
				const { state, dispatch } = this.view;

				const currentNode = state.doc.nodeAt(pos);
				if (
					!currentNode ||
					(currentNode.attrs.naturalWidth === this.img.naturalWidth &&
						currentNode.attrs.naturalHeight === this.img.naturalHeight)
				) {
					return; // No update needed
				}

				const tr = state.tr;
				tr.setNodeAttribute(pos, 'naturalWidth', this.img.naturalWidth);
				tr.setNodeAttribute(pos, 'naturalHeight', this.img.naturalHeight);
				tr.setMeta('addToHistory', false); // Should not be recorded or rolled back by history
				dispatch(tr);
			}
		});
	}

	renderImg(src: string) {
		// Sanitize the URL to prevent XSS (allow data:image/* URLs)
		this.img.src = sanitizeImageSrc(src);
		this.setContent(this.img, { allowPopover: true });
	}

	update(node: Node) {
		this.img.alt = node.attrs.alt;
		this.img.width = node.attrs.naturalWidth;
		this.img.height = node.attrs.naturalHeight;
		this.img.style.maxWidth = node.attrs.size;
		return true;
	}

	destroy() {
		this.setContent(null);
	}
}

export class RteInlineImageFeatureImpl extends RteFeatureImpl {
	name = 'RteInlineImageFeature';

	constructor(protected readonly config: RteInlineImageConfig = {}) {
		super();
	}

	override getStyles() {
		return [this.contribution(inlineImageCss)];
	}

	override getSchema(): SchemaContribution[] {
		const inlineImage: NodeSpec = {
			inline: true,
			group: 'inline',
			selectable: true,
			atom: true,
			attrs: {
				imageUrl: { validate: 'string' },
				alt: { validate: 'string', default: '' },
				size: { validate: 'string|null', default: null },
				naturalWidth: { validate: 'number|null', default: null },
				naturalHeight: { validate: 'number|null', default: null },
			},
			parseDOM: [
				{
					tag: 'img[src],img[data-src]',
					getAttrs: (dom: HTMLElement) => {
						const parseDimension = (dim: string | null) => {
							const value = parseInt(dim ?? '', 10);
							return isNaN(value) ? null : value;
						};

						// Prefer data-src since src may be dropped by sanitization for custom protocols (e.g. attachment://)
						const srcAttr = (dom.getAttribute('data-src') ??
							dom.getAttribute('src')) as string;

						const imageUrl = this.config.parseUrlFromHtml
							? this.config.parseUrlFromHtml(srcAttr)
							: srcAttr;

						if (imageUrl === null) {
							return false;
						}

						return {
							imageUrl,
							alt: dom.getAttribute('alt') || '',
							size: dom.style.maxWidth || null,
							naturalWidth: parseDimension(dom.getAttribute('width')),
							naturalHeight: parseDimension(dom.getAttribute('height')),
						};
					},
				},
			],
			/// Since we use a NodeView, this is only used for HTML serialization
			toDOM: (node) => {
				const { imageUrl, alt, size, naturalWidth, naturalHeight } = node.attrs;
				const resolvedUrl = this.config.serializeUrlToHtml
					? this.config.serializeUrlToHtml(imageUrl)
					: imageUrl;
				if (resolvedUrl === null) {
					return document.createTextNode('');
				}
				const attrs: Record<string, string> = {
					src: sanitizeImageSrc(resolvedUrl),
					'data-src': resolvedUrl, // Preserve src if it is dropped by sanitization
					alt,
				};
				if (size)
					attrs.style = `max-width: ${escapeCssProperty(size)}; height: auto;`;
				if (naturalWidth) attrs.width = naturalWidth;
				if (naturalHeight) attrs.height = naturalHeight;
				return ['img', attrs];
			},
		};

		return [
			this.contribution({
				nodes: {
					inlineImage: inlineImage,
				},
			}),
		];
	}

	override getPlugins(rte: RteInstanceImpl) {
		return [
			this.contribution(
				new Plugin({
					props: {
						nodeViews: {
							// eslint-disable-next-line @typescript-eslint/naming-convention
							inlineImage: (node, view, getPos) =>
								new InlineImageView(node, view, getPos, this.config),
						},
					},
					view: (view) => {
						const ctx = new UiCtx(view, rte, {
							popupPlacement: 'bottom',
						});
						const popover = rte.createComponent(Popover);
						popover.offset = 4;
						const content = createDiv(ctx, {
							className: 'inline-image-popover',
							children: [
								createButton(ctx, {
									label: () =>
										ctx.rte.getLocale().richTextEditor.imageSizes.small,
									variant: 'popover',
									active: () =>
										this.getSelectedImageSize(ctx.view.state) === 'small',
									onClick: () => {
										this.setSelectedImageSize('small')(
											ctx.view.state,
											ctx.view.dispatch
										);
									},
								}),
								createDivider(ctx),
								createButton(ctx, {
									label: () =>
										ctx.rte.getLocale().richTextEditor.imageSizes.fit,
									variant: 'popover',
									active: () =>
										this.getSelectedImageSize(ctx.view.state) === 'fit',
									onClick: () => {
										this.setSelectedImageSize('fit')(
											ctx.view.state,
											ctx.view.dispatch
										);
									},
								}),
								createDivider(ctx),
								createButton(ctx, {
									label: () =>
										ctx.rte.getLocale().richTextEditor.imageSizes.original,
									variant: 'popover',
									active: () =>
										this.getSelectedImageSize(ctx.view.state) === 'original',
									onClick: () => {
										this.setSelectedImageSize('original')(
											ctx.view.state,
											ctx.view.dispatch
										);
									},
								}),
							],
						});
						popover.appendChild(content);
						(view.dom.getRootNode() as ShadowRoot)
							.querySelector('.popovers')!
							.appendChild(popover);
						return {
							update: (view) => {
								ctx.updateBindings();

								const selectedImage = this.getSelectedInlineImage(view.state);
								if (selectedImage) {
									popover.anchorEl = view.nodeDOM(
										selectedImage.pos
									) as HTMLElement;
									popover.requestOpenState(true);
								} else {
									popover.anchorEl = undefined;
									popover.requestOpenState(false);
								}
							},
							destroy: () => {
								popover.remove();
							},
						};
					},
				})
			),
		];
	}

	calculateSmallWidth(naturalWidth: number) {
		return Math.min(300, naturalWidth / 2) + 'px';
	}

	getSelectedInlineImage(state: EditorState) {
		const sel = state.selection;
		if (
			sel instanceof NodeSelection &&
			sel.node.type === state.schema.nodes.inlineImage
		) {
			return { pos: sel.from, node: sel.node };
		}
		return null;
	}

	setSelectedImageSize(size: SizeOption): Command {
		return (state, dispatch) => {
			const selectedImage = this.getSelectedInlineImage(state);
			if (!selectedImage) {
				return false;
			}

			const { naturalWidth } = selectedImage.node.attrs;

			if (size === 'small' && naturalWidth === null) {
				return false; // Cannot set to small if naturalWidth is unknown
			}

			const tr = state.tr;
			tr.setNodeAttribute(
				selectedImage.pos,
				'size',
				size === 'small'
					? this.calculateSmallWidth(naturalWidth)
					: size === 'fit'
					? '100%'
					: null
			);
			dispatch?.(tr.scrollIntoView());
			return true;
		};
	}

	getSelectedImageSize(state: EditorState): SizeOption | null {
		const selectedImage = this.getSelectedInlineImage(state);
		if (!selectedImage) {
			return null;
		}

		const { size, naturalWidth } = selectedImage.node.attrs;
		if (
			naturalWidth !== null &&
			size === this.calculateSmallWidth(naturalWidth)
		)
			return 'small';
		if (size === '100%') return 'fit';
		if (size === null) return 'original';
		return null;
	}
}

export const RteInlineImageFeature = featureFacade(RteInlineImageFeatureImpl);
