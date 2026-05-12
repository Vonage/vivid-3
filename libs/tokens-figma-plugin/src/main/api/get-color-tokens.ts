import { getSettings } from '@main/api/settings';
import { type DesignTokensFormat, figvar2dtcg } from 'figvar2dtcg';

export async function getColorTokens(): Promise<DesignTokensFormat> {
	const settings = await getSettings();

	if (settings.tokensCollectionId) {
		const collections =
			await figma.variables.getLocalVariableCollectionsAsync();

		for (const collection of collections) {
			if (collection.id === settings.tokensCollectionId) {
				try {
					const colorModes = await Promise.all(
						collection.modes.map(async (mode) => [
							mode.name,
							await figvar2dtcg(collection, mode.name),
						])
					);

					return Object.fromEntries(colorModes);
				} catch (e) {
					console.error(e);
					figma.notify(
						'Something went wrong when formatting variables. Please check the console.'
					);
				}
			}
		}
	}

	throw new Error('Unknown error');
}
