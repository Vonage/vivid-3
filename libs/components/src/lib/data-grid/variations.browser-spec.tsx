import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import {
	dataGridCellDefinition,
	dataGridDefinition,
	dataGridRowDefinition,
} from './definition';

const DataGrid = component(dataGridDefinition);
const DataGridRow = component(dataGridRowDefinition);
const DataGridCell = component(dataGridCellDefinition);

variationTest(
	'data-grid',
	table({
		caption: 'Layout',
		xAxis: {
			structure: {
				'header + rows': 'header-rows',
				'sticky header': 'sticky-header',
				'no header': 'no-header',
			},
		},
		yAxis: {
			content: {
				'short text': 'short',
				'long wrapping text': 'long',
				'custom cell height': 'custom-height',
				'nowrap (overflow)': 'nowrap',
			},
		},
		render: (variant) => {
			const { structure, content } = variant;

			const cellText =
				content === 'long'
					? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius libero ipsum.'
					: 'Cell data';

			const rowStyle =
				content === 'custom-height'
					? '--data-grid-cell-block-size: 80px'
					: content === 'nowrap'
						? '--data-grid-cell-white-space: nowrap'
						: undefined;

			const rowType =
				structure === 'sticky-header' ? 'sticky-header' : 'header';

			if (structure === 'no-header') {
				return (
					<DataGrid style="inline-size: 350px;">
						<DataGridRow style={rowStyle}>
							<DataGridCell>{cellText}</DataGridCell>
							<DataGridCell>Value 1</DataGridCell>
						</DataGridRow>
						<DataGridRow style={rowStyle}>
							<DataGridCell>Row 2</DataGridCell>
							<DataGridCell>Value 2</DataGridCell>
						</DataGridRow>
					</DataGrid>
				);
			}

			return (
				<DataGrid style="inline-size: 350px;">
					<DataGridRow row-type={rowType}>
						<DataGridCell cell-type="columnheader">Column 1</DataGridCell>
						<DataGridCell cell-type="columnheader">Column 2</DataGridCell>
					</DataGridRow>
					<DataGridRow style={rowStyle}>
						<DataGridCell>{cellText}</DataGridCell>
						<DataGridCell>Value 1</DataGridCell>
					</DataGridRow>
					<DataGridRow style={rowStyle}>
						<DataGridCell>Row 2</DataGridCell>
						<DataGridCell>Value 2</DataGridCell>
					</DataGridRow>
				</DataGrid>
			);
		},
	}),
	table({
		caption: 'Visual',
		xAxis: {
			selection: {
				'no selection': 'none',
				'selected row': 'row',
				'selected cell': 'cell',
			},
		},
		yAxis: {
			connotation: {
				accent: 'accent',
				cta: 'cta',
			},
		},
		render: (variant) => {
			const { selection, connotation } = variant;

			return (
				<DataGrid style="inline-size: 400px;">
					<DataGridRow row-type="header">
						<DataGridCell cell-type="columnheader">Product</DataGridCell>
						<DataGridCell cell-type="columnheader">Type</DataGridCell>
						<DataGridCell cell-type="columnheader">Threshold</DataGridCell>
					</DataGridRow>
					<DataGridRow
						selected={selection === 'row' ? true : undefined}
						connotation={connotation}
					>
						<DataGridCell
							selected={selection === 'cell' ? true : undefined}
							connotation={connotation}
						>
							SMS
						</DataGridCell>
						<DataGridCell>Volumetric</DataGridCell>
						<DataGridCell>1000</DataGridCell>
					</DataGridRow>
					<DataGridRow>
						<DataGridCell>Voice</DataGridCell>
						<DataGridCell>Rate</DataGridCell>
						<DataGridCell>5000</DataGridCell>
					</DataGridRow>
				</DataGrid>
			);
		},
	}),
	table({
		caption: 'Sorting',
		xAxis: {
			'sort-direction': {
				none: 'none',
				ascending: 'ascending',
				descending: 'descending',
			},
		},
		yAxis: {
			'action-items': {
				'no action items': 'none',
				'with action items': 'action',
			},
		},
		render: (variant) => {
			const { 'sort-direction': sortDirection, 'action-items': actionItems } =
				flattenAttrs(variant);

			return (
				<DataGrid style="inline-size: 400px;">
					<DataGridRow row-type="header">
						<DataGridCell
							cell-type="columnheader"
							sort-direction={sortDirection}
						>
							Sortable Column
							{actionItems === 'action' ? (
								<button
									slot="action-items"
									style="border: none; background: none; cursor: pointer;"
								>
									⚙
								</button>
							) : null}
						</DataGridCell>
						<DataGridCell cell-type="columnheader">Column 2</DataGridCell>
					</DataGridRow>
					<DataGridRow>
						<DataGridCell>Data 1</DataGridCell>
						<DataGridCell>Data 2</DataGridCell>
					</DataGridRow>
				</DataGrid>
			);
		},
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			'cell-type': {
				default: 'default',
				columnheader: 'columnheader',
			},
			selected: {
				unselected: false,
				selected: true,
			},
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
			},
		},
		render: async ({ state, ...rest }) => {
			const { 'cell-type': cellType, selected } = flattenAttrs(rest);

			const el = (
				<DataGrid style="inline-size: 300px;">
					<DataGridRow
						row-type={cellType === 'columnheader' ? 'header' : undefined}
					>
						<DataGridCell
							cell-type={cellType}
							selected={selected ? true : undefined}
						>
							Cell Content
						</DataGridCell>
						<DataGridCell cell-type={cellType}>Other Cell</DataGridCell>
					</DataGridRow>
				</DataGrid>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
