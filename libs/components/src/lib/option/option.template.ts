import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import { Icon } from '../icon/icon';
import type { ListboxOption } from './option';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';

const getClasses = (x: ListboxOption) =>
	classNames(
		'base',
		['disabled', x.disabled],
		['selected', Boolean(x.selected)],
		['hover', Boolean(x._highlighted)],
		['active', Boolean(x.checked)],
		['icon', Boolean(x.icon)]
	);

export const ListboxOptionTemplate = (
	context: VividElementDefinitionContext
) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const iconTag = context.tagFor(Icon);

	return html`
		<template
			aria-checked="${(x) => x.ariaChecked}"
			aria-disabled="${(x) => x.ariaDisabled}"
			aria-posinset="${(x) => x.ariaPosInSet}"
			aria-selected="${(x) => x.ariaSelected}"
			aria-setsize="${(x) => x.ariaSetSize}"
			role="option"
		>
			<div class="${getClasses}">
				${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
				${when(
					(x) => x.text,
					html<ListboxOption>`<div class="text">
						${when(
							(x) => x._matchedRange,
							html<ListboxOption>`${(x) =>
									x.text.slice(0, x._matchedRangeSafe.from)}<span class="match"
									>${(x) =>
										x.text.slice(
											x._matchedRangeSafe.from,
											x._matchedRangeSafe.to
										)}</span
								>`
						)}${(x) => x.text.slice(x._matchedRangeSafe.to)}
					</div>`
				)}
				${when(
					(x) => x._displayCheckmark && x.selected,
					html`<${iconTag} class="checkmark" name="check-line"></${iconTag}>`
				)}
			</div>
		</template>
	`;
};
