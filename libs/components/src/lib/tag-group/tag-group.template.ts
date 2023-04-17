import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Tag } from '../tag/tag';
import type { TagGroup } from './tag-group';

const getClasses = (_: Tag) => classNames(
	'base',
);

/**
 *
 * @param context
 * @public
 */
export const TagGroupTemplate: (context: ElementDefinitionContext) => ViewTemplate<TagGroup> = () => {
	return html<TagGroup>`
		<div class="${getClasses}" role="listbox" aria-orientation="horizontal">
			<slot></slot>
		</div>
	`;
};
