import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Tag } from '../tag/tag';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { TagGroup } from './tag-group';

const getClasses = (_: Tag) => classNames('base');

export const TagGroupTemplate = html<TagGroup>`
	<div
		class="${getClasses}"
		${delegateAria({
			role: 'group',
		})}
	>
		<slot></slot>
	</div>
`;
