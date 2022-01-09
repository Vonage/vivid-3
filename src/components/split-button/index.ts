import '../button';

import { designSystem } from '../../core/design-system';
import { SplitButton } from './split-button';
import styles from './split-button.scss';
import { splitButtonTemplate as template } from './split-button.template';

export const vividSplitButton = SplitButton.compose({
	baseName: 'split-button',
	template: template as any,
	styles
});

designSystem.register(vividSplitButton());
