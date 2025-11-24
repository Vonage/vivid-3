import { AllSelection, EditorState, TextSelection } from 'prosemirror-state';
import { Fragment, type Node, Schema, Slice } from 'prosemirror-model';
import { type Constructable, ElementStyles } from '@microsoft/fast-element';
import { EditorView } from 'prosemirror-view';
import type { Constructor } from '../../../shared/utils/mixins';
import type { Locale } from '../../../shared/localization/Locale';
import { RTEConfig, RTEConfigImpl } from './config';
import { hostBridgePlugin, type HostState } from './features/core';
import { RTEFeatureImpl, sortedContributions } from './feature';
import type { RTEDocument, RTEFragment } from './document';
import type { TextblockAttrs } from './utils/textblock-attrs';
import { RTEHtmlParser } from './html-parser';
import { RTEHtmlSerializer } from './html-serializer';
import { impl } from './utils/impl';

const parseDocument = (schema: Schema, doc?: RTEDocument): Node => {
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

export type RTEInstanceOptions = {
	initialDocument?: RTEDocument;
	/**
	 * Called whenever the document content changes.
	 */
	onChange?: () => void;
	/**
	 * Used when parsing foreign HTML (e.g., pasted or dropped content).
	 */
	foreignHtmlParser?: RTEHtmlParser;
	/**
	 * Used when serializing content to foreign HTML (e.g., for copy/drag).
	 */
	foreignHtmlSerializer?: RTEHtmlSerializer;
};

export class RTEInstance {
	/// @internal
	[impl]: RTEInstanceImpl;

	constructor(config: RTEConfig, readonly options?: RTEInstanceOptions) {
		this[impl] = new RTEInstanceImpl(config, options);
	}

	/**
	 * Returns the current document state.
	 */
	getDocument(): RTEDocument {
		return this[impl].state.doc.toJSON();
	}

	/**
	 * Reset the editor to its initial state. Optionally, an initial document can be provided.
	 */
	reset(initialDocument?: RTEDocument) {
		this[impl].reset(initialDocument);
	}

	/**
	 * Replaces the current selection with the given content.
	 * If no text is selected, this inserts the content at the cursor position.
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
}

export class RTEInstanceImpl {
	state!: EditorState;
	readonly config: RTEConfigImpl;
	readonly schema: Schema;
	readonly textblockAttrs: TextblockAttrs;
	readonly features: RTEFeatureImpl[];
	readonly styles: ElementStyles;
	readonly foreignHtmlParser: RTEHtmlParser;
	readonly foreignHtmlSerializer: RTEHtmlSerializer;

	getFeature<T extends RTEFeatureImpl>(constr: Constructor<T>): T {
		const f = this.config.featureMap.get(constr) as T;
		if (!f) {
			throw new Error(`Feature not found: ${constr.name}`);
		}
		return f;
	}

	constructor(configFacade: RTEConfig, readonly options?: RTEInstanceOptions) {
		const config = configFacade[impl];
		this.config = config;
		this.schema = config.schema;
		this.textblockAttrs = config.textblockAttrs;
		this.features = config.features;
		this.foreignHtmlParser =
			options?.foreignHtmlParser ?? new RTEHtmlParser(configFacade);
		this.foreignHtmlSerializer =
			options?.foreignHtmlSerializer ?? new RTEHtmlSerializer(configFacade);

		this.styles = new ElementStyles(
			sortedContributions(config.features.flatMap((f) => f.getStyles()))
		);

		this.initState(options?.initialDocument);
	}

	protected initState(initialDoc?: RTEDocument) {
		this.state = EditorState.create({
			doc: parseDocument(this.schema, initialDoc),
			schema: this.config.schema,
			plugins: sortedContributions(
				this.config.features.flatMap((feature) => feature.getPlugins(this))
			),
		});
	}

	reset(initialDocument?: RTEDocument) {
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
