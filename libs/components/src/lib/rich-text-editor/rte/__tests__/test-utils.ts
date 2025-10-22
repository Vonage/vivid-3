import { elementUpdated, fixture } from '@repo/shared';
import type { EditorView } from 'prosemirror-view';
import { TextSelection } from 'prosemirror-state';
import { type Attrs, type Mark, type Node } from 'prosemirror-model';
import type { RichTextEditor } from '../../rich-text-editor';
import type { Button } from '../../../button/button';
import { registerRichTextEditor } from '../../definition';
import type { Menu } from '../../../menu/menu';
import type { MenuItem } from '../../../menu-item/menu-item';
import type { Select } from '../../../select/select';
import type { ListboxOption } from '../../../option/option';
import { RTEConfig } from '../config';
import { RTEFeature } from '../feature';
import type { TextField } from '../../../text-field/text-field';
import type { Popover } from '../../popover';

registerRichTextEditor();

const attrsToStr = (attrs: Attrs) => {
	if (!Object.entries(attrs).length) return '';
	return `[${Object.entries(attrs)
		.map(([key, value]) => `${key}=${JSON.stringify(value)}`)
		.join(' ')}]`;
};

const marksToStr = (marks: readonly Mark[]) => {
	if (!marks.length) return '';
	return `<${marks
		.map((mark) => `${mark.type.name}${attrsToStr(mark.attrs)}`)
		.join(' ')}>`;
};

const nodeToStr = (node: Node): string => {
	if (node.isText) {
		return `${marksToStr(node.marks)}${JSON.stringify(node.text)}`;
	}
	return `${node.type.name}${marksToStr(node.marks)}${attrsToStr(
		node.attrs
	)}(${node.content!.content.map(nodeToStr).join(', ')})`;
};

export async function setup(features: RTEFeature[], initialDoc?: any) {
	const config = new RTEConfig(features);
	const rte = config.instantiateEditor(initialDoc);

	const element = fixture(
		`<vwc-rich-text-editor></vwc-rich-text-editor>`
	) as RichTextEditor;
	element.instance = rte;
	await elementUpdated(element);

	const view = (element as any)._view as EditorView;

	const keydown = (
		key: string,
		options: {
			ctrl?: boolean;
			cmd?: boolean;
			alt?: boolean;
			shift?: boolean;
		} = {}
	) => {
		view.dom.dispatchEvent(
			new KeyboardEvent('keydown', {
				key,
				metaKey: options.cmd, // On Mac: cmd, on Windows: win
				altKey: options.alt, // On Mac: option
				ctrlKey: options.ctrl,
				shiftKey: options.shift,
				composed: true,
				bubbles: true,
			})
		);
	};

	const selectAll = () => {
		keydown('a', { ctrl: true });
	};

	/**
	 * Find the position of the given text.
	 * Only works if the text is present in a single text node.
	 */
	const findFirstOccurrence = (text: string) => {
		let position = -1;
		view.state.doc.descendants((node, pos) => {
			if (position !== -1) return false;

			if (node.isText) {
				const index = node.text!.indexOf(text);
				if (index !== -1) {
					position = pos + index;
				}
			}
			return true;
		});
		if (position === -1) {
			throw new Error(`Text "${text}" not found in document`);
		}
		return position;
	};

	/// e.g. selectText("He[llo", "wor]ld")
	const selectText = (
		startWithSelection: string,
		endWithSection = startWithSelection
	) => {
		const startMatch = findFirstOccurrence(
			startWithSelection.replace(/[[\]]/g, '')
		);
		const from = startMatch + startWithSelection.indexOf('[');
		const endMatch = findFirstOccurrence(endWithSection.replace(/[[\]]/g, ''));
		const to = endMatch + endWithSection.replace(/\[/g, '').indexOf(']');
		const tr = view.state.tr.setSelection(
			TextSelection.create(view.state.doc, from, to)
		);
		view.dispatch(tr);
	};

	// e.g. placeCursor("Hello |world")
	const placeCursor = (textWithCursor: string) => {
		const [before, after] = textWithCursor.split('|');
		const text = before + after;

		const index = findFirstOccurrence(text);
		const caret = index + before.length;
		const tr = view.state.tr.setSelection(
			TextSelection.create(view.state.doc, caret)
		);
		view.dispatch(tr);
	};

	const typeTextAtCursor = async (text: string) => {
		if (
			!(
				view.state.selection instanceof TextSelection &&
				view.state.selection.empty
			)
		) {
			throw new Error('Selection must be a caret');
		}
		const { node, offset } = view.domAtPos(view.state.selection.anchor, 1)!;
		if (node.nodeType === window.Node.TEXT_NODE) {
			const prevContent = node.nodeValue ?? '';
			const newContent =
				prevContent.slice(0, offset) + text + prevContent.slice(offset);
			node.nodeValue = newContent;
		} else {
			if (offset !== 0) {
				throw new Error('Not sure whats going on');
			}
			const textNode = document.createTextNode(text);
			node.insertBefore(textNode, node.childNodes[0] ?? null);
		}
		await elementUpdated(element);
	};

	const docStr = () => nodeToStr(view.state.doc);

	const toolbarButton = (ariaLabel: string) =>
		element.shadowRoot!.querySelector<Button>(
			`[data-vvd-component="button"][data-vvd-aria-label="${ariaLabel}"]`
		)!;

	const button = (root: HTMLElement, label: string) =>
		root.querySelector<Button>(
			`[data-vvd-component="button"][label="${label}"],[data-vvd-component="button"][data-vvd-aria-label="${label}"]`
		)!;

	const textField = (root: HTMLElement, label: string) =>
		root.querySelector<TextField>(
			`[data-vvd-component="text-field"][label="${label}"]`
		)!;

	const click = async (el: Button | MenuItem) => {
		el.click();
		await elementUpdated(element);
	};

	const input = async (el: TextField, value: string) => {
		el.value = value;
		el.dispatchEvent(
			new InputEvent('input', {
				bubbles: true,
				composed: true,
				cancelable: true,
			})
		);
		await elementUpdated(element);
	};

	const isActive = (button: Button) => button.appearance === 'filled';

	const openMenu = () =>
		element.shadowRoot!.querySelector<Menu>(
			`[data-vvd-component="menu"][open]`
		)!;

	const openPopover = () =>
		Array.from(
			element.shadowRoot!.querySelectorAll<Popover>(
				`[data-vvd-component="popover"]`
			)
		).find((p) => p.open);

	const menuItem = (menu: Menu, text: string) =>
		menu.querySelector<MenuItem>(`[text="${text}"]`)!;

	const isChecked = (item: MenuItem) => item.checked;

	const toolbarSelect = (ariaLabel: string) =>
		element.shadowRoot!.querySelector<Select>(`[aria-label="${ariaLabel}"]`)!;

	const option = (select: Select, text: string) =>
		select.querySelector<ListboxOption>(`[text="${text}"]`)!;

	return {
		rte,
		element,
		view,
		config,
		keydown,
		selectAll,
		placeCursor,
		typeTextAtCursor,
		docStr,
		toolbarButton,
		button,
		textField,
		click,
		input,
		isActive,
		openMenu,
		menuItem,
		isChecked,
		selectText,
		toolbarSelect,
		option,
		openPopover,
	};
}
