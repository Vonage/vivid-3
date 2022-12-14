import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import styles from './avatar.scss';

import { Avatar } from './avatar';
import { AvatarTemplate as template } from './avatar.template';


/**
 *
 * @internal
 */
export const avatar = Avatar.compose<FoundationElementDefinition>({
	baseName: 'avatar',
	template: template as any,
	styles,
})();

export const avatarElements = [avatar, ...iconElements];

/**
 * Registers the avatar elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAvatar = registerFactorial(avatarElements);
