import '../icon/icon';

import { customElement } from 'lit/decorators.js';

import { BadgeBase } from './badge-base.js';

import style from './badge.scss';

/**
 * Represents a badge custom element.
 * badge is a label that holds small amounts of information. A badge can be used to display unread notifications, or to label a block of text. Badges don’t work for navigation because they can't include a hyperlink.
 */
@customElement('vwc-badge')
export class Badge extends BadgeBase {
	static override styles = style;
}

declare global {
	interface HTMLElementTagNameMap {
		'vwc-badge': Badge;
	}
}

