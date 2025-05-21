import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Connotation } from '../enums.js';
import { Checkbox } from '../checkbox/checkbox';
import { Radio } from '../radio/radio';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import { SelectableBox } from './selectable-box';

const getClasses = ({
	connotation,
	tight,
	checked,
	clickableBox,
}: SelectableBox) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		['tight', tight],
		['selected', checked],
		['clickable', clickableBox],
		['readonly', !clickableBox]
	);

function handleControlChange(x: SelectableBox) {
	if (!x.clickableBox) x._handleCheckedChange();
}

function checkbox(context: VividElementDefinitionContext) {
	const checkboxTag = context.tagFor(Checkbox);

	return html<SelectableBox>`${when(
		(x) => x.controlType !== 'radio',
		html<SelectableBox>`
		<${checkboxTag}
			${delegateAria(
				{
					ariaLabel: (x) =>
						!x.clickableBox && x.ariaLabel ? x.ariaLabel : null,
				},
				{ onlySpecified: true }
			)}
			@change="${(x) => handleControlChange(x)}"
			class="control checkbox"
			connotation="${(x) =>
				x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
			:checked="${(x) => x.checked}"
			inert="${(x) => (x.clickableBox ? true : null)}"
		></${checkboxTag}>`
	)} `;
}

function radio(context: VividElementDefinitionContext) {
	const radioTag = context.tagFor(Radio);

	return html<SelectableBox>`${when(
		(x) => x.controlType === 'radio',
		html<SelectableBox>`
		<${radioTag}
			${delegateAria(
				{
					ariaLabel: (x) =>
						!x.clickableBox && x.ariaLabel ? x.ariaLabel : null,
				},
				{ onlySpecified: true }
			)}
			@change="${(x) => handleControlChange(x)}"
			class="control radio"
			connotation="${(x) =>
				x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
			:checked="${(x) => x.checked}"
			inert="${(x) => (x.clickableBox ? true : null)}"
		></${radioTag}>`
	)} `;
}

export const SelectableBoxTemplate = (
	context: VividElementDefinitionContext
) => {
	return html<SelectableBox>`<template>
		<div
			class="${getClasses}"
			tabindex="${(x) => (x.clickableBox ? '0' : null)}"
			${delegateAria({
				role: (x) => (x.clickableBox ? 'button' : null),
				ariaPressed: (x) =>
					x.clickableBox ? (x.checked ? 'true' : 'false') : null,
				ariaLabel: (x) => (x.clickableBox ? x.ariaLabel : null),
			})}
			@keydown="${(x, c) => x._handleKeydown(c.event as KeyboardEvent)}"
			@click="${(x) => (x.clickableBox ? x._handleCheckedChange() : null)}"
		>
			${checkbox(context)} ${radio(context)}
			<slot></slot>
		</div>
	</template>`;
};
