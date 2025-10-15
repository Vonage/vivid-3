/* eslint-disable max-len */
import {
	ExecutionContext,
	html,
	InlineTemplateDirective,
	ref,
	repeat,
	when,
} from '@microsoft/fast-element';
import { classNames, keyEnter } from '@microsoft/fast-web-utilities';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { VisuallyHidden } from '../visually-hidden/visually-hidden';
import { DialPad } from './dial-pad';

class DialPadButton {
	value: string;
	label: string | null;
	ariaLabel: string;
	icon: string;
	id: string;
	constructor(
		value: string,
		label: string | null,
		ariaLabel: string,
		icon: string,
		id: string
	) {
		this.value = value;
		this.label = label;
		this.ariaLabel = ariaLabel;
		this.icon = icon;
		this.id = id;
	}
}

const DIAL_PAD_BUTTONS = [
	new DialPadButton('1', '&nbsp;', 'digitOneLabel', 'one-solid', 'btn1'),
	new DialPadButton('2', 'ABC', 'digitTwoLabel', 'two-solid', 'btn2'),
	new DialPadButton('3', 'DEF', 'digitThreeLabel', 'three-solid', 'btn3'),
	new DialPadButton('4', 'GHI', 'digitFourLabel', 'four-solid', 'btn4'),
	new DialPadButton('5', 'JKL', 'digitFiveLabel', 'five-solid', 'btn5'),
	new DialPadButton('6', 'MNO', 'digitSixLabel', 'six-solid', 'btn6'),
	new DialPadButton('7', 'PQRS', 'digitSevenLabel', 'seven-solid', 'btn7'),
	new DialPadButton('8', 'TUV', 'digitEightLabel', 'eight-solid', 'btn8'),
	new DialPadButton('9', 'WXYZ', 'digitNineLabel', 'nine-solid', 'btn9'),
	new DialPadButton(
		'*',
		null,
		'digitAsteriskLabel',
		'asterisk-2-solid',
		'btnAsterisk'
	),
	new DialPadButton('0', '+', 'digitZeroLabel', 'zero-solid', 'btn0'),
	new DialPadButton(
		'#',
		null,
		'digitHashtagLabel',
		'hashtag-solid',
		'btnHashtag'
	),
];

const getClasses = ({ noInput }: DialPad) =>
	classNames('base', ['no-input', Boolean(noInput)]);

function handleKeyDown(x: DialPad, e: KeyboardEvent) {
	if (
		e.key === keyEnter &&
		!x.pending &&
		!x.disabled &&
		!x.callActive &&
		!x.noCall &&
		x.value.length > 0 &&
		e.target instanceof HTMLInputElement
	) {
		x._onDial();
	} else {
		const elementIndex = DIAL_PAD_BUTTONS.findIndex((x) => x.value === e.key);
		if (elementIndex > -1) {
			const digit: Button | null = x.shadowRoot!.querySelector('.digits')!
				.children[elementIndex] as Button;
			if (digit) {
				digit.active = true;
				setTimeout(() => {
					digit.active = false;
				}, 200);
			}
		}
	}
	return true;
}

function syncFieldAndPadValues(x: DialPad) {
	x.value = x._textFieldEl.value;
}

function stopPropagation(_: DialPad, { event: e }: ExecutionContext) {
	e.stopImmediatePropagation();
}

function deleteLastCharacter(dialPad: DialPad) {
	dialPad.value = dialPad.value.slice(0, -1);
	dialPad.$emit('input');
	dialPad.$emit('change');
	if (dialPad.value === '') {
		dialPad._textFieldEl?.focus();
	}
}

