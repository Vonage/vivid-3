import { attr, observable } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { WithObservableLocale } from '../../shared/patterns';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { RTEInstance } from './rte/instance';
import { impl } from './rte/utils/impl';

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
		prevInstance?.[impl].destroyViewIfNeeded();
		this._initViewIfNeeded();
		prevInstance?.[impl].styles.removeStylesFrom(this.shadowRoot!);
		this.instance?.[impl].styles.addStylesTo(this.shadowRoot!);
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

	/**
	 * The viewport wraps the scrollable content of the editor.
	 */
	editorViewportElement?: HTMLElement;

	private _initViewIfNeeded() {
		const instance = this.instance?.[impl];
		if (instance && this.$fastController.isConnected && !instance.view) {
			this._syncStateIfNeeded();
			instance.createView(this._editorEl);
		}
	}

	private _destroyViewIfNeeded() {
		this.instance?.[impl].destroyViewIfNeeded();
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
		this.instance?.[impl].updateHostState({
			placeholder: this.placeholder,
			locale: this.locale,
			ctx: this._ctx,
		});
	}
}
