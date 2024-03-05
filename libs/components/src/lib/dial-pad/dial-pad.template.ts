/* eslint-disable max-len */
import { html, ref, when } from '@microsoft/fast-element';
import { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import type { DialPad } from './dial-pad';

const getClasses = (_: DialPad) => classNames(
	'base',
);

function renderTextField(textFieldTag: string, buttonTag: string) {
	return html<DialPad>`<${textFieldTag} ${ref('_textFieldEl')} class="phone-field" 
            appearance="ghost" value="${x => x.value}" placeholder="${x => x.placeholder}" 
            ?disabled="${x => x.disabled}" helper-text="${x => x.helperText}" pattern="${x => x.pattern}">
         ${when(x => (x.value?.length && x.value?.length > 0), html`<${buttonTag} 
                slot="action-items" size='condensed' icon="backspace-line" aria-label='clear field' 
                appearance='ghost' ?disabled="${x => x.disabled}" @click="${x => x.clearField()}">
            </${buttonTag}>`)}
        </${textFieldTag}>`;
}

function renderDigits(buttonTag: string) {
	return html<DialPad>`
        <${buttonTag} value='1' icon='one-solid' stacked label="&nbsp;" size='condensed' class="digit-btn" aria-label="1" ?disabled="${x => x.disabled}"></${buttonTag}>
        <${buttonTag} value='2' icon='two-solid' stacked label='ABC' size='condensed' class="digit-btn" aria-label="2 ABC" ?disabled="${x => x.disabled}"></${buttonTag}>
        <${buttonTag} value='3' icon='three-solid' stacked label='DEF' size='condensed' class="digit-btn" aria-label="3 DEF" ?disabled="${x => x.disabled}"></${buttonTag}>
        <${buttonTag} value='4' icon='four-solid' stacked label='GHI' size='condensed' class="digit-btn" aria-label="4 GHI" ?disabled="${x => x.disabled}"></${buttonTag}>
        <${buttonTag} value='5' icon='five-solid' stacked label='JKL' size='condensed' class="digit-btn" aria-label="5 JKL" ?disabled="${x => x.disabled}"></${buttonTag}>
        <${buttonTag} value='6' icon='six-solid' stacked label='MNO' size='condensed' class="digit-btn" aria-label="6 MNO" ?disabled="${x => x.disabled}"></${buttonTag}>
        <${buttonTag} value='7' icon='seven-solid' stacked label='PQRS' size='condensed' class="digit-btn" aria-label="7 PQRS" ?disabled="${x => x.disabled}"></${buttonTag}>
        <${buttonTag} value='8' icon='eight-solid' stacked label='TUV' size='condensed' class="digit-btn" aria-label="8 TUV" ?disabled="${x => x.disabled}"></${buttonTag}>
        <${buttonTag} value='9' icon='nine-solid' stacked label='WXYZ' size='condensed' class="digit-btn" aria-label="9 WXYZ" ?disabled="${x => x.disabled}"></${buttonTag}>
        <${buttonTag} value='*' icon='asterisk-2-solid' stacked size='condensed' class="digit-btn" aria-label="asterisk" ?disabled="${x => x.disabled}"></${buttonTag}>
        <${buttonTag} value='0' icon='zero-solid' stacked label='+' size='condensed' class="digit-btn" aria-label="0 plus" ?disabled="${x => x.disabled}"></${buttonTag}>
        <${buttonTag} value='#' icon='hashtag-solid' stacked size='condensed' class="digit-btn" aria-label="hashtag" ?disabled="${x => x.disabled}"></${buttonTag}>
    `;
}

function renderDialButton(buttonTag: string) {
	return html<DialPad>`<${buttonTag} class='call-btn' size='expanded' 
        appearance="filled" icon='call-line' label='Dial' 
        connotation="${x => x.active ? 'alert' : 'cta'}" ?disabled="${x => x.disabled}">
    </${buttonTag}>`;
}

/**
 * The template for the DialPad component.
 *
 * @param context - element definition context
 * @public
 */
export const DialPadTemplate: (context: ElementDefinitionContext, definition: FoundationElementDefinition
) => ViewTemplate<DialPad> = (context: ElementDefinitionContext) => {
	const buttonTag = context.tagFor(Button);
	const textFieldTag = context.tagFor(TextField);

	return html<DialPad>`
    <div class="${getClasses}">
        ${renderTextField(textFieldTag, buttonTag)}
        <div class="digits" @click="${(x, c) => x.onDigit(c.event)}">
            ${renderDigits(buttonTag)}
        </div>
        ${when(x => !x.noCall, renderDialButton(buttonTag))}
    </div>`;
};

