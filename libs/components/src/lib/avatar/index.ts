import '../icon';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './avatar.scss';

import { Avatar } from './avatar';
import { AvatarTemplate as template } from './avatar.template';

export const vividAvatar = Avatar.compose<FoundationElementDefinition>({
	baseName: 'avatar',
	template: template as any,
	styles,
});

designSystem.register(vividAvatar());
