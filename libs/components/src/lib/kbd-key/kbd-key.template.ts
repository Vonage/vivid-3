import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { KbdKey } from './kbd-key';

const getClasses = ({ name }: KbdKey) =>
	classNames(
		'base',
		[`key-${(name ?? '').toLowerCase()}`, Boolean(name)],
		['symbol', isSymbolKey(name)],
		['wide', name === 'Space'],
		['custom', name === 'Custom']
	);

function isSymbolKey(name?: string): boolean {
	return [
		'Enter',
		'Tab',
		'Backspace',
		'Delete',
		'ArrowUp',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
	].includes(name ?? '');
}

/**
 * The template for the KbdKey component.
 *
 * @param context - element definition context
 * @public
 */
export const KbdKeyTemplate: (
	context: VividElementDefinitionContext
) => ViewTemplate<KbdKey> = () => {
	return html<KbdKey>`<kbd class="${getClasses}"
		>${when((x) => x.name === 'Custom', html<KbdKey>`<slot></slot>`)}${when(
			(x) => x.name && x.name !== 'Custom',
			html<KbdKey>`${(x) => x.displayLabel}`
		)}</kbd
	>`;
};
