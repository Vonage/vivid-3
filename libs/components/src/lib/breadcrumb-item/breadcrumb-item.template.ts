import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { textAnchorTemplate } from '../text-anchor/text-anchor.template';
import { Icon } from '../icon/icon';
import type { BreadcrumbItem } from './breadcrumb-item';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';

const getClasses = (_: BreadcrumbItem) => classNames('base');

export const BreadcrumbItemTemplate = (
	context: VividElementDefinitionContext
) => {
	const iconTag = context.tagFor(Icon);

	return html` <div role="listitem" class="${getClasses}">
		${when((x) => x.text && !x.href, html<BreadcrumbItem>`${(x) => x.text}`)}
		${when(
			(x) => x.text && x.href && x.href.length > 0,
			html<BreadcrumbItem>`${textAnchorTemplate(context)}`
		)}
		${when(
			(x) => x.separator,
			html<BreadcrumbItem>`<${iconTag} class="separator" name="chevron-right-solid"></${iconTag}>`
		)}
	</div>`;
};
