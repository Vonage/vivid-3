import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './avatar.scss?inline';
import { Avatar } from './avatar';
import { AvatarTemplate as template } from './avatar.template';

export type {
	AvatarConnotation,
	AvatarShape,
	AvatarAppearance,
	AvatarSize,
} from './avatar';

/**
 * @internal
 */
export const avatarDefinition = defineVividComponent(
	'avatar',
	Avatar,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the avatar elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAvatar = createRegisterFunction(avatarDefinition);

export { Avatar as VwcAvatarElement };
