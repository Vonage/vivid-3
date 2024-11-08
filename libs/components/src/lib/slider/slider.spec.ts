import {
	axe,
	elementUpdated,
	fixture,
	getControlElement,
} from '@vivid-nx/shared';
import { Orientation } from '@microsoft/fast-web-utilities';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Connotation } from '../enums';
import { setLocale } from '../../shared/localization';
import deDE from '../../locales/de-DE';
import enUS from '../../locales/en-US';
import { PlacementStrategy, Popup } from '../popup/popup.ts';
import { Slider } from './slider';
import { sliderDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-slider';

describe('vwc-slider', () => {
	let element: Slider;
	let thumb: HTMLElement;
	const getPopup = () =>
		element.shadowRoot!.querySelector('.popup') as Popup | null;

	beforeEach(async () => {
		jest
			.spyOn(HTMLElement.prototype, 'clientWidth', 'get')
			.mockReturnValue(1000);
		jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
			bottom: 1000,
			top: 0,
			left: 0,
		} as DOMRect);
		element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Slider;
		thumb = element.shadowRoot!.querySelector(
			'.thumb-container'
		) as HTMLElement;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-slider with proper default values', async () => {
			expect(sliderDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Slider);

			expect(element.valueAsNumber).toBe(5);
			expect(element.value).toBe('5');

			expect(element.min).toBe(0);
			expect(element.max).toBe(10);
			expect(element.step).toBe(1);

			expect(element.disabled).toBeFalsy();
			expect(element.orientation).toBe(Orientation.horizontal);
			expect(element.markers).toBeFalsy();
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

			it('should set aria-disabled to true on the control', async () => {
				expect(getControlElement(element).getAttribute('aria-disabled')).toBe(
					'true'
				);
			});

			it('should remove tabindex from the control', async () => {
				expect(getControlElement(element).getAttribute('tabindex')).toBeNull();
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

				it('should set aria-orientation on the control', async () => {
					expect(
						getControlElement(element).getAttribute('aria-orientation')
					).toBe(orientation);
					expect(
						getControlElement(element).getAttribute('aria-orientation')
					).toBe(orientation);
				});
			}
		);

		it.each([
			['horizontal', PlacementStrategy.AutoPlacementHorizontal],
			['vertical', PlacementStrategy.AutoPlacementVertical],
		] as const)(
			'should set the appropriate popup placement strategy for %s orientation',
			async (orientation, strategy) => {
				element.pin = true;
				element.orientation = orientation;
				await elementUpdated(element);

				expect(getPopup()!.placementStrategy).toBe(strategy);
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

	describe('value', () => {
		it('should default to the mid point between min and max', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} min="5" max="10"></${COMPONENT_TAG}>`
			)) as Slider;
			await elementUpdated(element);

			expect(element.value).toBe('8');
		});

		it.each(['3', '13'])(
			'should fallback to the default if value is out of range [%s]',
			async (value) => {
				element = (await fixture(
					`<${COMPONENT_TAG} current-value="${value}" min="5" max="10"></${COMPONENT_TAG}>`
				)) as Slider;
				await elementUpdated(element);

				expect(element.value).toBe('8');
			}
		);
	});

	describe('initialValue', () => {
		it('should be set by the value attribute', async () => {
			element.setAttribute('value', '5');
			expect(element.initialValue).toBe('5');
		});

		it('should set the value if the field is not dirty', async () => {
			element.initialValue = '5';
			expect(element.value).toBe('5');
		});

		it('should not set the value if the field is dirty', async () => {
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);

			element.initialValue = '2';

			expect(element.value).toBe('6');
		});
	});

	describe('currentValue', () => {
		it('should set the value', async () => {
			element.currentValue = '5';

			expect(element.value).toBe('5');
		});

		it('should be set by the value', async () => {
			element.value = '5';

			expect(element.currentValue).toBe('5');
		});
	});

	describe('valueAsNumber', () => {
		it('should return value as a number', () => {
			element.value = '1';
			expect(element.valueAsNumber).toBe(1);
		});

		it('should allow setting value as a number', () => {
			element.valueAsNumber = 1;
			expect(element.value).toBe('1');
		});
	});

	describe('pin', () => {
		beforeEach(async () => {
			element.pin = true;
			await elementUpdated(element);
		});

		it('should have a popup when pin is true', async () => {
			expect(getPopup()).toBeInstanceOf(Popup);
		});

		it('should hide the popup by default', async () => {
			expect(getPopup()!.open).toBe(false);
		});

		it('should display the current value formatted with valueTextFormatter in the popup', async () => {
			element.valueTextFormatter = (value) => `${value} bits`;
			await elementUpdated(element);

			expect(getPopup()!.textContent!.trim()).toBe('5 bits');
		});

		it('should display ariaValuetext in the popup if provided', async () => {
			element.ariaValuetext = 'value text';
			await elementUpdated(element);

			expect(getPopup()!.textContent!.trim()).toBe('value text');
		});

		const hoverOverThumb = () =>
			thumb.dispatchEvent(new MouseEvent('mouseover'));
		const hoverOffThumb = () => thumb.dispatchEvent(new MouseEvent('mouseout'));
		const visiblyFocusThumb = () => getControlElement(element).focus();
		const nonVisiblyFocusThumb = () => {
			thumb.dispatchEvent(new MouseEvent('mousedown'));
			window.dispatchEvent(new MouseEvent('mouseup'));
		};
		const blurThumb = () => getControlElement(element).blur();
		const startDraggingThumb = () =>
			thumb.dispatchEvent(new MouseEvent('mousedown'));
		const startDraggingThumbByClickingOnTrack = () =>
			element.dispatchEvent(new MouseEvent('mousedown'));
		const stopDraggingThumb = () =>
			window.dispatchEvent(new MouseEvent('mouseup'));

		it('should show the popup when hovering over the thumb', async () => {
			hoverOverThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(true);
		});

		it('should hide the popup when hovering off the thumb', async () => {
			hoverOverThumb();

			hoverOffThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(false);
		});

		it('should keep the popup open while hovering thumb when losing focus', async () => {
			hoverOverThumb();
			visiblyFocusThumb();
			startDraggingThumb();

			blurThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(true);
		});

		it('should keep the popup open while hovering thumb when stop dragging thumb', async () => {
			hoverOverThumb();
			visiblyFocusThumb();
			startDraggingThumb();

			stopDraggingThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(true);
		});

		it('should show the popup when the thumb has visible focus', async () => {
			visiblyFocusThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(true);
		});

		it('should hide the popup when the thumb loses focus', async () => {
			visiblyFocusThumb();

			blurThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(false);
		});

		it('should keep the popup open while thumb has visible focus when hovering off thumb', async () => {
			visiblyFocusThumb();
			hoverOverThumb();
			startDraggingThumb();

			hoverOffThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(true);
		});

		it('should keep the popup open while thumb has visible focus when stop dragging thumb', async () => {
			visiblyFocusThumb();
			hoverOverThumb();
			startDraggingThumb();

			stopDraggingThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(true);
		});

		it('should show the popup when dragging the thumb', async () => {
			startDraggingThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(true);
		});

		it('should hide the popup when stopping dragging the thumb', async () => {
			startDraggingThumb();
			stopDraggingThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(false);
		});

		it('should keep the popup open while thumb is dragged when hovering off thumb', async () => {
			startDraggingThumb();
			hoverOverThumb();
			visiblyFocusThumb();

			hoverOffThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(true);
		});

		it('should keep the popup open while thumb is dragged when thumb loses focus', async () => {
			startDraggingThumb();
			hoverOverThumb();
			visiblyFocusThumb();

			blurThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(true);
		});

		it('should not show popup when thumb focus is not visible', async () => {
			nonVisiblyFocusThumb();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(false);
		});

		it('should show popup when dragging the thumb by clicking on track', async () => {
			startDraggingThumbByClickingOnTrack();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(true);
		});

		it('should not show popup when clicking on track while disabled', async () => {
			element.disabled = true;

			startDraggingThumbByClickingOnTrack();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(false);
		});

		it('should not show popup when clicking on track while readOnly', async () => {
			element.readOnly = true;

			startDraggingThumbByClickingOnTrack();
			await elementUpdated(element);

			expect(getPopup()!.open).toBe(false);
		});
	});

	describe('slider', () => {
		beforeEach(() => {
			element.step = 0.5;

			// Work around JSDOM not supporting delegatesFocus correctly
			element.focus = () => getControlElement(element).focus();
			thumb.focus = () => getControlElement(element).focus();
		});

		describe('in horizontal orientation', () => {
			beforeEach(() => {
				element.orientation = Orientation.horizontal;
			});

			it.each(['ArrowRight', 'ArrowUp'])(
				'should increment by step when pressing %s key',
				async (key) => {
					element.value = '5';
					element.focus();

					element.dispatchEvent(new KeyboardEvent('keydown', { key }));

					expect(element.value).toBe('5.5');
				}
			);

			it.each(['ArrowLeft', 'ArrowDown'])(
				'should decrement by step when pressing %s key',
				async (key) => {
					element.value = '5';
					element.focus();

					element.dispatchEvent(new KeyboardEvent('keydown', { key }));

					expect(element.value).toBe('4.5');
				}
			);
		});

		describe('in vertical orientation', () => {
			beforeEach(() => {
				element.orientation = Orientation.vertical;
			});

			it.each(['ArrowLeft', 'ArrowDown'])(
				'should increment by step when pressing %s key',
				async (key) => {
					element.value = '5';
					element.focus();

					element.dispatchEvent(new KeyboardEvent('keydown', { key }));

					expect(element.value).toBe('5.5');
				}
			);

			it.each(['ArrowRight', 'ArrowUp'])(
				'should decrement by step when pressing %s key',
				async (key) => {
					element.value = '5';
					element.focus();

					element.dispatchEvent(new KeyboardEvent('keydown', { key }));

					expect(element.value).toBe('4.5');
				}
			);
		});

		it(`should not decrement below min`, async () => {
			element.value = '5';
			element.min = 5;
			element.focus();

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

			expect(element.value).toBe('5');
		});

		it(`should not increment above max`, async () => {
			element.value = '5';
			element.max = 5;
			element.focus();

			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);

			expect(element.value).toBe('5');
		});

		it(`should set to min when pressing home key`, async () => {
			element.value = '5';
			element.min = 2;
			element.focus();

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

			expect(element.value).toBe('2');
		});

		it(`should set to max when pressing end key`, async () => {
			element.value = '5';
			element.max = 8;
			element.focus();

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

			expect(element.value).toBe('8');
		});

		it.each([
			['ArrowRight'],
			['ArrowUp'],
			['ArrowLeft'],
			['ArrowDown'],
			['Home'],
			['End'],
		])('should ignore all key presses when readonly [%s]', async (key) => {
			element.readOnly = true;
			element.value = '5';
			element.focus();

			element.dispatchEvent(new KeyboardEvent('keydown', { key }));

			expect(element.value).toBe('5');
		});

		it('should have visible focus when control is focused', async () => {
			getControlElement(element).focus();
			await elementUpdated(element);

			expect(thumb.classList).toContain('focus-visible');
		});

		it('should have non-visible focus when control is focused through mousedown', async () => {
			element.dispatchEvent(new MouseEvent('mousedown'));
			await elementUpdated(element);

			expect(element.shadowRoot!.activeElement).toBe(
				getControlElement(element)
			);
			expect(thumb.classList).not.toContain('focus-visible');
		});

		it('should have non-visible focus when control is focused through mousedown on thumb', async () => {
			thumb.dispatchEvent(new MouseEvent('mousedown'));
			await elementUpdated(element);

			expect(element.shadowRoot!.activeElement).toBe(
				getControlElement(element)
			);
			expect(thumb.classList).not.toContain('focus-visible');
		});

		it('should make focus visible when any key is pressed', async () => {
			element.dispatchEvent(new MouseEvent('mousedown'));
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'A' }));
			await elementUpdated(element);

			expect(element.shadowRoot!.activeElement).toBe(
				getControlElement(element)
			);
			expect(thumb.classList).toContain('focus-visible');
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

			it('should change value', async () => {
				const mouseEvent = new MouseEvent('mousedown');
				Object.defineProperty(mouseEvent, coordinate, { value: 300 });

				element.dispatchEvent(mouseEvent);

				expect(element.value).toBe('3');
			});

			it('should not change value when disabled', async () => {
				element.disabled = true;
				const mouseEvent = new MouseEvent('mousedown');
				Object.defineProperty(mouseEvent, coordinate, { value: 300 });

				element.dispatchEvent(mouseEvent);

				expect(element.value).toBe('5');
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

			it('should update value by dragging thumb', async () => {
				dragThumb(thumb, 500, 300);
				expect(element.value).toBe('3');
			});

			it('should have no transition when dragging', async () => {
				mouseDown(thumb, 500);
				mouseMove(300);
				await elementUpdated(element);

				expect(thumb.style.transition).toBe('none');
			});

			it('should not drag when disabled', async () => {
				element.disabled = true;

				dragThumb(thumb, 500, 300);

				expect(element.value).toBe('5');
			});

			it('should stop dragging when disabled during drag', async () => {
				mouseDown(thumb, 500);

				element.disabled = true;
				mouseMove(300);
				mouseUp();

				expect(element.value).toBe('5');
			});

			it('should allow dragging with touchmove event', async () => {
				dragThumb(thumb, 500, 300, true);

				expect(element.value).toBe('3');
			});

			it('should emit change event only when the value changes', async () => {
				const eventSpy = jest.fn();
				element.addEventListener('change', eventSpy);

				mouseDown(thumb, 500);
				mouseMove(550);
				mouseMove(600);
				mouseUp();

				expect(eventSpy).toHaveBeenCalledTimes(1);
			});

			it('should show pin popup while dragging', async () => {
				element.pin = true;
				await elementUpdated(element);

				mouseDown(thumb, 500);
				mouseMove(550);
				await elementUpdated(element);

				expect(getPopup()!.open).toBe(true);
			});
		});
	});

	describe('min/max', () => {
		it('should use last valid value when setting value with min constraint', async () => {
			element.min = 3;
			element.value = '1';
			expect(element.valueAsNumber).toBe(3);
		});

		it('should use last valid value when decrementing out of bounds', async () => {
			element.min = 3;
			element.value = '3';
			element.decrement();
			expect(element.valueAsNumber).toBe(3);
		});

		it('should use last valid value when setting value with max constraint', async () => {
			element.max = 7;
			element.value = '10';
			expect(element.valueAsNumber).toBe(7);
		});

		it('should use last valid value when incrementing out of bounds', async () => {
			element.max = 7;
			element.value = '7';
			element.increment();
			expect(element.valueAsNumber).toBe(7);
		});
	});

	describe('step', () => {
		it('should increment/decrement according to the provided step', async () => {
			element.step = 3.5;
			element.value = '0';

			element.increment();
			const valueAfterIncrementing = element.valueAsNumber;
			element.decrement();

			expect(valueAfterIncrementing).toBe(3.5);
			expect(element.valueAsNumber).toBe(0);
		});

		it('should round values to the nearest step multiple', async () => {
			element.step = 3.5;
			element.value = '6';
			expect(element.valueAsNumber).toBe(7);
		});
	});

	describe('change event', () => {
		it('should fire a change event when value changes', async () => {
			const spy = jest.fn();
			element.addEventListener('change', spy);
			element.value = '0';

			expect(spy).toHaveBeenCalled();
			expect(spy.mock.calls.length).toEqual(1);
		});
	});

	describe('form reset', () => {
		it('should reset the range to initial values when the form is reset', async () => {
			const ORIGINAL_VALUE = '3';
			const form = fixture(`
				<form>
					<${COMPONENT_TAG} value="${ORIGINAL_VALUE}"></${COMPONENT_TAG}>
				</form>
			`) as HTMLFormElement;
			element = form.querySelector(COMPONENT_TAG) as Slider;
			element.value = '4';
			await elementUpdated(form);

			form.reset();
			await elementUpdated(form);

			expect(element.value).toBe(ORIGINAL_VALUE);
		});

		it('should reset the value to mid point if there are no initial values', async () => {
			const form = fixture(`
				<form>
					<${COMPONENT_TAG}></${COMPONENT_TAG}>
				</form>
			`) as HTMLFormElement;
			element = form.querySelector(COMPONENT_TAG) as Slider;
			element.min = -1;
			element.max = 11;
			await elementUpdated(form);

			form.reset();
			await elementUpdated(form);

			expect(element.value).toBe('5');
		});
	});

	it('should handle decimal steps without rounding errors', async () => {
		element.value = '0';
		element.step = 0.1;
		element.focus();

		element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
		element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
		element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

		expect(element.value).toBe('0.3');
	});

	describe('a11y', () => {
		beforeEach(async () => {
			element.ariaLabel = 'Label';
			element.min = 3;
			element.max = 10;
			element.value = '5';
			await elementUpdated(element);
		});

		it('should set component element role to presentation', async () => {
			expect(element.getAttribute('role')).toBe('presentation');
		});

		it('should set the correct a11y attributes', async () => {
			element.ariaValuetext = '5 bits';
			await elementUpdated(element);

			const control = getControlElement(element);
			expect(control?.getAttribute('role')).toBe('slider');
			expect(control?.getAttribute('aria-label')).toBe('Label');
			expect(control?.getAttribute('aria-valuemin')).toBe('3');
			expect(control?.getAttribute('aria-valuemax')).toBe('10');
			expect(control?.getAttribute('aria-valuetext')).toBe('5 bits');
			expect(control?.getAttribute('aria-valuenow')).toBe('5');
			expect(control?.getAttribute('aria-orientation')).toBe('horizontal');
		});

		describe('valueTextFormatter', () => {
			it('should format aria-valuetext', async () => {
				element.valueTextFormatter = (value) => `${value} bits`;
				await elementUpdated(element);

				expect(getControlElement(element).getAttribute('aria-valuetext')).toBe(
					'5 bits'
				);
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
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
