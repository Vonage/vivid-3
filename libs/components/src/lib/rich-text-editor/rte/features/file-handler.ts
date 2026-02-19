import { type EditorState, Plugin, type Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { dropPoint } from 'prosemirror-transform';
import { Fragment, Slice } from 'prosemirror-model';
import { featureFacade, RteFeatureImpl } from '../feature';
import type { RteInstanceImpl } from '../instance';
import type { RteFragment } from '../document';
import { generateRandomId } from '../../../../shared/utils/randomId';
import { resolvePromise } from '../../../../shared/utils/promise';

export interface RteFileHandlerConfig {
	/**
	 * Called when files are dropped or pasted into the editor. The returned fragment is inserted into the document.
	 * If it returns `null`, the files are ignored and the current selection remains unchanged.
	 */
	handleFiles: (files: File[]) => RteFragment | Promise<RteFragment> | null;
}

type InsertPoint = { type: 'pos'; pos: number } | { type: 'selection' };

export class RteFileHandlerFeatureImpl extends RteFeatureImpl {
	name = 'RteFileHandlerFeature';

	constructor(readonly config: RteFileHandlerConfig) {
		super();
	}

	override getPlugins(rte: RteInstanceImpl) {
		const insertPointPlaceholderPlugin = new Plugin({
			state: {
				init() {
					return DecorationSet.empty;
				},
				apply(tr, set) {
					// Adjust decoration positions to changes made by the transaction
					set = set.map(tr.mapping, tr.doc);

					// See if the transaction adds or removes any placeholders
					const action = tr.getMeta(insertPointPlaceholderPlugin);
					if (action && action.add) {
						const placeholder = document.createElement('placeholder');
						const deco = Decoration.widget(action.add.pos, placeholder, {
							id: action.add.id,
							relaxedSide: true,
						});
						set = set.add(tr.doc, [deco]);
					} else if (action && action.remove) {
						set = set.remove(
							set.find(
								undefined,
								undefined,
								(spec) => spec.id == action.remove.id
							)
						);
					}

					return set;
				},
			},
			props: {
				decorations(state) {
					return this.getState(state);
				},
			},
		});

		const createInsertPointPlaceholder = (tr: Transaction, pos: number) => {
			const id = generateRandomId();

			tr.setMeta(insertPointPlaceholderPlugin, {
				add: { id, pos },
			});

			return {
				getPos: (state: EditorState) => {
					const decorations = insertPointPlaceholderPlugin.getState(state)!;
					const found = decorations.find(
						undefined,
						undefined,
						(spec) => spec.id == id
					);
					return found.length ? found[0].from : null;
				},
				remove: (tr: Transaction) => {
					tr.setMeta(insertPointPlaceholderPlugin, { remove: { id } });
				},
			};
		};

		const insertFragment = (
			tr: Transaction,
			fragment: RteFragment,
			insertPoint: InsertPoint
		) => {
			if (insertPoint.type === 'selection') {
				const parsed = Slice.fromJSON(rte.schema, { content: fragment });
				tr.replaceSelection(parsed);
			} else {
				const parsed = Fragment.fromJSON(rte.schema, fragment);
				tr.insert(insertPoint.pos, parsed);
			}
		};

		const handleFiles = (files: File[], insertPoint: InsertPoint) => {
			const result = this.config.handleFiles(files);

			if (result === null) {
				return;
			} else if (result instanceof Promise) {
				handleAsyncResult(result, insertPoint);
			} else {
				handleSyncResult(result, insertPoint);
			}
		};

		const handleSyncResult = (
			result: RteFragment,
			insertPoint: InsertPoint
		) => {
			const tr = rte.state.tr;
			insertFragment(tr, result, insertPoint);
			rte.dispatchTransaction(tr);
		};

		const handleAsyncResult = async (
			promise: Promise<RteFragment>,
			insertPoint: InsertPoint
		) => {
			const tr = rte.state.tr;
			if (insertPoint.type === 'selection' && !tr.selection.empty) {
				tr.deleteSelection();
			}
			const pos =
				insertPoint.type === 'selection' ? tr.selection.from : insertPoint.pos;
			const placeholder = createInsertPointPlaceholder(tr, pos);
			rte.dispatchTransaction(tr);

			const resolved = await resolvePromise(promise);

			// Get updated position of the placeholder accounting for document changes
			// May be null if the content around the placeholder was deleted
			const updatedPos = placeholder.getPos(rte.state);

			const insertTr = rte.state.tr;

			placeholder.remove(insertTr);

			if (updatedPos !== null && resolved.type === 'ok') {
				insertFragment(insertTr, resolved.result, {
					type: 'pos',
					pos: updatedPos,
				});
			}

			rte.dispatchTransaction(insertTr);

			if (resolved.type === 'error') {
				/* eslint-disable-next-line no-console */
				console.error('Error in handleFiles handler:', resolved.error);
			}
		};

		return [
			this.contribution(insertPointPlaceholderPlugin),
			this.contribution(
				new Plugin({
					props: {
						handlePaste: (view, event) => {
							const files = Array.from(event.clipboardData!.files);
							if (!files.length) return false;

							handleFiles(files, { type: 'selection' });
							return true;
						},
						handleDrop: (view, event, slice, moved) => {
							const files = Array.from(event.dataTransfer!.files);
							if (!files.length) return false;

							// Same logic as drop cursor to find drop position so that we insert where the drop cursor appears
							let target = view.posAtCoords({
								left: event.clientX,
								top: event.clientY,
							})!.pos;

							if (view.dragging && view.dragging.slice) {
								const point = dropPoint(
									view.state.doc,
									target,
									view.dragging.slice
								);
								if (point != null) target = point;
							}

							handleFiles(files, { type: 'pos', pos: target });
							return true;
						},
					},
				})
			),
		];
	}
}

export const RteFileHandlerFeature = featureFacade(RteFileHandlerFeatureImpl);
