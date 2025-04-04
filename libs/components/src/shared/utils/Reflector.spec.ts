import { observable } from '@microsoft/fast-element';
import { Reflector } from './Reflector';

describe('Reflector', () => {
	class SourceClass {
		@observable value: string | null | undefined = 'initial';
		@observable boolean = true;
	}

	let source: SourceClass;
	let target: HTMLElement;
	beforeEach(() => {
		source = new SourceClass();
		target = document.createElement('div');
	});

	describe('attribute', () => {
		let reflector: Reflector<SourceClass, HTMLElement>;
		beforeEach(() => {
			reflector = new Reflector(source, target);
			reflector.attribute('value', 'aria-label');
		});

		it('should reflect the initial value', () => {
			expect(target.getAttribute('aria-label')).toBe('initial');
		});

		it('should reflect changes to the source property', () => {
			source.value = 'changed';
			expect(target.getAttribute('aria-label')).toBe('changed');
		});

		it.each([null, undefined])(
			'should remove the attribute if value is %s',
			(value) => {
				source.value = value;
				expect(target.hasAttribute('aria-label')).toBe(false);
			}
		);
	});

	describe('booleanAttribute', () => {
		let reflector: Reflector<SourceClass, HTMLElement>;
		beforeEach(() => {
			reflector = new Reflector(source, target);
			reflector.booleanAttribute('boolean', 'aria-pressed');
		});

		it('should reflect the initial value', () => {
			expect(target.getAttribute('aria-pressed')).toBe('');
		});

		it('should reflect changes to the source property', () => {
			source.boolean = false;
			expect(target.hasAttribute('aria-pressed')).toBe(false);
		});
	});

	describe('property', () => {
		let reflector: Reflector<SourceClass, HTMLElement>;
		beforeEach(() => {
			reflector = new Reflector(source, target);
			reflector.property('value', 'textContent');
		});

		it('should reflect the initial value', () => {
			expect(target.textContent).toBe('initial');
		});

		it('should reflect changes to the source property', () => {
			source.value = 'changed';
			expect(target.textContent).toBe('changed');
		});

		it('should not set property on target if value is already the target value when skipIfEqual is set', () => {
			reflector.property('value', 'title', true);
			const set = vi.fn();
			Object.defineProperty(target, 'textContent', {
				get() {
					return 'changed';
				},
				set,
			});

			source.value = 'changed';

			expect(set).not.toHaveBeenCalled();
		});
	});

	describe('destroy', () => {
		it('should unsubscribe from all source property changes', () => {
			const reflector = new Reflector(source, target);
			reflector.property('value', 'textContent');
			reflector.attribute('value', 'aria-label');
			reflector.booleanAttribute('boolean', 'aria-pressed');
			reflector.destroy();

			source.value = 'changed';
			source.boolean = false;
			expect(target.textContent).toBe('initial');
			expect(target.getAttribute('aria-label')).toBe('initial');
			expect(target.hasAttribute('aria-pressed')).toBe(true);
		});
	});
});
