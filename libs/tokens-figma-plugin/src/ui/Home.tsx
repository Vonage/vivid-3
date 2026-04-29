import type { CollectionData } from '@main/api/get-collections';
import type { PluginSettings } from '@main/api/settings';
import { createPr } from '@ui/create-pr';
import { mainApiClient } from '@ui/ui.api';
import { Button, Checkbox, Flex, Input, Select, Text } from 'figma-kit';
import { useEffect, useState } from 'react';

export function Home() {
	const [collections, setCollections] = useState<CollectionData[]>();
	const [settings, setSettings] = useState<PluginSettings>();
	const [isLoading, setIsLoading] = useState(false);

	const extract = async () => {
		setIsLoading(true);
		await mainApiClient.saveSettings(settings as PluginSettings, false);
		await createPr();
		setIsLoading(false);
	};

	const fetchCollections = async () => {
		const collections = await mainApiClient.getCollections();
		setCollections(collections);
	};

	const getSettings = async () => {
		const settings = await mainApiClient.getSettings();
		setSettings(settings);
	};

	const saveSettings = async () => {
		await mainApiClient.saveSettings(settings as PluginSettings);
	};

	const updateSettings = (changedSettings: Partial<PluginSettings>) => {
		const newSettings: PluginSettings = {
			...settings,
			...(changedSettings as Required<PluginSettings>),
		};
		setSettings(newSettings);
	};

	useEffect(() => {
		getSettings();
		fetchCollections();
	}, []);

	return (
		<div
			style={{
				opacity: isLoading ? 0.2 : 1,
				pointerEvents: isLoading ? 'none' : 'auto',
			}}
		>
			<div
				style={{
					padding: '20px',
				}}
			>
				<Flex direction="column" gap="4">
					<div>
						<Text>Github API Token</Text>
						<Input
							type="password"
							defaultValue={settings?.githubApiToken}
							onChange={(event) =>
								updateSettings({ githubApiToken: event?.target.value })
							}
						/>
					</div>
					<div>
						<Text>PR title</Text>
						<Input
							defaultValue={settings?.prTitle}
							onChange={(event) =>
								updateSettings({ prTitle: event?.target.value })
							}
						/>
					</div>
					<div>
						<Text>PR description</Text>
						<Input
							defaultValue={settings?.prDescription}
							onChange={(event) =>
								updateSettings({ prDescription: event?.target.value })
							}
						/>
					</div>
					<div>
						<Text>Commit message</Text>
						<Input
							defaultValue={settings?.commitMessage}
							onChange={(event) =>
								updateSettings({ commitMessage: event?.target.value })
							}
						/>
					</div>

					<Flex gap="4">
						<div style={{ flexGrow: 1 }}>
							<Text>Source branch</Text>
							<Input
								defaultValue={settings?.sourceBranch}
								onChange={(event) =>
									updateSettings({ sourceBranch: event?.target.value })
								}
							/>
						</div>

						<div style={{ flexGrow: 1 }}>
							<Text>Target branch</Text>
							<Input
								defaultValue={settings?.targetBranch}
								onChange={(event) =>
									updateSettings({ targetBranch: event?.target.value })
								}
							/>
						</div>
					</Flex>
					<div>
						<Checkbox.Root
							onChange={(event) =>
								updateSettings({
									includeTextStyles:
										(event?.target as HTMLInputElement).checked === true,
								})
							}
						>
							<Checkbox.Input checked={settings?.includeTextStyles} />
							<Checkbox.Label>Include typography</Checkbox.Label>
						</Checkbox.Root>
					</div>

					<div>
						<Checkbox.Root
							onChange={(event) =>
								updateSettings({
									includeEffectStyles:
										(event?.target as HTMLInputElement).checked === true,
								})
							}
						>
							<Checkbox.Input checked={settings?.includeEffectStyles} />
							<Checkbox.Label>Include elevation</Checkbox.Label>
						</Checkbox.Root>
					</div>

					<div>
						<Checkbox.Root
							onChange={(event) =>
								updateSettings({
									includeColors:
										(event?.target as HTMLInputElement).checked === true,
								})
							}
						>
							<Checkbox.Input checked={settings?.includeColors} />
							<Checkbox.Label>Include colors</Checkbox.Label>
						</Checkbox.Root>
					</div>
					<div>
						<Text>Color tokens variables collection</Text>
						<Select.Root
							value={settings?.tokensCollectionId}
							onOpenChange={fetchCollections}
							onValueChange={(collectionId) =>
								updateSettings({ tokensCollectionId: collectionId })
							}
						>
							<Select.Trigger />
							<Select.Content style={{ width: '40px;' }}>
								{collections?.map((collection) => (
									<Select.Item key={collection.id} value={collection.id}>
										{collection.name}
									</Select.Item>
								))}
							</Select.Content>
						</Select.Root>
					</div>
				</Flex>
			</div>
			<div
				style={{
					padding: '20px',
					borderTop: '1px solid var(--figma-color-border)',
					backgroundColor: 'var(--figma-color-bg-secondary)',
				}}
			>
				<Flex gap="4" justify="end">
					<Button size="medium" onClick={saveSettings}>
						Save
					</Button>
					<div style={{ flexGrow: 1 }}>&nbsp;</div>
					<Button size="medium" variant="primary" onClick={extract}>
						Export
					</Button>
				</Flex>
			</div>
		</div>
	);
}
