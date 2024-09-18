/* eslint-disable max-len */
import { ExecutionContext, html, ref, when } from '@microsoft/fast-element';
import { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { keyEnter } from '@microsoft/fast-web-utilities';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import { Icon } from '../icon/icon';
import type { DialPad } from './dial-pad';

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
		const key = e.key === '*' ? 'Asterisk' : e.key === '#' ? 'Hashtag' : e.key;
		const digit: Button | null = x.shadowRoot!.querySelector(`#btn${key}`);
		if (digit) {
			digit.active = true;
			setTimeout(() => {
				digit.active = false;
			}, 200);
		}
	}
	return true;
}

function eventHandlerFactory(eventName: 'input' | 'change' | 'blur' | 'focus') {
	return (x: DialPad, {event: e}: ExecutionContext) => {
		e?.stopImmediatePropagation();
		x.$emit(eventName);
		return false;
	}
}

function renderTextField(textFieldTag: string, buttonTag: string) {
	return html<DialPad>`<${textFieldTag} ${ref(
		'_textFieldEl'
	)} class="phone-field" internal-part type="tel"
        value="${(x) => x.value}" placeholder="${(x) => x.placeholder}"
            ?disabled="${(x) => x.disabled}" helper-text="${(x) =>
		x.helperText}" pattern="${(x) => x.pattern}"
            aria-label="${(x) => x.locale.dialPad.inputLabel}"
            @keydown="${(x, c) => handleKeyDown(x, c.event as KeyboardEvent)}"
            @input="${eventHandlerFactory('input')}" 
			@change="${eventHandlerFactory('change')}"
            @blur="${eventHandlerFactory('blur')}"
			@focus="${eventHandlerFactory('focus')}">
         ${when(
						(x) => x.value && x.value.length && x.value.length > 0,
						html`<${buttonTag}
                slot="action-items" size='super-condensed' icon="backspace-line" aria-label="${(
									x
								) => x.deleteAriaLabel || x.locale.dialPad.deleteLabel}"
								appearance='ghost' ?disabled="${(x) => x.disabled || x.callActive}" @click="${(
							x
						) => x._deleteLastCharacter()}">
            </${buttonTag}>`
					)}
        </${textFieldTag}>`;
}

function renderDigits(buttonTag: string, iconTag: string) {
	return html<DialPad>`
        <${buttonTag} id='btn1' value='1' stacked appearance="ghost-light" shape="pill" label="&nbsp;" size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitOneLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='one-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn2' value='2' stacked appearance="ghost-light" shape="pill" label='ABC' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitTwoLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='two-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn3' value='3' stacked appearance="ghost-light" shape="pill" label='DEF' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitThreeLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='three-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn4' value='4' stacked appearance="ghost-light" shape="pill" label='GHI' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitFourLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='four-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn5' value='5' stacked appearance="ghost-light" shape="pill" label='JKL' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitFiveLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='five-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
		<${buttonTag} id='btn6' value='6' stacked appearance="ghost-light" shape="pill" label='MNO' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitSixLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='six-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn7' value='7' stacked appearance="ghost-light" shape="pill" label='PQRS' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitSevenLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='seven-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn8' value='8' stacked appearance="ghost-light" shape="pill" label='TUV' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitEightLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='eight-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn9' value='9' stacked appearance="ghost-light" shape="pill" label='WXYZ' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitNineLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='nine-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btnAsterisk' value='*' appearance="ghost-light" shape="pill" stacked size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitAsteriskLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='asterisk-2-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn0' value='0' stacked appearance="ghost-light" shape="pill" label='+' size='condensed' class="digit-btn" aria-label=${(
		x
	) => x.locale.dialPad.digitZeroLabel} ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='zero-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btnHashtag' value='#' stacked appearance="ghost-light" shape="pill" size='condensed' class="digit-btn" aria-label=${(
		x
	) => x.locale.dialPad.digitHashtagLabel} ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='hashtag-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
    `;
}

function renderDialButton(buttonTag: string) {
	return html<DialPad>`<${buttonTag} class='call-btn'
        size='expanded'
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

/**
 * The template for the DialPad component.
 *
 * @param context - element definition context
 * @public
 */
export const DialPadTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<DialPad> = (context: ElementDefinitionContext) => {
	const buttonTag = context.tagFor(Button);
	const iconTag = context.tagFor(Icon);
	const textFieldTag = context.tagFor(TextField);

	return html<DialPad>` <div class="${getClasses}">
		${when((x) => !x.noInput, renderTextField(textFieldTag, buttonTag))}
		<div class="digits">${renderDigits(buttonTag, iconTag)}</div>
		${when((x) => !x.noCall, renderDialButton(buttonTag))}
	</div>`;
};
