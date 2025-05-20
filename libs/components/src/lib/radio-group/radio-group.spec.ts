import {
	elementUpdated,
	fixture,
	getBaseElement,
	getControlElement,
	listenToFormSubmission,
} from '@vivid-nx/shared';
import type { Radio } from '../radio/radio';
import {
	itShouldHaveErrorTextFeedback,
	itShouldHaveHelperTextFeedback,
} from '../../shared/feedback/should-display-feedback.spec';
import { RadioGroup } from './radio-group';
import '../radio';
import '.';

const COMPONENT_TAG = 'vwc-radio-group';

describe('vwc-radio-group', () => {
	let element: RadioGroup;
	let radios: Radio[];

	const setupFixture = async (html: string) => {
		const fixtureElement = fixture(html) as HTMLElement;
		element =
			fixtureElement instanceof RadioGroup
				? fixtureElement
				: (fixtureElement.querySelector(COMPONENT_TAG) as RadioGroup);
		await elementUpdated(element);
		radios = Array.from(element.children) as Radio[];
	};

	beforeEach(async () => {
		await setupFixture(`
			<${COMPONENT_TAG}>
				<vwc-radio value="0" label="one"></vwc-radio>
				<vwc-radio value="1" label="two"></vwc-radio>
				<vwc-radio value="2" label="three"></vwc-radio>
			</${COMPONENT_TAG}>
		`);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-radio-group with proper default values', async () => {
			expect(element).toBeInstanceOf(RadioGroup);
			expect(element.readOnly).toBeFalsy();
			expect(element.disabled).toBeFalsy();
			expect(element.label).toBeUndefined();
			expect(element.helperText).toBeUndefined();
			expect(element.errorText).toBeUndefined();
			expect(element.orientation).toEqual('horizontal');
			expect(element.getAttribute('value')).toBeNull();
			expect(element.slottedRadioButtons.length).toEqual(3);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});

		it('should set the radio buttons with proper default values', async () => {
			expect(radios.every((r) => r.checked)).toBeFalsy();
			expect(radios[0].getAttribute('tabindex')).toBe('0');
			expect(radios[1].getAttribute('tabindex')).toBe('-1');
			expect(radios[2].getAttribute('tabindex')).toBe('-1');
		});

		it('should use fieldset with proper legend description', async () => {
			element.label = 'test label';
			await elementUpdated(element);
			const fieldset = element.shadowRoot?.querySelector('fieldset');
			const legend = fieldset?.querySelector('legend');

			expect(fieldset).toBeTruthy();
			expect(legend).toBeTruthy();
		});
	});

	describe('label', () => {
		it('should display a label when given one', async () => {
			element.label = 'testlabel';
			await elementUpdated(element);
			const label = element.shadowRoot?.getElementById('label');
			expect(label?.textContent).toBe(element.label);
		});
	});

	describe('error-text', () => {
		it('should set the error-text on all slotted radio buttons', async () => {
			element.errorText = 'error text';
			await elementUpdated(element);
			element.appendChild(document.createElement('vwc-radio'));
			await elementUpdated(element);

			expect(radios.every((r) => r.errorText === 'error text')).toBe(true);
		});

		it('should set aria-invalid on the control element to true when error-text is set', async () => {
			element.errorText = '';
			await elementUpdated(element);
			expect(getControlElement(element)!.getAttribute('aria-invalid')).toBe(
				'false'
			);

			element.errorText = 'test error text';
			await elementUpdated(element);
			expect(getControlElement(element)!.getAttribute('aria-invalid')).toBe(
				'true'
			);
		});
	});

	describe('orientation', () => {
		it('should update the positioning region when changing orientation', async () => {
			const positioningRegion = element.shadowRoot?.querySelector(
				'.positioning-region'
			);
			const positioningRegionDefaultClassList = Array.from(
				positioningRegion?.classList as DOMTokenList
			);
			element.setAttribute('orientation', 'vertical');
			await elementUpdated(element);

			expect(positioningRegionDefaultClassList).toContain('horizontal');
			expect(positioningRegion?.classList).toContain('vertical');
		});
	});

	describe('disabled', () => {
		it('should disable all radio buttons it contains when set to disabled', async () => {
			element.setAttribute('disabled', '');
			await elementUpdated(element);
			expect(
				radios.every((r) => r.getAttribute('disabled') === '')
			).toBeTruthy();
		});

		it('should enable all radio buttons it contains when re-enabled', async () => {
			element.setAttribute('disabled', '');
			element.removeAttribute('disabled');
			await elementUpdated(element);
			expect(radios.every((r) => !r.hasAttribute('disabled'))).toBeTruthy();
		});

		it('should disable all radio buttons it contains if disabled is initially set', async () => {
			await setupFixture(`
				<${COMPONENT_TAG} disabled>
					<vwc-radio value="0" label="one"></vwc-radio>
					<vwc-radio value="1" label="two"></vwc-radio>
					<vwc-radio value="2" label="three"></vwc-radio>
				</${COMPONENT_TAG}>
			`);
			expect(
				radios.every((r) => r.getAttribute('disabled') === '')
			).toBeTruthy();
		});
	});

	describe('required', () => {
		it('should set all radio buttons it contains to required when set to required', async () => {
			element.setAttribute('required', '');
			await elementUpdated(element);
			expect(
				radios.every((r) => r.getAttribute('required') === '')
			).toBeTruthy();
		});

		it('should remove required from all radio buttons it contains when required is removed', async () => {
			element.setAttribute('required', '');
			element.removeAttribute('required');
			await elementUpdated(element);
			expect(radios.every((r) => !r.hasAttribute('required'))).toBeTruthy();
		});

		it('should set required on all radio buttons it contains if required is initially set', async () => {
			await setupFixture(`
				<${COMPONENT_TAG} required>
					<vwc-radio value="0" label="one"></vwc-radio>
					<vwc-radio value="1" label="two"></vwc-radio>
					<vwc-radio value="2" label="three"></vwc-radio>
				</${COMPONENT_TAG}>
			`);
			expect(
				radios.every((r) => r.getAttribute('required') === '')
			).toBeTruthy();
		});
	});

	describe('readonly', () => {
		it('should set all radio buttons it contains to readonly when set to readonly', async () => {
			element.setAttribute('readonly', '');
			await elementUpdated(element);
			expect(
				radios.every((r) => r.getAttribute('readonly') === '')
			).toBeTruthy();
		});

		it('should remove readonly from all radio buttons it contains when readonly is removed', async () => {
			element.setAttribute('readonly', '');
			element.removeAttribute('readonly');
			await elementUpdated(element);
			expect(radios.every((r) => !r.hasAttribute('readonly'))).toBeTruthy();
		});

		it('should set readonly on all radio buttons it contains if readonly is initially set', async () => {
			await setupFixture(`
				<${COMPONENT_TAG} readonly>
					<vwc-radio value="0" label="one"></vwc-radio>
					<vwc-radio value="1" label="two"></vwc-radio>
					<vwc-radio value="2" label="three"></vwc-radio>
				</${COMPONENT_TAG}>
			`);
			expect(
				radios.every((r) => r.getAttribute('readonly') === '')
			).toBeTruthy();
		});
	});

	describe('value', () => {
		it('should initially take the value of the last checked radio button', async () => {
			await setupFixture(`
				<${COMPONENT_TAG}>
					<vwc-radio value="0" label="one"></vwc-radio>
					<vwc-radio value="1" label="two" checked></vwc-radio>
					<vwc-radio value="2" label="three" checked></vwc-radio>
				</${COMPONENT_TAG}>
			`);
			expect(element.value).toEqual('2');
		});

		it('should initially select the radio button with the same value', async () => {
			await setupFixture(`
				<${COMPONENT_TAG} value="1">
					<vwc-radio value="0" label="one" checked></vwc-radio>
					<vwc-radio value="1" label="two"></vwc-radio>
					<vwc-radio value="2" label="three" checked></vwc-radio>
				</${COMPONENT_TAG}>
			`);

			expect(
				radios[1].checked && !radios[0].checked && !radios[2].checked
			).toBeTruthy();
			expect(radios[0].getAttribute('tabindex')).toBe('-1');
			expect(radios[1].getAttribute('tabindex')).toBe('0');
			expect(radios[2].getAttribute('tabindex')).toBe('-1');
		});

		it('should select the radio button with the same value', async () => {
			element.setAttribute('value', '1');
			await elementUpdated(element);

			expect(
				radios[1].checked && !radios[0].checked && !radios[2].checked
			).toBeTruthy();
			expect(radios[0].getAttribute('tabindex')).toBe('-1');
			expect(radios[1].getAttribute('tabindex')).toBe('0');
			expect(radios[2].getAttribute('tabindex')).toBe('-1');
		});

		it('should receive the value of the radio that was clicked', async () => {
			radios[1].dispatchEvent(new MouseEvent('click'));
			await elementUpdated(element);
			expect(element.getAttribute('value')).toEqual('1');
		});
	});

	describe('name', () => {
		it('should copy initial name to all child radio button', async () => {
			await setupFixture(`
				<${COMPONENT_TAG} name="test">
					<vwc-radio value="0" label="one"></vwc-radio>
					<vwc-radio value="1" label="two"></vwc-radio>
					<vwc-radio value="2" label="three"></vwc-radio>
				</${COMPONENT_TAG}>
			`);
			expect(radios.every((r) => r.name === 'test')).toBeTruthy();
		});

		it('should copy name to all child radio button when changed', async () => {
			element.name = 'test';
			expect(radios.every((r) => r.name === 'test')).toBeTruthy();
		});
	});

	describe('change', () => {
		it('should be fired when a user toggles the radio-group', async () => {
			const spy = vi.fn();
			element.addEventListener('change', spy);

			getBaseElement(radios[2]).click();
			await elementUpdated(element);

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('click', () => {
		it('should update when a radio is clicked', async () => {
			getBaseElement(radios[2]).click();
			await elementUpdated(element);

			expect(radios[2].getAttribute('tabindex')).toBe('0');
			expect(element.value).toBe('2');
		});
	});

	describe('keyboard', () => {
		function pressKey(el: HTMLElement, key: string) {
			el.dispatchEvent(
				new KeyboardEvent('keydown', { key: key, bubbles: true })
			);
		}

		it('should skip over disabled radios when navigating by keyboard', async () => {
			radios[1].disabled = true;
			radios[0].focus();

			pressKey(radios[0], 'ArrowRight');

			expect(radios[0].checked).toBe(false);
			expect(radios[2].checked).toBe(true);
			expect(document.activeElement).toBe(radios[2]);
		});

		it('should focus but not check readonly radios when navigating to them by keyboard', async () => {
			radios[0].checked = true;
			radios[1].readOnly = true;
			radios[0].focus();

			pressKey(radios[0], 'ArrowRight');

			expect(radios[0].checked).toBe(true);
			expect(radios[1].checked).toBe(false);
			expect(document.activeElement).toBe(radios[1]);
		});

		it('should check focused radio when pressing Enter', async () => {
			radios[0].focus();

			pressKey(radios[0], 'Enter');

			expect(radios[0].checked).toBe(true);
		});

		it('should not check focused readonly radio when pressing Enter', async () => {
			radios[0].readOnly = true;
			radios[0].focus();

			pressKey(radios[0], 'Enter');

			expect(radios[0].checked).toBe(false);
		});

		describe('when not in toolbar', () => {
			it.each(['ArrowRight', 'ArrowDown'])(
				'should select and focus the next radio when pressing %s',
				async (key) => {
					element.value = '0';
					radios[0].focus();

					pressKey(radios[0], key);

					expect(radios[0].checked).toBe(false);
					expect(radios[1].checked).toBe(true);
					expect(document.activeElement).toBe(radios[1]);
				}
			);

			it.each(['ArrowLeft', 'ArrowUp'])(
				'should select and focus the previous radio when pressing %s',
				async (key) => {
					element.value = '1';
					radios[1].focus();

					pressKey(radios[1], key);

					expect(radios[1].checked).toBe(false);
					expect(radios[0].checked).toBe(true);
					expect(document.activeElement).toBe(radios[0]);
				}
			);

			it('should loop back to first radio when navigating off the group to the right', async () => {
				element.value = '2';
				radios[2].focus();

				pressKey(radios[2], 'ArrowRight');

				expect(radios[2].checked).toBe(false);
				expect(radios[0].checked).toBe(true);
				expect(document.activeElement).toBe(radios[0]);
			});

			it('should loop back to last radio when navigating off the group to the left', async () => {
				element.value = '0';
				radios[0].focus();

				pressKey(radios[0], 'ArrowLeft');

				expect(radios[0].checked).toBe(false);
				expect(radios[2].checked).toBe(true);
				expect(document.activeElement).toBe(radios[2]);
			});
		});

		describe('when in toolbar', () => {
			beforeEach(async () => {
				await setupFixture(`
					<div role="toolbar">
						<button id="before">before</button>
						<${COMPONENT_TAG}>
							<vwc-radio value="0" label="one"></vwc-radio>
							<vwc-radio value="1" label="two"></vwc-radio>
							<vwc-radio value="2" label="three"></vwc-radio>
						</${COMPONENT_TAG}>
						<button id="after">after</button>
					</div>
				`);
			});

			it.each(['ArrowRight', 'ArrowDown'])(
				'should focus but not check the next radio when pressing %s',
				async (key) => {
					element.value = '0';
					radios[0].focus();

					pressKey(radios[0], key);

					expect(radios[0].checked).toBe(true);
					expect(radios[1].checked).toBe(false);
					expect(document.activeElement).toBe(radios[1]);
				}
			);

			it.each(['ArrowLeft', 'ArrowUp'])(
				'should focus but not check the previous radio when pressing %s',
				async (key) => {
					element.value = '1';
					radios[1].focus();

					pressKey(radios[1], key);

					expect(radios[1].checked).toBe(true);
					expect(radios[0].checked).toBe(false);
					expect(document.activeElement).toBe(radios[0]);
				}
			);

			it('should focus next element when navigating off the group to the right', async () => {
				element.value = '2';
				radios[2].focus();

				pressKey(radios[2], 'ArrowRight');

				expect(radios[2].checked).toBe(true);
				expect(document.activeElement).toBe(document.getElementById('after'));
			});

			it('should keep focus on last radio if there is no next element when navigating off the group to the right', async () => {
				document.getElementById('after')!.remove();
				element.value = '2';
				radios[2].focus();

				pressKey(radios[2], 'ArrowRight');

				expect(radios[2].checked).toBe(true);
				expect(document.activeElement).toBe(radios[2]);
			});

			it('should focus preceding element when navigating off the group to the left', async () => {
				element.value = '0';
				radios[0].focus();

				pressKey(radios[0], 'ArrowLeft');

				expect(radios[0].checked).toBe(true);
				expect(document.activeElement).toBe(document.getElementById('before'));
			});

			it('should keep focus on first radio if there is no previous element when navigating off the group to the left', async () => {
				document.getElementById('before')!.remove();
				element.value = '0';
				radios[0].focus();

				pressKey(radios[0], 'ArrowLeft');

				expect(radios[0].checked).toBe(true);
				expect(document.activeElement).toBe(radios[0]);
			});
		});

		it('should not prevent default of other key presses', async () => {
			const event = new KeyboardEvent('keydown', {
				key: 'A',
				cancelable: true,
				bubbles: true,
			});
			radios[0].dispatchEvent(event);
			await elementUpdated(element);

			expect(event.defaultPrevented).toBe(false);
		});
	});

	describe('focus', () => {
		it('should move focus outside the group when a radio is blurred', async () => {
			radios[0].focus();
			const activeElementBeforeBlur = document.activeElement;
			radios[0].blur();

			expect(activeElementBeforeBlur).toBe(radios[0]);
			expect(document.activeElement).toBe(document.body);
		});
	});

	describe('form', () => {
		it('should behave as a radio group in a form', async () => {
			const form = document.createElement('form');
			form.onsubmit = () => false;
			element.parentElement!.replaceChildren(form);
			form.appendChild(element);

			element.name = 'chosenValue';
			radios[2].checked = true;

			radios[0].dispatchEvent(
				new Event('invalid', { bubbles: true, composed: true })
			);

			const submitPromise = listenToFormSubmission(form);
			form.requestSubmit();
			const result = await submitPromise;

			expect(result.get(element.name)).toEqual('2');
		});
	});

	describe('feedback messages', () => {
		itShouldHaveHelperTextFeedback(() => element);
		itShouldHaveErrorTextFeedback(() => element);
	});
});
