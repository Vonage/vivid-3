import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../shared/utils';
import styles from './avatar.scss';

import { Avatar } from './avatar';
import { AvatarTemplate as template } from './avatar.template';

const prefix = getPrefix(import.meta.url);

await loadComponentsModules(['icon'], prefix);

export const vividAvatar = Avatar.compose<FoundationElementDefinition>({
	baseName: 'avatar',
	template: template as any,
	styles,
});

designSystem.withPrefix(prefix).register(vividAvatar());
