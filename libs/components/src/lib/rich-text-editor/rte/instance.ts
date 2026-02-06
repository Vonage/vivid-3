import { AllSelection, EditorState, TextSelection } from 'prosemirror-state';
import { Fragment, type Node, Schema, Slice } from 'prosemirror-model';
import { type Constructable, ElementStyles } from '@microsoft/fast-element';
import { EditorView } from 'prosemirror-view';
import type { Constructor } from '../../../shared/utils/mixins';
import type { Locale } from '../../../shared/localization/Locale';
import { RteConfig, RteConfigImpl } from './config';
import { hostBridgePlugin, type HostState } from './features/internal/core';
import {
	type getPublicInterface,
	type RteFeature,
	type RteFeatureImpl,
	sortedContributions,
} from './feature';
import type { RteDocument, RteFragment } from './document';
import type { TextblockAttrs } from './utils/textblock-attrs';
import { RteHtmlParser } from './html-parser';
import { RteHtmlSerializer } from './html-serializer';
import { impl } from './utils/impl';

const parseDocument = (schema: Schema, doc?: RteDocument): Node => {
	const node = schema.topNodeType.createAndFill(
		null,
		doc ? Fragment.fromJSON(schema, doc.content) : null
	);
	if (!node) {
		throw new Error('Document could not be parsed');
	}
	node.check();
	return node;
};

export type RteInstanceOptions = {
	initialDocument?: RteDocument;
	/**
	 * Called whenever the document content changes.
	 */
	onChange?: () => void;
	/**
	 * Used when parsing foreign HTML (e.g., pasted or dropped content).
	 */
	foreignHtmlParser?: RteHtmlParser;
	/**
	 * Used when serializing content to foreign HTML (e.g., for copy/drag).
	 */
	foreignHtmlSerializer?: RteHtmlSerializer;
};

export class RteInstance {
	/// @internal
	[impl]: RteInstanceImpl;

	constructor(config: RteConfig, readonly options?: RteInstanceOptions) {
		this[impl] = new RteInstanceImpl(config, options);
	}

	/**
	 * Returns the current document state.
	 */
	getDocument(): RteDocument {
		return this[impl].state.doc.toJSON();
	}

	/**
	 * Reset the editor to its initial state. Optionally, an initial document can be provided.
	 */
	reset(initialDocument?: RteDocument) {
		this[impl].reset(initialDocument);
	}

	/**
	 * Replaces the current selection with the given content.
	 * If no text is selected, this inserts the content at the cursor position.
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
	) {
		const { state, tr, schema, dispatchTransaction } = this[impl];

		tr.replaceSelection(new Slice(Fragment.fromJSON(schema, content), 0, 0));
		tr.doc.check();

		const $from = tr.doc.resolve(tr.mapping.map(state.selection.from));
		const $to = tr.doc.resolve(tr.selection.to);

		const [$head, $anchor] =
			options?.cursorPlacement === 'start' ? [$from, $to] : [$to, $from];

		if (options?.selectContent) {
			tr.setSelection(
				state.selection instanceof AllSelection
					? new AllSelection(tr.doc)
					: TextSelection.between($anchor, $head)
			);
		} else {
			tr.setSelection(TextSelection.between($head, $head));
		}

		dispatchTransaction(tr);
	}

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
	) {
		const { state, tr, schema, dispatchTransaction } = this[impl];

		tr.replaceWith(
			0,
			state.doc.content.size,
			parseDocument(schema, newDocument)
		);

		if (options?.selectContent) {
			tr.setSelection(new AllSelection(tr.doc));
		} else if (options?.cursorPlacement === 'end') {
			tr.setSelection(TextSelection.atEnd(tr.doc));
		} else {
			tr.setSelection(TextSelection.atStart(tr.doc));
		}

		dispatchTransaction(tr);
	}

	/**
	 * Returns the public interface of a feature.
	 */
	feature: typeof getPublicInterface = (
		Feature: Constructor<RteFeature>,
		featureId?: string
	) => {
		return this[impl].getPublicInterface(Feature, featureId);
	};
}

