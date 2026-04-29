export interface PluginSettings {
	githubApiToken: string;

	/**
	 * Branch name to which PR will be merged. Typically it's `main`
	 */
	targetBranch: string;

	/**
	 * Name of the branch containing changes, e.g. design-tokens-update`
	 */
	sourceBranch: string;

	/**
	 * Title of the pull request.
	 * It should follow conventional commits convention.
	 */
	prTitle: string;

	/**
	 * Description of the pull request.
	 */
	prDescription: string;

	/**
	 * Commit message attached to the changes.
	 */
	commitMessage: string;

	includeTextStyles: boolean;
	includeEffectStyles: boolean;
	includeColors: boolean;
	tokensCollectionId: string;
}

export const settingsKey = 'vividTokensExportPlugin';

export async function getSettings(): Promise<PluginSettings> {
	const settings = (await figma.clientStorage.getAsync(settingsKey)) || {};
	return settings;
}

export async function saveSettings(
	settings: PluginSettings,
	notify = true
): Promise<void> {
	try {
		await figma.clientStorage.setAsync(settingsKey, settings);
		if (notify) {
			figma.notify('Changes saved successfuly.');
		}
	} catch (e) {
		e &&
			figma.notify('Something went wrong on saving settings.', { error: true });
	}
}
