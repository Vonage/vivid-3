import { type ThemeConfig } from '@shared/color-theme.type';
import type { SelectedCollection } from '@ui/CollectionSelect';
import { ColorTheme } from '@ui/ColorTheme';
import { Json } from '@ui/Json';
import type { SelectedMode } from '@ui/ModeSelector';
import { SavedThemes } from '@ui/SavedThemes';
import { SelectTarget } from '@ui/SelectTarget';
import classes from '@ui/styles.module.css';
import { mainApiClient } from '@ui/ui.api';
import { Button, Tabs } from 'figma-kit';
import {
	type FunctionComponent,
	type MouseEventHandler,
	useState,
} from 'react';

export const PluginUi: FunctionComponent = () => {
	const [json, setJson] = useState<string>();
	const [target, setTarget] = useState<{
		collection: SelectedCollection | undefined;
		mode: SelectedMode | undefined;
	} | null>(null);
	const [currentThemeConfig, setCurrentThemeConfig] = useState<ThemeConfig>();

	const submitData: MouseEventHandler<HTMLButtonElement> = async () => {
		if (target === null) return;
		if (!target.collection) return;

		await mainApiClient.updateVariables(
			target.collection,
			target.mode,
			json as string,
			{
				createMissing: true,
			}
		);
	};

	const saveCurrentTheme = () => {
		if (!currentThemeConfig) return;
		mainApiClient.saveTheme(currentThemeConfig);
	};

	return (
		<>
			<Tabs.Root defaultValue="color">
				<div className={classes.layout}>
					<div className={[classes.header, classes.separator].join(' ')}>
						<div className={classes.section}>
							<SelectTarget onChange={setTarget} />
						</div>
					</div>
					<div className={[classes.header, classes.separator].join(' ')}>
						<Tabs.List className={classes.section}>
							<Tabs.Trigger value="color">Color</Tabs.Trigger>
							<Tabs.Trigger value="saved-themes">Saved themes</Tabs.Trigger>
							<Tabs.Trigger value="json">JSON</Tabs.Trigger>
						</Tabs.List>
					</div>
					<div className={classes.body}>
						<Tabs.Content value="color" className={classes.section}>
							<ColorTheme
								themeConfig={currentThemeConfig}
								onChange={setJson}
								onThemeConfigChange={setCurrentThemeConfig}
							/>
						</Tabs.Content>
						<Tabs.Content value="saved-themes" className={classes.section}>
							<SavedThemes loadTheme={setCurrentThemeConfig} />
						</Tabs.Content>
						<Tabs.Content value="json" className={classes.section}>
							<Json onChange={setJson} />
						</Tabs.Content>
					</div>
					<div className={classes.footer}>
						<div className={classes.sectionFlexRow}>
							<Button variant="primary" onClick={submitData}>
								Update
							</Button>
							<Button variant="primary" onClick={saveCurrentTheme}>
								Save Current Theme
							</Button>
						</div>
					</div>
				</div>
			</Tabs.Root>
		</>
	);
};
