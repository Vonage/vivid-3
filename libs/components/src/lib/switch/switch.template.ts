import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { Switch } from './switch';

const getClasses = (_: Switch) =>
	classNames(
		'control',
		['appearance-filled', _.checked],
		['checked', _.checked],
		['disabled', _.disabled],
		['readonly', _.readOnly],
		[
			`connotation-${_.connotation}`,
			Boolean(_.checked) && Boolean(_.connotation),
		]
	);

export const SwitchTemplate = html<Switch>`
	<template>
		<div
			class="${getClasses}"
			${delegateAria({
				role: 'switch',
				ariaChecked: (x) => x.checked,
				ariaDisabled: (x) => x.disabled,
				ariaReadOnly: (x) => x.readOnly,
			})}
			tabindex="${(x) => (x.disabled ? null : 0)}"
			@keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
			@click="${(x) => x.clickHandler()}"
		>
			<div class="switch">
				<span class="checked-indicator"></span>
			</div>
			${when(
				(x) => x.label,
				html<Switch>`<div class="label">${(x) => x.label}</div>`
			)}
		</div>
	</template>
`;
