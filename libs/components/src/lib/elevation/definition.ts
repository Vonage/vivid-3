import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { Elevation } from './elevation';
import styles from './elevation.scss';
import { elevationTemplate as template } from './elevation.template';


/**
 * Represents an elevation custom element.
 *
 * @internal
 */
export const elevation = Elevation.compose<FoundationElementDefinition>({
	baseName: 'elevation',
	template: template as any,
	styles,
})();

export const elevationElements = [elevation];

/**
 * Registers the elevation elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerElevation = registerFactorial(elevationElements);
