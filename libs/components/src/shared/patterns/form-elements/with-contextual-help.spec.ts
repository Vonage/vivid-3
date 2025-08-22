import 'element-internals-polyfill';

import { fixture } from '@repo/shared';
import { customElement, html } from '@microsoft/fast-element';
import { FormAssociated } from '../../foundation/form-associated/form-associated';
import { VividElement } from '../../foundation/vivid-element/vivid-element';
import type { VividElementDefinitionContext } from '../../design-system/defineVividComponent';
import { FormElement } from './form-element';
import { WithContextualHelp } from './with-contextual-help';

describe('WithContextualHelp mixin', function () {
	@customElement('contextual-help-test-element')
	class ContextualHelpTestElement extends WithContextualHelp(
		FormElement(FormAssociated(VividElement))
	) {
		override proxy = document.createElement('input');

		override connectedCallback() {
			super.connectedCallback();
			this.$emit('connected');
		}
	}

	let instance: ContextualHelpTestElement;
	let mockContext: VividElementDefinitionContext;

	beforeEach(async function () {
		instance = (await fixture(
			'<contextual-help-test-element></contextual-help-test-element>'
		)) as ContextualHelpTestElement;

		mockContext = {
			tagFor: vi.fn(() => 'vwc-contextual-help'),
		} as any;
	});

	afterEach(function () {
		instance.remove();
	});

	describe('_shouldShowContextualHelp', function () {
		it('should return false when no label is set', function () {
			instance.contextualHelpSlottedContent = [document.createElement('div')];
			expect(instance._shouldShowContextualHelp).toBe(false);
		});

		it('should return false when no contextual-help content is slotted', function () {
			instance.label = 'Test Label';
			instance.contextualHelpSlottedContent = [];
			expect(instance._shouldShowContextualHelp).toBe(false);
		});

		it('should return false when contextualHelpSlottedContent is undefined', function () {
			instance.label = 'Test Label';
			instance.contextualHelpSlottedContent = undefined;
			expect(instance._shouldShowContextualHelp).toBe(false);
		});

		it('should return true when both label and contextual-help content are present', function () {
			instance.label = 'Test Label';
			instance.contextualHelpSlottedContent = [document.createElement('div')];
			expect(instance._shouldShowContextualHelp).toBe(true);
		});
	});

	describe('_renderLabelWithContextualHelp', function () {
		it('should return a valid template', function () {
			const template = instance._renderLabelWithContextualHelp(mockContext);
			expect(template).toBeTruthy();
		});

		it('should use custom label template when provided', function () {
			const customTemplate = html`<span class="custom-label"
				>${(x) => x.label}</span
			>`;
			const template = instance._renderLabelWithContextualHelp(
				mockContext,
				customTemplate
			);

			expect(template).toBeTruthy();
		});

		describe('contextual help icon slot conditional logic', function () {
			function renderTemplateAndGetIconSlot(iconContent: any) {
				instance.contextualHelpIconSlottedContent = iconContent;
				const template = instance._renderLabelWithContextualHelp(mockContext);

				const tempElement = document.createElement('div');
				template.render(instance, tempElement);

				return tempElement.querySelector('slot[name="contextual-help-icon"]');
			}

			it('should set slot="icon" when icon content is present', function () {
				const iconSlot = renderTemplateAndGetIconSlot([
					document.createElement('vwc-icon'),
				]);
				expect(iconSlot?.getAttribute('slot')).toBe('icon');
			});

			it.each([
				['empty array', []],
				['null', null],
				['undefined', undefined],
			])(
				'should not set slot attribute when icon content is %s',
				function (_, iconContent) {
					const iconSlot = renderTemplateAndGetIconSlot(iconContent);
					expect(iconSlot?.hasAttribute('slot')).toBe(false);
				}
			);
		});
	});
});
