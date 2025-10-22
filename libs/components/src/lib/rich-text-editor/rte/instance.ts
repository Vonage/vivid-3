import { EditorState } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { type Constructable, ElementStyles } from '@microsoft/fast-element';
import type { EditorView } from 'prosemirror-view';
import type { Constructor } from '../../../shared/utils/mixins';
import type { Locale } from '../../../shared/localization/Locale';
import { RTEConfig } from './config';
import { hostBridgePlugin, type HostState } from './features/core';
import { RTEFeature } from './feature';
import type { RTEDocument } from './document';

export class RTEInstance {
	state: EditorState;
	readonly schema: Schema;
	readonly features: RTEFeature[];
	readonly styles: ElementStyles;

	getFeature<T extends RTEFeature>(constr: Constructor<T>): T {
		const f = this.config.featureMap.get(constr) as T;
		if (!f) {
			throw new Error(`Feature not found: ${constr.name}`);
		}
		return f;
	}

	constructor(readonly config: RTEConfig, initialDoc?: RTEDocument) {
		this.schema = config.schema;
		this.features = config.features;

		let doc = undefined;
		if (initialDoc) {
			doc = config.schema.nodeFromJSON({
				type: 'doc',
				content: initialDoc,
			});
		}

		this.state = EditorState.create({
			...(doc ? { doc } : {}),
			schema: config.schema,
			plugins: config.features
				.flatMap((feature) => feature.getPlugins(this))
				.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
				.map((p) => p.plugin),
		});

		this.styles = ElementStyles.create(
			config.features
				.flatMap((f) => f.getStyles())
				.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
				.map((s) => s.css)
		);
	}

	private view: EditorView | null = null;
	setView(view: EditorView | null) {
		this.view = view;
	}

	getDoc(): RTEDocument {
		return this.state.doc.toJSON().content;
	}

	setDoc(newDoc: RTEDocument) {
		const doc = this.schema.nodeFromJSON({
			type: 'doc',
			content: newDoc,
		});
		this.dispatchTransaction(
			this.tr.replaceWith(0, this.state.doc.content.size, doc)
		);
	}

	// --- Internals ---

	createComponent<T>(type: Constructor<T>): T {
		return document.createElement(
			this.hostState().ctx.tagFor(type as Constructable)
		) as T;
	}

	getLocale(): Locale {
		return this.hostState().locale;
	}

	get tr() {
		return this.state.tr;
	}

	dispatchTransaction(tr: any) {
		this.state = this.state.apply(tr);
		this.view?.updateState(this.state);
		return this.state;
	}

	hostState(): HostState {
		const state = hostBridgePlugin.getState(this.state);
		if (!state) {
			throw new Error('No host state available');
		}
		return state;
	}

	updateHostState(hostState: HostState) {
		this.dispatchTransaction(this.tr.setMeta(hostBridgePlugin, hostState));
	}
}
