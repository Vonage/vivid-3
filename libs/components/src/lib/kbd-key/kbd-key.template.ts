import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { KbdKey } from './kbd-key';

const getClasses = ({ appearance, size }: KbdKey) =>
	classNames(
		'base',
		[`appearance-${appearance}`, Boolean(appearance)],
		[`size-${size}`, Boolean(size)]
	);

export const KbdKeyTemplate: (
	context: VividElementDefinitionContext
) => ViewTemplate<KbdKey> = () => {
	return html<KbdKey>`<kbd
		class="${getClasses}"
		aria-label="${(x) => x._ariaKeyLabel}"
		>${when((x) => x.name === 'Custom', html<KbdKey>`<slot></slot>`)}${when(
			(x) => Boolean(x.name && x.name !== 'Custom' && x._displayLabel),
			html<KbdKey>`${(x) => x._displayLabel}`
		)}</kbd
	>`;
};
