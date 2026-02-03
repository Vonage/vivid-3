import { Fragment } from 'prosemirror-model';
import {
	type EditorState,
	Plugin,
	PluginKey,
	TextSelection,
} from 'prosemirror-state';
import { Decoration, DecorationSet, type EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { closeHistory } from 'prosemirror-history';
import {
	contributionPriority,
	featureFacade,
	type PluginContribution,
	RteFeatureImpl,
	type StyleContribution,
} from '../feature';
import type { RteInstanceImpl } from '../instance';
import type { RteFragment } from '../document';
import { Popover } from '../../popover';
import { createDiv, UiCtx } from '../utils/ui';
import { ListboxOption } from '../../../option/option';
import { ProgressRing } from '../../../progress-ring/progress-ring';
import { textBeforeCursor } from '../utils/text-before-cursor';
import suggestCss from './suggest.style.scss?inline';

export interface Suggestion {
	text: string;
	textSecondary?: string;
	/**
	 * Optional user data associated with the suggestion.
	 */
	data?: unknown;
}

export interface RteSuggestFeatureOptions {
	/**
	 * A regex to match against text before the cursor. The regex should end with $ to match at cursor position.
	 */
	pattern: RegExp;
	/**
	 * Called when pattern matches. The returned suggestions are displayed in a popover.
	 * If Promise, shows a loading indicator while pending.
	 */
	load: (match: string[]) => Suggestion[] | Promise<Suggestion[]>;
	/**
	 * Called when a suggestion is selected. The matched text is replaced by the returned RteFragment.
	 */
	select: (suggestion: Suggestion) => RteFragment;
}

type Match = {
	text: string;
	groups: string[];
	start: number;
	end: number;
};

type SuggestState = MatchedState | null;

type MatchedState = {
	match: Match;
	suggestions?: LoadedSuggestions;
	dismissed?: boolean;
	loadingDecoration: DecorationSet;
};

type LoadedSuggestions = {
	/// When the suggestions were loaded
	generation: number;
	/// The suggestions currently displayed in the popover
	items: Suggestion[];
	/// The currently selected suggestion index
	selectedIndex: number;
	/// Whether the user is currently interacting with the suggestions by keyboard
	visibleFocus: boolean;
};

const isPopoverOpen = (state: SuggestState) =>
	Boolean(state?.suggestions && !state.dismissed);
const popoverShowsResults = (state: SuggestState) =>
	isPopoverOpen(state) && state!.suggestions!.items.length > 0;

type PluginAction =
	| {
			type: 'load';
			generation: number;
			suggestions: Suggestion[];
	  }
	| { type: 'navigate'; action: 'up' | 'down' }
	| { type: 'dismiss' };

function findMatch(state: EditorState, regex: RegExp): Match | null {
	const { $cursor } = state.selection as TextSelection;
	if (!$cursor) return null;

	const textBefore = textBeforeCursor($cursor);

	const match = regex.exec(textBefore);
	if (!match) return null;

	// Calculate absolute positions
	const blockStart = $cursor.pos - $cursor.parentOffset;
	return {
		text: match[0],
		groups: [...match],
		start: blockStart + match.index,
		end: blockStart + match.index + match[0].length,
	};
}

const replaceMatch = (
	view: EditorView,
	match: Match,
	fragment: RteFragment
) => {
	const { state } = view;

	// Close history so the replacement is a separate undo step
	view.dispatch(closeHistory(state.tr));

	const tr = view.state.tr;

	tr.replaceWith(
		match.start,
		match.end,
		Fragment.fromJSON(view.state.schema, fragment)
	);

	// Place cursor after inserted content
	const newPos = tr.mapping.map(match.end);
	tr.setSelection(TextSelection.create(tr.doc, newPos));

	view.dispatch(tr.scrollIntoView());
};

class RteSuggestFeatureImpl extends RteFeatureImpl {
	name: string;

	protected pluginKey = new PluginKey<SuggestState>('suggest');

	protected selectSuggestion(
		view: EditorView,
		suggestState: MatchedState,
		suggestion: Suggestion
	) {
		const fragment = this.options.select(suggestion);
		replaceMatch(view, suggestState.match, fragment);
		view.focus();
	}

	protected loadGeneration = 0;

	protected async startLoadingSuggestions(
		match: string[],
		dispatch: (action: PluginAction) => void
	) {
		const gen = ++this.loadGeneration;
		const suggestions = await this.options.load(match);

		if (gen !== this.loadGeneration) {
			return; // Ignore outdated generation
		}
		dispatch({
			type: 'load',
			generation: gen,
			suggestions,
		});
	}

	constructor(
		override featureId: string,
		protected readonly options: RteSuggestFeatureOptions
	) {
		super();
		this.name = `RteSuggestFeature[${featureId}]`;
	}

	override getStyles(): StyleContribution[] {
		return [this.contribution(suggestCss)];
	}

	override getPlugins(rte: RteInstanceImpl): PluginContribution[] {
		const createSuggestActionTr = (action: PluginAction) =>
			rte.state.tr.setMeta(this.pluginKey, action);

		const dispatchSuggestAction = (action: PluginAction) =>
			rte.dispatchTransaction(createSuggestActionTr(action));

		const suggestPlugin = new Plugin<SuggestState>({
			key: this.pluginKey,
			state: {
				init: (): SuggestState => null,
				apply: (tr, prevState, _prevEditor, newEditor): SuggestState => {
					const match = findMatch(newEditor, this.options.pattern);
					if (!match) {
						return null;
					}

					// Do not go from no match to match without input
					if (!prevState && !tr.docChanged) {
						return null;
					}

					// Do not reopen once dismissed
					if (prevState?.dismissed) {
						return prevState;
					}

					const loadingDecoration = (isLoading: boolean) => {
						if (!isLoading) {
							return DecorationSet.empty;
						}

						const hasLoadingDeco = Boolean(
							prevState?.loadingDecoration.find().length ?? 0
						);
						return hasLoadingDeco
							? prevState!.loadingDecoration.map(tr.mapping, tr.doc)
							: DecorationSet.create(tr.doc, [
									Decoration.widget(
										match.end,
										() => {
											const wrapper = document.createElement('span');
											wrapper.className = 'suggest-loading-widget';
											const spinner = rte.createComponent(ProgressRing);
											spinner.size = -6;
											wrapper.appendChild(spinner);
											return wrapper;
										},
										{
											ignoreSelection: true,
											side: 1, // Insert after cursor
										}
									),
							  ]);
					};

					// Handle actions
					const action = tr.getMeta(this.pluginKey) as PluginAction | undefined;
					if (prevState && action) {
						switch (action.type) {
							case 'load':
								return {
									...prevState,
									suggestions: {
										generation: action.generation,
										items: action.suggestions,
										selectedIndex: 0,
										visibleFocus: false,
									},
									loadingDecoration: loadingDecoration(false),
								};
							case 'navigate': {
								/* v8 ignore next 3 -- defensive: navigate is only dispatched after results are loaded @preserve */
								if (!prevState.suggestions?.items.length) {
									return prevState;
								}
								if (!prevState.suggestions.visibleFocus) {
									return {
										...prevState,
										suggestions: {
											...prevState.suggestions,
											visibleFocus: true,
										},
									};
								}
								const newIndex = Math.max(
									0,
									Math.min(
										prevState.suggestions.items.length - 1,
										prevState.suggestions.selectedIndex +
											(action.action === 'up' ? -1 : 1)
									)
								);
								return {
									...prevState,
									suggestions: {
										...prevState.suggestions,
										selectedIndex: newIndex,
									},
								};
							}
							case 'dismiss':
								return {
									...prevState,
									dismissed: true,
									loadingDecoration: DecorationSet.empty,
								};
						}
					}

					// No match -> match
					if (!prevState) {
						this.startLoadingSuggestions(match.groups, dispatchSuggestAction);
						return {
							match,
							loadingDecoration: loadingDecoration(true),
						};
					}

					// Match -> match
					const matchChanged = match.groups[0] !== prevState.match.groups[0];
					if (matchChanged) {
						this.startLoadingSuggestions(match.groups, dispatchSuggestAction);
					}
					return {
						...prevState,
						match: match,
						suggestions: prevState.suggestions
							? { ...prevState.suggestions, visibleFocus: false }
							: undefined,
						loadingDecoration: loadingDecoration(matchChanged),
					};
				},
			},
			props: {
				decorations: (state) => {
					const suggestState = this.pluginKey.getState(state);
					if (!suggestState) return null;

					// Inline decoration for popover anchor
					return suggestState.loadingDecoration.add(state.doc, [
						Decoration.inline(
							suggestState.match.start,
							suggestState.match.end,
							{
								id: `suggest-anchor-${this.featureId}`,
							}
						),
					]);
				},
			},
			view: (view) => {
				const ctx = new UiCtx(view, rte, { popupPlacement: 'bottom' });
				const popover = rte.createComponent(Popover);
				popover.anchorId = `suggest-anchor-${this.featureId}`;
				popover.kind = 'autocomplete';
				popover.offset = 4;

				const content = createDiv(ctx, {
					className: 'suggest-popover',
					children: [],
				});
				popover.appendChild(content);

				(view.dom.getRootNode() as ShadowRoot)
					.querySelector('.popovers')!
					.appendChild(popover);

				const updatePopoverContent = (suggestState: MatchedState) => {
					content.innerHTML = '';

					const suggestions = suggestState.suggestions!;

					if (suggestions.items.length === 0) {
						const emptySlot = document.createElement('slot');
						emptySlot.name = `${this.featureId}-suggestions-empty`;
						emptySlot.textContent =
							rte.getLocale().richTextEditor.suggestNoResults;
						content.appendChild(
							createDiv(ctx, {
								className: 'suggest-empty-message',
								children: [emptySlot],
							})
						);
						return;
					}

					for (const [index, suggestion] of suggestions.items.entries()) {
						const item = rte.createComponent(ListboxOption);
						item.text = suggestion.text;
						item.textSecondary = suggestion.textSecondary;

						if (index === suggestions.selectedIndex) {
							item._highlighted = true;
							item.dataset.highlighted = 'true';
							if (suggestions.visibleFocus) {
								item.classList.add('suggest-item--visible-focus');
							}
							queueMicrotask(() => {
								item.scrollIntoView({ block: 'nearest' });
							});
						}

						item.addEventListener('click', (e) => {
							e.preventDefault();
							e.stopPropagation();
							this.selectSuggestion(view, suggestState, suggestion);
						});

						content.appendChild(item);
					}
				};

				return {
					update: (view) => {
						ctx.updateBindings();

						const suggestState = this.pluginKey.getState(view.state)!;
						const showPopover = isPopoverOpen(suggestState);
						popover.requestOpenState(showPopover);
						if (showPopover) {
							updatePopoverContent(suggestState!);
						}
					},
					destroy: () => {
						popover.remove();
					},
				};
			},
		});

		return [
			this.contribution(suggestPlugin),
			this.contribution(
				keymap({
					ArrowUp: (state, dispatch) => {
						const suggestState = this.pluginKey.getState(state)!;
						if (!popoverShowsResults(suggestState)) {
							return false;
						}

						dispatch?.(
							createSuggestActionTr({
								type: 'navigate',
								action: 'up',
							})
						);
						return true;
					},
					ArrowDown: (state, dispatch) => {
						const suggestState = this.pluginKey.getState(state)!;
						if (!popoverShowsResults(suggestState)) {
							return false;
						}

						dispatch?.(
							createSuggestActionTr({
								type: 'navigate',
								action: 'down',
							})
						);
						return true;
					},
					Enter: (state, _dispatch, view) => {
						const suggestState = this.pluginKey.getState(state)!;
						if (!popoverShowsResults(suggestState)) {
							return false;
						}

						const suggestion =
							suggestState!.suggestions!.items[
								suggestState!.suggestions!.selectedIndex
							];
						/* v8 ignore next 3 -- defensive: view is always passed by keymap @preserve */
						if (view) {
							this.selectSuggestion(view, suggestState, suggestion);
						}
						return true;
					},
					Escape: (state, dispatch) => {
						const suggestState = this.pluginKey.getState(state)!;
						if (!isPopoverOpen(suggestState)) {
							return false;
						}

						dispatch?.(
							createSuggestActionTr({
								type: 'dismiss',
							})
						);
						return true;
					},
				}),
				// Higher priority to intercept before default handlers
				contributionPriority.high
			),
		];
	}
}

export const RteSuggestFeature = featureFacade(RteSuggestFeatureImpl);
