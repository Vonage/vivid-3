import { elementUpdated, fixture } from '@repo/shared';
import {
	AllSelection,
	type EditorState,
	NodeSelection,
	TextSelection,
} from 'prosemirror-state';
import {
	type Attrs,
	type Mark,
	type Node,
	type ResolvedPos,
} from 'prosemirror-model';
import { sum } from 'ramda';
import type { RichTextEditor } from '../../rich-text-editor';
import type { Button } from '../../../button/button';
import {
	registerRichTextEditor,
	RteHtmlParser,
	RteHtmlSerializer,
} from '../../definition';
import type { Menu } from '../../../menu/menu';
import type { MenuItem } from '../../../menu-item/menu-item';
import type { Select } from '../../../select/select';
import type { ListboxOption } from '../../../option/option';
import { RteConfig } from '../config';
import { RteFeature } from '../feature';
import type { TextField } from '../../../text-field/text-field';
import type { Popover } from '../../popover';
import { mockTransfer } from '../../../file-picker/__mocks__/data-transfer';
import type { RteFragment } from '../document';
import type { RteInstanceOptions } from '../instance';
import { impl } from '../utils/impl';
import { removeSymbol } from '../../../../shared/utils/slottable-request';

/**
 * Represents an active slottable request (one that has been added but not yet removed).
 */
export interface SlottableRequest {
	name: string;
	slotName: string;
	data: unknown;
}

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

type TextNodeOffset = { node: Node; offset: number };
function getOffsetInTextNode(
	$pos: ResolvedPos,
	preferLast = false
): TextNodeOffset | null {
	const parent = $pos.parent;
	const parentOffset = $pos.parentOffset;

	// Iterate through children to find the text node containing the cursor
	let accumulated = 0;

	// Note: result could be found multiple times for adjacent text nodes
	const results = [] as TextNodeOffset[];
	parent.forEach((child, offset) => {
		const start = accumulated;
		const end = accumulated + child.nodeSize;

		if (parentOffset >= start && parentOffset <= end && child.isText) {
			results.push({
				node: child,
				offset: parentOffset - start,
			});
		}

		accumulated = end;
	});

	return results[preferLast ? results.length - 1 : 0] ?? null;
}

const docToStr = (state: EditorState) => {
	const { $cursor, $anchor, $head } = state.selection as TextSelection;
	const cursor = $cursor && getOffsetInTextNode($cursor);
	let anchor: TextNodeOffset | null = null;
	let head: TextNodeOffset | null = null;
	const isBackwards = $head.pos < $anchor.pos;
	if (state.selection instanceof TextSelection && !state.selection.empty) {
		anchor = getOffsetInTextNode($anchor, !isBackwards);
		head = getOffsetInTextNode($head, isBackwards);
	}
	const selectedNode =
		state.selection instanceof NodeSelection && state.selection.node;

	// Render stored marks on the caret
	let caret = '|';
	if (state.storedMarks) {
		caret = `|${
			state.storedMarks.length ? marksToStr(state.storedMarks) : '<>'
		}|`;
	}

	const nodeToStr = (node: Node): string => {
		const marks = marksToStr(node.marks);
		if (node.isText) {
			const decorations = [];
			if (cursor?.node === node) {
				decorations.push({ offset: cursor.offset, decoration: caret });
			}
			if (anchor?.node === node) {
				decorations.push({
					offset: anchor.offset,
					decoration: isBackwards ? ']' : '[',
				});
			}
			if (head?.node === node) {
				decorations.push({
					offset: head.offset,
					decoration: isBackwards ? `[${caret}` : `${caret}]`,
				});
			}
			decorations.sort((a, b) => a.offset - b.offset);
			const text = node.text ?? '';
			const fragments = [];
			for (let i = 0; i <= decorations.length; i++) {
				fragments.push(
					text.slice(decorations[i - 1]?.offset ?? 0, decorations[i]?.offset)
				);
				if (decorations[i]) {
					fragments.push(decorations[i].decoration);
				}
			}
			return `${marks}'${JSON.stringify(fragments.join('')).slice(1, -1)}'`;
		}
		const isDoc = node.type === state.schema.nodes.doc;

		const nodeOpen = isDoc
			? ''
			: `${node === selectedNode ? '[|' : ''}${
					node.type.name
			  }${marks}${attrsToStr(node.attrs)}(`;
		let nodeContent = node.content!.content.map(nodeToStr);
		if (!node.childCount) {
			if ($cursor?.parent === node) {
				nodeContent = [caret];
			} else if ($anchor?.parent === node) {
				nodeContent = [isBackwards ? ']' : '['];
			} else if ($head?.parent === node) {
				nodeContent = [isBackwards ? `[${caret}` : `${caret}]`];
			}
		}
		const shouldBreak =
			sum(nodeContent.map((c) => c.length)) > 60 ||
			nodeContent.some((c) => c.includes('\n'));

		let contentStr = shouldBreak
			? '\n' +
			  nodeContent
					.join(',\n')
					.split('\n')
					.map((c) => `${isDoc ? '' : '\t'}${c}`)
					.join('\n') +
			  '\n'
			: nodeContent.join(', ');
		if (isDoc && state.selection instanceof AllSelection) {
			contentStr = isBackwards
				? `[${caret}${contentStr}]`
				: `[${contentStr}${caret}]`;
		}

		const nodeClose = isDoc ? '' : `)${node === selectedNode ? '|]' : ''}`;
		return `${nodeOpen}${contentStr}${nodeClose}`;
	};

	return nodeToStr(state.doc);
};

