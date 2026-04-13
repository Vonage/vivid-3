import { elements, html, slotted } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { KbdShortcut } from './kbd-shortcut';

const getClasses = (_: KbdShortcut) => classNames('base');

/**
 * The template for the KbdShortcut component.
 *
 * @param context - element definition context
 * @public
 */
export const KbdShortcutTemplate: (
	context: VividElementDefinitionContext
) => ViewTemplate<KbdShortcut> = () => {
	return html<KbdShortcut>`<span class="${getClasses}" role="group"
		><slot
			hidden
			${slotted({
				property: 'slottedKeys',
				filter: elements(),
			})}
		></slot
		><span class="keys"></span
	></span>`;
};
