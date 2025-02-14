import {
	axe,
	elementUpdated,
	fixture,
	getControlElement,
} from '@vivid-nx/shared';
import { Orientation } from '@microsoft/fast-web-utilities';
import { Connotation } from '../enums';
import { setLocale } from '../../shared/localization';
import enUS from '../../locales/en-US';
import deDE from '../../locales/de-DE';
import { Popup } from '../popup/popup.ts';
import { RangeSlider } from './range-slider';
import '.';

const COMPONENT_TAG = 'vwc-range-slider';

describe('vwc-range-slider', () => {
	let element: RangeSlider;
	let thumbs: {
		start: HTMLElement;
		end: HTMLElement;
	};
	function getPopup(thumb: HTMLElement) {
		const next = thumb.nextElementSibling as Popup;
		if (next && next.classList.contains('popup')) {
			return next;
		}
		return null;
	}

	beforeEach(async () => {
		vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(1000);
		vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
			bottom: 1000,
			top: 0,
			left: 0,
		} as DOMRect);
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as RangeSlider;
		const [start, end] = element.shadowRoot?.querySelectorAll(
			'.thumb-container'
		) as unknown as HTMLElement[];
		thumbs = {
			start,
			end,
		};
	});

	describe('basic', () => {
		it('should be initialized as a vwc-range-slider', async () => {
			expect(element).toBeInstanceOf(RangeSlider);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});

		it('should be initialized with default values', async () => {
			await elementUpdated(element);
			expect(element.min).toBe(0);
			expect(element.max).toBe(10);
			expect(element.step).toBe(1);
			expect(element.start).toBe('0');
			expect(element.end).toBe('10');
		});
	});

	describe('markers', () => {
		const getMarkersDiv = () =>
			getControlElement(element).querySelector(
				'.positioning-region > .track > .mark'
			) as HTMLDivElement;

		it('should not display markers by default', async () => {
			expect(getMarkersDiv()).toBeNull();
		});

		it('should display the markers element when markers is true', async () => {
			element.markers = true;
			await elementUpdated(element);

			expect(getMarkersDiv()).not.toBeNull();
		});

		it('should display the markers element with proper style vertically', async () => {
			element.orientation = Orientation.vertical;

			element.markers = true;
			await elementUpdated(element);

			expect(getMarkersDiv().getAttribute('style')).toContain('repeat-y');
		});
	});

	describe('disabled', () => {
		describe('when true', () => {
			beforeEach(async () => {
				element.disabled = true;
				await elementUpdated(element);
			});

			it('should set disabled class', async () => {
				expect(getControlElement(element).classList).toContain('disabled');
			});

			it('should set aria-disabled on both thumbs to true', async () => {
				expect(thumbs.start.getAttribute('aria-disabled')).toBe('true');
				expect(thumbs.end.getAttribute('aria-disabled')).toBe('true');
			});

			it('should remove tabindex from both thumbs', async () => {
				expect(thumbs.start.getAttribute('tabindex')).toBeNull();
				expect(thumbs.end.getAttribute('tabindex')).toBeNull();
			});
		});
	});

	describe('orientation', () => {
		describe.each(['horizontal', 'vertical'] as Orientation[])(
			'%s orientation',
			(orientation) => {
				beforeEach(async () => {
					element.orientation = orientation;
					await elementUpdated(element);
				});

				it(`should set class ${orientation} on control`, async () => {
					expect(getControlElement(element).classList).toContain(orientation);
				});

				it('should set aria-orientation on both thumbs', async () => {
					expect(thumbs.start.getAttribute('aria-orientation')).toBe(
						orientation
					);
					expect(thumbs.end.getAttribute('aria-orientation')).toBe(orientation);
				});
			}
		);
	});

	describe('connotation', () => {
		const possibleConnotations = [Connotation.Accent, Connotation.CTA] as const;

		it.each(possibleConnotations)(
			'should set the connotation class for "%s"',
			async function (connotation) {
				element.connotation = connotation;
				await elementUpdated(element);
				expect(
					getControlElement(element)?.classList.contains(
						`connotation-${connotation}`
					)
				).toEqual(true);
			}
		);
	});

	describe('start', () => {
		it('should initialize to min', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} min="5"></${COMPONENT_TAG}>`
			)) as RangeSlider;
			await elementUpdated(element);

			expect(element.start).toBe('5');
		});
	});

	describe('initialStart', () => {
		it('should be set by the start attribute', async () => {
			element.setAttribute('start', '5');
			expect(element.initialStart).toBe('5');
		});

		it('should set the start value if the field is not dirty', async () => {
			element.initialStart = '5';
			expect(element.start).toBe('5');
		});

		it('should not set the start value if the field is dirty', async () => {
			thumbs.start.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);

			element.initialStart = '5';

			expect(element.start).toBe('1');
		});
	});

	describe('currentStart', () => {
		it('should set the start value', async () => {
			element.currentStart = '5';

			expect(element.start).toBe('5');
		});

		it('should be set by the start value', async () => {
			element.start = '5';

			expect(element.currentStart).toBe('5');
		});
	});

	describe('startAsNumber', () => {
		it('should return start as a number', () => {
			element.start = '1';
			expect(element.startAsNumber).toBe(1);
		});

		it('should allow setting start as a number', () => {
			element.startAsNumber = 1;
			expect(element.start).toBe('1');
		});
	});

	describe('end', () => {
		it('should initialize to max', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} max="5"></${COMPONENT_TAG}>`
			)) as RangeSlider;
			await elementUpdated(element);

			expect(element.end).toBe('5');
		});
	});

	describe('initialEnd', () => {
		it('should be set by the end attribute', async () => {
			element.setAttribute('end', '5');
			expect(element.initialEnd).toBe('5');
		});

		it('should set the end value if the field is not dirty', async () => {
			element.initialEnd = '5';
			expect(element.end).toBe('5');
		});

		it('should not set the end value if the field is dirty', async () => {
			thumbs.end.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowLeft' })
			);

			element.initialEnd = '5';

			expect(element.end).toBe('9');
		});
	});

	describe('currentEnd', () => {
		it('should set the end value', async () => {
			element.currentEnd = '5';

			expect(element.end).toBe('5');
		});

		it('should be set by the end value', async () => {
			element.end = '5';

			expect(element.currentEnd).toBe('5');
		});
	});

	describe('endAsNumber', () => {
		it('should return end as a number', () => {
			element.end = '1';
			expect(element.endAsNumber).toBe(1);
		});

		it('should allow setting end as a number', () => {
			element.endAsNumber = 1;
			expect(element.end).toBe('1');
		});
	});

	describe('pin', () => {
		it('should not have start and end popup when pin is false', async () => {
			expect(getPopup(thumbs.start)).toBeNull();
			expect(getPopup(thumbs.end)).toBeNull();
		});

		it('should have start and end popup when pin is true', async () => {
			element.pin = true;
			await elementUpdated(element);

			expect(getPopup(thumbs.start)).toBeInstanceOf(Popup);
			expect(getPopup(thumbs.end)).toBeInstanceOf(Popup);
		});

		it('should hide the popups by default', async () => {
			element.pin = true;
			await elementUpdated(element);

			expect(getPopup(thumbs.start)!.open).toBe(false);
			expect(getPopup(thumbs.end)!.open).toBe(false);
		});

		it('should format popup text according to valueTextFormatter', async () => {
			element.pin = true;
			element.valueTextFormatter = (value) => `${value} bits`;
			await elementUpdated(element);

			expect(getPopup(thumbs.start)!.textContent!.trim()).toBe('0 bits');
			expect(getPopup(thumbs.end)!.textContent!.trim()).toBe('10 bits');
		});

		it('should show corresponding popup when hovering over thumb', async () => {
			element.pin = true;
			await elementUpdated(element);

			thumbs.start.dispatchEvent(new MouseEvent('mouseover'));
			await elementUpdated(element);

			expect(getPopup(thumbs.start)!.open).toBe(true);
		});

		it('should hide the corresponding popup when hovering off thumb', async () => {
			element.pin = true;
			await elementUpdated(element);

			thumbs.start.dispatchEvent(new MouseEvent('mouseover'));
			thumbs.start.dispatchEvent(new MouseEvent('mouseout'));
			await elementUpdated(element);

			expect(getPopup(thumbs.start)!.open).toBe(false);
		});

		it('should show popup when thumb has visible focus', async () => {
			element.pin = true;
			await elementUpdated(element);

			thumbs.start.focus();
			await elementUpdated(element);

			expect(getPopup(thumbs.start)!.open).toBe(true);
		});

		it('should hide popup when thumb loses focus', async () => {
			element.pin = true;
			await elementUpdated(element);

			thumbs.start.focus();
			thumbs.start.blur();
			await elementUpdated(element);

			expect(getPopup(thumbs.start)!.open).toBe(false);
		});

		it('should hide popup when thumb focus is not visible', async () => {
			element.pin = true;
			await elementUpdated(element);
			const mouseEvent = new MouseEvent('mousedown');
			Object.defineProperty(mouseEvent, 'pageX', { value: 300 });

			element.dispatchEvent(mouseEvent);
			window.dispatchEvent(new MouseEvent('mouseup'));
			await elementUpdated(element);

			expect(getPopup(thumbs.start)!.open).toBe(false);
		});
	});

	describe.each([
		{
			thumb: 'start',
			lowerBound: 'min',
			upperBound: 'endAsNumber',
		},
		{
			thumb: 'end',
			lowerBound: 'startAsNumber',
			upperBound: 'max',
		},
	] as const)('$thumb thumb', ({ thumb, lowerBound, upperBound }) => {
		beforeEach(() => {
			element.step = 0.5;
		});

		it.each(['ArrowRight', 'ArrowDown'])(
			'should increment by step when pressing %s key',
			async (key) => {
				element[thumb] = '5';
				thumbs[thumb].focus();

				thumbs[thumb].dispatchEvent(new KeyboardEvent('keydown', { key }));

				expect(element[thumb]).toBe('5.5');
			}
		);

		it.each(['ArrowLeft', 'ArrowUp'])(
			'should decrement by step when pressing %s key',
			async (key) => {
				element[thumb] = '5';
				thumbs[thumb].focus();

				thumbs[thumb].dispatchEvent(new KeyboardEvent('keydown', { key }));

				expect(element[thumb]).toBe('4.5');
			}
		);

		it(`should not decrement below ${lowerBound}`, async () => {
			element[thumb] = '5';
			element[lowerBound] = 5;
			thumbs[thumb].focus();

			thumbs[thumb].dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowLeft' })
			);

			expect(element[thumb]).toBe('5');
		});

		it(`should not increment above ${upperBound}`, async () => {
			element[thumb] = '5';
			element[upperBound] = 5;
			thumbs[thumb].focus();

			thumbs[thumb].dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);

			expect(element[thumb]).toBe('5');
		});

		it(`should set to ${lowerBound} when pressing home key`, async () => {
			element[thumb] = '5';
			element[lowerBound] = 2;
			thumbs[thumb].focus();

			thumbs[thumb].dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Home' })
			);

			expect(element[thumb]).toBe('2');
		});

		it(`should set to ${upperBound} when pressing end key`, async () => {
			element[thumb] = '5';
			element[upperBound] = 8;
			thumbs[thumb].focus();

			thumbs[thumb].dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

			expect(element[thumb]).toBe('8');
		});

		it('should have visible focus when focused', async () => {
			thumbs[thumb].focus();
			await elementUpdated(element);

			expect(element.shadowRoot!.activeElement).toBe(thumbs[thumb]);
			expect(thumbs[thumb].classList).toContain('focus-visible');
		});

		it('should receive non-visible focus on mousedown', async () => {
			thumbs[thumb].dispatchEvent(new MouseEvent('mousedown'));
			await elementUpdated(element);

			expect(element.shadowRoot!.activeElement).toBe(thumbs[thumb]);
			expect(thumbs[thumb].classList).not.toContain('focus-visible');
		});

		it('should make focus visible when any key is pressed', async () => {
			thumbs[thumb].dispatchEvent(new MouseEvent('mousedown'));
			thumbs[thumb].dispatchEvent(new KeyboardEvent('keydown', { key: 'A' }));
			await elementUpdated(element);

			expect(element.shadowRoot!.activeElement).toBe(thumbs[thumb]);
			expect(thumbs[thumb].classList).toContain('focus-visible');
		});
	});

	describe('clicking on track', () => {
		describe.each([
			{ orientation: 'horizontal', coordinate: 'pageX' },
			{ orientation: 'vertical', coordinate: 'pageY' },
		])('with $orientation orientation', ({ orientation, coordinate }) => {
			beforeEach(async () => {
				element.orientation = orientation as Orientation;
				await elementUpdated(element);
			});

			it('should move start value when closer to start thumb', async () => {
				const mouseEvent = new MouseEvent('mousedown');
				Object.defineProperty(mouseEvent, coordinate, { value: 300 });

				element.dispatchEvent(mouseEvent);

				expect(element.start).toBe('3');
			});

			it('should move end value when closer to end thumb', async () => {
				const mouseEvent = new MouseEvent('mousedown');
				Object.defineProperty(mouseEvent, coordinate, { value: 700 });

				element.dispatchEvent(mouseEvent);

				expect(element.end).toBe('7');
			});

			it('should move start value when thumbs are equal and clicking a lower value', async () => {
				element.start = '5';
				element.end = '5';
				const mouseEvent = new MouseEvent('mousedown');
				Object.defineProperty(mouseEvent, coordinate, { value: 300 });

				element.dispatchEvent(mouseEvent);

				expect(element.start).toBe('3');
			});

			it('should move end value when thumbs are equal and clicking a higher value', async () => {
				element.start = '5';
				element.end = '5';
				const mouseEvent = new MouseEvent('mousedown');
				Object.defineProperty(mouseEvent, coordinate, { value: 700 });

				element.dispatchEvent(mouseEvent);

				expect(element.end).toBe('7');
			});

			it('should focus on the closest thumb without displaying focus indicator', async () => {
				const mouseEvent = new MouseEvent('mousedown');
				Object.defineProperty(mouseEvent, coordinate, { value: 300 });

				element.dispatchEvent(mouseEvent);
				await elementUpdated(element);

				expect(element.shadowRoot!.activeElement).toBe(thumbs.start);
				expect(thumbs.start.classList).not.toContain('focus-visible');
			});

			it('should not change values when disabled', async () => {
				element.disabled = true;
				const mouseEvent = new MouseEvent('mousedown');
				Object.defineProperty(mouseEvent, coordinate, { value: 300 });

				element.dispatchEvent(mouseEvent);

				expect(element.start).toBe('0');
			});
		});
	});

	describe('dragging', () => {
		describe.each([
			{ orientation: 'horizontal', coordinate: 'pageX' },
			{ orientation: 'vertical', coordinate: 'pageY' },
		])('with $orientation orientation', ({ orientation, coordinate }) => {
			const mouseDown = (thumb: HTMLElement, value: number) => {
				const mouseEvent = new MouseEvent('mousedown');
				Object.defineProperty(mouseEvent, coordinate, { value });
				thumb.dispatchEvent(mouseEvent);
			};

			const mouseMove = (value: number) => {
				const mouseMoveEvent = new MouseEvent('mousemove');
				Object.defineProperty(mouseMoveEvent, coordinate, { value });
				window.dispatchEvent(mouseMoveEvent);
			};

			const touchMove = (value: number) => {
				window.dispatchEvent(
					// eslint-disable-next-line compat/compat
					new TouchEvent('touchmove', {
						touches: [{ [coordinate]: value } as unknown as Touch],
					})
				);
			};

			const mouseUp = () => {
				window.dispatchEvent(new MouseEvent('mouseup'));
			};

			const touchEnd = () => {
				// eslint-disable-next-line compat/compat
				window.dispatchEvent(new TouchEvent('touchend'));
			};

			const dragThumb = (
				thumb: HTMLElement,
				from: number,
				to: number,
				touch = false
			) => {
				mouseDown(thumb, from);
				if (touch) {
					touchMove(to);
					touchEnd();
				} else {
					mouseMove(to);
					mouseUp();
				}
			};

			beforeEach(async () => {
				element.orientation = orientation as Orientation;
				await elementUpdated(element);
			});

			it('should update start value by dragging start thumb', async () => {
				dragThumb(thumbs.start, 0, 300);
				expect(element.start).toBe('3');
			});

			it('should update end value by dragging end thumb', async () => {
				dragThumb(thumbs.end, 1000, 700);
				expect(element.end).toBe('7');
			});

			it('should have no transition when dragging', async () => {
				mouseDown(thumbs.start, 0);
				mouseMove(300);
				await elementUpdated(element);

				expect(thumbs.start.style.transition).toBe('none');
			});

			it('should not drag when disabled', async () => {
				element.disabled = true;

				dragThumb(thumbs.start, 0, 300);

				expect(element.start).toBe('0');
			});

			it('should stop dragging when disabled during drag', async () => {
				mouseDown(thumbs.start, 0);

				element.disabled = true;
				mouseMove(300);
				mouseUp();

				expect(element.start).toBe('0');
			});

			it('should allow dragging with touchmove event', async () => {
				dragThumb(thumbs.start, 0, 300, true);

				expect(element.start).toBe('3');
			});

			it('should drag start thumb when both thumbs are at max position and mouse down on end thumb', async () => {
				element.start = '10';

				dragThumb(thumbs.end, 1000, 700);

				expect(element.start).toBe('7');
			});

			it.each(['input', 'change', 'input:start'])(
				'should emit %s event only when the value changes',
				async (eventName) => {
					const eventSpy = vi.fn();
					element.addEventListener(eventName, eventSpy);

					mouseDown(thumbs.start, 0);
					mouseMove(50);
					mouseMove(100);
					mouseUp();

					expect(eventSpy).toHaveBeenCalledTimes(1);
				}
			);

			it('should show pin popup while dragging', async () => {
				element.pin = true;
				await elementUpdated(element);

				mouseDown(thumbs.start, 0);
				mouseMove(50);
				await elementUpdated(element);

				expect(getPopup(thumbs.start)!.open).toBe(true);
			});
		});
	});

	describe('form reset', () => {
		it('should reset the range to initial values when the form is reset', async () => {
			const ORIGINAL_START = '3';
			const ORIGINAL_END = '7';
			const form = fixture(`
				<form>
					<${COMPONENT_TAG} start="${ORIGINAL_START}" end="${ORIGINAL_END}"></${COMPONENT_TAG}>
				</form>
			`) as HTMLFormElement;
			element = form.querySelector(COMPONENT_TAG) as RangeSlider;
			element.start = '4';
			element.end = '6';
			await elementUpdated(form);

			form.reset();
			await elementUpdated(form);

			expect(element.start).toBe(ORIGINAL_START);
			expect(element.end).toBe(ORIGINAL_END);
		});

		it('should reset the range to min and max if there are no initial values', async () => {
			const form = fixture(`
				<form>
					<${COMPONENT_TAG}></${COMPONENT_TAG}>
				</form>
			`) as HTMLFormElement;
			element = form.querySelector(COMPONENT_TAG) as RangeSlider;
			element.min = -1;
			element.max = 11;
			await elementUpdated(form);

			form.reset();
			await elementUpdated(form);

			expect(element.start).toBe('-1');
			expect(element.end).toBe('11');
		});
	});

	describe('form value', () => {
		// Cannot properly end-to-end test form value because jsdom does not support ElementInternals
		// Instead we mock the setFormValue method and test that it is called with the correct value
		const getFormValue = () =>
			vi.mocked(element.setFormValue).mock.lastCall![0] as FormData;

		beforeEach(() => {
			element.setFormValue = vi.fn();
		});

		it('should set the form value with name, start and end', () => {
			element.name = 'name';
			element.start = '3';
			element.end = '7';

			expect(getFormValue().getAll('name')).toEqual(['3', '7']);
		});
	});

	it('should handle decimal steps without rounding errors', async () => {
		element.step = 0.1;
		thumbs.start.focus();

		thumbs.start.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowRight' })
		);
		thumbs.start.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowRight' })
		);
		thumbs.start.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'ArrowRight' })
		);

		expect(element.start).toBe('0.3');
	});

	it('should default to 1 when step is set to 0', async () => {
		element.step = 0;
		expect(element.step).toBe(1);
	});

	it('should default to 1 when step is set to less than 0', async () => {
		element.step = -10;
		expect(element.step).toBe(1);
	});

	describe('a11y', () => {
		describe('aria-start-label', () => {
			it('should set aria-label on start thumb', async () => {
				element.ariaStartLabel = 'start';
				await elementUpdated(element);

				expect(thumbs.start.getAttribute('aria-label')).toBe('start');
			});
		});

		describe('aria-end-label', () => {
			it('should set aria-label on end thumb', async () => {
				element.ariaEndLabel = 'end';
				await elementUpdated(element);

				expect(thumbs.end.getAttribute('aria-label')).toBe('end');
			});
		});

		describe('valueTextFormatter', () => {
			it('should format aria-valuetext on both thumbs', async () => {
				element.valueTextFormatter = (value) => `${value} bits`;
				await elementUpdated(element);

				expect(thumbs.start.getAttribute('aria-valuetext')).toBe('0 bits');
				expect(thumbs.end.getAttribute('aria-valuetext')).toBe('10 bits');
			});

			describe('default function', () => {
				it('should format the value with period for a respective locale', () => {
					setLocale(enUS);
					expect(element.valueTextFormatter('1.1')).toBe('1.1');
				});

				it('should format the value with comma for a respective locale', () => {
					setLocale(deDE);
					expect(element.valueTextFormatter('1.1')).toBe('1,1');
				});
			});
		});

		it('should pass html a11y test', async () => {
			await elementUpdated(element);
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
