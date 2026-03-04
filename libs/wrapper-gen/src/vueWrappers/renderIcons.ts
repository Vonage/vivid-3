import { camelCase } from 'change-case';
import { iconListFromManifest } from '../common/icons';
import { IconsManifest } from '@repo/consts';

export const renderIcons = (iconsManifest: IconsManifest) => `export enum Icon {
${iconListFromManifest(iconsManifest)
	.map(
		(icon) =>
			`   '${camelCase(icon, { mergeAmbiguousCharacters: true })}' = '${icon}',`
	)
	.join('\n')}
};

export type IconId = \`\${Icon}\`;
`;
