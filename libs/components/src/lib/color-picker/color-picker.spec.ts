import 'element-internals-polyfill';
import { elementUpdated, fixture, getBaseElement } from '@repo/shared';
import type { HexColorPicker } from 'vanilla-colorful/hex-color-picker.js';
import type { HexInput } from 'vanilla-colorful/hex-input.js';
import type { TextField } from '../text-field/text-field';
import type { Popup } from '../popup/popup';
import type { Button } from '../button/button';
import { ColorPicker } from './color-picker';
import '.';

const COMPONENT_TAG = 'vwc-color-picker';

describe('vwc-color-picker', () => {
	let element: ColorPicker;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ColorPicker;
	});

	const getPopup = () =>
		element.shadowRoot?.querySelector('vwc-popup') as Popup | null;
	const getTextField = () =>
		element.shadowRoot?.querySelector('#text-field') as TextField | null;
	const getPickerButton = () =>
		element.shadowRoot?.querySelector('.button') as HTMLButtonElement | null;

	const getHexPicker = () =>
		element.shadowRoot?.querySelector(
			'vvd-hex-picker'
		) as HexColorPicker | null;
	const getHexInput = () =>
		element.shadowRoot?.querySelector('vvd-hex-input') as HexInput | null;

	const getCopyButton = () =>
		element.shadowRoot?.querySelector(
			'vwc-button[size="normal"]'
		) as Button | null;

	const pressKey = (key: string, options: KeyboardEventInit = {}) => {
		const active = element.shadowRoot!.activeElement!;
		active.dispatchEvent(
			new KeyboardEvent('keydown', { key, bubbles: true, ...options })
		);
	};

	describe('basic', () => {
		it('should be initialized as a vwc-color-picker', async () => {
			expect(element).toBeInstanceOf(ColorPicker);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See [https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance)
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});

		it('should have a proper form association proxy', () => {
			expect(element.proxy).toBeInstanceOf(HTMLInputElement);
		});

		it('should be initialized with default values', async () => {
			await elementUpdated(element);
			expect(element.value).toBe('');
			expect(element.open).toBe(false);
			expect(() => element.placeholder).not.toThrow();
		});
	});

	describe('text field', () => {
		it('should reflect placeholder to proxy input', async () => {
			element.placeholder = 'Pick a color';
			await elementUpdated(element);
			expect((element.proxy as HTMLInputElement).placeholder).toBe(
				'Pick a color'
			);
		});

		it('should forward input changes to value', async () => {
			const textField = getTextField();
			textField?.dispatchEvent(new InputEvent('input', { bubbles: true }));
			element._onTextFieldInput({ currentTarget: { value: '#00ff00' } } as any);

			await elementUpdated(element);
			expect(element.value).toBe('#00ff00');
		});

		it('should set inner slot when helper-text content exists', async () => {
			const helperText = document.createElement('span');
			helperText.setAttribute('slot', 'helper-text');
			helperText.textContent = 'Helper text';
			element.appendChild(helperText);
			await elementUpdated(element);

			const innerSlot = element.shadowRoot?.querySelector(
				'slot[name="helper-text"]'
			) as HTMLSlotElement;
			expect(innerSlot.getAttribute('slot')).toBe('helper-text');
		});

		it('should set inner slot when contextual-help content exists', async () => {
			const contextualHelp = document.createElement('div');
			contextualHelp.setAttribute('slot', 'contextual-help');
			contextualHelp.textContent = 'Help text';
			element.appendChild(contextualHelp);
			await elementUpdated(element);

			const innerSlot = element.shadowRoot?.querySelector(
				'slot[name="contextual-help"]'
			) as HTMLSlotElement;
			expect(innerSlot.getAttribute('slot')).toBe('contextual-help');
		});

		describe('emitting events', () => {
			it('emits a single change on @change from the text field', async () => {
				const textField = getTextField();
				const changeSpy = vi.fn();
				element.addEventListener('change', changeSpy);

				textField?.dispatchEvent(new Event('change', { bubbles: true }));
				await elementUpdated(element);

				expect(changeSpy).toHaveBeenCalledTimes(1);
			});

			it.each(['focus', 'blur'])(
				'emits non-bubbling %s on inner @%s',
				async (event) => {
					const textField = getTextField();

					const docSpy = vi.fn();
					document.addEventListener(event, docSpy, false);

					const elSpy = vi.fn();
					element.addEventListener(event, elSpy);

					textField?.dispatchEvent(new FocusEvent(event));
					await elementUpdated(element);

					expect(elSpy).toHaveBeenCalledTimes(1);
					expect(docSpy).not.toHaveBeenCalled();
				}
			);
		});
	});

	describe('picker button', () => {
		it('should apply "contrast" class on picker button when _applyContrastClass returns true', async () => {
			const contrastSpy = vi
				.spyOn(element, '_applyContrastClass')
				.mockReturnValue(true);

			element.value = '#123456';
			await elementUpdated(element);

			const btn = getPickerButton()!;
			expect(btn.classList.contains('contrast')).toBe(true);

			contrastSpy.mockRestore();
		});

		it('should toggle "disabled" class with the component disabled state', async () => {
			element.disabled = true;
			await elementUpdated(element);

			const btn = getPickerButton()!;
			expect(btn.classList.contains('disabled')).toBe(true);

			element.disabled = false;
			await elementUpdated(element);
			expect(btn.classList.contains('disabled')).toBe(false);
		});
	});

	describe('open', () => {
		it('should reflect the property to popup and toggle via button click', async () => {
			expect(element.open).toBe(false);
			const btn = getPickerButton();
			btn?.click();
			await elementUpdated(element);
			expect(element.open).toBe(true);

			const popup = getPopup();
			expect(popup?.hasAttribute('open')).toBe(true);

			btn?.click();
			await elementUpdated(element);
			expect(element.open).toBe(false);
			expect(popup?.hasAttribute('open')).toBe(false);
		});

		it('should close when close header button is clicked', async () => {
			element.open = true;
			await elementUpdated(element);
			const closeBtn = element.shadowRoot?.querySelector(
				'vwc-button[size="condensed"]'
			) as HTMLElement;
			closeBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);
			expect(element.open).toBe(false);
		});

		it('should close and stop propagation on Escape (component keydown listener)', async () => {
			element.open = true;
			await elementUpdated(element);

			const spy = vi.fn();
			element.parentElement!.addEventListener('keydown', spy);
			getBaseElement(element).dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
			);
			await elementUpdated(element);
			expect(element.open).toBe(false);
			expect(spy.mock.calls.length).toBe(0);
		});

		it('should not close when clicking inside popup or button (composedPath guard)', async () => {
			element.open = true;
			await elementUpdated(element);
			const popupHost = getPopup()!;
			popupHost.dispatchEvent(
				new MouseEvent('mousedown', { bubbles: true, composed: true })
			);
			await elementUpdated(element);
			expect(element.open).toBe(true);

			const btn = getPickerButton()!;
			btn.dispatchEvent(
				new MouseEvent('mousedown', { bubbles: true, composed: true })
			);
			await elementUpdated(element);
			expect(element.open).toBe(true);
		});

		it('should close on outside mousedown', async () => {
			element.open = true;
			await elementUpdated(element);
			document.body.dispatchEvent(
				new MouseEvent('mousedown', { bubbles: true, composed: true })
			);
			await elementUpdated(element);
			expect(element.open).toBe(false);
		});

		it('should return false from _isInPath when el is null/undefined', async () => {
			const res1 = (element as any)._isInPath(
				new MouseEvent('mousedown'),
				null
			);
			const res2 = (element as any)._isInPath(
				new MouseEvent('mousedown'),
				undefined
			);
			expect(res1).toBe(false);
			expect(res2).toBe(false);
		});
	});

	describe('vanilla-colorful integration', () => {
		it('should render internal hex picker and input when popup opens', async () => {
			element.open = true;
			await elementUpdated(element);
			expect(getHexPicker()).toBeTruthy();
			expect(getHexInput()).toBeTruthy();
		});

		it('should propagate value to hex picker and input', async () => {
			element.value = '#112233';
			element.open = true;
			await elementUpdated(element);
			expect((getHexPicker() as any).color).toBe('#112233');
			expect((getHexInput() as any).color).toBe('#112233');
		});

		it('should update element value on color-changed event', async () => {
			element.open = true;
			await elementUpdated(element);
			const event = new CustomEvent('color-changed', {
				detail: { value: '#445566' },
				bubbles: true,
			});
			getHexPicker()?.dispatchEvent(event);
			await elementUpdated(element);
			expect(element.value).toBe('#445566');
		});
	});

	describe('copy to clipboard', () => {
		beforeEach(() => {
			// @ts-expect-error test stub
			globalThis.navigator.clipboard = {
				writeText: vi.fn().mockResolvedValue(undefined),
			};
			vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		});

		afterEach(() => vi.useRealTimers());

		it('should switch icon to success on copy and revert after timeout', async () => {
			element.value = '#abcdef';
			element.open = true;
			await elementUpdated(element);

			const copyBtn = getCopyButton();
			const visuallyHidden =
				element.shadowRoot?.querySelector('.visually-hidden');
			copyBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);

			expect(navigator.clipboard.writeText as any).toHaveBeenCalledWith(
				'#abcdef'
			);
			expect(element.copyIconName).toBe('check-circle-line');
			expect(visuallyHidden?.textContent).toContain(
				'Color #abcdef copied to clipboard.'
			);

			await vi.advanceTimersByTimeAsync(2100);
			await elementUpdated(element);

			expect(element.copyIconName).toBe('copy-2-line');
		});

		it('should switch icon to error on copy failure and show alert', async () => {
			(navigator.clipboard.writeText as any).mockRejectedValueOnce(
				new Error('denied')
			);
			const alertSpy = vi.spyOn(window, 'alert');

			element.value = '#abcdef';
			element.open = true;
			await elementUpdated(element);

			const copyBtn = getCopyButton();
			copyBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);

			expect(element.copyIconName).toBe('error-line');
			expect(alertSpy).toHaveBeenCalled();

			await vi.advanceTimersByTimeAsync(2100);
			await elementUpdated(element);

			expect(element.copyIconName).toBe('copy-2-line');

			alertSpy.mockRestore();
		});

		it('should clear previous icon reset timer when setting a new temporary icon', async () => {
			const clearSpy = vi.spyOn(globalThis, 'clearTimeout');

			element._setTemporaryCopyIcon('check-circle-line', 5000);
			element._setTemporaryCopyIcon('error-line', 3000);

			expect(clearSpy).toHaveBeenCalledTimes(1);
			clearSpy.mockRestore();
		});
	});

	describe('saved colors & swatches', () => {
		const STORAGE_PREFIX = 'vvd-saved-colors';

		const clearStorage = () => {
			for (let i = localStorage.length - 1; i >= 0; i--) {
				const key = localStorage.key(i);
				if (key && key.startsWith(STORAGE_PREFIX)) localStorage.removeItem(key);
			}
		};

		beforeEach(() => clearStorage());
		afterEach(() => clearStorage());

		const openAndRender = async () => {
			element.open = true;
			await elementUpdated(element);
		};

		const getSaveButton = () =>
			element.shadowRoot?.querySelector(
				'vwc-button[appearance="outlined"]'
			) as Button | null;

		const getSwatches = () =>
			Array.from(
				element.shadowRoot?.querySelectorAll('.swatch') ?? []
			) as HTMLButtonElement[];

		const getSwatchColors = () =>
			getSwatches().map((s) => s.style.getPropertyValue('--swatch-color'));

		const saveColor = async (value: string) => {
			element.value = value;
			await elementUpdated(element);
			getSaveButton()?.dispatchEvent(
				new MouseEvent('click', { bubbles: true })
			);
			await elementUpdated(element);
		};

		it('should save a valid hex and update savedColors and UI', async () => {
			await openAndRender();
			await saveColor('#123456');

			expect(element.savedColors?.[0]?.value).toBe('#123456');
			expect(getSwatchColors()[0]).toBe('#123456');
		});

		it('should ignore invalid value and keep savedColors and UI unchanged', async () => {
			await openAndRender();
			await saveColor('not-a-color' as any);

			expect(element.savedColors?.length).toBe(0);
			expect(getSwatches().length).toBe(0);
		});

		it('should deduplicate by moving an existing color to front in state and UI', async () => {
			await openAndRender();
			await saveColor('#112233');
			await saveColor('#abcdef');
			await saveColor('#112233');

			expect(element.savedColors?.map((s) => s.value)).toEqual([
				'#112233',
				'#abcdef',
			]);
			expect(getSwatchColors()).toEqual(['#112233', '#abcdef']);
		});

		it('should limit by maxSwatches on saving, keep the most recent and reflect it in UI', async () => {
			element.maxSwatches = 2;
			await elementUpdated(element);
			await openAndRender();

			await saveColor('#000001');
			await saveColor('#000002');
			await saveColor('#000003');

			expect(element.savedColors?.map((s) => s.value)).toEqual([
				'#000003',
				'#000002',
			]);
			expect(getSwatchColors()).toEqual(['#000003', '#000002']);
			expect(getSwatches().length).toBe(2);
		});

		it('should trim savedColors when maxSwatches is lowered and update the UI', async () => {
			element.maxSwatches = 3;
			await elementUpdated(element);
			await openAndRender();

			await saveColor('#101010');
			await saveColor('#202020');
			await saveColor('#303030');
			expect(element.savedColors.length).toBe(3);

			element.maxSwatches = 2;
			await elementUpdated(element);

			expect(element.savedColors.length).toBe(2);
			expect(getSwatches().length).toBe(2);
			expect(getSwatchColors()).toEqual(['#303030', '#202020']);
		});

		it('should update component value and aria-live region on swatch click', async () => {
			await openAndRender();
			await saveColor('#112233');
			await saveColor('#abcdef');
			await saveColor('#cccccc');
			await elementUpdated(element);

			const swatches = getSwatches();
			const targetSwatch = swatches.find(
				(el) => el.style.getPropertyValue('--swatch-color') === '#112233'
			)!;
			const visuallyHidden =
				element.shadowRoot?.querySelector('.visually-hidden');

			expect(targetSwatch).toBeTruthy();
			targetSwatch.click();
			await elementUpdated(element);
			expect(element.value).toBe('#112233');
			expect(element.open).toBe(false);
			expect(visuallyHidden?.textContent).toContain('Color #112233 selected.');
		});

		it('should persist across new instance when saved-colors-key is provided', async () => {
			element.setAttribute('saved-colors-key', 'test-key-A');
			await elementUpdated(element);
			await openAndRender();
			await saveColor('#a1b2c3');

			const el2 = (await fixture(
				`<${COMPONENT_TAG} saved-colors-key="test-key-A"></${COMPONENT_TAG}>`
			)) as ColorPicker;

			await elementUpdated(el2);
			expect(el2.savedColors?.map((s) => s.value)).toContain('#a1b2c3');
		});

		it('should use fallback storage key across instances', async () => {
			await openAndRender();
			await saveColor('#0f0f0f');

			const el2 = (await fixture(
				`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
			)) as ColorPicker;
			await elementUpdated(el2);

			expect(el2.savedColors?.map((s) => s.value)).toContain('#0f0f0f');
		});

		it('should react to saved-colors-key changes at runtime by reloading savedColors', async () => {
			element.setAttribute('saved-colors-key', 'key-A');
			await elementUpdated(element);
			await openAndRender();
			await saveColor('#aa0000');
			expect(element.savedColors?.map((s) => s.value)).toContain('#aa0000');

			element.setAttribute('saved-colors-key', 'key-B');
			await elementUpdated(element);
			expect(element.savedColors?.length).toBe(0);

			element.setAttribute('saved-colors-key', 'key-A');
			await elementUpdated(element);
			expect(element.savedColors?.map((s) => s.value)).toContain('#aa0000');
		});

		it('should not include saved colors in allSwatches when disableSavedColors is true', async () => {
			element.setAttribute('saved-colors-key', 'iso');
			await elementUpdated(element);
			await openAndRender();
			await saveColor('#111111');

			element.swatches = [{ value: '#ff0000' }, { value: '#00ff00' }];
			element.disableSavedColors = true;
			await elementUpdated(element);

			const values = element.allSwatches.map((s) => s.value);
			expect(values).toEqual(['#ff0000', '#00ff00']);
		});

		it('should merges unique saved and predefined colors in allSwatches with max-swatches limit', async () => {
			element.swatches = [
				{ value: '#ff0000' },
				{ value: '#00ff00' },
				{ value: '#ff0000' },
			];
			element.savedColors = [{ value: '#00ff00' }, { value: '#0000ff' }];
			element.maxSwatches = 3;
			await elementUpdated(element);

			const merged = element.allSwatches.map((s) => s.value);
			expect(merged).toEqual(['#00ff00', '#0000ff', '#ff0000']);
			expect(getSwatchColors()).toEqual(['#00ff00', '#0000ff', '#ff0000']);
		});

		it.each(['Enter', ' '])(
			'should save current color on keyboard "%s" button press when focusing Save button',
			async (key) => {
				element.value = '#cccccc';
				await openAndRender();
				const saveBtn = getSaveButton()!;
				saveBtn.focus();
				pressKey(key);
				await elementUpdated(element);
				expect(element.savedColors?.[0]?.value).toBe('#cccccc');
			}
		);

		it('should map non-string labels to undefined and keep string labels in _loadSavedColors', async () => {
			element.savedColorsKey = 'labels-key';
			const key = element._savedColorsStorageKey;
			localStorage.setItem(
				key,
				JSON.stringify([
					{ value: '#aabbcc', label: 123 },
					{ value: '#bbccdd', label: 'Nice' },
				])
			);

			const list = element._loadSavedColors();
			expect(list).toEqual([
				{ value: '#aabbcc', label: undefined },
				{ value: '#bbccdd', label: 'Nice' },
			]);
		});

		it('should ignore invalid swatches or those without string value in allSwatches', async () => {
			element.disableSavedColors = true;
			element.swatches = [
				undefined as any,
				null as any,
				{} as any,
				{ value: 42 } as any,
				{ value: '#zzzzzz' } as any,
				{ value: '#112233' },
			];
			await elementUpdated(element);

			const values = element.allSwatches.map((s) => s.value);
			expect(values).toEqual(['#112233']);
		});

		it('should treat non-array swatches as empty in allSwatches', async () => {
			element.savedColors = [{ value: '#010203' }];
			(element as any).swatches = 'not-an-array';
			await elementUpdated(element);

			const values = element.allSwatches.map((s) => s.value);
			expect(values).toEqual(['#010203']);
		});

		describe('swatches count display', () => {
			it('should display swatches count when disableSavedColors is false', async () => {
				element.maxSwatches = 5;
				await elementUpdated(element);
				await openAndRender();

				await saveColor('#112233');
				await saveColor('#445566');

				const swatchesCount =
					element.shadowRoot?.querySelector('#swatches-count');
				expect(swatchesCount).toBeTruthy();
				expect(swatchesCount?.textContent?.trim()).toBe('2/5');
			});

			it('should update swatches count when adding colors', async () => {
				element.maxSwatches = 10;
				await elementUpdated(element);
				await openAndRender();

				await saveColor('#111111');
				const swatchesCount =
					element.shadowRoot?.querySelector('#swatches-count');
				expect(swatchesCount?.textContent?.trim()).toBe('1/10');

				await saveColor('#222222');
				await saveColor('#333333');
				expect(swatchesCount?.textContent?.trim()).toBe('3/10');
				expect(swatchesCount?.ariaLabel?.trim()).toBe('3 of 10 colors saved.');
			});

			it('should not display swatches count when disableSavedColors is true', async () => {
				element.maxSwatches = 5;
				element.disableSavedColors = true;
				await elementUpdated(element);
				await openAndRender();

				const swatchesCount =
					element.shadowRoot?.querySelector('#swatches-count');
				expect(swatchesCount).toBeNull();
			});
		});

		describe('edge cases & error handling', () => {
			it('should return 0 for non-finite value of maxSwatches', async () => {
				element.maxSwatches = Number.NaN;
				await elementUpdated(element);
				expect(element._maxSwatchesNormalized).toBe(0);
			});

			it('should return [] from _getGridCells when grid is not rendered', async () => {
				element.disableSavedColors = true;
				await elementUpdated(element);
				const cells = element._getGridCells?.();
				expect(Array.isArray(cells)).toBe(true);
				expect(cells.length).toBe(0);
			});

			it('should not throw when _returnFocusToAnchor has no focus return element', async () => {
				expect(() => element._returnFocusToAnchor()).not.toThrow();
			});

			it('should handle non-array savedColors by starting from []', async () => {
				await elementUpdated(element);
				(element as any).savedColors = null;
				element.value = '#123456';
				await elementUpdated(element);
				element._saveCurrentColor();
				expect(element.savedColors?.[0]?.value).toBe('#123456');
			});

			it('should load saved colors as [] when parsing JSON fails', async () => {
				const key = element._savedColorsStorageKey;
				localStorage.setItem(key, '{bad json');
				await elementUpdated(element);
				const list = element._loadSavedColors();
				expect(list).toEqual([]);
			});

			it('should load saved colors as [] when parsed JSON is not an array', async () => {
				const key = element._savedColorsStorageKey;
				localStorage.setItem(key, '{ "values": "list" }');
				await elementUpdated(element);
				const list = element._loadSavedColors();
				expect(list).toEqual([]);
			});

			it('should load saved colors as [] when localStorage.getItem throws', async () => {
				const spy = vi
					.spyOn(Storage.prototype, 'getItem')
					.mockImplementation(() => {
						throw new Error('error');
					});
				const list = element._loadSavedColors();
				expect(list).toEqual([]);
				spy.mockRestore();
			});

			it('should not throw error when localStorage.setItem fails', async () => {
				const spy = vi
					.spyOn(Storage.prototype, 'setItem')
					.mockImplementation(() => {
						throw new Error('error');
					});

				expect(() =>
					element._setSavedColors([{ value: '#112233' }])
				).not.toThrow();
				spy.mockRestore();
			});
		});
	});

	describe('trapped focus', () => {
		let firstFocusable: HTMLElement;
		let lastFocusable: HTMLElement;

		const getFocusableElements = () => {
			return Array.from(
				element._popupEl.querySelectorAll<HTMLElement>(
					'button:not([role="gridcell"]), [data-vvd-component="button"], vwc-button:not([role="gridcell"])'
				)
			);
		};

		beforeEach(async () => {
			element.open = true;
			await elementUpdated(element);
			const focusableEls = getFocusableElements();
			firstFocusable = focusableEls[0];
			lastFocusable = focusableEls[focusableEls.length - 1];
		});

		it('should move focus to first focusable element when pressing tab on the last focusable element', () => {
			lastFocusable.focus();
			pressKey('Tab');
			expect(element.shadowRoot!.activeElement).toBe(firstFocusable);
		});

		it('should move focus to last focusable element when pressing shift + tab on the first focusable element', () => {
			firstFocusable.focus();
			pressKey('Tab', { shiftKey: true });
			expect(element.shadowRoot!.activeElement).toBe(lastFocusable);
		});

		it('should move focus to previous focusable element when pressing shift + tab on the last focusable element', () => {
			lastFocusable.focus();
			pressKey('Tab', { shiftKey: true });
			const focusableEls = getFocusableElements();
			const preLastFocusable = focusableEls[focusableEls.length - 2];
			expect(element.shadowRoot!.activeElement).toBe(preLastFocusable);
		});

		it('should keep default of unrelated keydown event', () => {
			firstFocusable.focus();
			const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true });
			event.preventDefault = vi.fn();
			element.shadowRoot!.activeElement!.dispatchEvent(event);
			expect(event.preventDefault).not.toHaveBeenCalled();
		});
	});
});
