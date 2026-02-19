export const ICONS_BASE_URL = 'https://icon.resources.vonage.com';
export const ICONS_VERSION = '4.7.1';
export const ICONS_MANIFEST_URL = `${ICONS_BASE_URL}/v${ICONS_VERSION}/manifest.json`;

type Weight = 'solid' | 'regular';
type Color = 'single' | 'multi';

export type IconTag =
	| `style_weight_${Weight}`
	| `style_color_${Color}`
	| `category_${string}`;

export interface IconDefinition {
	id: string;
	keyword: string[];
	tag: IconTag[];
}

export type IconsManifest = IconDefinition[];
