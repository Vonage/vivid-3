import {
	type Dimensions,
	type DimensionValues,
	generateVariants,
	getDimensionSize,
	iterateLabels,
	type Variant,
} from './dimensions';
import type { VChild, VNode } from '@repo/vvd-jsx/jsx-runtime';

const getLabels = (values: DimensionValues) =>
	Array.from(iterateLabels(values));

/**
 * For each dimension, calculate how many columns/rows each header cell spans.
 * This is the product of all subsequent dimension sizes.
 *
 * E.g. for dimensions [A(2), B(3), C(2)]:
 *   A spans 3*2=6, B spans 2, C spans 1
 */
function getChildSpans(dimensions: Dimensions): number[] {
	const sizes = Object.values(dimensions).map(getDimensionSize);
	return sizes.map((_, i) =>
		sizes.slice(i + 1).reduce((product, size) => product * size, 1)
	);
}

/**
 * For each dimension, calculate how many times the header row is repeated.
 * This is the product of all preceding dimension sizes.
 *
 * E.g. for dimensions [A(2), B(3), C(2)]:
 *   A repeats 1, B repeats 2, C repeats 2*3=6
 */
function getRepeatCounts(dimensions: Dimensions): number[] {
	const sizes = Object.values(dimensions).map(getDimensionSize);
	return sizes.map((_, i) =>
		sizes.slice(0, i).reduce((product, size) => product * size, 1)
	);
}

const shouldRenderRowHeader = (
	rowIndex: number,
	dimIndex: number,
	dimensions: Dimensions
) =>
	// A header cell is rendered at the start of each span group.
	rowIndex % getChildSpans(dimensions)[dimIndex] === 0;

function getRowHeaderLabel(
	rowIndex: number,
	dimIndex: number,
	dimensions: Dimensions
): string {
	const keys = Object.keys(dimensions);
	const dimension = dimensions[keys[dimIndex]];
	const labels = getLabels(dimension);
	const span = getChildSpans(dimensions)[dimIndex];
	const totalForDim = getDimensionSize(dimension);
	const labelIndex = Math.floor(rowIndex / span) % totalForDim;
	return labels[labelIndex];
}

function renderXAxisHeaders(xAxis: Dimensions, yAxis: Dimensions): VNode {
	const xDimensionKeys = Object.keys(xAxis);
	const numXDimensions = xDimensionKeys.length;
	const childSpans = getChildSpans(xAxis);
	const repeatCounts = getRepeatCounts(xAxis);
	const yAxisColspan = String(Object.keys(yAxis).length);

	return (
		<thead>
			{xDimensionKeys.map((dimensionKey, dimIndex) => {
				const dimension = xAxis[dimensionKey];
				const labels = getLabels(dimension);
				const colspan = String(childSpans[dimIndex]);
				const repeat = repeatCounts[dimIndex];

				return (
					<tr>
						{dimIndex === 0 && (
							<th rowspan={String(numXDimensions)} colspan={yAxisColspan}></th>
						)}
						{Array.from({ length: repeat }, () =>
							labels.map((label) => <th colspan={colspan}>{label}</th>)
						)}
					</tr>
				);
			})}
		</thead>
	);
}

/** Render table body with Y-axis headers and cells. */
async function renderTableBody(
	xAxis: Dimensions,
	yAxis: Dimensions,
	renderCell: (variant: Variant) => Promise<VChild>
): Promise<VNode> {
	const xVariants = generateVariants(xAxis);
	const yVariants = generateVariants(yAxis);
	const yDimensionKeys = Object.keys(yAxis);

	const rows: VChild[] = [];
	for (let rowIndex = 0; rowIndex < yVariants.length; rowIndex++) {
		const cells: VChild[] = [];
		for (const xVariant of xVariants) {
			const combinedVariant = { ...xVariant, ...yVariants[rowIndex] };
			cells.push(<td>{await renderCell(combinedVariant)}</td>);
		}

		rows.push(
			<tr>
				{yDimensionKeys.map((_, dimIndex) => {
					if (!shouldRenderRowHeader(rowIndex, dimIndex, yAxis)) return null;
					const label = getRowHeaderLabel(rowIndex, dimIndex, yAxis);
					const rowspan = String(getChildSpans(yAxis)[dimIndex]);
					return <th rowspan={rowspan}>{label}</th>;
				})}
				{cells}
			</tr>
		);
	}

	return <tbody>{rows}</tbody>;
}

export interface TableDefinition {
	caption: string;
	xAxis: Dimensions;
	yAxis: Dimensions;
	render: (variant: Variant) => VNode | Promise<VNode>;
}

export async function renderTable(def: TableDefinition) {
	return (
		<table class="variation-table">
			<caption>{def.caption}</caption>
			{renderXAxisHeaders(def.xAxis, def.yAxis)}
			{await renderTableBody(def.xAxis, def.yAxis, async (...args) =>
				def.render(...args)
			)}
		</table>
	);
}
