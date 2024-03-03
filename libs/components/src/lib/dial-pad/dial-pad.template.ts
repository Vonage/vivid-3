import { html } from '@microsoft/fast-element';
import { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { Button } from '../button/button';
import { TextField } from '../text-field/text-field';
import type { DialPad } from './dial-pad';

const getClasses = (_: DialPad) => classNames('base');

function renderTextField(context: ElementDefinitionContext) {
	const textFieldTag = context.tagFor(TextField);
	const buttonTag = context.tagFor(Button);

	return html`<${textFieldTag} appearance="ghost" placeholder="Enter a phone Number"
         helper-text="58 Meeting Room - Extension" class="phone-field">
            <${buttonTag} slot='action-items' size='condensed' icon="close-small-solid" 
            aria-label='clear field' shape='pill' appearance='ghost'></${buttonTag}>
         </${textFieldTag}>`;
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

	return html`
    <div class="${getClasses}">
        ${renderTextField(context)}
        
        <${buttonTag} icon='one-solid' stacked label=' ' size='condensed' class="digit-btn" aria-label="1"></${buttonTag}>
        <${buttonTag} icon='two-solid' stacked label='ABC' size='condensed' class="digit-btn" aria-label="2 ABC"></${buttonTag}>
        <${buttonTag} icon='three-solid' stacked label='DEF' size='condensed' class="digit-btn" aria-label="3 DEF"></${buttonTag}>
        <${buttonTag} icon='four-solid' stacked label='GHI' size='condensed' class="digit-btn" aria-label="4 GHI"></${buttonTag}>
        <${buttonTag} icon='five-solid' stacked label='JKL' size='condensed' class="digit-btn" aria-label="5 JKL"></${buttonTag}>
        <${buttonTag} icon='six-solid' stacked label='MNO' size='condensed' class="digit-btn" aria-label="6 MNO"></${buttonTag}>
        <${buttonTag} icon='seven-solid' stacked label='PQRS' size='condensed' class="digit-btn" aria-label="7 PQRS"></${buttonTag}>
        <${buttonTag} icon='eight-solid' stacked label='TUV' size='condensed' class="digit-btn" aria-label="8 TUV"></${buttonTag}>
        <${buttonTag} icon='nine-solid' stacked label='WXYZ' size='condensed' class="digit-btn" aria-label="9 WXYZ"></${buttonTag}>
        <${buttonTag} icon='asterisk-2-solid' stacked label=' ' size='condensed' class="digit-btn" aria-label="asterisk"></${buttonTag}>
        <${buttonTag} icon='zero-solid' stacked label='+' size='condensed' class="digit-btn" aria-label="0 plus"></${buttonTag}>
        <${buttonTag} icon='hashtag-solid' stacked label=' ' size='condensed' class="digit-btn" aria-label="hashtag"></${buttonTag}>
    
        <${buttonTag} appearance="filled" icon='call-line' label='Call' connotation='success' class='call-btn'></${buttonTag}>
    </div>`;
};

