import { elementUpdated } from '@repo/shared';
import { docFactories } from '../__tests__/doc-factories';
import { setup as standardSetup } from '../__tests__/test-utils';
import { RteConfig } from '../config';
import type { ProgressRing } from '../../../progress-ring/progress-ring';
import type { Popover } from '../../popover';
import type { ListboxOption } from '../../../option/option';
import { RteBase } from './base';
import {
	RteSuggestFeature,
	type RteSuggestFeatureOptions,
	type Suggestion,
} from './suggest';
import { RteAtomFeature } from './atom';
import { RteToolbarFeature } from './toolbar';

const { paragraph: p } = docFactories;

const featuresWithSuggest = (
	options: RteSuggestFeatureOptions
): ConstructorParameters<typeof RteConfig>[0] => [
	new RteBase(),
	new RteToolbarFeature(),
	new RteAtomFeature('mention', { resolveValue: (v: string) => `@${v}` }),
	new RteSuggestFeature('mention', options),
];

const mockSuggestions: Suggestion[] = [
	{ text: 'john', textSecondary: 'John Doe' },
	{ text: 'jane', textSecondary: 'Jane Smith' },
	{ text: 'bob' },
];

const setup = async (...args: Parameters<typeof standardSetup>) => {
	const rte = await standardSetup(...args);

	const getSuggestPopover = () =>
		rte.element
			.shadowRoot!.querySelector<HTMLElement>('.suggest-popover')!
			.closest<Popover>('[data-vvd-component="rich-text-editor-popover"]');

	return {
		...rte,
		isSuggestPopoverOpen: () => {
			return getSuggestPopover()?.open;
		},
		getSuggestItems: () =>
			Array.from(
				getSuggestPopover()!.querySelectorAll<ListboxOption>(
					'[data-vvd-component="option"]'
				)
			),
		getLoadingIndicator: () =>
			rte.element.shadowRoot!.querySelector<ProgressRing>(
				'.suggest-loading-widget [data-vvd-component="progress-ring"]'
			),
		getSelectedItem: () =>
			getSuggestPopover()!.querySelector<ListboxOption>('[data-highlighted]'),
		isSelectedItemVisuallyFocused: () =>
			getSuggestPopover()!
				.querySelector<ListboxOption>('[data-highlighted]')!
				.classList.contains('suggest-item--visible-focus'),
		getEmptyState: () =>
			getSuggestPopover()!.querySelector<HTMLDivElement>(
				'.suggest-empty-message'
			),
	};
};

