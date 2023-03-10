import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import styles from './avatar.scss';

import { Avatar } from './avatar';
import { AvatarTemplate as template } from './avatar.template';

export type { AvatarConnotation, AvatarShape, AvatarAppearance, AvatarSize } from './avatar'

/**
 *
 * @internal
 */
export const avatarDefinition = Avatar.compose<FoundationElementDefinition>({
	baseName: 'avatar',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const avatarRegistries = [avatarDefinition(), ...iconRegistries];

/**
 * Registers the avatar elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAvatar = registerFactory(avatarRegistries);
