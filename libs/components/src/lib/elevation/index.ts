import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import { Elevation } from './elevation';
import styles from './elevation.scss';
import { elevationTemplate as template } from './elevation.template';


/**
 * Represents an elevation custom element.
 */
export const vividElevation = Elevation.compose<FoundationElementDefinition>({
	baseName: 'elevation',
	template: template as any,
	styles,
});

designSystem.register(vividElevation());
