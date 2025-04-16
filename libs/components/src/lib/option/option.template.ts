import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { ListboxOption } from './option';
import { applyHostSemantics } from '../../shared/aria/host-semantics';

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

	return html<ListboxOption>`
		<template
			${applyHostSemantics({
				role: 'option',
				ariaChecked: (x) => x.checked,
				ariaSelected: (x) => x.selected,
				ariaDisabled: (x) => x.disabled,
			})}
			style="${(x) => (x._isNotMatching ? 'display: none' : '')}"
		>
			<div class="${getClasses}">
				${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
				${when(
					(x) => x.text,
					html<ListboxOption>`<div class="text">
						${when(
							(x) => x._hasMatchedText,
							html<ListboxOption>`${(x) =>
									x.text.slice(0, x._matchedRange.from)}<span class="match"
									>${(x) =>
										x.text.slice(
											x._matchedRange.from,
											x._matchedRange.to
										)}</span
								>`
						)}${(x) => x.text.slice(x._matchedRange.to)}
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