export async function setup(
	features: RteFeature[],
	initialContent?: RteFragment,
	options?: (config: RteConfig) => RteInstanceOptions
) {
	const config = new RteConfig(features);
	const instance = config.instantiateEditor({
		initialDocument: initialContent && {
			type: 'doc',
			content: initialContent,
		},
		...options?.(config),
	});

	const element = fixture(
		`<vwc-rich-text-editor></vwc-rich-text-editor>`
	) as RichTextEditor;

	// Track active slottable requests - automatically updated on add/remove events
	const slottableRequests: SlottableRequest[] = [];
	element.addEventListener('slottable-request', ((e: CustomEvent) => {
		const { name, slotName, data } = e.detail;
		if (data === removeSymbol) {
			const index = slottableRequests.findIndex((r) => r.slotName === slotName);
			if (index !== -1) {
				slottableRequests.splice(index, 1);
			}
		} else {
			slottableRequests.push({ name, slotName, data });
		}
	}) as EventListener);

	element.instance = instance;
	await elementUpdated(element);

	const view = instance[impl].view!;

	const htmlParser = new RteHtmlParser(config);
	const setHtml = (html: string) =>
		instance.replaceDocument(htmlParser.parseDocument(html));
	const htmlSerializer = new RteHtmlSerializer(config);
	const getHtml = () =>
		htmlSerializer.serializeDocument(instance.getDocument());

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

	const undo = () => {
		keydown('z', { ctrl: true });
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
	/// optionally control head side by adding pipe ("[|" or "|]")
	const selectText = (
		startWithSelection: string,
		endWithSection = startWithSelection
	) => {
		const startMatch = findFirstOccurrence(
			startWithSelection.replace(/[[\]|]/g, '')
		);
		const from = startMatch + startWithSelection.indexOf('[');
		const endMatch = findFirstOccurrence(endWithSection.replace(/[[\]|]/g, ''));
		const to = endMatch + endWithSection.replace(/[[|]/g, '').indexOf(']');
		const isReversed = startWithSelection.includes('[|');
		const [anchor, head] = isReversed ? [to, from] : [from, to];
		const tr = view.state.tr.setSelection(
			TextSelection.create(view.state.doc, anchor, head)
		);
		view.dispatch(tr);
	};

	const toolbar = element.shadowRoot!.querySelector('.toolbar')!;

	const getImageWrapper = () => {
		return view.dom.querySelector<HTMLDivElement>(`.inline-image-wrapper`);
	};

	const getImage = (altText: string) => {
		return view.dom.querySelector<HTMLImageElement>(
			`img.inline-image[alt="${altText}"]`
		);
	};

	const selectImage = (altText: string) => {
		const tr = view.state.tr.setSelection(
			NodeSelection.create(view.state.doc, view.posAtDOM(getImage(altText)!, 0))
		);
		view.dispatch(tr);
	};

	const simulateImageLoaded = (
		altText: string,
		naturalWidth: number,
		naturalHeight: number
	) => {
		const img = getImage(altText)!;
		Object.defineProperty(img, 'naturalWidth', { value: naturalWidth });
		Object.defineProperty(img, 'naturalHeight', { value: naturalHeight });
		img.dispatchEvent(new Event('load'));
	};

	const getPos = (textWithCursor: string) => {
		const [before, after] = textWithCursor.split('|');
		const text = before + after;

		const index = findFirstOccurrence(text);
		return index + before.length;
	};

	// e.g. placeCursor("Hello |world")
	const placeCursor = (textWithCursor: string) => {
		const caret = getPos(textWithCursor);
		const tr = view.state.tr.setSelection(
			TextSelection.create(view.state.doc, caret)
		);
		view.dispatch(tr);
	};

	const typeTextAtCursor = async (text: string) => {
		// Insert text character by character to trigger inputrules
		for (const char of text) {
			const { state } = view;
			const { from, to } = state.selection;
			const defaultInsert = () => state.tr.insertText(char, from, to);
			// Use ProseMirror's text input handler which triggers inputrules
			const handled = view.someProp('handleTextInput', (f) =>
				f(view, from, to, char, defaultInsert)
			);
			if (!handled) {
				// If no plugin handled it, insert the text directly
				view.dispatch(defaultInsert());
			}
		}
		await elementUpdated(element);
	};

	const docStr = () => docToStr(view.state);

	const placeholder = () =>
		element.shadowRoot!.querySelector<HTMLElement>('.placeholder');

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
				`[data-vvd-component="rich-text-editor-popover"]`
			)
		).find((p) => p.open);

	const menuItem = (menu: Menu, text: string) =>
		menu.querySelector<MenuItem>(`[text="${text}"]`)!;

	const isChecked = (item: MenuItem) => item.checked;

	const toolbarSelect = (ariaLabel: string) =>
		element.shadowRoot!.querySelector<Select>(`[aria-label="${ariaLabel}"]`)!;

	const option = (select: Select, text: string) =>
		select.querySelector<ListboxOption>(`[text="${text}"]`)!;

	const pasteFiles = (items: DataTransferItem[]) => {
		const pasteEvent = new CustomEvent('paste', {
			bubbles: true,
			cancelable: true,
		}) as any;
		pasteEvent.clipboardData = mockTransfer(items);
		view.dom.dispatchEvent(pasteEvent);
	};

	const pasteHtml = (html: string) => {
		const pasteEvent = new CustomEvent('paste', {
			bubbles: true,
			cancelable: true,
		}) as any;
		const transfer = new DataTransfer();
		transfer.setData('text/html', html);
		pasteEvent.clipboardData = transfer;
		view.dom.dispatchEvent(pasteEvent);
	};

	const copy = (): DataTransfer => {
		const copyEvent = new CustomEvent('copy', {
			bubbles: true,
			cancelable: true,
		}) as any;
		const transfer = new DataTransfer();
		copyEvent.clipboardData = transfer;
		view.dom.dispatchEvent(copyEvent);
		return transfer;
	};

	const startDrag = (atPos: number): DataTransfer => {
		const copyEvent = new DragEvent('dragstart', {
			dataTransfer: new DataTransfer(),
			bubbles: true,
			cancelable: true,
		});
		view.posAtCoords = () => ({ pos: atPos, inside: 0 });
		view.dom.dispatchEvent(copyEvent);
		return copyEvent.dataTransfer!;
	};

	const dropFiles = (atPos: number, items: DataTransferItem[]) => {
		const dropEvent = new DragEvent('drop', {
			dataTransfer: mockTransfer(items),
			bubbles: true,
			cancelable: true,
		});
		view.posAtCoords = () => ({ pos: atPos, inside: 0 });
		view.dom.dispatchEvent(dropEvent);
	};

	const dropHtml = (atPos: number, html: string) => {
		const dropEvent = new DragEvent('drop', {
			dataTransfer: new DataTransfer(),
			bubbles: true,
			cancelable: true,
		});
		dropEvent.dataTransfer!.setData('text/html', html);
		view.posAtCoords = () => ({ pos: atPos, inside: 0 });
		view.dom.dispatchEvent(dropEvent);
	};

	const dispatchDragEvent = (
		type: string,
		init: DragEventInit = {},
		target = element.editorViewportElement!
	) => {
		const event = new DragEvent(type, {
			bubbles: true,
			cancelable: true,
			composed: true,
			...init,
		});
		target.dispatchEvent(event);
		return event;
	};

	return {
		instance,
		element,
		view,
		config,
		htmlParser,
		htmlSerializer,
		getHtml,
		setHtml,
		keydown,
		selectAll,
		undo,
		getPos,
		placeCursor,
		typeTextAtCursor,
		docStr,
		placeholder,
		toolbar,
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
		selectImage,
		simulateImageLoaded,
		getImageWrapper,
		getImage,
		toolbarSelect,
		option,
		openPopover,
		pasteFiles,
		pasteHtml,
		copy,
		dropFiles,
		dropHtml,
		startDrag,
		dispatchDragEvent,
		slottableRequests,
	};
}
