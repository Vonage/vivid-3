import 'element-internals-polyfill';
import { elementUpdated, fixture } from '@repo/shared';
import { SimpleColorPicker } from './simple-color-picker';
import '.';

const COMPONENT_TAG = 'vwc-simple-color-picker';
const TEST_SWATCHES = [
	{ value: '#ff0000', label: 'Red' },
	{ value: '#00ff00', label: 'Green' },
	{ value: '#0000ff', label: 'Blue' },
	{ value: '#ffff00', label: 'Yellow' },
	{ value: '#ff00ff', label: 'Magenta' },
	{ value: '#00ffff', label: 'Cyan' },
];

describe('vwc-simple-color-picker', () => {
	let element: SimpleColorPicker;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as SimpleColorPicker;
	});

	const getSwatches = () => element.shadowRoot?.querySelectorAll('.swatch');

	const getSwatch = (index: number = 0) =>
		getSwatches()?.[index] as HTMLButtonElement;

	const getSelectedSwatch = () =>
		element.shadowRoot?.querySelector('.swatch.selected') as HTMLButtonElement;

	const getPalette = () =>
		element.shadowRoot?.querySelector('.palette') as HTMLElement;

	const getPopup = () => element.shadowRoot?.querySelector('vwc-popup');

	describe('basic', () => {
		it('should be initialized as a vwc-simple-color-picker', async () => {
			expect(element).toBeInstanceOf(SimpleColorPicker);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See [https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance)
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});

		it('should have a unique popup ID', () => {
			const element1 = document.createElement(
				COMPONENT_TAG
			) as SimpleColorPicker;
			const element2 = document.createElement(
				COMPONENT_TAG
			) as SimpleColorPicker;

			expect(element1._popupId).toBeDefined();
			expect(element2._popupId).toBeDefined();
			expect(element1._popupId).not.toBe(element2._popupId);
		});

		it('should have proper form association proxy', () => {
			expect(element.proxy).toBeInstanceOf(HTMLInputElement);
		});

		it('should be initialized with default values', async () => {
			await elementUpdated(element);
			expect(element.value).toBe('');
			expect(element.open).toBe(false);
			expect(element.swatches).toEqual([]);
			expect(element.swatchesPerRow).toBe(7);
			expect(element.placement).toBe('top-start');
		});
	});

	describe('value', () => {
		it('should reflect the attribute as a property', async () => {
			element.setAttribute('value', '#00ff00');
			await elementUpdated(element);
			expect(element.value).toBe('#00ff00');
		});

		it('should emit change event when value changes', async () => {
			const changePromise = new Promise((resolve) =>
				element.addEventListener('change', () => resolve(true))
			);

			element.value = '#ff0000';
			expect(await changePromise).toBe(true);
		});

		it('should update selected swatch when value matches', async () => {
			element.setAttribute(
				'swatches',
				JSON.stringify(TEST_SWATCHES.slice(0, 2))
			);
			element.value = '#ff0000';
			element.open = true;
			await elementUpdated(element);

			const swatchButtons = getSwatches();
			expect(swatchButtons?.length).toBe(2);

			const selectedSwatch = getSelectedSwatch();
			expect(selectedSwatch).toBeTruthy();
		});
	});

	describe('open', () => {
		it('should reflect the property as an attribute', async () => {
			element.open = true;
			await elementUpdated(element);
			expect(element.hasAttribute('open')).toBe(true);
		});

		it('should reflect the attribute as a property', async () => {
			element.setAttribute('open', '');
			await elementUpdated(element);
			expect(element.open).toBe(true);
		});

		it('should show popup when open is true', async () => {
			element.open = true;
			await elementUpdated(element);

			const popup = getPopup();
			expect(popup?.hasAttribute('open')).toBe(true);
		});

		it('should hide popup when open is false', async () => {
			element.open = true;
			await elementUpdated(element);

			element.open = false;
			await elementUpdated(element);

			const popup = getPopup();
			expect(popup?.hasAttribute('open')).toBe(false);
		});

		it('should clear _openedViaKeyboard flag when closed', async () => {
			element._openedViaKeyboard = true;
			element.open = true;
			await elementUpdated(element);

			element.open = false;
			await elementUpdated(element);

			expect(element._openedViaKeyboard).toBe(false);
		});

		it('should handle escape key in popup template without closing directly', async () => {
			element.open = true;
			await elementUpdated(element);

			const popup = getPopup();
			const escapeEvent = new KeyboardEvent('keydown', {
				key: 'Escape',
				bubbles: true,
				cancelable: true,
			});

			popup?.dispatchEvent(escapeEvent);
			await elementUpdated(element);
			expect(element.open).toBe(true);
		});
	});

	describe('swatches', () => {
		it('should parse swatches from JSON string attribute', async () => {
			const swatchesJson = JSON.stringify(TEST_SWATCHES.slice(0, 3));
			element.setAttribute('swatches', swatchesJson);
			await elementUpdated(element);
			expect(element.swatches).toEqual(TEST_SWATCHES.slice(0, 3));
		});

		it('should parse simple string array of swatches', async () => {
			const simpleSwatches = TEST_SWATCHES.slice(0, 3).map((s) => s.value);
			element.setAttribute('swatches', JSON.stringify(simpleSwatches));
			await elementUpdated(element);
			expect(element.swatches).toEqual([
				{ value: '#ff0000' },
				{ value: '#00ff00' },
				{ value: '#0000ff' },
			]);
		});

		it('should handle invalid JSON gracefully', async () => {
			element.setAttribute('swatches', 'invalid-json');
			await elementUpdated(element);
			expect(element.swatches).toEqual([]);

			element.setAttribute('swatches', '{"not": "array"}');
			await elementUpdated(element);
			expect(element.swatches).toEqual([]);
		});

		it('should render swatches with correct properties when open', async () => {
			element.setAttribute(
				'swatches',
				JSON.stringify(TEST_SWATCHES.slice(0, 3))
			);
			element.open = true;
			await elementUpdated(element);

			const swatchButtons = getSwatches();
			expect(swatchButtons?.length).toBe(3);

			const firstSwatch = getSwatch(0);
			expect(firstSwatch?.style.getPropertyValue('--swatch-color')).toBe(
				'#ff0000'
			);
			expect(firstSwatch?.getAttribute('tabindex')).toBe('0');
			expect(swatchButtons?.[1]?.getAttribute('tabindex')).toBe('-1');
			expect(swatchButtons?.[2]?.getAttribute('tabindex')).toBe('-1');
		});

		it('should clear swatch elements cache when swatches change', () => {
			element.setAttribute(
				'swatches',
				JSON.stringify(TEST_SWATCHES.slice(0, 3))
			);
			expect(element['_swatchElements']).toBeUndefined();
		});
	});

	describe('swatchesPerRow', () => {
		it('should reflect the attribute as a property', async () => {
			element.setAttribute('swatches-per-row', '3');
			await elementUpdated(element);
			expect(element.swatchesPerRow).toBe(3);
		});

		it('should handle invalid attribute values', async () => {
			element.setAttribute('swatches-per-row', 'invalid');
			await elementUpdated(element);
			expect(element.swatchesPerRow).toBeNull();
		});

		it('should update CSS custom property when open', async () => {
			element.swatchesPerRow = 5;
			element.open = true;
			await elementUpdated(element);

			const palette = getPalette();
			expect(palette?.style.getPropertyValue('--swatches-per-row')).toBe('5');
		});
	});

	describe('placement', () => {
		it('should reflect the attribute as a property', async () => {
			element.setAttribute('placement', 'bottom-end');
			await elementUpdated(element);
			expect(element.placement).toBe('bottom-end');
		});

		it('should set placement on popup', async () => {
			element.placement = 'bottom-start';
			element.open = true;
			await elementUpdated(element);

			const popup = getPopup();
			expect(popup?.getAttribute('placement')).toBe('bottom-start');
		});

		it('should update popup placement when changed', async () => {
			element.open = true;
			await elementUpdated(element);

			element.placement = 'right';
			await elementUpdated(element);

			const popup = getPopup();
			expect(popup?.getAttribute('placement')).toBe('right');
		});
	});

	describe('click interactions', () => {
		beforeEach(async () => {
			element.setAttribute(
				'swatches',
				JSON.stringify(TEST_SWATCHES.slice(0, 3))
			);
			element.open = true;
			await elementUpdated(element);
		});

		it('should select swatch on click', async () => {
			const changePromise = new Promise((resolve) =>
				element.addEventListener('change', () => resolve(true))
			);

			const firstSwatch = getSwatch(0);
			firstSwatch?.click();

			expect(element.value).toBe('#ff0000');
			expect(element.open).toBe(false);
			expect(await changePromise).toBe(true);
		});

		it('should close popup when clicking outside', async () => {
			const outsideClickEvent = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			});
			document.body.dispatchEvent(outsideClickEvent);
			await elementUpdated(element);

			expect(element.open).toBe(false);
		});

		it('should show selected swatch with icon', async () => {
			element.value = '#00ff00';
			await elementUpdated(element);

			const selectedSwatch = getSelectedSwatch();
			const icon = selectedSwatch?.querySelector('vwc-icon');

			expect(selectedSwatch).toBeTruthy();
			expect(icon).toBeTruthy();
			expect(icon?.getAttribute('name')).toBe('check-solid');
		});

		it('should reset value when clicking already selected swatch', async () => {
			const changePromise = new Promise((resolve) =>
				element.addEventListener('change', () => resolve(true))
			);

			const firstSwatch = getSwatch(0);
			firstSwatch?.click();
			expect(element.value).toBe('#ff0000');

			element.open = true;
			await elementUpdated(element);

			firstSwatch?.click();

			expect(element.value).toBe('');
			expect(element.open).toBe(false);
			expect(await changePromise).toBe(true);
		});
	});

	describe('keyboard navigation', () => {
		beforeEach(async () => {
			element.setAttribute('swatches', JSON.stringify(TEST_SWATCHES));
			element.swatchesPerRow = 3;
			element.open = true;
			await elementUpdated(element);
		});

		it('should close popup on Escape key', async () => {
			const escapeEvent = new KeyboardEvent('keydown', {
				key: 'Escape',
				bubbles: true,
				cancelable: true,
			});
			document.dispatchEvent(escapeEvent);
			await elementUpdated(element);

			expect(element.open).toBe(false);
		});

		it('should select swatch with Enter and Space keys', async () => {
			const changePromise = new Promise((resolve) =>
				element.addEventListener('change', () => resolve(true))
			);

			const enterEvent = new KeyboardEvent('keydown', {
				key: 'Enter',
				bubbles: true,
				cancelable: true,
			});
			getSwatch(0)?.dispatchEvent(enterEvent);
			await elementUpdated(element);

			expect(element.value).toBe('#ff0000');
			expect(element.open).toBe(false);
			expect(await changePromise).toBe(true);

			element.open = true;
			element.value = '';
			await elementUpdated(element);

			const spaceEvent = new KeyboardEvent('keydown', {
				key: ' ',
				bubbles: true,
				cancelable: true,
			});
			getSwatch(1)?.dispatchEvent(spaceEvent);
			await elementUpdated(element);

			expect(element.value).toBe('#00ff00');
			expect(element.open).toBe(false);
		});

		describe.each([
			'ArrowRight',
			'ArrowLeft',
			'ArrowDown',
			'ArrowUp',
			'Home',
			'End',
			'PageDown',
			'PageUp',
		])('navigation with %s key', (key) => {
			it(`should handle ${key} key and prevent default`, async () => {
				const keyEvent = new KeyboardEvent('keydown', {
					key,
					bubbles: true,
					cancelable: true,
				});
				const preventDefaultSpy = vi.spyOn(keyEvent, 'preventDefault');

				expect(() => getSwatch(0)?.dispatchEvent(keyEvent)).not.toThrow();
				expect(preventDefaultSpy).toHaveBeenCalled();
			});
		});

		it('should handle control and special keys', async () => {
			const firstSwatch = getSwatch(0);

			expect(() => {
				firstSwatch?.dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'Home',
						ctrlKey: true,
						bubbles: true,
					})
				);
				firstSwatch?.dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'End',
						ctrlKey: true,
						bubbles: true,
					})
				);
			}).not.toThrow();

			firstSwatch?.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
			);
			await elementUpdated(element);
			expect(element.open).toBe(false);

			element.open = true;
			await elementUpdated(element);

			firstSwatch?.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
			);
			await elementUpdated(element);
			expect(element.open).toBe(false);
		});

		it('should handle edge case navigation and unknown keys', async () => {
			expect(() => {
				getSwatch(1)?.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
				);
				getSwatch(3)?.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
				);
				getSwatch(4)?.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true })
				);
				getSwatch(0)?.dispatchEvent(
					new KeyboardEvent('keydown', { key: 'UnknownKey', bubbles: true })
				);
			}).not.toThrow();
		});

		it('should return focus to anchor after Tab key', async () => {
			const anchorElement = document.createElement('button');
			anchorElement.slot = 'anchor';
			element.appendChild(anchorElement);
			await elementUpdated(element);

			const focusSpy = vi.fn();
			anchorElement.focus = focusSpy;

			getSwatch(0)?.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
			);
			await elementUpdated(element);
			await new Promise((resolve) => setTimeout(resolve, 50));

			expect(focusSpy).toHaveBeenCalled();
		});

		it('should focus correct swatch when opened via keyboard', async () => {
			const anchorElement = document.createElement('button');
			anchorElement.slot = 'anchor';
			element.appendChild(anchorElement);
			await elementUpdated(element);

			element.open = false;
			element.value = '#00ff00';
			anchorElement.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
			);
			await elementUpdated(element);
			await new Promise((resolve) => setTimeout(resolve, 50));
			expect(element.shadowRoot?.activeElement).toBe(getSwatch(1));

			element.open = false;
			element.value = '#999999';
			anchorElement.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
			);
			await elementUpdated(element);
			await new Promise((resolve) => setTimeout(resolve, 50));
			expect(element.shadowRoot?.activeElement).toBe(getSwatch(0));
		});
	});

	describe('anchor interactions', () => {
		let anchorElement: HTMLElement;

		beforeEach(async () => {
			anchorElement = document.createElement('button');
			anchorElement.textContent = 'Open Color Picker';
			anchorElement.slot = 'anchor';
			element.appendChild(anchorElement);
			await elementUpdated(element);
		});

		it('should open popup when anchor is clicked', async () => {
			expect(element.open).toBe(false);

			anchorElement.click();
			await elementUpdated(element);

			expect(element.open).toBe(true);
		});

		it('should open popup when Enter is pressed on anchor', async () => {
			expect(element.open).toBe(false);

			const enterEvent = new KeyboardEvent('keydown', {
				key: 'Enter',
				bubbles: true,
				cancelable: true,
			});

			anchorElement.dispatchEvent(enterEvent);
			await elementUpdated(element);

			expect(element.open).toBe(true);
			expect(element._openedViaKeyboard).toBe(true);
		});

		it('should open popup when Space is pressed on anchor', async () => {
			expect(element.open).toBe(false);

			const spaceEvent = new KeyboardEvent('keydown', {
				key: ' ',
				bubbles: true,
				cancelable: true,
			});

			spaceEvent.preventDefault = vi.fn();
			anchorElement.dispatchEvent(spaceEvent);
			await elementUpdated(element);

			expect(element.open).toBe(true);
			expect(element._openedViaKeyboard).toBe(true);
			expect(spaceEvent.preventDefault).toHaveBeenCalled();
		});

		it('should close popup when anchor is clicked while open', async () => {
			element.open = true;
			await elementUpdated(element);

			expect(element.open).toBe(true);
			anchorElement.click();
			await elementUpdated(element);

			expect(element.open).toBe(false);
		});
	});

	describe('ARIA attributes & a11y', () => {
		let anchorElement: HTMLElement;

		beforeEach(async () => {
			element.setAttribute(
				'swatches',
				JSON.stringify(TEST_SWATCHES.slice(0, 3))
			);
		});

		it('should have proper ARIA attributes on palette and swatches', async () => {
			element.open = true;
			await elementUpdated(element);

			const palette = getPalette();
			expect(palette?.getAttribute('role')).toBe('grid');
			expect(palette?.hasAttribute('aria-label')).toBe(true);
			expect(palette?.getAttribute('aria-colcount')).toBe('7');
			expect(palette?.getAttribute('aria-rowcount')).toBe('1');

			const firstSwatch = getSwatch(0);
			expect(firstSwatch?.getAttribute('role')).toBe('gridcell');
			expect(firstSwatch?.hasAttribute('aria-label')).toBe(true);
			expect(firstSwatch?.getAttribute('tabindex')).toBe('0');
		});

		it('should set proper ARIA attributes on anchor', async () => {
			anchorElement = document.createElement('button');
			anchorElement.textContent = 'Open Color Picker';
			anchorElement.slot = 'anchor';
			element.appendChild(anchorElement);
			await elementUpdated(element);

			expect(anchorElement.getAttribute('aria-controls')).toBe(
				element._popupId
			);
			expect(anchorElement.getAttribute('aria-haspopup')).toBe('true');
			expect(anchorElement.getAttribute('aria-expanded')).toBe('false');

			element.open = true;
			await elementUpdated(element);

			expect(anchorElement.getAttribute('aria-expanded')).toBe('true');
		});
	});
});
