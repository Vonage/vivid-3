import { createMatrix } from '@main/api/create-matrix';
import { getCollections } from '@main/api/get-collections';
import { getModes } from '@main/api/get-modes';
import { deleteTheme, getThemes, saveTheme } from '@main/api/save-theme';
import { updateVariables } from '@main/api/update-variables';
import { defineApi } from 'figwire/plugin';

const pluginApi = defineApi({
	getModes,
	getCollections,
	updateVariables,
	createMatrix,
	getThemes,
	saveTheme,
	deleteTheme,
	notify: (message: string, options?: NotificationOptions) =>
		figma.notify(message, options),
});

export type MainAPI = typeof pluginApi;
