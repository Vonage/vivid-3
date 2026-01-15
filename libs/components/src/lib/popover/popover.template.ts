import { html, ref, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { Button } from '../button/button';
import { delegateAria } from '../../shared/aria/delegates-aria';
import { Popover } from './popover';

const getClasses = ({ open, manual, layout }: Popover) =>
	classNames(
		'control',
		['open', Boolean(open)],
		['manual', Boolean(manual)],
		['condensed', layout === 'condensed']
	);

/**
 * The template for the Popover component.
 *
 * @param context - element definition context
 * @public
 */
export const popoverTemplate = (context: VividElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);
	const buttonTag = context.tagFor(Button);
	const iconTag = context.tagFor(Icon);
	return html<Popover>`
		<slot name="anchor" ${slotted('_slottedAnchor')}></slot>
		<${elevationTag}>
			<div class="base" 
				${ref('_popoverEl')} 
				popover="${(x) => (x.manual ? 'manual' : 'auto')}"
				tabindex="-1"
				autofocus
				${delegateAria({
					role: 'dialog',
					ariaModal: 'false',
				})}
			>
				<div class="${getClasses}" 
					part="${(x) => (x.alternate ? 'vvd-theme-alternate' : '')}">
					<slot></slot>
					<slot name="footer"></slot>
					${when(
						(x) => x.manual,
						html<Popover>`<${buttonTag}
							aria-label="${(x) =>
								x.dismissButtonAriaLabel ||
								x.locale.popover.dismissButtonLabel}"
							type="button"
							size="condensed"
							class="dismiss-button"
							@click="${(x) => x.hide()}">
							<${iconTag} name="close-line" slot="icon"></${iconTag}>
						</${buttonTag}>`
					)}
					${when(
						(x) => x.arrow,
						html<Popover>`<div class="arrow" ${ref('_arrowEl')}></div>`
					)}
				</div>
			</div>
		</${elevationTag}>
	`;
};
