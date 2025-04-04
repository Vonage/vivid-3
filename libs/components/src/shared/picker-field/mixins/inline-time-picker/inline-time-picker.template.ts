import { html, repeat, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { scrollIntoView } from '../../../utils/scrollIntoView';
import { ignoreEventInFocusTraps } from '../../../patterns';
import { type PickerOption } from './picker-option';
import type { InlineTimePicker } from './inline-time-picker';
import {
	type Column,
	HoursColumn,
	MeridiesColumn,
	MinutesColumn,
	SecondsColumn,
} from './columns';

export const shouldDisplaySecondsPicker = (x: InlineTimePicker) =>
	x.secondsStep !== undefined;
export const shouldDisplay12hClock = (x: InlineTimePicker) => x.clock === '12h';

const onPickerOptionClick = (
	x: InlineTimePicker,
	column: Column,
	optionValue: string
) => {
	emitChange(x, column.updatedValue(x, optionValue));

	scrollToOption(x, column.id, optionValue, 'start');

	const nextPickerEl = x.shadowRoot!.querySelector(
		`#${column.id} + .picker`
	) as HTMLElement | null;
	if (nextPickerEl) {
		nextPickerEl.focus();
	} else {
		x.$emit('last-column-selected', undefined, {
			bubbles: false,
		});
	}
};

const onPickerKeyDown = (
	x: InlineTimePicker,
	column: Column,
	event: KeyboardEvent
) => {
	const options = column.getOptions(x);
	const selectedValue = column.getSelectedOptionValue(x);

	const offset = {
		ArrowUp: -1,
		ArrowDown: 1,
	}[event.key];

	if (offset) {
		event.preventDefault();
		const index = options.findIndex((h) => h.value === selectedValue);
		const newRawIndex = index === -1 ? 0 : index + offset;
		const newIndex = (newRawIndex + options.length) % options.length;
		const newValue = options[newIndex].value;
		emitChange(x, column.updatedValue(x, newValue));
		scrollToOption(x, column.id, newValue, 'nearest');
	}

	return true;
};

export const scrollToOption = (
	x: InlineTimePicker,
	picker: string,
	optionValue: string,
	position: 'nearest' | 'start'
) => {
	const element = x.shadowRoot!.querySelector(
		`#${picker}-${optionValue}`
	) as HTMLElement | null;
	if (!element) {
		return;
	}

	scrollIntoView(element, element.parentElement!, position);
};

const onBaseKeyDown = (x: InlineTimePicker, event: KeyboardEvent) => {
	if (event.key === 'Tab') {
		const focusableElements = x.shadowRoot!.querySelectorAll('.picker');
		const terminalElement = event.shiftKey
			? focusableElements[0]
			: focusableElements[focusableElements.length - 1];

		if (x.shadowRoot!.activeElement !== terminalElement) {
			// TrappedFocus needs to ignore events that will not move focus out of
			// the inline time picker
			ignoreEventInFocusTraps(event);
		}
	}
	return true;
};

const emitChange = (x: InlineTimePicker, time: string) => {
	x.$emit('change', time, { bubbles: false, composed: false });
};

/**
 * Renders a picker for hours/minutes/etc. using a listbox pattern.
 */
const renderPicker = (column: Column) => {
	return html<InlineTimePicker>`<ul
		id="${column.id}"
		class="picker"
		role="listbox"
		tabindex="0"
		aria-label="${column.getLabel}"
		aria-activedescendant="${(x) =>
			column.getSelectedOptionValue(x)
				? `${column.id}-${column.getSelectedOptionValue(x)}`
				: undefined}"
		@keydown="${(x, c) => onPickerKeyDown(x, column, c.event as KeyboardEvent)}"
	>
		${repeat(
			(x) => column.getOptions(x),
			html<PickerOption>`<li
				id="${(x) => `${column.id}-${x.value}`}"
				class="${(x, c) =>
					classNames('option', [
						'selected',
						column.getSelectedOptionValue(c.parent) === x.value,
					])}"
				aria-selected="${(x, c) =>
					column.getSelectedOptionValue(c.parent) === x.value}"
				role="option"
				@click="${(x, c) => onPickerOptionClick(c.parent, column, x.value)}"
			>
				${(x) => x.label}
			</li>`
		)}
	</ul>`;
};

export const InlineTimePickerTemplate = () => {
	return html<InlineTimePicker>`<div
		class="time-pickers"
		@keydown="${(x, { event }) => onBaseKeyDown(x, event as KeyboardEvent)}"
	>
		${renderPicker(HoursColumn)} ${renderPicker(MinutesColumn)}
		${when(shouldDisplaySecondsPicker, renderPicker(SecondsColumn))}
		${when(shouldDisplay12hClock, renderPicker(MeridiesColumn))}
	</div>`;
};
