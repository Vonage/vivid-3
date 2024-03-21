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
import type { DialPad } from './dial-pad';

const getClasses = (_: DialPad) => classNames('base');

function handleKeyDown(x: DialPad, e: KeyboardEvent) {
	if (e.key === keyEnter) {
		x._onDial();
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
            aria-label="${(x) =>
							x.inputAriaLabel || x.locale.dialPad.inputLabel}"
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

function renderDigits(buttonTag: string) {
	return html<DialPad>`
        <${buttonTag} value='1' icon='one-solid' stacked shape='pill' label="&nbsp;" size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.digitOneAriaLabel || x.locale.dialPad.digitOneLabel}" ?disabled="${(
		x
	) => x.disabled}"></${buttonTag}>
        <${buttonTag} value='2' icon='two-solid' stacked shape='pill' label='ABC' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.digitTwoAriaLabel || x.locale.dialPad.digitTwoLabel}" ?disabled="${(
		x
	) => x.disabled}"></${buttonTag}>
        <${buttonTag} value='3' icon='three-solid' stacked shape='pill' label='DEF' size='condensed' class="digit-btn" aria-label="${(
		x
	) =>
		x.digitThreeAriaLabel || x.locale.dialPad.digitThreeLabel}" ?disabled="${(
		x
	) => x.disabled}"></${buttonTag}>
        <${buttonTag} value='4' icon='four-solid' stacked shape='pill' label='GHI' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.digitFourAriaLabel || x.locale.dialPad.digitFourLabel}" ?disabled="${(
		x
	) => x.disabled}"></${buttonTag}>
        <${buttonTag} value='5' icon='five-solid' stacked shape='pill' label='JKL' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.digitFiveAriaLabel || x.locale.dialPad.digitFiveLabel}" ?disabled="${(
		x
	) => x.disabled}"></${buttonTag}>
        <${buttonTag} value='6' icon='six-solid' stacked shape='pill' label='MNO' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.digitSixAriaLabel || x.locale.dialPad.digitSixLabel}" ?disabled="${(
		x
	) => x.disabled}"></${buttonTag}>
        <${buttonTag} value='7' icon='seven-solid' stacked shape='pill' label='PQRS' size='condensed' class="digit-btn" aria-label="${(
		x
	) =>
		x.digitSevenAriaLabel || x.locale.dialPad.digitSevenLabel}" ?disabled="${(
		x
	) => x.disabled}"></${buttonTag}>
        <${buttonTag} value='8' icon='eight-solid' stacked shape='pill' label='TUV' size='condensed' class="digit-btn" aria-label="${(
		x
	) =>
		x.digitEightAriaLabel || x.locale.dialPad.digitEightLabel}" ?disabled="${(
		x
	) => x.disabled}"></${buttonTag}>
        <${buttonTag} value='9' icon='nine-solid' stacked shape='pill' label='WXYZ' size='condensed' class="digit-btn" aria-label="${(
		x
	) => x.digitNineAriaLabel || x.locale.dialPad.digitNineLabel}" ?disabled="${(
		x
	) => x.disabled}"></${buttonTag}>
        <${buttonTag} value='*' icon='asterisk-2-solid' shape='pill' stacked size='condensed' class="digit-btn" aria-label="${(
		x
	) =>
		x.digitAsteriskAriaLabel ||
		x.locale.dialPad.digitAsteriskLabel}" ?disabled="${(x) =>
		x.disabled}"></${buttonTag}>
        <${buttonTag} value='0' icon='zero-solid' stacked label='+' size='condensed' class="digit-btn" aria-label=${(
		x
	) => x.digitZeroAriaLabel || x.locale.dialPad.digitZeroLabel} ?disabled="${(
		x
	) => x.disabled}"></${buttonTag}>
        <${buttonTag} value='#' icon='hashtag-solid' stacked size='condensed' class="digit-btn" aria-label=${(
		x
	) =>
		x.digitHashtagAriaLabel ||
		x.locale.dialPad.digitHashtagLabel} ?disabled="${(x) =>
		x.disabled}"></${buttonTag}>
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
	const textFieldTag = context.tagFor(TextField);

	return html<DialPad>` <div class="${getClasses}">
		${renderTextField(textFieldTag, buttonTag)}
		<div class="digits" @click="${(x, c) => x._onDigit(c.event)}">
			${renderDigits(buttonTag)}
		</div>
		${when((x) => !x.noCall, renderDialButton(buttonTag))}
	</div>`;
};
