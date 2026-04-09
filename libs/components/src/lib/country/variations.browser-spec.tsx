import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { countryDefinition } from './definition';

const Country = component(countryDefinition);

variationTest(
	'country',
	table({
		caption: 'Layout',
		xAxis: {
			code: ['US'],
		},
		yAxis: {
			content: {
				'code only': {},
				'with label': { label: 'United States' },
			},
		},
		render: (variant) => <Country {...flattenAttrs(variant)} />,
	})
);
