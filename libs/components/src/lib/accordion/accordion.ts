import { Accordion as FastAccordion, AccordionExpandMode } from '@microsoft/fast-foundation';
import type { AccordionItem } from '../accordion-item/accordion-item';

/**
 * Base class for accordion
 *
 * @public
 */
export class Accordion extends FastAccordion {

    /**
     * Controls the expand mode of the Accordion, either allowing
     * single or multiple item expansion.
     * @public
     *
     * @remarks
     * HTML attribute: expand-mode
     */
    override expandmode: AccordionExpandMode = AccordionExpandMode.single;

	closeAll(): void {
		if (this.expandmode === AccordionExpandMode.multi) {
			(this.accordionItems as AccordionItem[]).forEach((item) => {
				item.expanded = false;
			});
		}
	}
}
