import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { BreadcrumbItem } from './breadcrumb-item';

const getClasses = (_: BreadcrumbItem) => classNames('base');

export const BreadcrumbItemTemplate = (
	context: VividElementDefinitionContext
) => {
	const iconTag = context.tagFor(Icon);

	return html` <div role="listitem" class="${getClasses}">
		${when((x) => x.text && !x.href, html<BreadcrumbItem>`${(x) => x.text}`)}
		${when(
			(x) => x.text && x.href && x.href.length > 0,
			html<BreadcrumbItem>`${(x) =>
				x._renderLinkElement(html`${(x) => x.text}`, 'control')}`
		)}
		${when(
			(x) => x.separator,
			html<BreadcrumbItem>`<${iconTag} class="separator" name="chevron-right-solid"></${iconTag}>`
		)}
	</div>`;
};
