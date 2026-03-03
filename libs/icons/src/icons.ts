export type IconStyle =
	| 'solid'
	| 'line'
	| 'flag'
	| 'color'
	| 'mono'
	// eslint-disable-next-line
	| ({} & string);

export type IconCategory =
	| 'alert'
	| 'arrows'
	| 'audio'
	| 'brand'
	| 'calling'
	| 'charts'
	| 'check'
	| 'chevrons'
	| 'commerce'
	| 'connectivity'
	| 'delete'
	| 'devices'
	| 'emoji'
	| 'file'
	| 'flags'
	| 'layout'
	| 'location'
	| 'messaging'
	| 'objects'
	| 'password'
	| 'science'
	| 'social'
	| 'sort'
	| 'time'
	| 'tools'
	| 'user'
	| 'video'
	| 'view'
	// eslint-disable-next-line
	| ({} & string);

export interface IconEntry {
	id: string;
	category: IconCategory;
	figmaComponentName: string;
	figmaNodeId: string;
	imageUrl: string;
	keywords: string[];
	aliases: string[];
	name: string;
	style: IconStyle;
}

export type IconsIndex = IconEntry[];
