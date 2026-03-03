import { kebabToCamel } from '../utils/casing';
import { iconListFromManifest } from '../common/icons';
import { IconsManifest } from '@vonage/vivid-icons';

export const renderIcons = (iconsManifest: IconsManifest) => `export enum Icon {
${iconListFromManifest(iconsManifest)
	.map((icon) => `   '${kebabToCamel(icon)}' = '${icon}',`)
	.join('\n')}
};

export type IconId = \`\${Icon}\`;
`;
