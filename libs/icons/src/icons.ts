import { type IconCategory } './generated/icon-categories.ts'
import { type IconName } from './generated/icon-names.ts'
import { type IconStyle } from './generated/icon-styles.ts'

export interface IconEntry {
	id: IconName;
	category: IconCategory;
	keywords: string[];
	aliases: string[];
	name: string;
	style: IconStyle;
}

export type { IconCategory };
export type { IconName };
export type { IconStyle };
export type IconsIndex = IconEntry[];
