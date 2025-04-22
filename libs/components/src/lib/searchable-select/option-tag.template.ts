import { html, when } from '@microsoft/fast-element';

import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { OptionTag } from './option-tag';

const getClasses = ({ shape, connotation, disabled, removable }: OptionTag) =>
	classNames(
		'base',
		['disabled', disabled],
		['removable', removable],
		[`shape-${shape}`, Boolean(shape)],
		[`connotation-${connotation}`, Boolean(connotation)]
	);

function renderRemoveButton(iconTag: string) {
	return html<OptionTag>`
		<span
			class="remove-button"
			aria-label="${(x) => x.locale.searchableSelect.removeTagButtonLabel(x.label!)}"
			role="button"
			tabindex="${(x) => (x.disabled ? null : 0)}"
			@click="${(x) => x._onClickRemove()}"
		>
			<${iconTag} name="close-line"></${iconTag}>
		</span>
	`;
}

export const optionTagTemplate = (context: VividElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return html`<span class="${getClasses}" aria-disabled="${(x) => x.disabled}">
		<slot name="icon" aria-hidden="true">
			${when(
				(x) => x.hasIconPlaceholder,
				html`<div class="icon-placeholder"></div>`
			)}
		</slot>
		${when(
			(x) => x.label,
			(x) => html<OptionTag>`<span class="label">${x.label!}</span>`
		)}
		${when((x) => x.removable, renderRemoveButton(iconTag))}
	</span>`;
};
