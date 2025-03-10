import { renderComponent } from './renderComponent';
import {
	exampleComponent,
	minimalComponent,
} from '../__fixtures__/componentDefs';
import { importedTypesResolverStub } from '../__fixtures__/importedTypes';

describe('renderComponent', () => {
	it('should render a component', () => {
		expect(
			renderComponent(exampleComponent, importedTypesResolverStub)
		).toMatchSnapshot();
	});

	it('should render a component as a Vue 3 stub', () => {
		expect(
			renderComponent(exampleComponent, importedTypesResolverStub, true)
		).toMatchSnapshot();
	});

	it('should render a minimal component', () => {
		expect(
			renderComponent(minimalComponent, importedTypesResolverStub)
		).toMatchSnapshot();
	});

	it('should render minimal component as a Vue 3 stub', () => {
		expect(
			renderComponent(minimalComponent, importedTypesResolverStub, true)
		).toMatchSnapshot();
	});

	it('should throw an error if the event for a Vue model is not found', () => {
		expect(() =>
			renderComponent(
				{
					...minimalComponent,
					props: [
						{
							name: 'value',
							type: 'string',
							attributeName: 'attribute',
							propertyName: 'value',
						},
					],
					vueModels: [
						{
							name: 'modelValue',
							propName: 'value',
							eventNames: ['not-found'],
							valueMapping: '(event.target as any).value',
						},
					],
				},
				importedTypesResolverStub
			)
		).toThrow('v-model event not found');
	});

	it('should throw an error if the prop for a Vue model is not found', () => {
		expect(() =>
			renderComponent(
				{
					...minimalComponent,
					events: [
						{
							name: 'input',
							type: 'Event',
						},
					],
					vueModels: [
						{
							name: 'modelValue',
							propName: 'not-found',
							eventNames: ['input'],
							valueMapping: '(event.target as any).value',
						},
					],
				},
				importedTypesResolverStub
			)
		).toThrow('v-model prop not found');
	});

	it('should throw an error if the type of an event is a union', () => {
		expect(() =>
			renderComponent(
				{
					...minimalComponent,
					events: [
						{
							name: 'input',
							type: 'Event | CustomEvent',
						},
					],
				},
				importedTypesResolverStub,
				true
			)
		).toThrow('Multiple event types not supported');
	});
});
