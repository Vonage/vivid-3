import {
	customElement,
	elements,
	html,
	slotted,
} from '@microsoft/fast-element';
import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import { WithKbdShortcut } from './kbd-shortcut';
import '../../lib/kbd-key';
import '../../lib/kbd-shortcut';

describe('WithKbdShortcut', () => {
	@customElement({
		name: 'with-kbd-shortcut-element',
		template: html`<slot
			name="kbd-shortcut"
			${slotted({
				property: '_kbdShortcutSlotted',
				filter: elements(),
			})}
		></slot>`,
	})
	class WithKbdShortcutElement extends WithKbdShortcut(VividElement) {}

	let element: WithKbdShortcutElement;

	afterEach(() => element.remove());

	it('should have no _kbdAriaShortcutsValue when no element is slotted', async () => {
		element = fixture(
			'<with-kbd-shortcut-element></with-kbd-shortcut-element>'
		) as WithKbdShortcutElement;

		expect(element._kbdAriaShortcutsValue).toBeUndefined();
	});

	it('should have no _kbdAriaShortcutsValue when a non-matching element is slotted', async () => {
		element = fixture(
			'<with-kbd-shortcut-element><div slot="kbd-shortcut"></div></with-kbd-shortcut-element>'
		) as WithKbdShortcutElement;

		expect(element._kbdAriaShortcutsValue).toBeUndefined();
	});

	it('should set _kbdAriaShortcutsValue from a slotted kbd-shortcut element', async () => {
		element = fixture(`
			<with-kbd-shortcut-element>
				<vwc-kbd-shortcut slot="kbd-shortcut">
					<vwc-kbd-key name="Control"></vwc-kbd-key>
					<vwc-kbd-key name="C"></vwc-kbd-key>
				</vwc-kbd-shortcut>
			</with-kbd-shortcut-element>
		`) as WithKbdShortcutElement;
		await elementUpdated(element);

		expect(element._kbdAriaShortcutsValue).toBe('Control+C');
	});

	it('should clear _kbdAriaShortcutsValue when the kbd-shortcut element is removed', async () => {
		element = fixture(`
			<with-kbd-shortcut-element>
				<vwc-kbd-shortcut slot="kbd-shortcut">
					<vwc-kbd-key name="Control"></vwc-kbd-key>
					<vwc-kbd-key name="C"></vwc-kbd-key>
				</vwc-kbd-shortcut>
			</with-kbd-shortcut-element>
		`) as WithKbdShortcutElement;
		await elementUpdated(element);

		element.querySelector('vwc-kbd-shortcut')!.remove();
		await elementUpdated(element);

		expect(element._kbdAriaShortcutsValue).toBeUndefined();
	});
});
