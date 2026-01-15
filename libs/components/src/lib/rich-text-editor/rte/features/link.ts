import {
	type Command,
	type EditorState,
	Plugin,
	TextSelection,
} from 'prosemirror-state';
import type { Node } from 'prosemirror-model';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import {
	createAnchor,
	createButton,
	createDiv,
	createMenu,
	createText,
	createTextField,
	UiCtx,
} from '../utils/ui';
import { RteInstanceImpl } from '../instance';
import {
	featureFacade,
	type PluginContribution,
	RteFeatureImpl,
	type SchemaContribution,
	type StyleContribution,
	type ToolbarItemContribution,
} from '../feature';
import { Popover } from '../../popover';
import type { Menu } from '../../../menu/menu';
import type { Button } from '../../../button/button';
import linkCss from './link.style.scss?inline';

type Link = { text: string; href: string; start: number; end: number };

export class RteLinkFeatureImpl extends RteFeatureImpl {
	protected name = 'RteLinkFeature';

	override getStyles(): StyleContribution[] {
		return [this.contribution(linkCss)];
	}

	override getSchema(): SchemaContribution[] {
		return [
			this.contribution({
				marks: {
					link: {
						attrs: {
							href: { validate: 'string' },
						},
						inclusive: false,
						parseDOM: [
							{
								tag: 'a[href]',
								getAttrs(dom: HTMLElement) {
									return {
										href: dom.getAttribute('href'),
									};
								},
							},
						],
						toDOM(node) {
							const { href } = node.attrs;
							return ['a', { href }, 0];
						},
					},
				},
			}),
		];
	}

	override getTextblockMarks() {
		return [this.contribution({ markName: 'link' })];
	}

	override getPlugins(rte: RteInstanceImpl): PluginContribution[] {
		const insertLinkCommand = () => {
			this.toolbarMenu!.open = true;
			return true;
		};

		return [
			this.contribution(
				new Plugin({
					props: {
						decorations: (state) => {
							const link = this.getCurrentLink(state);
							if (link) {
								const deco = Decoration.inline(link.start, link.end, {
									id: 'current-link',
								});
								return DecorationSet.create(state.doc, [deco]);
							}
							return null;
						},
					},
					view: (view) => {
						const ctx = new UiCtx(view, rte, {
							popupPlacement: 'bottom',
						});
						const popup = rte.createComponent(Popover);
						popup.anchorId = 'current-link';
						const content = createDiv(ctx, {
							className: 'link-popover',
							children: [
								createDiv(ctx, {
									className: 'link-popover-header',
									children: [
										createDiv(ctx, {
											className: 'link-popover-label',
											children: [
												createText(ctx, {
													text: () =>
														this.getCurrentLink(ctx.view.state)?.text || '',
												}),
											],
										}),
										createButton(ctx, {
											icon: 'close-line',
											label: () => ctx.rte.getLocale().richTextEditor.close,
											noTooltip: true,
											onClick: () => {
												popup.requestOpenState(false);
											},
										}),
									],
								}),
								createDiv(ctx, {
									className: 'link-popover-content',
									children: [
										createAnchor(ctx, {
											className: 'link',
											href: () =>
												this.getCurrentLink(ctx.view.state)?.href || '',
											target: '_blank',
											rel: 'noopener',
											children: [
												createText(ctx, {
													text: () =>
														this.getCurrentLink(ctx.view.state)?.href || '',
												}),
											],
										}),
										createDiv(ctx, {
											className: 'link-action-bar',
											children: [
												createButton(ctx, {
													icon: 'delete-line',
													label: () =>
														ctx.rte.getLocale().richTextEditor.delete,
													connotation: 'alert',
													variant: 'popover',
													noTooltip: true,
													onClick: () => {
														const { state, dispatch } = ctx.view;
														this.removeLink(state, dispatch);
													},
												}),
												createButton(ctx, {
													icon: 'edit-line',
													label: () => ctx.rte.getLocale().richTextEditor.edit,
													variant: 'popover',
													noTooltip: true,
													onClick: () => {
														this.toolbarMenu!.open = true;
														popup.requestOpenState(false);
														return true;
													},
												}),
											],
										}),
									],
								}),
							],
						});
						popup.appendChild(content);
						(view.dom.getRootNode() as ShadowRoot)
							.querySelector('.popovers')!
							.appendChild(popup);
						return {
							update: (view) => {
								const state = view.state;
								ctx.updateBindings();
								const link = this.getCurrentLink(state);
								popup.requestOpenState(Boolean(link));
							},
							destroy: () => {
								popup.remove();
							},
						};
					},
				})
			),
			this.contribution(
				keymap({
					'Mod-k': insertLinkCommand,
				})
			),
		];
	}

	protected toolbarMenu?: Menu;

