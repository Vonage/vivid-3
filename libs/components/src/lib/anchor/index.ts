import { Anchor, anchorTemplate as template } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';

export const vividAnchor = Anchor.compose({
	baseName: 'anchor',
	template: template as any,
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.register(vividAnchor());
