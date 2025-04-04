import { FASTElement, html } from '@microsoft/fast-element';
import { fixture } from '@vivid-nx/shared';
import { createRegisterFunction } from './createRegisterFunction';
import {
	defineVividComponent,
	type VividComponentDefinition,
	type VividElementDefinitionContext,
} from './defineVividComponent';

const template = html`<div></div>`;

describe('registerFactory', () => {
	let Component: typeof HTMLElement;
	let Child: typeof HTMLElement;
	let childDefinition: VividComponentDefinition;
	let componentDefinition: VividComponentDefinition;

	beforeEach(() => {
		Component = class extends FASTElement {};
		Child = class extends FASTElement {};

		childDefinition = defineVividComponent('child', Child, template, [], {});
		componentDefinition = defineVividComponent(
			'component',
			Component,
			template,
			[childDefinition],
			{}
		);
	});

	describe('when called with a prefix, returns a function that', () => {
		let registerComponent: (prefix?: string) => void;
		beforeEach(() => {
			registerComponent = createRegisterFunction(componentDefinition);
		});

		it('should first define dependencies and then the component with the prefix', () => {
			vi.spyOn(customElements, 'define');

			registerComponent('prefix');

			expect(customElements.define).toHaveBeenNthCalledWith(
				1,
				'prefix-child',
				Child,
				{}
			);
			expect(customElements.define).toHaveBeenNthCalledWith(
				2,
				'prefix-component',
				Component,
				{}
			);
		});

		it('should not throw an error if called multiple times', () => {
			registerComponent('multiple');
			expect(() => registerComponent('multiple')).not.toThrow();
		});

		it('should define elements as anonymous subclasses when called again with a different prefix', () => {
			registerComponent('first');

			registerComponent('second');

			const Subclass = customElements.get('second-component') as any;
			expect(Subclass).not.toBe(Component);
			expect(Subclass.prototype instanceof Component).toBe(true);
		});

		it('should silently ignore when an element is already defined', () => {
			class ExistingComponent extends HTMLElement {}
			customElements.define('duplicate-component', ExistingComponent);

			registerComponent('duplicate');

			expect(customElements.get('duplicate-component')).toBe(ExistingComponent);
			expect(customElements.get('duplicate-child')).toBe(Child);
		});

		it('should default to "vwc" when to prefix is provided', () => {
			registerComponent();

			expect(customElements.get('vwc-child')).toBe(Child);
			expect(customElements.get('vwc-component')).toBe(Component);
		});
	});

	describe('when template is a function, it is resolved with a VividElementDefinitionContext', () => {
		describe('tagFor', () => {
			it('should resolve tag names of dependencies', async () => {
				const componentDefinition = defineVividComponent(
					'component',
					Component,
					(context: VividElementDefinitionContext) => {
						const childTag = context.tagFor(Child);
						return html`
								<${childTag}></${childTag}>`;
					},
					[childDefinition],
					{}
				);
				createRegisterFunction(componentDefinition)('tag');

				const element = await fixture('<tag-component></tag-component>');

				expect(element.shadowRoot!.querySelector('tag-child')).not.toBeNull();
			});

			it('should throw an error when called for a non-dependency', async () => {
				const componentDefinition = defineVividComponent(
					'component',
					Component,
					(context: VividElementDefinitionContext) => {
						const childTag = context.tagFor(Child);
						return html`
								<${childTag}></${childTag}>`;
					},
					[],
					{}
				);

				expect(() =>
					createRegisterFunction(componentDefinition)('non-dependency')
				).toThrow();
			});
		});
		describe('tagForNonDependency', () => {
			it('should prefix the provided element name', async () => {
				const componentDefinition = defineVividComponent(
					'component',
					Component,
					(context: VividElementDefinitionContext) => {
						const exampleTag = context.tagForNonDependency('example');
						return html`${exampleTag}`;
					},
					[],
					{}
				);

				createRegisterFunction(componentDefinition)('non-dependency-tag');

				const element = await fixture(
					'<non-dependency-tag-component></non-dependency-tag-component>'
				);
				expect(element.shadowRoot!.textContent).toBe(
					'non-dependency-tag-example'
				);
			});
		});
	});
});
