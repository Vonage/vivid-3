import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import {
	tableBodyDefinition,
	tableCellDefinition,
	tableDefinition,
	tableHeadDefinition,
	tableHeaderCellDefinition,
	tableRowDefinition,
	tableSortingButtonDefinition,
} from './definition';

const Table = component(tableDefinition);
const TableHead = component(tableHeadDefinition);
const TableBody = component(tableBodyDefinition);
const TableRow = component(tableRowDefinition);
const TableHeaderCell = component(tableHeaderCellDefinition);
const TableCell = component(tableCellDefinition);
const TableSortingButton = component(tableSortingButtonDefinition);

variationTest(
	'table',
	table({
		caption: 'Layout',
		xAxis: {
			structure: {
				'with head and body': 'head-body',
				'row-scoped headers': 'row-scoped',
				'body only': 'body-only',
			},
		},
		yAxis: {
			content: {
				'short text': 'short',
				'long text': 'long',
				'with sorting button': 'sorting',
			},
		},
		render: (variant) => {
			const { structure, content } = variant;

			const headerContent =
				content === 'sorting' ? (
					<>
						Product <TableSortingButton direction="asc" />
					</>
				) : (
					'Product'
				);

			const cellText =
				content === 'long'
					? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
					: 'SMS';

			if (structure === 'head-body') {
				return (
					<Table style="inline-size: 400px;">
						<TableHead>
							<TableRow>
								<TableHeaderCell>{headerContent}</TableHeaderCell>
								<TableHeaderCell>Type</TableHeaderCell>
								<TableHeaderCell>Threshold</TableHeaderCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>{cellText}</TableCell>
								<TableCell>Volumetric</TableCell>
								<TableCell>1000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Voice</TableCell>
								<TableCell>Rate</TableCell>
								<TableCell>5000</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				);
			}

			if (structure === 'row-scoped') {
				return (
					<Table style="inline-size: 400px;">
						<TableBody>
							<TableRow>
								<TableHeaderCell>{headerContent}</TableHeaderCell>
								<TableCell>{cellText}</TableCell>
								<TableCell>Voice</TableCell>
							</TableRow>
							<TableRow>
								<TableHeaderCell>Type</TableHeaderCell>
								<TableCell>Volumetric</TableCell>
								<TableCell>Rate</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				);
			}

			// body-only
			return (
				<Table style="inline-size: 400px;">
					<TableBody>
						<TableRow>
							<TableCell>{cellText}</TableCell>
							<TableCell>Volumetric</TableCell>
							<TableCell>1000</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Voice</TableCell>
							<TableCell>Rate</TableCell>
							<TableCell>5000</TableCell>
						</TableRow>
					</TableBody>
				</Table>
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
				<Table style="inline-size: 400px;">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Product</TableHeaderCell>
							<TableHeaderCell>Type</TableHeaderCell>
							<TableHeaderCell>Threshold</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow
							selected={selection === 'row' ? '' : undefined}
							connotation={connotation}
						>
							<TableCell
								selected={selection === 'cell' ? '' : undefined}
								connotation={connotation}
							>
								SMS
							</TableCell>
							<TableCell>Volumetric</TableCell>
							<TableCell>1000</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Voice</TableCell>
							<TableCell>Rate</TableCell>
							<TableCell>5000</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
		},
	}),
	table({
		caption: 'Sorting Button',
		xAxis: {
			direction: {
				none: 'none',
				asc: 'asc',
				desc: 'desc',
			},
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				active: (ctrl: SampleControls) => ctrl.mousedown(),
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
			},
		},
		render: async ({ state, direction }) => {
			const el = <TableSortingButton direction={direction} />;
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			selection: {
				'no selection': 'none',
				'selected row': 'row',
			},
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
			},
		},
		render: async ({ state, selection }) => {
			const el = (
				<Table style="inline-size: 400px;">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Product</TableHeaderCell>
							<TableHeaderCell>Type</TableHeaderCell>
							<TableHeaderCell>Threshold</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow
							selected={selection === 'row' ? '' : undefined}
							connotation="accent"
						>
							<TableCell>SMS</TableCell>
							<TableCell>Volumetric</TableCell>
							<TableCell>1000</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Voice</TableCell>
							<TableCell>Rate</TableCell>
							<TableCell>5000</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
