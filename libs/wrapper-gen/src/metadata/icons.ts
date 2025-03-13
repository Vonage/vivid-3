import fetch from 'node-fetch';
import { ICONS_BASE_URL, ICONS_VERSION } from '@vonage/vwc-consts';

type IconManifest = {
	id: string;
	tag: string[];
	keyword: string[];
}[];

const manifestUrl = `${ICONS_BASE_URL}/v${ICONS_VERSION}/manifest.json`;

const fetchIcons = async (): Promise<string[]> => {
	const response = await fetch(manifestUrl);
	const manifest = (await response.json()) as IconManifest;
	return manifest.map((icon) => icon.id).sort();
};

export const loadedIcons = fetchIcons();
