import {
	customElement,
	FASTElement,
	observable,
} from '@microsoft/fast-element';
import { ReplacedPropHandling, replaces } from './replaced-props';

describe('replaces', () => {
	describe('one way syncing', () => {
		@customElement('one-way')
		class DummyElement extends ReplacedPropHandling(FASTElement) {
			@observable oldProp = '';

			@replaces<string>({
				deprecatedPropertyName: 'oldProp',
				fromDeprecated: (v) => v.toLowerCase(),
			})
			@observable
			newProp = '';
		}

		it('should set the new property when the old property is set', () => {
			const element = new DummyElement();
			element.oldProp = 'TEST';
			expect(element.oldProp).toBe('TEST');
			expect(element.newProp).toBe('test');
		});

		it('should not set the old property when the new property is set', () => {
			const element = new DummyElement();
			element.newProp = 'TEST';
			expect(element.newProp).toBe('TEST');
			expect(element.oldProp).toBe('');
		});
	});

	describe('two way syncing', () => {
		@customElement('two-way')
		class DummyElement extends ReplacedPropHandling(FASTElement) {
			@observable oldProp = '';

			@replaces<string>({
				deprecatedPropertyName: 'oldProp',
				fromDeprecated: (v) => v.toLowerCase(),
				toDeprecated: (v) => v.toUpperCase(),
			})
			@observable
			newProp = '';
		}

		it('should set the new property when the old property is set', () => {
			const element = new DummyElement();
			element.oldProp = 'TEST';
			expect(element.oldProp).toBe('TEST');
			expect(element.newProp).toBe('test');
		});

		it('should set the old property when the new property is set', () => {
			const element = new DummyElement();
			element.newProp = 'test';
			expect(element.newProp).toBe('test');
			expect(element.oldProp).toBe('TEST');
		});
	});

	describe('initial values', () => {
		@customElement('initial-values')
		class DummyElement extends ReplacedPropHandling(FASTElement) {
			@observable oldProp = 'old-initial';

			@replaces<string>({
				deprecatedPropertyName: 'oldProp',
				fromDeprecated: (v) => v,
				toDeprecated: (v) => v,
			})
			@observable
			newProp = 'new-initial';
		}

		it('should use the last defined initial value', () => {
			const element = new DummyElement();
			expect(element.oldProp).toBe('new-initial');
			expect(element.newProp).toBe('new-initial');
		});
	});

	describe('with conversion functions that are not the inverse of each other', () => {
		@customElement('no-infinite-recursion')
		class DummyElement extends ReplacedPropHandling(FASTElement) {
			@observable oldProp = '';

			@replaces<string>({
				deprecatedPropertyName: 'oldProp',
				fromDeprecated: (v) => `fromDeprecated(${v})`,
				toDeprecated: (v) => `toDeprecated(${v})`,
			})
			@observable
			newProp = '';
		}

		it('should not recurse when setting new prop', () => {
			const element = new DummyElement();
			element.newProp = 'test';

			expect(element.oldProp).toBe('toDeprecated(test)');
			expect(element.newProp).toBe('test');
		});

		it('should not recurse when setting the old prop', () => {
			const element = new DummyElement();
			element.oldProp = 'test';

			expect(element.oldProp).toBe('test');
			expect(element.newProp).toBe('fromDeprecated(test)');
		});
	});
});
