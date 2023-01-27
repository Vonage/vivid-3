import { elements, html, slotted } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Accordion } from './accordion';

const getClasses = (_: Accordion) => classNames('base');

/**
 * @public
 */
export const AccordionTemplate: () => ViewTemplate<Accordion> = () => html<Accordion>`
	<div class="${getClasses}">
		<slot ${slotted({ property: 'accordionItems', filter: elements() })}></slot>
	</div>
`;
