import 'blocking-elements';
import 'wicg-inert';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import { SideDrawer } from './side-drawer';
import styles from './side-drawer.scss';
import { sideDrawerTemplate as template } from './side-drawer.template';

/**
 * Represents a side-drawer custom element.
 */
export const VIVIDSideDrawer = SideDrawer.compose<FoundationElementDefinition>({
	baseName: 'side-drawer',
	template: template as any,
	styles,
});

designSystem.register(VIVIDSideDrawer());
