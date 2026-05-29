import { Octokit } from '@octokit/core';
import { mainApiClient } from '@ui/ui.api';
import { createPullRequest } from 'octokit-plugin-create-pull-request';

export const createPr = async () => {
	const settings = await mainApiClient.getSettings();

	let changeSet = {};

	if (settings.includeColors) {
		const colorTokens = await mainApiClient.getColorTokens();
		for (const [mode, tokens] of Object.entries(colorTokens)) {
			changeSet = {
				...changeSet,
				[`libs/tokens/src/colors.${mode.toLowerCase()}.json`]: JSON.stringify(
					tokens,
					null,
					2
				),
			};
		}
	}

	if (settings.includeTextStyles) {
		const typographyTokens = await mainApiClient.getTypographyTokens();
		changeSet = {
			...changeSet,
			'libs/tokens/src/typography.json': JSON.stringify(
				typographyTokens,
				null,
				2
			),
		};
	}

	if (settings.includeEffectStyles) {
		const elevationTokens = await mainApiClient.getElevationTokens();
		changeSet = {
			...changeSet,
			'libs/tokens/src/elevation.json': JSON.stringify(
				elevationTokens,
				null,
				2
			),
		};
	}

	const MyOctokit = Octokit.plugin(createPullRequest);

	const octokit = new MyOctokit({
		auth: settings.githubApiToken,
	});

	mainApiClient.notify('Creating pull request...');

	try {
		await octokit.createPullRequest({
			owner: 'Vonage',
			repo: 'vivid-3',
			title: settings.prTitle,
			body: settings.prDescription,
			head: settings.sourceBranch,
			base: settings.targetBranch,
			update: true,
			labels: ['design-tokens'],
			changes: [
				{
					files: changeSet,
					commit: settings.commitMessage,
				},
			],
		});

		mainApiClient.notify('Pull requerst successfuly created or updated.');
	} catch (e) {
		e &&
			mainApiClient.notify(
				'Error creating pull request. Check console for details',
				{ error: true }
			);
	}
};
