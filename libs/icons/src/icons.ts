import { type IconCategory } from './generated/icon-categories';
import { type IconName } from './generated/icon-names';
import { type IconStyle } from './generated/icon-styles';

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
