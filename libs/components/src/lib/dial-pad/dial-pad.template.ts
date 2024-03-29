/* eslint-disable max-len */
import { html, ref, when } from '@microsoft/fast-element';
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

const getClasses = (_: DialPad) => classNames('base');

function handleKeyDown(x: DialPad, e: KeyboardEvent) {
	if (e.key === keyEnter) {
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

function renderTextField(textFieldTag: string, buttonTag: string) {
	return html<DialPad>`<${textFieldTag} ${ref(
		'_textFieldEl'
	)} class="phone-field" internal-part
        value="${(x) => x.value}" placeholder="${(x) => x.placeholder}" 
            ?disabled="${(x) => x.disabled}" helper-text="${(x) =>
		x.helperText}" pattern="${(x) => x.pattern}"
            aria-label="${(x) => x.locale.dialPad.inputLabel}"
            @keydown="${(x, c) => handleKeyDown(x, c.event as KeyboardEvent)}"
            @input="${(x) => x._handleInput()}" @change="${(x) =>
		x._handleChange()}" 
            @blur="${(x) => x._handleBlur()}" @focus="${(x) =>
		x._handleFocus()}">
         ${when(
						(x) => x.value && x.value.length && x.value.length > 0,
						html`<${buttonTag} 
                slot="action-items" size='super-condensed' icon="backspace-line" aria-label="${(
									x
								) => x.deleteAriaLabel || x.locale.dialPad.deleteLabel}" 
                appearance='ghost' ?disabled="${(x) => x.disabled}" @click="${(
							x
						) => x._deleteLastCharacter()}">
            </${buttonTag}>`
					)}
        </${textFieldTag}>`;
}

function renderDigits(buttonTag: string, iconTag: string) {
	return html<DialPad>`
        <${buttonTag} id='btn1' value='1' stacked label="&nbsp;" size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitOneLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='one-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn2' value='2' stacked label='ABC' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitTwoLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='two-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn3' value='3' stacked label='DEF' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitThreeLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='three-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn4' value='4' stacked label='GHI' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitFourLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='four-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn5' value='5' stacked label='JKL' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitFiveLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='five-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
		<${buttonTag} id='btn6' value='6' stacked label='MNO' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitSixLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='six-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn7' value='7' stacked label='PQRS' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitSevenLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='seven-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn8' value='8' stacked label='TUV' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitEightLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='eight-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn9' value='9' stacked label='WXYZ' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitNineLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='nine-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btnAsterisk' value='*' stacked size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.locale.dialPad.digitAsteriskLabel}" ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='asterisk-2-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btn0' value='0' stacked label='+' size='condensed' class="digit-btn" aria-label=${(
		x
	) => x.locale.dialPad.digitZeroLabel} ?disabled="${(x) =>
		x.disabled}" @click="${(x, c) =>
		x._onDigit(
			c.event
		)}"><${iconTag} slot='icon' name='zero-solid' class='digit-btn-num'></${iconTag}></${buttonTag}>
        <${buttonTag} id='btnHashtag' value='#' stacked size='condensed' class="digit-btn" aria-label=${(
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
        @click="${(x) => x._onDial()}"
        label="${(x) =>
					x.callActive
						? x.locale.dialPad.endCallButtonLabel
						: x.locale.dialPad.callButtonLabel}">
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
		${renderTextField(textFieldTag, buttonTag)}
		<div class="digits">${renderDigits(buttonTag, iconTag)}</div>
		${when((x) => !x.noCall, renderDialButton(buttonTag))}
	</div>`;
};
