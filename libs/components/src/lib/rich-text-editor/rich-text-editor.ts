import { observable } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { WithObservableLocale } from '../../shared/patterns';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { RteInstance } from './rte/instance';
import { impl } from './rte/utils/impl';

/**
 * @public
 * @component rich-text-editor
 * @slot editor-start - Displayed at the start of the scrollable editor area.
 * @slot editor-end - Displayed at the end of the scrollable editor area.
 * @slot status - Displayed between the editor viewport and the toolbar.
 * @slot text-color-picker - Color picker for the RteTextColorFeature.
 */
export class RichTextEditor extends WithObservableLocale(VividElement) {
	// --- Public Properties ---

	/**
	 * The editor instance. Without it, the editor will not render anything.
	 */
	@observable instance?: RteInstance;
	/**
	 * @internal
	 */
	instanceChanged(prevInstance?: RteInstance) {
		prevInstance?.[impl].destroyViewIfNeeded();
		this._initViewIfNeeded();
		prevInstance?.[impl].styles.removeStylesFrom(this.shadowRoot!);
		this.instance?.[impl].styles.addStylesTo(this.shadowRoot!);
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
			locale: this.locale,
			ctx: this._ctx,
		});
	}
}
