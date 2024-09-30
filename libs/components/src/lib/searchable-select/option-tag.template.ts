import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import { Icon } from '../icon/icon';
import type { OptionTag } from './option-tag';

const getClasses = ({ shape, disabled, removable }: OptionTag) =>
	classNames(
		'base',
		['disabled', disabled],
		['removable', removable],
		[`shape-${shape}`, Boolean(shape)]
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

export const optionTagTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<OptionTag> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const iconTag = context.tagFor(Icon);

	return html`<span class="${getClasses}" aria-disabled="${(x) => x.disabled}">
		${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
		${when(
			(x) => x.label,
			(x) => html<OptionTag>`<span class="label">${x.label!}</span>`
		)}
		${when((x) => x.removable, renderRemoveButton(iconTag))}
	</span>`;
};
