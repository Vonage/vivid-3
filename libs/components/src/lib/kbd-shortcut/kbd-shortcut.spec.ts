import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { KbdShortcut } from './kbd-shortcut';
import '.';
import '../kbd-key';

const COMPONENT_TAG = 'vwc-kbd-shortcut';

describe('vwc-kbd-shortcut', () => {
	let element: KbdShortcut;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as KbdShortcut;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-kbd-shortcut', async () => {
			expect(element).toBeInstanceOf(KbdShortcut);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('getKeyshortcutsValue', () => {
		it('should return null when no keys are slotted', async () => {
			expect(element.getKeyshortcutsValue()).toBeNull();
		});

		it('should return a valid aria-keyshortcuts value', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<vwc-kbd-key name="Control"></vwc-kbd-key>
					<vwc-kbd-key name="C"></vwc-kbd-key>
				</${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			expect(element.getKeyshortcutsValue()).toBe('Control+C');
		});

		it('should sort modifiers first', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<vwc-kbd-key name="A"></vwc-kbd-key>
					<vwc-kbd-key name="Control"></vwc-kbd-key>
				</${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			expect(element.getKeyshortcutsValue()).toBe('Control+A');
		});

		it('should handle multiple modifiers', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<vwc-kbd-key name="Control"></vwc-kbd-key>
					<vwc-kbd-key name="Shift"></vwc-kbd-key>
					<vwc-kbd-key name="P"></vwc-kbd-key>
				</${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			expect(element.getKeyshortcutsValue()).toBe('Control+Shift+P');
		});

		it('should resolve Mod to Meta on Apple keyboard', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<vwc-kbd-key name="Mod" keyboard="apple"></vwc-kbd-key>
					<vwc-kbd-key name="C"></vwc-kbd-key>
				</${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			expect(element.getKeyshortcutsValue()).toBe('Meta+C');
		});

		it('should resolve Mod to Control on standard keyboard', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<vwc-kbd-key name="Mod" keyboard="standard"></vwc-kbd-key>
					<vwc-kbd-key name="C"></vwc-kbd-key>
				</${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			expect(element.getKeyshortcutsValue()).toBe('Control+C');
		});

		it('should include Custom key using its textContent', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<vwc-kbd-key name="Custom">Fn</vwc-kbd-key>
				</${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			expect(element.getKeyshortcutsValue()).toBe('Fn');
		});

		it('should use keyshortcuts-key value if set', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}><vwc-kbd-key name="Custom" keyshortcuts-key="Power"></vwc-kbd-key></${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			expect(element.getKeyshortcutsValue()).toBe('Power');
		});

		it('should return null when only Custom keys without text content are present', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}><vwc-kbd-key name="Custom"></vwc-kbd-key></${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			expect(element.getKeyshortcutsValue()).toBeNull();
		});

		it('should include Custom key textContent alongside other keys', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<vwc-kbd-key name="Control"></vwc-kbd-key>
					<vwc-kbd-key name="Custom">Fn</vwc-kbd-key>
					<vwc-kbd-key name="A"></vwc-kbd-key>
				</${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			expect(element.getKeyshortcutsValue()).toBe('Control+Fn+A');
		});

		it('should ignore non-kbd-key elements', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span>not a key</span>
					<vwc-kbd-key name="A"></vwc-kbd-key>
				</${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			expect(element.getKeyshortcutsValue()).toBe('A');
		});
	});
});