	override getToolbarItems(rte: RteInstanceImpl): ToolbarItemContribution[] {
		const getSelectionText = (state: EditorState) => {
			const { from, to } = state.selection;
			if (from === to) {
				return '';
			}
			return state.doc.textBetween(from, to, ' ');
		};

		const isValidUrl = (url: string): boolean => {
			try {
				// eslint-disable-next-line no-new
				new URL(url);
				return true;
			} catch (e) {
				return false;
			}
		};

		return [
			this.contribution(
				{
					section: 'insert',
					render: (ctx) => {
						const textField = createTextField(ctx, {
							label: () => ctx.rte.getLocale().richTextEditor.linkText,
							placeholder: () =>
								ctx.rte.getLocale().richTextEditor.linkTextPlaceholder,
							slot: 'header',
							autofocus: true,
							value: () =>
								this.getCurrentLink(ctx.view.state)?.text ||
								getSelectionText(ctx.view.state) ||
								'',
							onInput: () => {
								updateValidation();
							},
						});

						const urlField = createTextField(ctx, {
							label: () => ctx.rte.getLocale().richTextEditor.linkUrl,
							type: 'url',
							placeholder: () =>
								ctx.rte.getLocale().richTextEditor.linkUrlPlaceholder,
							slot: 'header',
							value: () => this.getCurrentLink(ctx.view.state)?.href || '',
							onInput: () => {
								updateValidation();
							},
						});

						const applyButton = createButton(ctx, {
							label: () => ctx.rte.getLocale().richTextEditor.apply,
							variant: 'popover-primary',
							disabled: () => {
								const link = this.getCurrentLink(ctx.view.state);
								return !(link && link.text.length && isValidUrl(link.href));
							},
							onClick: () => {
								const { state, dispatch } = ctx.view;
								this.insertLink(
									rte,
									urlField.value,
									textField.value
								)(state, dispatch);
							},
						});

						const updateValidation = () => {
							applyButton.querySelector<Button>(
								'[data-vvd-component="button"]'
							)!.disabled = !(
								textField.value.length && isValidUrl(urlField.value)
							);
						};

						const menu = createMenu(ctx, {
							label: () => ctx.rte.getLocale().richTextEditor.hyperlink,
							trigger: createButton(ctx, {
								label: () => ctx.rte.getLocale().richTextEditor.hyperlink,
								icon: 'link-line',
							}),
							children: [
								createDiv(ctx, {
									className: 'link-toolbar-menu',
									slot: 'header',
									children: [
										textField,
										urlField,
										createDiv(ctx, {
											className: 'link-action-bar',
											slot: 'header',
											children: [
												createButton(ctx, {
													label: () =>
														ctx.rte.getLocale().richTextEditor.cancel,
													variant: 'popover',
													onClick: () => {
														this.toolbarMenu!.open = false;
													},
												}),
												applyButton,
											],
										}),
									],
								}),
							],
						});

						this.toolbarMenu = menu.lastElementChild as Menu;

						return menu;
					},
				},
				1
			),
		];
	}

	getCurrentLink(state: EditorState): Link | null {
		const selection = state.selection;
		if (!(selection instanceof TextSelection)) {
			return null;
		}

		const linkMark = state.schema.marks.link;
		const { $from, $to } = selection;

		// Determine link at start of selection
		const selectionStartMarks = state.selection.empty
			? $from.marks()
			: $from.nodeAfter?.marks ?? [];
		const targetHref = linkMark.isInSet(selectionStartMarks)?.attrs.href;
		if (!targetHref) {
			return null;
		}
		const isTargetLink = (node: Node) =>
			linkMark.isInSet(node.marks)?.attrs.href === targetHref;

		// Now, find the start / end of the link and validate that all text nodes in the selection belong to the same link
		let linkStart = -1;
		let linkEnd = -1;
		let selectionValid = true;
		state.doc.nodesBetween($from.start(), $to.end(), (node, pos) => {
			if (!node.isText) {
				return true;
			}

			const nodeEnd = pos + node.nodeSize;

			if (isTargetLink(node)) {
				if (linkStart === -1) {
					linkStart = pos;
				}
				linkEnd = nodeEnd;
			} else if (nodeEnd > selection.from && pos < selection.to) {
				selectionValid = false;
			}

			return false;
		});

		if (!selectionValid || linkStart === -1) {
			return null;
		}

		const linkText = state.doc.textBetween(linkStart, linkEnd, ' ');

		return {
			text: linkText,
			href: targetHref,
			start: linkStart,
			end: linkEnd,
		};
	}

	removeLink: Command = (state, dispatch) => {
		const tr = state.tr;
		const existingLink = this.getCurrentLink(state)!;
		tr.removeMark(
			existingLink.start,
			existingLink.end,
			state.schema.marks.link
		);
		dispatch?.(tr.scrollIntoView());
		return true;
	};

	insertLink(rte: RteInstanceImpl, href: string, text: string): Command {
		return (state, dispatch) => {
			let { from, to } = state.selection;
			const tr = state.tr;

			const existingLink = this.getCurrentLink(state);
			if (existingLink) {
				from = existingLink.start;
				to = existingLink.end;
			}

			tr.insertText(text, from, to);
			tr.addMark(
				from,
				from + text.length,
				rte.schema.marks.link.create({ href })
			);

			dispatch?.(tr.scrollIntoView());
			return true;
		};
	}
}

export const RteLinkFeature = featureFacade(RteLinkFeatureImpl);
