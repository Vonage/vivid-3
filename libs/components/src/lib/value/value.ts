import { attr, observable, Observable } from '@microsoft/fast-element';
import { FormAssociatedValue } from './value.form-associated';

/**
 * Value is a non-visual component, whose purpose is to hold and form-associate a value for a parent component.
 * @event form-reset - Emitted when the parent form is reset.
 */
export class Value extends FormAssociatedValue {
	/**
	 * The key used to identify this component.
	 */
	@attr key?: string;

	/**
	 * @internal
	 */
	@observable _parentEl?: HTMLElement;

	/**
	 * @internal
	 */
	_parentElChanged(
		oldValue?: HTMLElement,
		newValue?: HTMLElement
	) {
		if (oldValue) {
			const notifier = Observable.getNotifier(oldValue);
			notifier.unsubscribe(
				this._parentElSubscriber,
				'disabled'
			);
		}
		if (newValue) {
			const notifier = Observable.getNotifier(newValue);
			notifier.subscribe(
				this._parentElSubscriber,
				'disabled',
			);
			this.#mirrorParentDisabledState(newValue);
		}
	}

	_parentElSubscriber = {
		handleChange: (parent: HTMLElement, _: string) => {
			this.#mirrorParentDisabledState(parent);
		}
	};

	#mirrorParentDisabledState(parent: HTMLElement) {
		this.disabled = 'disabled' in parent && Boolean(parent.disabled);
	}

	override connectedCallback() {
		super.connectedCallback();
		this._parentEl = this.parentElement!;
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._parentEl = undefined;
	}

	override formDisabledCallback() {
		// Ignore because we are using the parent element's disabled state.
	}

	override formResetCallback() {
		// Ignore because the parent element will handle resetting the value.
	}

	/**
	 * Updates the value of the component.
	 */
	updateValue(value: string) {
		this.value = value;
		this.$emit('input');
		this.$emit('change');
	}
}
