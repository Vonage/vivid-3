import { parseJson } from '@main/utils/parse-json.util';
import type { ThemeConfig } from '@shared/color-theme.type';

export async function saveTheme(themeConfig: ThemeConfig) {
	const documentNode = figma.currentPage.parent;
	if (!documentNode) throw new Error('No DocumentNode found!');

	documentNode.setPluginData(themeConfig.name, JSON.stringify(themeConfig));

	figma.notify(`Theme ${themeConfig.name} saved successfully.`);
}

export async function getThemes(): Promise<ThemeConfig[]> {
	const documentNode = figma.currentPage.parent;
	if (!documentNode) throw new Error('No DocumentNode found!');
	const keys = documentNode.getPluginDataKeys();

	return keys
		.map((key) => parseJson<ThemeConfig>(documentNode.getPluginData(key)))
		.filter(Boolean) as ThemeConfig[];
}

export async function deleteTheme(themeConfig: ThemeConfig): Promise<void> {
	const documentNode = figma.currentPage.parent;
	if (!documentNode) throw new Error('No DocumentNode found!');

	documentNode.setPluginData(themeConfig.name, '');

	figma.notify(`Theme ${themeConfig.name} removed successfully.`);
}

export async function getTheme(name: string) {
	const documentNode = figma.currentPage.parent;
	if (!documentNode) throw new Error('No DocumentNode found!');
	const themeConfig = parseJson<ThemeConfig>(documentNode.getPluginData(name));
	if (!themeConfig) throw new Error(`Error when reading ${name} theme config!`);
	return themeConfig;
}
