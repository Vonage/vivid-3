import '../elevation';
import '../button';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import { Popup } from './popup';
import styles from './popup.scss';
import { popupTemplate as template } from './popup.template';


/**
 * Represents a popup custom element.
 * popup is...
 */
export const vividPopup = Popup.compose<FoundationElementDefinition>({
	baseName: 'popup',
	template: template as any,
	styles,
});

designSystem.register(vividPopup());
