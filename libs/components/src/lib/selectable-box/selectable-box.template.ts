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
	controlPlacement,
	disabled,
}: SelectableBox) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		['tight', tight],
		['selected', checked],
		['clickable', clickableBox],
		['readonly', !clickableBox],
		[`control-placement-${controlPlacement}`, Boolean(controlPlacement)],
		['disabled', disabled]
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
			class="control checkbox ${(x) => x.controlPlacement}"
			connotation="${(x) =>
				x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
			:checked="${(x) => x.checked}"
			?disabled="${(x) => x.disabled}"
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
			class="control radio ${(x) => x.controlPlacement}"
			connotation="${(x) =>
				x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
			:checked="${(x) => x.checked}"
			?disabled="${(x) => x.disabled}"
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
			tabindex="${(x) => (x.clickableBox && !x.disabled ? '0' : null)}"
			${delegateAria({
				role: (x) => (x.clickableBox ? 'button' : null),
				ariaPressed: (x) =>
					x.clickableBox ? (x.checked ? 'true' : 'false') : null,
				ariaLabel: (x) => (x.clickableBox ? x.ariaLabel : null),
				ariaDisabled: (x) => (x.clickableBox && x.disabled ? 'true' : null),
			})}
			@keydown="${(x, c) => x._handleKeydown(c.event as KeyboardEvent)}"
			@click="${(x) => (x.clickableBox ? x._handleCheckedChange() : null)}"
		>
			${checkbox(context)} ${radio(context)}
			<slot></slot>
		</div>
	</template>`;
};
