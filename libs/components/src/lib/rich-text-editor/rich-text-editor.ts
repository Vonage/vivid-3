import { attr, observable } from '@microsoft/fast-element';
import { EditorView } from 'prosemirror-view';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { WithObservableLocale } from '../../shared/patterns';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { RTEInstance } from './rte/instance';

/**
 * @public
 * @component rich-text-editor
 */
export class RichTextEditor extends WithObservableLocale(VividElement) {
	// --- Public Properties ---

	/**
	 * The editor instance. Without it, the editor will not render anything.
	 */
	@observable instance?: RTEInstance;
	/**
	 * @internal
	 */
	instanceChanged(prevInstance?: RTEInstance) {
		prevInstance?.setView(null);
		this._destroyViewIfNeeded();
		this._initViewIfNeeded();
		prevInstance?.styles.removeStylesFrom(this.shadowRoot!);
		this.instance?.styles.addStylesTo(this.shadowRoot!);
	}

	/**
	 * A placeholder text to display when the editor is empty.
	 */
	@attr placeholder?: string;
	/**
	 * @internal
	 */
	placeholderChanged() {
		this._syncStateIfNeeded();
	}

	// --- View management ---

	/**
	 * @internal
	 */
	_editorEl!: HTMLDivElement;

	private _view?: EditorView;

	private _initViewIfNeeded() {
		if (this.instance && this.$fastController.isConnected && !this._view) {
			const instance = this.instance;
			this._syncStateIfNeeded();
			const view = new EditorView(this._editorEl, {
				state: instance.state,
				dispatchTransaction(transaction) {
					instance.dispatchTransaction(transaction);
				},
			});
			instance.setView(view);
			this._view = view;
		}
	}

	private _destroyViewIfNeeded() {
		if (this._view) {
			this._view.destroy();
			this._view = undefined;
		}
	}

	override connectedCallback() {
		super.connectedCallback();
		this._initViewIfNeeded();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._destroyViewIfNeeded();
	}

	// --- State synchronization ---

	/**
	 * @internal
	 */
	override localeChanged() {
		this._syncStateIfNeeded();
	}

	/**
	 * @internal
	 */
	_ctx!: VividElementDefinitionContext;

	private _syncStateIfNeeded() {
		if (this.instance) {
			this.instance.updateHostState({
				placeholder: this.placeholder,
				locale: this.locale,
				ctx: this._ctx,
			});
		}
	}
}
