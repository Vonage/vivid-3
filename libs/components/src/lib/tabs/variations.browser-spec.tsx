import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { tabsDefinition } from './definition';
import { tabDefinition } from '../tab/definition';
import { tabPanelDefinition } from '../tab-panel/definition';

const Tabs = component(tabsDefinition);
const Tab = component(tabDefinition);
const TabPanel = component(tabPanelDefinition);

variationTest(
	'tabs',
	table({
		caption: 'Layout',
		xAxis: {
			shape: ['rounded', 'sharp'],
		},
		yAxis: {
			content: {
				'label only': {},
				'label + icon': { icon: 'chat-line' },
				'label + icon trailing': {
					icon: 'chat-line',
					'icon-trailing': true,
				},
				removable: { removable: true },
				'label + icon + removable': {
					icon: 'chat-line',
					removable: true,
				},
			},
		},
		render: (variant) => {
			const { shape, ...tabAttrs } = flattenAttrs(variant);
			return (
				<Tabs>
					<Tab label="Tab 1" shape={shape} {...tabAttrs} />
					<Tab label="Tab 2" shape={shape} {...tabAttrs} />
					<Tab label="Tab 3" shape={shape} {...tabAttrs} />
					<TabPanel>Panel 1</TabPanel>
					<TabPanel>Panel 2</TabPanel>
					<TabPanel>Panel 3</TabPanel>
				</Tabs>
			);
		},
	}),
	table({
		caption: 'Tabs Layout',
		xAxis: {
			orientation: ['horizontal', 'vertical'],
		},
		yAxis: {
			'tabs-layout': {
				'align-start': { 'tabs-layout': 'align-start' },
				stretch: { 'tabs-layout': 'stretch' },
			},
			gutters: {
				'gutters none': { gutters: 'none' },
				'gutters small': { gutters: 'small' },
			},
		},
		render: (variant) => (
			<Tabs style="inline-size: 400px;" {...flattenAttrs(variant)}>
				<Tab label="Tab 1" icon="chat-line" />
				<Tab label="Tab 2" icon="chat-line" />
				<Tab label="Tab 3" icon="chat-line" />
				<TabPanel>Panel 1 content</TabPanel>
				<TabPanel>Panel 2 content</TabPanel>
				<TabPanel>Panel 3 content</TabPanel>
			</Tabs>
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: ['accent', 'cta'],
		},
		yAxis: {
			state: {
				default: {},
				'with disabled tab': { disabled: true },
			},
		},
		render: (variant) => {
			const { connotation, disabled } = flattenAttrs(variant);
			return (
				<Tabs connotation={connotation}>
					<Tab label="Tab 1" icon="chat-line" />
					<Tab label="Tab 2" icon="chat-line" disabled={disabled} />
					<Tab label="Tab 3" icon="chat-line" />
					<TabPanel>Panel 1 content</TabPanel>
					<TabPanel>Panel 2 content</TabPanel>
					<TabPanel>Panel 3 content</TabPanel>
				</Tabs>
			);
		},
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			connotation: ['accent', 'cta'],
			shape: ['rounded', 'sharp'],
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				active: (ctrl: SampleControls) => ctrl.mousedown(),
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
			},
		},
		render: async ({ state, connotation, shape }) => {
			const el = (
				<Tabs connotation={connotation}>
					<Tab label="Tab 1" icon="chat-line" shape={shape} />
					<Tab label="Tab 2" icon="chat-line" shape={shape} />
					<Tab label="Tab 3" icon="chat-line" shape={shape} />
					<TabPanel>Panel 1 content</TabPanel>
					<TabPanel>Panel 2 content</TabPanel>
					<TabPanel>Panel 3 content</TabPanel>
				</Tabs>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
