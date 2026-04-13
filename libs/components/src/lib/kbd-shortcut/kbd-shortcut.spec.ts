import { elementUpdated, fixture } from '@repo/shared';
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
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('slotted keys', () => {
		it('should render a single kbd-key without separator', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}><vwc-kbd-key name="A"></vwc-kbd-key></${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			const wrappers =
				element.shadowRoot?.querySelectorAll('.key-wrapper') ?? [];
			const separators =
				element.shadowRoot?.querySelectorAll('.separator') ?? [];
			expect(wrappers.length).toBe(1);
			expect(separators.length).toBe(0);
		});

		it('should render multiple kbd-key elements with separators between them', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
					<vwc-kbd-key name="Shift"></vwc-kbd-key>
					<vwc-kbd-key name="P"></vwc-kbd-key>
				</${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			const wrappers =
				element.shadowRoot?.querySelectorAll('.key-wrapper') ?? [];
			const separators =
				element.shadowRoot?.querySelectorAll('.separator') ?? [];
			expect(wrappers.length).toBe(3);
			expect(separators.length).toBe(2);
		});

		it('should display "+" text in separators', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<vwc-kbd-key name="Cmd"></vwc-kbd-key>
					<vwc-kbd-key name="C"></vwc-kbd-key>
				</${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			const separator = element.shadowRoot?.querySelector('.separator');
			expect(separator?.textContent).toBe('+');
		});

		it('should assign slot names to slotted children', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<vwc-kbd-key name="Cmd"></vwc-kbd-key>
					<vwc-kbd-key name="C"></vwc-kbd-key>
				</${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			const children = element.querySelectorAll('vwc-kbd-key');
			expect(children[0].slot).toBe('key-0');
			expect(children[1].slot).toBe('key-1');
		});

		it('should create named slots in the shadow DOM', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
					<vwc-kbd-key name="V"></vwc-kbd-key>
				</${COMPONENT_TAG}>`
			)) as KbdShortcut;
			await elementUpdated(element);

			const namedSlots =
				element.shadowRoot?.querySelectorAll('slot[name^="key-"]');
			expect(namedSlots?.length).toBe(2);
			expect(namedSlots?.[0].getAttribute('name')).toBe('key-0');
			expect(namedSlots?.[1].getAttribute('name')).toBe('key-1');
		});

		it('should have a base element with role="group"', async () => {
			const base = element.shadowRoot?.querySelector('.base');
			expect(base?.getAttribute('role')).toBe('group');
		});

		it('should update when children are added dynamically', async () => {
			const kbd = document.createElement('vwc-kbd-key');
			kbd.setAttribute('name', 'A');
			element.appendChild(kbd);
			await elementUpdated(element);

			const wrappers =
				element.shadowRoot?.querySelectorAll('.key-wrapper') ?? [];
			expect(wrappers.length).toBe(1);
		});
	});
});
