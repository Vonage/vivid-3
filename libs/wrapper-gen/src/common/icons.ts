import fetch from 'node-fetch';
import { toTypeStr, TypeStr } from './types';
import { IconsManifest } from '@vonage/vwc-consts';

export const fetchIconsManifest = async (url: string): Promise<IconsManifest> =>
	(await fetch(url)).json();

export const iconListFromManifest = (manifest: IconsManifest): string[] =>
	manifest.map((icon) => icon.id).sort();

export const iconTypeFromManifest = (manifest: IconsManifest): TypeStr =>
	toTypeStr(iconListFromManifest(manifest).map((icon) => `'${icon}'`));
