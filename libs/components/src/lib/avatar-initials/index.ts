import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './avatar-initials.scss';
import { AvatarInitials } from './avatar-initials';
import { avatarInitialsTemplate as template } from './avatar-initials.template';

export const vividAvatarInitials = AvatarInitials.compose<FoundationElementDefinition>({
	baseName: 'avatar-initials',
	template: template as any,
	styles,
});

designSystem.register(vividAvatarInitials());
