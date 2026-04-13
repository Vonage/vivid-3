import { elementUpdated, fixture } from '@repo/shared';
import { KbdKey } from './kbd-key';
import '.';

const COMPONENT_TAG = 'vwc-kbd-key';

describe('vwc-kbd-key', () => {
	let element: KbdKey;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as KbdKey;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-kbd-key', async () => {
			expect(element).toBeInstanceOf(KbdKey);
			expect(element.name).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('name', () => {
		it('should render a kbd element with class "base"', async () => {
			element.name = 'A';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd).toBeInstanceOf(HTMLElement);
		});

		it('should display a letter key as its letter', async () => {
			element.name = 'A';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('A');
		});

		it('should display "Cmd" as ⌘ symbol', async () => {
			element.name = 'Cmd';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('⌘');
		});

		it('should display "Enter" as ↵ symbol', async () => {
			element.name = 'Enter';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('↵');
		});

		it('should display "Shift" as ⇧ symbol', async () => {
			element.name = 'Shift';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('⇧');
		});

		it('should display "Tab" as ⇥ symbol', async () => {
			element.name = 'Tab';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('⇥');
		});

		it('should display "Space" as ␣ symbol', async () => {
			element.name = 'Space';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('␣');
		});

		it('should display "Backspace" as ⌫ symbol', async () => {
			element.name = 'Backspace';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('⌫');
		});

		it('should display "Delete" as ⌦ symbol', async () => {
			element.name = 'Delete';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('⌦');
		});

		it('should display "Escape" as Esc', async () => {
			element.name = 'Escape';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('Esc');
		});

		it('should display arrow keys as arrow symbols', async () => {
			const arrows = [
				['ArrowUp', '↑'],
				['ArrowDown', '↓'],
				['ArrowLeft', '←'],
				['ArrowRight', '→'],
			] as const;

			for (const [key, symbol] of arrows) {
				element.name = key;
				await elementUpdated(element);

				const kbd = element.shadowRoot?.querySelector('kbd.base');
				expect(kbd?.textContent?.trim()).toBe(symbol);
			}
		});

		it('should display "Ctrl" as Ctrl', async () => {
			element.name = 'Ctrl';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('Ctrl');
		});

		it('should display "Alt" as Alt', async () => {
			element.name = 'Alt';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('Alt');
		});

		it('should display function keys as-is', async () => {
			element.name = 'F1';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('F1');
		});

		it('should display number keys as-is', async () => {
			element.name = '0';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('0');
		});
	});

	describe('Mod key', () => {
		it('should display "Mod" as Ctrl on non-Apple platforms', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
			);

			element.name = 'Mod';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('Ctrl');

			vi.restoreAllMocks();
		});

		it('should display "Mod" as ⌘ on Apple platforms', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
			);

			element.name = 'Mod';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base');
			expect(kbd?.textContent?.trim()).toBe('⌘');

			vi.restoreAllMocks();
		});

		it('should add key-mod class for Mod', async () => {
			element.name = 'Mod';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base.key-mod');
			expect(kbd).toBeInstanceOf(HTMLElement);
		});
	});

	describe('CSS classes', () => {
		it('should add key-specific class for modifier keys', async () => {
			element.name = 'Ctrl';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base.key-ctrl');
			expect(kbd).toBeInstanceOf(HTMLElement);
		});

		it('should add symbol class for symbol keys', async () => {
			element.name = 'Enter';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base.symbol');
			expect(kbd).toBeInstanceOf(HTMLElement);
		});

		it('should add wide class for Space', async () => {
			element.name = 'Space';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base.wide');
			expect(kbd).toBeInstanceOf(HTMLElement);
		});

		it('should add key-specific class', async () => {
			element.name = 'Cmd';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base.key-cmd');
			expect(kbd).toBeInstanceOf(HTMLElement);
		});
	});

	describe('Custom slot', () => {
		it('should render a slot when name is "Custom"', async () => {
			element.name = 'Custom';
			await elementUpdated(element);

			const slot = element.shadowRoot?.querySelector('kbd.base slot');
			expect(slot).toBeInstanceOf(HTMLSlotElement);
		});

		it('should add custom class when name is "Custom"', async () => {
			element.name = 'Custom';
			await elementUpdated(element);

			const kbd = element.shadowRoot?.querySelector('kbd.base.custom');
			expect(kbd).toBeInstanceOf(HTMLElement);
		});

		it('should display slotted content', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} name="Custom"><span>MyKey</span></${COMPONENT_TAG}>`
			)) as KbdKey;

			const slot = element.shadowRoot?.querySelector('slot') as HTMLSlotElement;
			const assigned = slot?.assignedNodes();
			expect(assigned?.length).toBeGreaterThan(0);
		});

		it('should not render a slot when name is not "Custom"', async () => {
			element.name = 'A';
			await elementUpdated(element);

			const slot = element.shadowRoot?.querySelector('slot');
			expect(slot).toBeNull();
		});
	});

	describe('displayLabel', () => {
		it('should return empty string when name is undefined', () => {
			expect(element.displayLabel).toBe('');
		});

		it('should return empty string when name is "Custom"', () => {
			element.name = 'Custom';
			expect(element.displayLabel).toBe('');
		});

		it('should return mapped symbol for mapped keys', () => {
			element.name = 'Cmd';
			expect(element.displayLabel).toBe('⌘');
		});

		it('should return key name as-is for unmapped keys', () => {
			element.name = 'Z';
			expect(element.displayLabel).toBe('Z');
		});
	});
});