describe('RteSuggestFeature', () => {
	beforeAll(() => {
		HTMLElement.prototype.scrollIntoView = vi.fn();
	});

	describe('regex matching', () => {
		it('should detect match when typing trigger character followed by text', async () => {
			let matchedGroups: string[] | null = null;
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: (match) => {
						matchedGroups = match;
						return [];
					},
					select: () => [],
				}),
				[p('Hello ')]
			);

			await rte.typeTextAtCursor('world ');

			expect(matchedGroups).toBe(null);

			await rte.typeTextAtCursor('@john');

			expect(matchedGroups).toEqual(['@john', 'john']);
		});
	});

	describe('suggestions loading', () => {
		it('should show loading indicator while loading suggestions', async () => {
			let resolveLoad: (suggestions: Suggestion[]) => void;
			const loadPromise = new Promise<Suggestion[]>((resolve) => {
				resolveLoad = resolve;
			});

			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => loadPromise,
					select: () => [],
				}),
				[p('Hello ')]
			);

			await rte.typeTextAtCursor('@j');

			expect(rte.getLoadingIndicator()).not.toBeNull();
			expect(rte.isSuggestPopoverOpen()).toBe(false);

			resolveLoad!(mockSuggestions);
			await elementUpdated(rte.element);

			expect(rte.getLoadingIndicator()).toBeNull();
			expect(rte.isSuggestPopoverOpen()).toBe(true);
		});

		it('should show suggestions after loading completes', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => mockSuggestions,
					select: () => [],
				}),
				[p('Hello ')]
			);

			await rte.typeTextAtCursor('@j');

			const items = rte.getSuggestItems();
			expect(items).toHaveLength(3);
			expect(items[0].text).toBe('john');
			expect(items[0].textSecondary).toBe('John Doe');
			expect(items[1].text).toBe('jane');
			expect(items[2].text).toBe('bob');
		});

		it('should show empty state when no suggestions returned', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => [],
					select: () => [],
				})
			);

			await rte.typeTextAtCursor('@xyz');

			expect(rte.getSuggestItems()).toHaveLength(0);
			expect(rte.getEmptyState()!.textContent).toBe('No results');
		});

		it('should allow customizing empty state with dynamic slot suggestions-empty', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => [],
					select: () => [],
				})
			);

			await rte.typeTextAtCursor('@xyz');

			expect(rte.slottableRequests).toEqual([
				{
					data: {
						id: 'mention',
					},
					name: 'suggestions-empty-state',
					slotName: 'mention-suggestions-empty',
				},
			]);

			rte.keydown('Escape');

			expect(rte.slottableRequests).toEqual([]);

			await rte.typeTextAtCursor('@xyz');
			rte.element.remove();

			expect(rte.slottableRequests).toEqual([]);
		});

		it('should ignore stale results from slow async loads', async () => {
			const resolvers: Array<(suggestions: Suggestion[]) => void> = [];

			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () =>
						new Promise<Suggestion[]>((resolve) => {
							resolvers.push(resolve);
						}),
					select: () => [],
				}),
				[p('Hello ')]
			);

			await rte.typeTextAtCursor('@');
			await rte.typeTextAtCursor('j');

			expect(resolvers).toHaveLength(2);

			resolvers[0]([{ text: 'stale1' }]);
			await elementUpdated(rte.element);

			expect(rte.getLoadingIndicator()).not.toBeNull();
			expect(rte.isSuggestPopoverOpen()).toBe(false);

			resolvers[1]([{ text: 'fresh' }]);
			await elementUpdated(rte.element);

			expect(rte.getLoadingIndicator()).toBeNull();

			expect(rte.getSuggestItems().map((o) => o.text)).toEqual(['fresh']);
		});

		it('should keep previous suggestions visible while loading new ones', async () => {
			const resolvers: Array<(suggestions: Suggestion[]) => void> = [];

			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () =>
						new Promise<Suggestion[]>((resolve) => {
							resolvers.push(resolve);
						}),
					select: () => [],
				}),
				[p('Hello ')]
			);

			await rte.typeTextAtCursor('@');
			resolvers[0](mockSuggestions);
			await elementUpdated(rte.element);

			expect(rte.isSuggestPopoverOpen()).toBe(true);
			expect(rte.getSuggestItems()).toHaveLength(3);

			await rte.typeTextAtCursor('j');

			expect(rte.isSuggestPopoverOpen()).toBe(true);
			expect(rte.getSuggestItems()).toHaveLength(3);
			expect(rte.getLoadingIndicator()).not.toBeNull();

			resolvers[1]([{ text: 'john' }, { text: 'jane' }]);
			await elementUpdated(rte.element);

			expect(rte.getSuggestItems()).toHaveLength(2);
			expect(rte.getLoadingIndicator()).toBeNull();
		});
	});

	describe('popover visibility', () => {
		it('should show popover after suggestions are loaded', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => mockSuggestions,
					select: () => [],
				}),
				[p('Hello ')]
			);

			await rte.typeTextAtCursor('@');

			expect(rte.isSuggestPopoverOpen()).toBe(true);
		});

		it('should not show popover when cursor moves to existing match without input', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => mockSuggestions,
					select: () => [],
				}),
				[p('Hello @john world')]
			);

			rte.placeCursor('@john| world');
			await elementUpdated(rte.element);

			expect(rte.isSuggestPopoverOpen()).toBe(false);
		});

		it('should close popover when match is lost', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => mockSuggestions,
					select: () => [],
				}),
				[p('Hello ')]
			);

			await rte.typeTextAtCursor('@john');
			expect(rte.isSuggestPopoverOpen()).toBe(true);

			await rte.typeTextAtCursor(' ');
			expect(rte.isSuggestPopoverOpen()).toBe(false);
		});

		it('should not show popover when selection is not a cursor', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => mockSuggestions,
					select: () => [],
				}),
				[p('Hello @john')]
			);

			rte.selectText('[@john|]');
			await elementUpdated(rte.element);
			expect(rte.isSuggestPopoverOpen()).toBe(false);
		});
	});

	describe('keyboard navigation', () => {
		it('should show visible focus when interacting with the popover by keyboard', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => mockSuggestions,
					select: () => [],
				})
			);

			await rte.typeTextAtCursor('@j');
			await elementUpdated(rte.element);
			expect(rte.getSelectedItem()?.text).toBe('john');

			rte.keydown('ArrowDown');
			await elementUpdated(rte.element);
			expect(rte.getSelectedItem()?.text).toBe('john');
			expect(rte.isSelectedItemVisuallyFocused()).toBe(true);

			await rte.typeTextAtCursor('o');
			await elementUpdated(rte.element);
			expect(rte.getSelectedItem()?.text).toBe('john');
			expect(rte.isSelectedItemVisuallyFocused()).toBe(false);
		});

		it('should navigate between items with arrow keys', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => mockSuggestions,
					select: () => [],
				}),
				[p('Hello ')]
			);
			await rte.typeTextAtCursor('@j');
			rte.keydown('ArrowDown');

			rte.keydown('ArrowDown');

			expect(rte.getSelectedItem()?.text).toBe('jane');

			rte.keydown('ArrowDown');

			expect(rte.getSelectedItem()?.text).toBe('bob');

			rte.keydown('ArrowDown');

			expect(rte.getSelectedItem()?.text).toBe('bob');

			rte.keydown('ArrowUp');

			expect(rte.getSelectedItem()?.text).toBe('jane');

			rte.keydown('ArrowUp');

			expect(rte.getSelectedItem()?.text).toBe('john');

			rte.keydown('ArrowUp');

			expect(rte.getSelectedItem()?.text).toBe('john');
		});

		it('should insert selected suggestion with Enter', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => mockSuggestions,
					select: (s: Suggestion) => [
						{ type: 'mention', attrs: { value: s.text } },
					],
				})
			);
			await rte.typeTextAtCursor('@j');
			rte.keydown('ArrowDown');
			rte.keydown('ArrowDown'); // Select jane

			rte.keydown('Enter');

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph(mention[value="jane"]())"`
			);
			expect(rte.isSuggestPopoverOpen()).toBe(false);
		});

		it('should dismiss popover with Escape', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => mockSuggestions,
					select: () => [],
				})
			);

			await rte.typeTextAtCursor('@john');
			expect(rte.isSuggestPopoverOpen()).toBe(true);

			rte.keydown('Escape');
			await elementUpdated(rte.element);

			expect(rte.isSuggestPopoverOpen()).toBe(false);
			expect(rte.docStr()).toContain('@john');
		});

		it('should keep popover closed after Escape until match is lost', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => mockSuggestions,
					select: () => [],
				})
			);
			await rte.typeTextAtCursor('@john');

			rte.keydown('Escape');

			expect(rte.isSuggestPopoverOpen()).toBe(false);

			await rte.typeTextAtCursor('doe');
			expect(rte.isSuggestPopoverOpen()).toBe(false);

			// Start new match
			await rte.typeTextAtCursor(' @jane');

			expect(rte.isSuggestPopoverOpen()).toBe(true);
		});

		it('should use default Enter handling when there are no results', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => [],
					select: () => [],
				})
			);

			await rte.typeTextAtCursor('@xyz');
			rte.keydown('Enter');
			await elementUpdated(rte.element);

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('@xyz'), paragraph(|)"`
			);
		});

		it('should use default keyboard handling handling when the popup is not open', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => [],
					select: () => [],
				})
			);
			await rte.typeTextAtCursor('@xyz');
			rte.keydown('Escape'); // Dismiss

			rte.keydown('Escape');
			rte.keydown('ArrowDown');
			rte.keydown('ArrowUp');

			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('@xyz|')"`);
		});
	});

	describe('suggestion selection', () => {
		it('should replace match text with selected suggestion on click', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => mockSuggestions,
					select: (s: Suggestion) => [
						{ type: 'mention', attrs: { value: s.text } },
					],
				})
			);
			await rte.typeTextAtCursor('@jo');

			const items = rte.getSuggestItems();
			items[1].click(); // Click jane

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph(mention[value="jane"]())"`
			);
		});

		it('should make suggestion acceptance a separate undo step', async () => {
			const rte = await setup(
				featuresWithSuggest({
					pattern: /@(\w*)$/,
					load: () => mockSuggestions,
					select: (s: Suggestion) => [
						{ type: 'mention', attrs: { value: s.text } },
					],
				})
			);

			await rte.typeTextAtCursor('@john');
			rte.keydown('Enter');

			rte.undo();
			await elementUpdated(rte.element);

			expect(rte.isSuggestPopoverOpen()).toBe(true);
			expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('@john|')"`);
		});
	});
});
