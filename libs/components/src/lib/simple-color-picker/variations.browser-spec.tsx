import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { renderIsolated } from '@repo/browser-tests/render-isolated';
import { simpleColorPickerDefinition } from './definition';
import { buttonDefinition } from '../button/definition';
import { iconDefinition } from '../icon/definition';

const SimpleColorPicker = component(simpleColorPickerDefinition);
const Button = component(buttonDefinition);
const Icon = component(iconDefinition);

const swatches = [
	{ label: 'Black', value: '#000000' },
	{ label: 'Red', value: '#FF0000' },
	{ label: 'Green', value: '#00FF00' },
	{ label: 'Blue', value: '#0000FF' },
	{ label: 'Yellow', value: '#FFFF00' },
	{ label: 'Purple', value: '#800080' },
	{ label: 'Cyan', value: '#00FFFF' },
];

variationTest(
	'simple-color-picker',
	table({
		caption: 'Popup',
		xAxis: {
			value: {
				empty: {},
				'with value': { value: '#FF0000' },
			},
		},
		yAxis: {
			variant: {
				'default (7 per row)': {},
				'3 per row': { 'swatches-per-row': 3 },
			},
		},
		render: async (variant) => {
			const el = (
				<SimpleColorPicker
					{...{ ':swatches': swatches }}
					{...flattenAttrs(variant)}
				>
					<Button
						slot="anchor"
						aria-label="Pick color"
						size="super-condensed"
						shape="pill"
						appearance="outlined"
					>
						<Icon slot="icon" name="textcolor-solid" />
					</Button>
				</SimpleColorPicker>
			);
			return renderIsolated(el, {
				center: true,
				setup: async (ctrl) => {
					await ctrl.clickDeepSelector('[slot="anchor"]');
				},
			});
		},
	})
);
