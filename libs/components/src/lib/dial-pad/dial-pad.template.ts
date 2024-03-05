/* eslint-disable max-len */
import { html } from '@microsoft/fast-element';
import { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import type { DialPad } from './dial-pad';

const getClasses = (_: DialPad) => classNames('base');

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

	return html`
    <div class="${getClasses}">
        <${textFieldTag} class="phone-field" appearance="ghost" placeholder="${x => x.placeholder}" ?disabled="${x => x.disabled}" helper-text="${x => x.helperText}">
            <${buttonTag} slot="action-items" size='condensed' icon="backspace-line" aria-label='clear field' appearance='ghost' ?disabled="${x => x.disabled}"></${buttonTag}>
        </${textFieldTag}>
        
        <div class="digits">
            <${buttonTag} icon='one-solid' stacked label="&nbsp;" size='condensed' class="digit-btn" aria-label="1" ?disabled="${x => x.disabled}"></${buttonTag}>
            <${buttonTag} icon='two-solid' stacked label='ABC' size='condensed' class="digit-btn" aria-label="2 ABC" ?disabled="${x => x.disabled}"></${buttonTag}>
            <${buttonTag} icon='three-solid' stacked label='DEF' size='condensed' class="digit-btn" aria-label="3 DEF" ?disabled="${x => x.disabled}"></${buttonTag}>
            <${buttonTag} icon='four-solid' stacked label='GHI' size='condensed' class="digit-btn" aria-label="4 GHI" ?disabled="${x => x.disabled}"></${buttonTag}>
            <${buttonTag} icon='five-solid' stacked label='JKL' size='condensed' class="digit-btn" aria-label="5 JKL" ?disabled="${x => x.disabled}"></${buttonTag}>
            <${buttonTag} icon='six-solid' stacked label='MNO' size='condensed' class="digit-btn" aria-label="6 MNO" ?disabled="${x => x.disabled}"></${buttonTag}>
            <${buttonTag} icon='seven-solid' stacked label='PQRS' size='condensed' class="digit-btn" aria-label="7 PQRS" ?disabled="${x => x.disabled}"></${buttonTag}>
            <${buttonTag} icon='eight-solid' stacked label='TUV' size='condensed' class="digit-btn" aria-label="8 TUV" ?disabled="${x => x.disabled}"></${buttonTag}>
            <${buttonTag} icon='nine-solid' stacked label='WXYZ' size='condensed' class="digit-btn" aria-label="9 WXYZ" ?disabled="${x => x.disabled}"></${buttonTag}>
            <${buttonTag} icon='asterisk-2-solid' stacked size='condensed' class="digit-btn" aria-label="asterisk" ?disabled="${x => x.disabled}"></${buttonTag}>
            <${buttonTag} icon='zero-solid' stacked label='+' size='condensed' class="digit-btn" aria-label="0 plus" ?disabled="${x => x.disabled}"></${buttonTag}>
            <${buttonTag} icon='hashtag-solid' stacked size='condensed' class="digit-btn" aria-label="hashtag" ?disabled="${x => x.disabled}"></${buttonTag}>
        </div>

        <${buttonTag} class='call-btn' size='expanded' appearance="filled" icon='call-line' label='call' connotation='cta' ?disabled="${x => x.disabled}"></${buttonTag}>
    </div>`;
};

