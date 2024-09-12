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

async function setBoolAttributeOn(
	el: Slider,
	attr: string
): Promise<DOMTokenList> {
	el.toggleAttribute(attr, true);
	await elementUpdated(el);
	return getControlElement(el).classList;
}

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

	describe('disabled', () => {
		it('should set disabled class when disabled is true', async () => {
			const classes = await setBoolAttributeOn(element, 'disabled');
			const control = await getControlElement(element);
			expect(classes).toContain('disabled');
			expect(control.getAttribute('aria-disabled')).toBe('true');
		});

		it('should set aria-disabled to true', async () => {
			await setBoolAttributeOn(element, 'disabled');
			const control = await getControlElement(element);
			expect(control.getAttribute('aria-disabled')).toBe('true');
		});
	});

	describe('markers', () => {
		const getMarkersDiv = () =>
			getControlElement(element).querySelector(
				'.positioning-region > .track > .mark'
			) as HTMLDivElement;

		it('should display the markers element when markers is true', async () => {
			const markersDivReferenceBefore = getMarkersDiv();
			await setBoolAttributeOn(element, 'markers');
			const markersDivReferenceAfter = getMarkersDiv();
			await elementUpdated(element);

			expect(markersDivReferenceBefore).toBeNull();
			expect(markersDivReferenceAfter).not.toBeNull();
		});

		it('should display the markers element with proper style vertically', async () => {
			await setBoolAttributeOn(element, 'markers');
			element.orientation = Orientation.vertical;
			await elementUpdated(element);

			expect(getMarkersDiv().getAttribute('style')).toContain('repeat-y');
		});
	});

	describe('orientation', () => {
		it('should set the vertical class on the control when changing orientation to vertical', async () => {
			const controlClasses = () =>
				Array.from(getControlElement(element).classList);
			const classesInitialValue = controlClasses();

			element.setAttribute('orientation', 'vertical');
			await elementUpdated(element);

			expect(classesInitialValue).toContain('horizontal');
			expect(controlClasses()).toContain('vertical');
		});

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

	describe('connotation', function () {
		const possibleConnotations = [Connotation.Accent, Connotation.CTA] as const;

		it('should not set any connotation classes when no connotation is set', async function () {
			possibleConnotations.forEach((connotation) => {
				expect(
					getControlElement(element)?.classList.contains(
						`connotation-${connotation}`
					)
				).toEqual(false);
			});
		});

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

	describe('thumb', () => {
		beforeEach(() => {
			// Work around JSDOM not supporting delegatesFocus correctly
			element.focus = () => getControlElement(element).focus();
			thumb.focus = () => getControlElement(element).focus();
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

		describe('dragging the thumb', () => {
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

				const mouseUp = () => {
					window.dispatchEvent(new MouseEvent('mouseup'));
				};

				const dragThumb = (from: number, to: number) => {
					mouseDown(thumb, from);
					mouseMove(to);
					mouseUp();
				};

				beforeEach(async () => {
					element.value = '0';
					element.orientation = orientation as Orientation;
					await elementUpdated(element);
				});

				it('should update value by dragging thumb', async () => {
					dragThumb(0, 300);
					expect(element.value).toBe('3');
				});

				it('should not drag when disabled', async () => {
					element.disabled = true;

					dragThumb(0, 300);

					expect(element.value).toBe('0');
				});
			});
		});
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
