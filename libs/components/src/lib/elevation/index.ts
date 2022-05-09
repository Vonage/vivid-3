import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system/vivid-design-system.js';
import { Elevation } from './elevation';
import styles from './elevation.scss';
import { elevationTemplate as template } from './elevation.template';


/**
 * Represents an elevation custom element.
 */
export const VIVIDElevation = Elevation.compose<FoundationElementDefinition>({
	baseName: 'elevation',
	template: template as any,
	styles,
});

designSystem.register(VIVIDElevation());
