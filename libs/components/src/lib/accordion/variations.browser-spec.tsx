import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import { accordionDefinition } from './definition';
import { accordionItemDefinition } from '../accordion-item/definition';

const Accordion = component(accordionDefinition);
const AccordionItem = component(accordionItemDefinition);

variationTest(
	'accordion',
	table({
		caption: 'Layout',
		xAxis: {
			_: [null],
		},
		yAxis: {
			'expand-mode': ['single', 'multi'],
		},
		render: (variant) => (
			<Accordion {...variant}>
				<AccordionItem heading="Accordion item 1" expanded>
					First item body content.
				</AccordionItem>
				<AccordionItem heading="Accordion item 2" expanded>
					Second item body content.
				</AccordionItem>
				<AccordionItem heading="Accordion item 3" expanded>
					Third item body content.
				</AccordionItem>
			</Accordion>
		),
	})
);
