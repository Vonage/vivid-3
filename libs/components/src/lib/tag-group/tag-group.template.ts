import { elements, html, slotted } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Tag } from '../tag/tag';
import type { TagGroup } from './tag-group';

const getClasses = (_: Tag) => classNames(
	'base',
);

/**
 *
 * @param context
 * @public
 */
export const TagGroupTemplate: (context: ElementDefinitionContext) => ViewTemplate<TagGroup> = (context: ElementDefinitionContext) => {
	return html<TagGroup>`
		<div class="${getClasses}" >
			<slot ${slotted({ property: 'slottedTags', filter: elements(context.tagFor(Tag)) })}></slot>
		</div>
	`;
};
