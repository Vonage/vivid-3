import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Tag } from '../tag/tag';
import type { TagGroup } from './tag-group';

const getClasses = (_: Tag) => classNames('base');

export const TagGroupTemplate = html<TagGroup>`
	<div
		class="${getClasses}"
		role="listbox"
		aria-orientation="horizontal"
		aria-label="${(x) => x.ariaLabel}"
	>
		<slot></slot>
	</div>
`;
