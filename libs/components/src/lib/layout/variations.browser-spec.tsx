import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { layoutDefinition } from './definition';

const Layout = component(layoutDefinition);

const itemStyle =
	'background: var(--vvd-color-neutral-100); padding: 8px; border-radius: 4px; text-align: center;';

const items = (
	<>
		<div style={itemStyle}>Item 1</div>
		<div style={itemStyle}>Item 2</div>
		<div style={itemStyle}>Item 3</div>
		<div style={itemStyle}>Item 4</div>
		<div style={itemStyle}>Item 5</div>
		<div style={itemStyle}>Item 6</div>
	</>
);

variationTest(
	'layout',
	table({
		caption: 'Column Basis',
		xAxis: {
			'column-basis': ['small', 'medium', 'large', 'block'],
		},
		yAxis: {
			'auto-sizing': {
				'fill (default)': 'fill',
				fit: 'fit',
			},
		},
		render: (variant) => (
			<Layout
				style="inline-size: 500px; background: var(--vvd-color-neutral-50); border: 1px solid var(--vvd-color-neutral-200);"
				{...flattenAttrs(variant)}
			>
				{items}
			</Layout>
		),
	}),
	table({
		caption: 'Column Spacing',
		xAxis: {
			'column-spacing': ['small', 'medium', 'large'],
		},
		yAxis: {
			'row-spacing': ['small', 'medium', 'large'],
		},
		render: (variant) => (
			<Layout
				column-basis="small"
				style="inline-size: 400px; background: var(--vvd-color-neutral-50); border: 1px solid var(--vvd-color-neutral-200);"
				{...flattenAttrs(variant)}
			>
				{items}
			</Layout>
		),
	}),
	table({
		caption: 'Gutters',
		xAxis: {
			gutters: ['small', 'medium', 'large'],
		},
		yAxis: {
			'column-basis': ['small', 'block'],
		},
		render: (variant) => (
			<Layout
				style="inline-size: 400px; background: var(--vvd-color-neutral-50); border: 1px solid var(--vvd-color-neutral-200);"
				{...flattenAttrs(variant)}
			>
				<div style={itemStyle}>Item 1</div>
				<div style={itemStyle}>Item 2</div>
				<div style={itemStyle}>Item 3</div>
			</Layout>
		),
	})
);
