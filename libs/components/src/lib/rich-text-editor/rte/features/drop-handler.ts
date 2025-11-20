import { Plugin } from 'prosemirror-state';
import {
	contributionPriority,
	featureFacade,
	RTEFeatureImpl,
} from '../feature';
import type { RTEInstanceImpl } from '../instance';
import type { RichTextEditor } from '../../rich-text-editor';

export interface RTEDropHandlerFeatureConfig {
	/**
	 * Called whenever the user drags content over the editor viewport.
	 * If it returns `true`, the editor will ignore this content.
	 */
	onViewportDragOver?: (event: DragEvent) => boolean;
	/**
	 * Called whenever the user drops content over the editor viewport.
	 */
	onViewportDrop?: (event: DragEvent) => void;
	/**
	 * Called whenever dragging over the viewport ends, including after a drop.
	 */
	onViewportDragFinish?: () => void;
}

export class RTEDropHandlerFeatureImpl extends RTEFeatureImpl {
	protected name = 'RTEDebugFeature';

	constructor(readonly config: RTEDropHandlerFeatureConfig) {
		super();
	}

	override getPlugins(rte: RTEInstanceImpl) {
		const dragOverResults = new WeakMap<Event, boolean>();
		let lastResult = false;

		const onDragOver = (event: DragEvent) => {
			const cachedResult = dragOverResults.get(event);
			if (cachedResult !== undefined) {
				return; // Don't call handler twice
			}
			lastResult = this.config.onViewportDragOver?.(event) ?? false;
		};

		const onDrop = (event: DragEvent) => {
			this.config.onViewportDrop?.(event);
			this.config.onViewportDragFinish?.();
		};

		const onDragEnd = () => {
			this.config.onViewportDragFinish?.();
		};

		// When moving between view and slotted content, enter + leave is fired so we ignore leave events immediately after enter
		let isEntering = false;
		const onDragEnter = () => {
			isEntering = true;
			window.setTimeout(() => (isEntering = false), 0);
		};

		const onDragLeave = () => {
			if (isEntering) {
				return;
			}
			this.config.onViewportDragFinish?.();
		};

		return [
			this.contribution(
				new Plugin({
					view: (view) => {
						const viewport = ((view.root as ShadowRoot).host as RichTextEditor)
							.editorViewportElement!;
						viewport.addEventListener('dragover', onDragOver);
						viewport.addEventListener('drop', onDrop);
						viewport.addEventListener('dragend', onDragEnd);
						viewport.addEventListener('dragenter', onDragEnter);
						viewport.addEventListener('dragleave', onDragLeave);
						return {
							destroy() {
								viewport.removeEventListener('dragover', onDragOver);
								viewport.removeEventListener('drop', onDrop);
								viewport.removeEventListener('dragend', onDragEnd);
								viewport.removeEventListener('dragenter', onDragEnter);
								viewport.removeEventListener('dragleave', onDragLeave);
							},
						};
					},
				})
			),
			this.contribution(
				new Plugin({
					props: {
						handleDOMEvents: {
							dragover: (view, event) => {
								const result = this.config.onViewportDragOver?.(event) ?? false;
								dragOverResults.set(event, result);
								lastResult = result;

								if (result) {
									event.stopImmediatePropagation(); // prevent dropcursor from receiving event
									event.preventDefault(); // prevent browser cursor
									return true;
								}
								return false;
							},
							drop: (view, event) => {
								return lastResult; // Prevent default handling
							},
						},
					},
				}),
				contributionPriority.high // Needs to run before dropcursor
			),
		];
	}
}

export const RTEDropHandlerFeature = featureFacade(RTEDropHandlerFeatureImpl);
