import { renderComponent } from './renderComponent';
import {
	exampleComponent,
	minimalComponent,
} from './__fixtures__/componentDefs';

describe('renderComponent', () => {
	it('should render a component', () => {
		expect(renderComponent(exampleComponent)).toMatchSnapshot();
	});

	it('should render a component as a Vue 3 stub', () => {
		expect(renderComponent(exampleComponent, true)).toMatchSnapshot();
	});

	it('should render a minimal component', () => {
		expect(renderComponent(minimalComponent)).toMatchSnapshot();
	});

	it('should render minimal component as a Vue 3 stub', () => {
		expect(renderComponent(minimalComponent, true)).toMatchSnapshot();
	});

	it('should throw an error if the event for a Vue model is not found', () => {
		expect(() =>
			renderComponent({
				...minimalComponent,
				attributes: [
					{
						name: 'value',
						forwardTo: {
							type: 'attribute',
							name: 'value',
						},
						type: [
							{
								text: 'string',
								vuePropType: 'String',
							},
						],
					},
				],
				vueModels: [
					{
						name: 'modelValue',
						attributeName: 'value',
						eventName: 'not-found',
						valueMapping: '(event.target as any).value',
					},
				],
			})
		).toThrow('v-model event not found');
	});

	it('should throw an error if the attribute for a Vue model is not found', () => {
		expect(() =>
			renderComponent({
				...minimalComponent,
				events: [
					{
						name: 'input',
						type: [
							{
								text: 'Event',
								vuePropType: 'Event',
							},
						],
					},
				],
				vueModels: [
					{
						name: 'modelValue',
						attributeName: 'not-found',
						eventName: 'input',
						valueMapping: '(event.target as any).value',
					},
				],
			})
		).toThrow('v-model attribute not found');
	});
});