function renderTextField(
	textFieldTag: InlineTemplateDirective,
	buttonTag: InlineTemplateDirective
) {
	return html<DialPad>`<${textFieldTag} ${ref(
		'_textFieldEl'
	)} class="phone-field" internal-part type="tel"
        value="${(x) => x.value}" placeholder="${(x) => x.placeholder}"
            ?disabled="${(x) => x.disabled}" helper-text="${(x) =>
		x.helperText}" pattern="${(x) => x.pattern}"
            aria-label="${(x) => x.locale.dialPad.inputLabel}"
            @keydown="${(x, c) => handleKeyDown(x, c.event as KeyboardEvent)}"
            @input="${syncFieldAndPadValues}"
			@change="${syncFieldAndPadValues}"
			@focus="${stopPropagation}"
			@blur="${stopPropagation}"
			?autofocus="${(x) => x.autofocus}"
			>
         ${when(
						(x) => x.value && x.value.length && x.value.length > 0,
						html`<${buttonTag}
                slot="action-items"
								size='super-condensed'
								icon="backspace-line"
								aria-label="${(x) => x.deleteAriaLabel || x.locale.dialPad.deleteButtonLabel}"
								appearance='ghost'
								?disabled="${(x) => x.disabled || x.callActive}"
								@click="${(x) => deleteLastCharacter(x)}">
            </${buttonTag}>`
					)}
        </${textFieldTag}>`;
}

function onDigitClick(
	digit: DialPadButton,
	{ parent: dialPad, event }: { parent: DialPad; event: MouseEvent }
) {
	dialPad.value += digit.value;

	dialPad.$emit('keypad-click', event.currentTarget);
	dialPad.$emit('input');
	dialPad.$emit('change');
}

function renderDigits(
	buttonTag: InlineTemplateDirective,
	iconTag: InlineTemplateDirective
) {
	return html<DialPad>`
		${repeat(
			(_: DialPad) => DIAL_PAD_BUTTONS,
			html<DialPadButton>`
			<${buttonTag}
					  id="${(x) => x.id}"
					  value="${(x) => x.value}"
					  stacked
					  appearance="ghost-light"
					  shape="pill"
					  label="${(x) => (x.label === '&nbsp;' ? '\u00A0' : x.label)}"
					  size='condensed'
					  class="digit-btn"
						?autofocus="${(_, c) =>
							c.parent.autofocus && c.parent.noInput && c.index === 0}"
					  aria-label="${(x, c) => c.parent.locale.dialPad[x.ariaLabel]}"
					  ?disabled="${(_, c) => c.parent.disabled}"
					  @click="${onDigitClick}">
					  	<${iconTag} slot="icon"
									name="${(x) => x.icon}"
									class="digit-btn-num"></${iconTag}>
					</${buttonTag}>
		`,
			{
				positioning: true,
			}
		)}
	`;
}

function renderDialButton(buttonTag: InlineTemplateDirective) {
	return html<DialPad>`<${buttonTag} class="call-btn"
        size="expanded"
        appearance="filled"
        icon="${(x) => (x.callActive ? 'disable-call-line' : 'call-line')}"
        connotation="${(x) => (x.callActive ? 'alert' : 'cta')}"
        ?disabled="${(x) => x.disabled}"
		?pending="${(x) => x.pending}"
        @click="${(x) => x._onDial()}"
        label="${(x) =>
					x.callActive
						? x.endCallButtonLabel || x.locale.dialPad.endCallButtonLabel
						: x.callButtonLabel || x.locale.dialPad.callButtonLabel}">
    </${buttonTag}>`;
}

function renderErrorAnnouncement(visuallyHiddenTag: InlineTemplateDirective) {
	return html<DialPad>`<${visuallyHiddenTag} role="alert" aria-atomic="true">
		${(x) => `${x.locale.dialPad.errorLabel} ${x._errorAnnouncement}`}
	</${visuallyHiddenTag}>`;
}

export const DialPadTemplate = (context: VividElementDefinitionContext) => {
	const buttonTag = context.tagFor(Button);
	const iconTag = context.tagFor(Icon);
	const textFieldTag = context.tagFor(TextField);
	const visuallyHiddenTag = context.tagFor(VisuallyHidden);

	return html<DialPad>` <div class="${getClasses}">
		${when((x) => !x.noInput, renderTextField(textFieldTag, buttonTag))}
		<div class="digits">${renderDigits(buttonTag, iconTag)}</div>
		${when((x) => !x.noCall, renderDialButton(buttonTag))}
		${renderErrorAnnouncement(visuallyHiddenTag)}
	</div>`;
};
