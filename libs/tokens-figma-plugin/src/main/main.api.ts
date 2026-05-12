import { getCollections } from '@main/api/get-collections';
import { getColorTokens } from '@main/api/get-color-tokens';
import { getElevationTokens } from '@main/api/get-elevation-tokens';
import { getTypographyTokens } from '@main/api/get-typography-tokens';
import { getSettings, saveSettings } from '@main/api/settings';
import { defineApi } from 'figwire/plugin';

type NotificationOptions = Parameters<typeof figma.notify>[1];

// plugin.ts
const pluginApi = defineApi({
	getColorTokens,
	getTypographyTokens,
	getElevationTokens,
	getCollections,
	getSettings,
	saveSettings,
	notify: (message: string, options?: NotificationOptions) =>
		figma.notify(message, options),
});

export type MainAPI = typeof pluginApi;
