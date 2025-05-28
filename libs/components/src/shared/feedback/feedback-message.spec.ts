import { elementUpdated, fixture } from '@vivid-nx/shared';
import { beforeAll } from 'vitest';
import { createRegisterFunction } from '../design-system/createRegisterFunction';
import type { Icon } from '../../lib/icon/icon';
import { FeedbackMessage, feedbackMessageDefinition } from './feedback-message';

const COMPONENT_TAG = 'vwc-feedback-message';

describe('vwc-feedback-message', () => {
	let element: FeedbackMessage;

	const getMessage = () =>
		element.shadowRoot!.querySelector('.message') as HTMLElement;

	const getIcon = () =>
		element.shadowRoot!.querySelector('.icon') as Icon | null;

	const getMessageText = () =>
		[getMessage(), ...getMessage().querySelector('slot')!.assignedNodes()]
			.map((n) => n.textContent!.trim())
			.join(' ')
			.trim();

	beforeAll(() => {
		createRegisterFunction(feedbackMessageDefinition)();
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as FeedbackMessage;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-feedback-message', async () => {
			expect(element).toBeInstanceOf(FeedbackMessage);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('type', () => {
		it('should render nothing when type="none"', async () => {
			element.type = 'none';
			element.innerHTML = 'Some message';
			await elementUpdated(element);

			expect(getMessage().classList).toContain('none-message');
		});

		it('should render helper text message without icon when type="helper"', async () => {
			element.type = 'helper';
			element.innerHTML = 'Some message';
			await elementUpdated(element);

			expect(getMessage().classList).toContain('helper-message');
			expect(getIcon()).toBe(null);
			expect(getMessageText()).toBe('Some message');
		});

		it('should render error message with icon and icon text alternative when type="error"', async () => {
			element.type = 'error';
			element.innerHTML = 'Some message';
			await elementUpdated(element);

			expect(getMessage().classList).toContain('error-message');
			expect(getIcon()!.name).toBe('info-line');
			expect(getIcon()!.label).toBe('Error:');

			expect(getMessageText()).toBe(`Some message`);
		});

		it('should announce error messages', async () => {
			element.type = 'error';
			element.innerHTML = 'Some message';
			await elementUpdated(element);

			expect(getMessage().parentElement!.ariaLive).toBe('polite');
		});

		it('should render success message with icon and icon text alternative when type="success"', async () => {
			element.type = 'success';
			element.innerHTML = 'Some message';
			await elementUpdated(element);

			expect(getMessage().classList).toContain('success-message');
			expect(getIcon()!.name).toBe('check-circle-line');
			expect(getIcon()!.label).toBe('Success:');
			expect(getMessageText()).toBe('Some message');
		});
	});
});
