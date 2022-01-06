import { Button } from './button.base';
import { buttonTemplate as template } from './button.template';
import { designSystem } from '../../core/design-system';

export const vividButton = Button.compose({
	baseName: 'button',
	template: template as any,
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.register(vividButton());