export class RteInstanceImpl {
	state!: EditorState;
	readonly config: RteConfigImpl;
	readonly schema: Schema;
	readonly textblockAttrs: TextblockAttrs;
	readonly features: RteFeatureImpl[];
	readonly styles: ElementStyles;
	readonly foreignHtmlParser: RteHtmlParser;
	readonly foreignHtmlSerializer: RteHtmlSerializer;

	getFeature<T extends RteFeatureImpl>(name: string): T {
		const f = this.config.featureMap.get(name) as T;
		if (!f) {
			throw new Error(`Feature not found: ${name}`);
		}
		return f;
	}

	getPublicInterface(
		Feature: Constructor<RteFeature>,
		featureId?: string
	): any {
		const instances = this.config.featureFacadesMap.get(Feature);

		if (!instances || instances.length === 0) {
			throw new Error(`Feature not found`);
		}

		const isMultiInstance = instances[0].featureId !== undefined;

		if (isMultiInstance) {
			if (featureId === undefined) {
				throw new Error(`No featureId provided for multi-instance feature.`);
			}

			const instance = instances.find((f) => f.featureId === featureId);
			if (!instance) {
				throw new Error(`Feature with id "${featureId}" not found`);
			}
			return instance.getPublicInterface(this);
		}

		if (featureId !== undefined) {
			throw new Error(`Feature does not support featureId`);
		}

		return instances[0].getPublicInterface(this);
	}

	constructor(configFacade: RteConfig, readonly options?: RteInstanceOptions) {
		const config = configFacade[impl];
		this.config = config;
		this.schema = config.schema;
		this.textblockAttrs = config.textblockAttrs;
		this.features = config.features;
		this.foreignHtmlParser =
			options?.foreignHtmlParser ?? new RteHtmlParser(configFacade);
		this.foreignHtmlSerializer =
			options?.foreignHtmlSerializer ?? new RteHtmlSerializer(configFacade);

		this.styles = new ElementStyles(
			sortedContributions(config.features.flatMap((f) => f.getStyles()))
		);

		this.initState(options?.initialDocument);
	}

	protected initState(initialDoc?: RteDocument) {
		this.state = EditorState.create({
			doc: parseDocument(this.schema, initialDoc),
			schema: this.config.schema,
			plugins: sortedContributions(
				this.config.features.flatMap((feature) => feature.getPlugins(this))
			),
		});
	}

	reset(initialDocument?: RteDocument) {
		const currentHostState = hostBridgePlugin.getState(
			this.state
		) as HostState | null;
		this.initState(initialDocument);
		this.updateHostState(currentHostState);
		this.view?.updateState(this.state);
	}

	view: EditorView | null = null;

	createView(target: HTMLElement) {
		this.view = new EditorView(target, {
			state: this.state,
			dispatchTransaction: this.dispatchTransaction,
		});
	}

	destroyViewIfNeeded() {
		if (this.view) {
			this.view.destroy();
			this.view = null;
		}
	}

	createComponent<T>(type: Constructor<T>): T {
		return document.createElement(
			this.hostState().ctx.tagFor(type as Constructable, true)
		) as T;
	}

	getLocale(): Locale {
		return this.hostState().locale;
	}

	get tr() {
		return this.state.tr;
	}

	dispatchTransaction = (tr: any) => {
		const prevState = this.state;
		this.state = this.state.apply(tr);
		this.view?.updateState(this.state);
		if (prevState.doc !== this.state.doc) {
			this.options?.onChange?.();
		}
		return this.state;
	};

	hostState(): HostState {
		const state = hostBridgePlugin.getState(this.state);
		if (!state) {
			throw new Error('No host state available');
		}
		return state;
	}

	updateHostState(hostState: HostState | null) {
		this.dispatchTransaction(this.tr.setMeta(hostBridgePlugin, hostState));
	}
}
