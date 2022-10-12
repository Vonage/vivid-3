import { elementUpdated, fixture, getBaseElement, listenToFormSubmission } from '@vivid-nx/shared';
import { configureAxe, toHaveNoViolations } from 'jest-axe';
import type { Radio } from '../radio/radio';
import { RadioGroup } from './radio-group';
import '../radio';
import '.';

const COMPONENT_TAG = 'vwc-radio-group';

describe('vwc-radio-group', () => {
	let element: RadioGroup;
	let radios: Radio[];

	expect.extend(toHaveNoViolations);
	const axe = configureAxe({
		rules: {
			'region': { enabled: false }
		}
	});

	beforeEach(async () => {
		element = fixture(`
			<${COMPONENT_TAG}>
				<vwc-radio value="0" label="one"></vwc-radio>
				<vwc-radio value="1" label="two"></vwc-radio>
				<vwc-radio value="2" label="three"></vwc-radio>
			</${COMPONENT_TAG}>
		`) as RadioGroup;
		await elementUpdated(element);
		radios = Array.from(element.children) as Radio[];
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

	describe('label', () => {
		it('should display a label when given one', async () => {
			element.label = 'testlabel';
			await elementUpdated(element);
			const label = element.shadowRoot?.querySelector('label');
			expect(label).not.toBeNull();
			expect(label?.textContent).toBe(element.label);
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
			expect(radios.every(r => r.getAttribute('disabled') === '')).toBeTruthy();
		});
	});

	describe('value', () => {
		it('should select the radio button with the same value', async () => {
			element.setAttribute('value', '1');
			await elementUpdated(element);
			expect(radios[1].checked && !radios[0].checked && !radios[2].checked).toBeTruthy();
			expect(radios[0].getAttribute('tabindex')).toBe('-1');
			expect(radios[1].getAttribute('tabindex')).toBe('0');
			expect(radios[2].getAttribute('tabindex')).toBe('-1');
		});

		it('should receive the value of the radio that was clicked', async () => {
			expect(element.getAttribute('value')).toBeNull();
			expect(radios.every(r => r.checked)).toBeFalsy();
			getBaseElement(radios[1]).dispatchEvent(new MouseEvent('click'));
			await elementUpdated(element);
			expect(element.getAttribute('value')).toEqual('1');
		});
	});
	
	describe('click', () => {
		it('should update when a radio is clicked', async () => {
			expect(radios[2].getAttribute('tabindex')).toBe('-1');
			getBaseElement(radios[2]).click();
			await elementUpdated(element);
			expect(radios[2].getAttribute('tabindex')).toBe('0');
			expect(element.value).toBe('2');
		});
	});

	describe('keyboard', () => {
		async function keyboardCheck(radioToCheck: number, key: string) {
			expect(radios[radioToCheck].checked).toBeFalsy();
			expect(element.value).toBeUndefined();
			radios[0].focus();
			radios[0].dispatchEvent(new KeyboardEvent('keydown', { key: key, bubbles: true }));
			await elementUpdated(element);
			expect(radios[radioToCheck].checked).toBeTruthy();
			expect(element.value).toBe(radioToCheck.toString());
		}

		it('should update when arrows are used', async () => {
			await keyboardCheck(1, 'ArrowRight');
		});

		it('should update when Enter is pressed', async () => {
			await keyboardCheck(0, 'Enter');
		});

		it('should loop', async () => {
			getBaseElement(radios[2]).click();
			expect(element.value).toBe('2');
			radios[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
			await elementUpdated(element);
			expect(radios[0].checked).toBeTruthy();
			expect(element.value).toBe('0');
		});
	});

	describe('focus', () => {
		it('should move focus outside the group when a radio is blurred', async () => {
			radios[0].focus();
			expect(document.activeElement).toBe(radios[0]);
			radios[0].blur();
			expect(document.activeElement).toBe(document.body);
		});
	});

	describe('axe a11y', () => {
		it('should make sure the markup is validated by Axe', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});

	describe('form', () => {
		it('should behave as a radio group in a form', async () => {
			const form = document.createElement('form');
			form.onsubmit = () => false;
			form.appendChild(element);
			document.body.replaceChildren(form);
			
			element.name = 'chosenValue';
			radios[2].checked = true;

			const submitPromise = listenToFormSubmission(form);
			form.requestSubmit();
			const result = await submitPromise;
			
			expect(result.get(element.name)).toEqual('2');
		});
	});
});
