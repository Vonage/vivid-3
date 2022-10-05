import { elementUpdated, fixture, listenToFormSubmission } from '@vivid-nx/shared';
import type { Radio } from '../radio/radio';
import { RadioGroup } from './radio-group';
import '../radio';
import '.';

const COMPONENT_TAG = 'vwc-radio-group';

describe('vwc-radio-group', () => {
	let element: RadioGroup;
	let children: Radio[];

	beforeEach(async () => {
		element = fixture(`
			<${COMPONENT_TAG}>
				<vwc-radio value="0"></vwc-radio>
				<vwc-radio value="1"></vwc-radio>
				<vwc-radio value="2"></vwc-radio>
			</${COMPONENT_TAG}>
		`) as RadioGroup;
		await elementUpdated(element);
		children = Array.from(element.children) as Radio[];
	});

	describe('basic', () => {
		it('should be initialized as a vwc-radio-group', async () => {
			expect(element).toBeInstanceOf(RadioGroup);
			expect(element.readOnly).toBeFalsy();
			expect(element.disabled).toBeFalsy();
			expect(element.label).toBeUndefined();
			expect(element.orientation).toEqual('horizontal');
		});
	});

	describe('orientation', () => {
		it('should update the positioning region when changing orientation', async () => {
			const positioningRegion = element.shadowRoot?.querySelector('.positioning-region');
			expect(positioningRegion?.classList).toContain('horizontal');
			element.setAttribute('orientation', 'vertical');
			await elementUpdated(element);
			expect(positioningRegion?.classList).toContain('vertical');
		});
	});

	describe('disabled', () => {
		it('should disable all radio buttons it contains when set to disabled', async () => {
			element.setAttribute('disabled', '');
			await elementUpdated(element);
			expect(children.every(r => r.getAttribute('disabled') === '')).toBeTruthy();
		});
	});

	describe('value', () => {
		it('should select the radio button with the same value', async () => {
			element.setAttribute('value', '1');
			await elementUpdated(element);
			expect(children[1].checked && !children[0].checked && !children[2].checked).toBeTruthy();
			expect(children[0].getAttribute('tabindex')).toBe('-1');
			expect(children[1].getAttribute('tabindex')).toBe('0');
			expect(children[2].getAttribute('tabindex')).toBe('-1');
		});
	});

	describe('form', () => {
		it('should behave as a radio group in a form', async () => {
			const form = document.createElement('form');
			form.onsubmit = () => false;
			element.name = 'chosenValue';
			children[1].checked = true;
			form.appendChild(element);
			document.body.append(form);

			const submitPromise = listenToFormSubmission(form);
			form.requestSubmit();
			const result = await submitPromise;
			
			expect(result.get(element.name)).toEqual('1');
		});
	});
});
