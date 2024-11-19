import { attr, observable } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import {
	keyArrowDown,
	keyArrowUp,
	keyEnter,
	Orientation,
} from '@microsoft/fast-web-utilities';
import {
	keyArrowLeft,
	keyArrowRight,
} from '@microsoft/fast-web-utilities/dist/key-codes';
import type { EventListener } from 'video.js/dist/types/event-target';
import type { Radio } from '../radio/radio';

/**
 * @public
 * @component radio-group
 * @slot - Default slot.
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the value changes
 * @vueModel modelValue value change `(event.target as HTMLInputElement).value`
 */
export class RadioGroup extends FoundationElement {
	/**
	 * Indicates the group's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * When true, the child radios will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ attribute: 'readonly', mode: 'boolean' })
	readOnly!: boolean;

	/**
	 * @internal
	 */
	readOnlyChanged() {
		this.slottedRadioButtons.forEach((radio) => {
			if (this.readOnly) {
				radio.readOnly = true;
			} else {
				radio.readOnly = false;
			}
		});
	}

	/**
	 * Disables the radio group and child radios.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ attribute: 'disabled', mode: 'boolean' })
	disabled!: boolean;
	/**
	 * @internal
	 */
	disabledChanged() {
		this.slottedRadioButtons.forEach((radio) => {
			if (this.disabled) {
				radio.disabled = true;
			} else {
				radio.disabled = false;
			}
		});
	}

	/**
	 * The name of the radio group. Setting this value will set the name value
	 * for all child radio elements.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: name
	 */
	@attr name!: string;
	nameChanged(): void {
		this.slottedRadioButtons.forEach((radio) => {
			radio.setAttribute('name', this.name);
		});
	}

	/**
	 * The value of the checked radio
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: value
	 */
	@attr value!: string;
	/**
	 * @internal
	 */
	valueChanged(): void {
		this.slottedRadioButtons.forEach((radio) => {
			if (radio.value === this.value) {
				radio.checked = true;
			}
		});
		this.$emit('change');
	}

	/**
	 * The orientation of the group
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: orientation
	 */
	@attr orientation: Orientation | 'horizontal' | 'vertical' =
		// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
		Orientation.horizontal;

	/**
	 * @internal
	 */
	@observable
	slottedRadioButtons: Radio[] = [];

	get #focusableRadioButtons() {
		return this.slottedRadioButtons.filter((radio) => !radio.disabled);
	}

	/**
	 * @internal
	 */
	slottedRadioButtonsChanged() {
		if (this.slottedRadioButtons && this.slottedRadioButtons.length > 0) {
			this.setupRadioButtons();
		}
	}

	private get isInsideToolbar(): boolean {
		return !!this.closest('[role="toolbar"]');
	}

	/**
	 * @internal
	 */
	override connectedCallback() {
		super.connectedCallback();
		this.setupRadioButtons();
	}

	override disconnectedCallback() {
		this.slottedRadioButtons.forEach((radio) => {
			radio.removeEventListener(
				'change',
				this.radioChangeHandler as EventListener
			);
		});
	}

	private setupRadioButtons(): void {
		let foundMatchingVal = false;
		for (const radio of this.slottedRadioButtons) {
			if (this.name !== undefined) {
				radio.setAttribute('name', this.name);
			}

			if (this.disabled) {
				radio.disabled = true;
			}

			if (this.readOnly) {
				radio.readOnly = true;
			}

			if (this.value && this.value === radio.value) {
				radio.checked = true;
				this.#setTabRovingTarget(radio);
				foundMatchingVal = true;
			} else {
				radio.checked = false;
			}
			radio.addEventListener(
				'change',
				this.radioChangeHandler as EventListener
			);
		}

		if (this.value === undefined && this.slottedRadioButtons.length > 0) {
			const checkedRadios = this.slottedRadioButtons.filter((radio: Radio) =>
				radio.hasAttribute('checked')
			);
			if (checkedRadios.length > 0 && !foundMatchingVal) {
				const lastCheckedRadio = checkedRadios[checkedRadios.length - 1];
				lastCheckedRadio.checked = true;
				this.#setTabRovingTarget(lastCheckedRadio);
			} else {
				this.#setTabRovingTarget(this.slottedRadioButtons[0]);
			}
		}
	}

	private radioChangeHandler = (e: CustomEvent): boolean | void => {
		const changedRadio = e.target as Radio;

		if (changedRadio.checked) {
			this.slottedRadioButtons.forEach((radio) => {
				if (radio !== changedRadio) {
					radio.checked = false;
				}
			});
			this.value = changedRadio.value;
			this.#setTabRovingTarget(changedRadio);
		}
		e.stopPropagation();
	};

	private moveToRadioByIndex = (group: Radio[], index: number) => {
		const radio = group[index];
		if (!this.isInsideToolbar && !radio.readOnly) {
			radio.checked = true;
		}
		radio.focus();
	};

	private moveRightOffGroup = () => {
		(this.nextElementSibling as HTMLElement)?.focus();
	};

	private moveLeftOffGroup = () => {
		(this.previousElementSibling as HTMLElement)?.focus();
	};

	/**
	 * @internal
	 */
	focusInHandler(e: FocusEvent) {
		this.#setTabRovingTarget(e.target as Radio);
	}

	#setTabRovingTarget(radio: Radio) {
		radio.setAttribute('tabindex', '0');
		for (const slottedRadio of this.slottedRadioButtons) {
			if (slottedRadio !== radio) {
				slottedRadio.setAttribute('tabindex', '-1');
			}
		}
	}

	private checkFocusedRadio(target: Radio) {
		if (!target.readOnly) {
			target.checked = true;
		}
	}

	private moveRight = (e: KeyboardEvent): void => {
		const radio = e.target as Radio;
		const group = this.#focusableRadioButtons;
		let index = 0;

		index = group.indexOf(radio) + 1;

		if (
			index === group.length &&
			this.isInsideToolbar &&
			e.key === keyArrowRight
		) {
			this.moveRightOffGroup();
			return;
		}

		if (index === group.length) {
			index = 0;
		}

		this.moveToRadioByIndex(group, index);
	};

	private moveLeft = (e: KeyboardEvent): void => {
		const radio = e.target as Radio;
		const group = this.#focusableRadioButtons;
		let index = group.indexOf(radio) - 1;

		if (this.isInsideToolbar && e.key === keyArrowLeft && index < 0) {
			this.moveLeftOffGroup();
			return;
		}

		index = index < 0 ? group.length - 1 : index;

		this.moveToRadioByIndex(group, index);
	};

	/**
	 * keyboard handling per https://w3c.github.io/aria-practices/#for-radio-groups-not-contained-in-a-toolbar
	 * navigation is different when there is an ancestor with role='toolbar'
	 *
	 * @internal
	 */
	keydownHandler = (e: KeyboardEvent): boolean | void => {
		switch (e.key) {
			case keyEnter:
				this.checkFocusedRadio(e.target as Radio);
				break;

			case keyArrowRight:
			case keyArrowDown:
				this.moveRight(e);
				break;

			case keyArrowLeft:
			case keyArrowUp:
				this.moveLeft(e);
				break;

			default:
				return true;
		}
	};
}
