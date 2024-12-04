import { html, ref, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import { Button } from '../button/button';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { Popup } from './popup';

const getClasses = ({ open, dismissible, alternate }: Popup) =>
	classNames(
		'control',
		['open', Boolean(open)],
		['dismissible', Boolean(dismissible)],
		['alternate', Boolean(alternate)]
	);

function handlePopover(x: Popup) {
	return x.strategy && x.strategy === 'fixed' ? 'manual' : null;
}

export const popupTemplate = (context: VividElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);
	const buttonTag = context.tagFor(Button);

	return html<Popup>`
  <${elevationTag}>
		<div popover="${handlePopover}" class="popup-wrapper ${(x) =>
		x.strategy}" ${ref('popupEl')} part="popup-base">
			<div ${ref('controlEl')} class="${getClasses}" aria-hidden="${(x) =>
		x.open ? 'false' : 'true'}"
				part="${(x) => (x.alternate ? 'vvd-theme-alternate' : '')}">
				<div class="popup-content">
					<slot></slot>
					${when(
						(x) => x.dismissible,
						html<Popup>`<${buttonTag} size="condensed" @click="${(x) =>
							(x.open = false)}"
						class="dismissible-button" icon="close-small-solid" shape="pill"></${buttonTag}>`
					)}
				</div>
				${when(
					(x) => x.arrow,
					html<Popup>`<div class="arrow" ${ref('arrowEl')}></div>`
				)}
			</div>
    </div>
  </${elevationTag}>`;
};
