import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { accordionDefinition } from '../accordion/definition';
import { accordionItemDefinition } from './definition';

const Accordion = component(accordionDefinition);
const AccordionItem = component(accordionItemDefinition);

variationTest(
	'accordion-item',
	table({
		caption: 'Layout',
		xAxis: {
			icon: {
				'no icon': {},
				'with icon': { icon: 'chat-line' },
				'icon trailing': { icon: 'chat-line', 'icon-trailing': true },
			},
			meta: {
				'no meta': {},
				'with meta': { meta: 'Meta' },
			},
		},
		yAxis: {
			size: ['normal', 'condensed'],
			expanded: {
				collapsed: false,
				expanded: true,
			},
		},
		render: (variant) => {
			return (
				<Accordion expand-mode="multi">
					<AccordionItem heading="Accordion item" {...flattenAttrs(variant)}>
						Accordion body content.
					</AccordionItem>
				</Accordion>
			);
		},
	}),
	table({
		caption: 'Visual',
		xAxis: {
			appearance: ['ghost', 'ghost-light', 'filled'],
		},
		yAxis: {
			expanded: {
				collapsed: {},
				expanded: { expanded: true },
			},
		},
		render: (variant) => {
			return (
				<Accordion expand-mode="multi">
					<AccordionItem
						heading="Accordion item"
						icon="chat-line"
						meta="Meta"
						{...flattenAttrs(variant)}
					>
						Accordion body content.
					</AccordionItem>
				</Accordion>
			);
		},
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			appearance: ['ghost', 'ghost-light', 'filled'],
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				active: (ctrl: SampleControls) => ctrl.mousedown(),
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
			},
		},
		render: async ({ state, ...rest }) => {
			const accordion = (
				<Accordion expand-mode="multi">
					<AccordionItem
						heading="Accordion item"
						icon="chat-line"
						meta="Meta"
						{...rest}
					>
						Accordion body content.
					</AccordionItem>
				</Accordion>
			);

			if (!state) return accordion;
			return renderIsolated(accordion, { setup: state });
		},
	})
);
