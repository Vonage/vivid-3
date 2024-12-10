import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Layout } from './layout';

const getClasses = ({
	columnBasis,
	gutters,
	columnSpacing,
	autoSizing,
	rowSpacing,
}: Layout) =>
	classNames(
		'control',
		[`column-basis-${columnBasis}`, Boolean(columnBasis)],
		[`gutters-${gutters}`, Boolean(gutters)],
		[`column-spacing-${columnSpacing}`, Boolean(columnSpacing)],
		[
			`row-spacing-${rowSpacing ? rowSpacing : columnSpacing}`,
			Boolean(rowSpacing) || Boolean(columnSpacing),
		],
		[`auto-sizing-${autoSizing}`, Boolean(autoSizing)]
	);

export const layoutTemplate = html<Layout>` <div class="${getClasses}">
	<slot></slot>
</div>`;
