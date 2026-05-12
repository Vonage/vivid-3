import { type ThemeConfig } from '@shared/color-theme.type';
import classes from '@ui/styles.module.css';
import { mainApiClient } from '@ui/ui.api';
import { Button, Text } from 'figma-kit';
import { type FunctionComponent, useEffect, useState } from 'react';

interface SavedThemesProps {
	loadTheme?: (theme: ThemeConfig) => void;
}

export const SavedThemes: FunctionComponent<SavedThemesProps> = ({
	loadTheme,
}) => {
	const [themes, setThemes] = useState<ThemeConfig[]>([]);

	const deleteTheme = async (theme: ThemeConfig) => {
		await mainApiClient.deleteTheme(theme);
		await getSavedThemes();
	};

	const getSavedThemes = async () => {
		const themes = await mainApiClient.getThemes();
		setThemes(themes);
	};

	useEffect(() => {
		getSavedThemes();
	}, []);

	return (
		<>
			<div>
				{themes.map((theme) => {
					return (
						<div className={classes.listRow}>
							<Text>{theme.name}</Text>
							<div className={classes.listRowActions}>
								<Button onClick={() => loadTheme?.(theme)}>Load</Button>
								<Button
									variant="destructive"
									onClick={() => deleteTheme(theme)}
								>
									Delete
								</Button>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};
