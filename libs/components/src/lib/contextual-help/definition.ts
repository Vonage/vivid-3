import { buttonDefinition } from '../button/definition';
import { iconDefinition } from '../icon/definition';
import { toggletipDefinition } from '../toggletip/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { ContextualHelp } from './contextual-help';
import { ContextualHelpTemplate as template } from './contextual-help.template';

/**
 * @internal
 */
export const contextualHelpDefinition = defineVividComponent(
	'contextual-help',
	ContextualHelp,
	template,
	[buttonDefinition, iconDefinition, toggletipDefinition],
	{}
);

/**
 * Registers the contextual-help element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerContextualHelp = createRegisterFunction(
	contextualHelpDefinition
);
