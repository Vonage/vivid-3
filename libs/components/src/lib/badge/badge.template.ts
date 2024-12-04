import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { Badge } from './badge';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';

const getClasses = ({
	connotation,
	appearance,
	shape,
	iconTrailing,
	text,
	icon,
}: Badge) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		[`appearance-${appearance}`, Boolean(appearance)],
		[`shape-${shape}`, Boolean(shape)],
		['icon-trailing', iconTrailing],
		['icon-only', !text && Boolean(icon)]
	);

export const badgeTemplate = (context: VividElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html` <span class="${getClasses}">
		${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
		${when(
			(x) => x.text,
			(x) => html<Badge>`<span class="text">${x.text as string}</span>`
		)}
	</span>`;
};
