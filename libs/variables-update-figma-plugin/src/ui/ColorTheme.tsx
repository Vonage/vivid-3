import { buildThemeDtcg } from '@shared/build-theme.util';
import {
	type Scale,
	type ThemeConfig,
	themeTemplate,
} from '@shared/color-theme.type';
import {
	type Swatch,
	getTunedColorScale,
} from '@shared/get-tuned-color-scale.util';
import { hexaToFigmaRgba } from '@shared/hexa-to-figma-rgba.util';
import { rgbaToHexa } from '@shared/rgba-to-hexa.util';
import { round } from '@shared/round.util';
import DependentSliders from '@ui/DependantSliders';
import classes from '@ui/styles.module.css';
import { Checkbox, ColorPicker, Input, Popover, Text } from 'figma-kit';
import { type FunctionComponent, useEffect, useMemo, useReducer } from 'react';
import type { FSWatcher } from 'vite';

type ReducerAction =
	| UpdateColorAction
	| UpdateHueOverridesAction
	| UpdateChromaOverridesAction
	| UpdateAction
	| ToggleDarkModeAction
	| UpdateThemeNameAction;

interface UpdateThemeNameAction {
	type: 'update-theme-name';
	name: string;
}

interface UpdateColorAction {
	type: 'update-color';
	index: number;
	color: RGBA;
}

interface UpdateHueOverridesAction {
	type: 'update-hue-overrides';
	index: number;
	overrides: number[];
}

interface UpdateChromaOverridesAction {
	type: 'update-chroma-overrides';
	index: number;
	overrides: number[];
}

interface UpdateAction {
	type: 'update';
}

interface ToggleDarkModeAction {
	type: 'toggleDarkMode';
}

function colorsReducer(state: ThemeConfig, action: ReducerAction): ThemeConfig {
	let output: ThemeConfig = state;
	let currentColors: Scale[] = [...output.colors];

	switch (action.type) {
		case 'update-theme-name':
			output.name = action.name;
			break;
		case 'toggleDarkMode':
			output.isDarkMode = !output.isDarkMode;
			break;
		case 'update':
			output = { ...output };
			break;
		case 'update-color':
			output.colors = [
				...currentColors.slice(0, action.index),
				{
					...currentColors[action.index],
					baseColor: rgbaToHexa(action.color),
				},
				...currentColors.slice(action.index + 1),
			];
			break;
		case 'update-hue-overrides':
			output.colors = [
				...currentColors.slice(0, action.index),
				{
					...currentColors[action.index],
					hueOverrides: action.overrides,
				} as Scale,
				...currentColors.slice(action.index + 1),
			];
			break;
		case 'update-chroma-overrides':
			output.colors = [
				...currentColors.slice(0, action.index),
				{
					...currentColors[action.index],
					chromaOverrides: action.overrides,
				},
				...currentColors.slice(action.index + 1),
			];

			break;
	}

	return { ...output };
}

export interface ColorThemeProps {
	themeConfig?: ThemeConfig;
	onChange?: (json: string) => void;
	onThemeConfigChange?: (themeConfig: ThemeConfig) => void;
}

export const ColorTheme: FunctionComponent<ColorThemeProps> = ({
	themeConfig = themeTemplate,
	onChange,
	onThemeConfigChange,
}) => {
	const [updatedThemeConfig, dispatch] = useReducer(colorsReducer, themeConfig);

	const displayedColors = useMemo<Swatch[]>(() => {
		return updatedThemeConfig.colors.map(
			({ name, baseColor, hueOverrides, chromaOverrides }) => {
				return getTunedColorScale({
					name,
					baseColor: baseColor,
					hueOverrides,
					chromaOverrides,
					steps: updatedThemeConfig.steps,
					isDarkMode: updatedThemeConfig.isDarkMode,
				});
			}
		);
	}, [updatedThemeConfig]);

	useEffect(() => {
		const dtcg = buildThemeDtcg(updatedThemeConfig);

		if (onThemeConfigChange) {
			onThemeConfigChange(updatedThemeConfig);
		}

		if (onChange) {
			onChange(JSON.stringify(dtcg, null, 2));
		}
	}, [updatedThemeConfig]);

	return (
		<>
			<div className={classes.padded}>
				<Input
					value={updatedThemeConfig.name}
					onChange={(e) =>
						dispatch({ type: 'update-theme-name', name: e.target.value })
					}
				/>
				<Checkbox.Root
					defaultValue={updatedThemeConfig.isDarkMode}
					onChange={() => dispatch({ type: 'toggleDarkMode' })}
				>
					<Checkbox.Input />
					<Checkbox.Label>Dark mode</Checkbox.Label>
				</Checkbox.Root>
			</div>
			<div className={classes.colorList}>
				{updatedThemeConfig.colors.map(({ name, baseColor: color }, index) => {
					return (
						<div className={classes.colorRow}>
							{/*<Input value={name} onChange={(e) => dispatch({type: 'update-name', index, name: e.target.value})}></Input>*/}
							<Text>{name}</Text>
							<Popover.Root>
								<Popover.Trigger>
									<div className={classes.colorPreview}>
										{displayedColors[index].map(({ hex, contrast }) => {
											return (
												<div
													style={{
														backgroundColor: hex,
														color:
															contrast < 6
																? displayedColors[index][11].hex
																: displayedColors[index][1].hex,
													}}
												>
													{round(contrast, 2)}
												</div>
											);
										})}
									</div>
								</Popover.Trigger>
								<Popover.Content width={228}>
									<Popover.Section>
										<ColorPicker.Root
											defaultColor={hexaToFigmaRgba(color)}
											models={['hex']}
											colorSpace="srgb"
											onColorChange={(color) =>
												dispatch({ type: 'update-color', index, color })
											}
										>
											<ColorPicker.Area />
											<ColorPicker.Hue />
											<ColorPicker.Input />
										</ColorPicker.Root>
									</Popover.Section>
								</Popover.Content>
							</Popover.Root>

							<div>
								<DependentSliders
									width={3}
									count={updatedThemeConfig.steps.length}
									onChange={(hueOverrides) =>
										dispatch({
											type: 'update-hue-overrides',
											index,
											overrides: hueOverrides,
										})
									}
								/>
							</div>

							<div>
								<DependentSliders
									width={3}
									count={updatedThemeConfig.steps.length}
									onChange={(chromaOverrides) =>
										dispatch({
											type: 'update-chroma-overrides',
											index,
											overrides: chromaOverrides,
										})
									}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};
