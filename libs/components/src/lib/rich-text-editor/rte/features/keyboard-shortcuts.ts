import { type Command } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import {
	contributionPriority,
	featureFacade,
	type PluginContribution,
	RteFeatureImpl,
} from '../feature';
import type { RteInstanceImpl } from '../instance';

/**
 * A keyboard shortcut handler. Return `true` to consume the key (prevent default behavior), `false` to let other handlers run.
 * You can use a no-arg function to only prevent default: `() => true`.
 */
export type KeyboardShortcutHandler = Command | (() => boolean);

export interface RteKeyboardShortcutsFeatureOptions {
	/**
	 * Map of key bindings to handlers.
	 * Keys use ProseMirror key names, e.g. `"Enter"`, `"Shift-Enter"`, `"Mod-b"` (Ctrl/Cmd + b), `"Backspace"`.
	 * Return `true` from a handler to consume the key (prevent default); `false` to allow other features to handle it.
	 */
	shortcuts: Record<string, KeyboardShortcutHandler>;
}

function toCommand(handler: KeyboardShortcutHandler): Command {
	if (handler.length === 0) {
		return (_state, _dispatch) => (handler as () => boolean)();
	}
	return handler as Command;
}

export class RteKeyboardShortcutsFeatureImpl extends RteFeatureImpl {
	name: string;

	constructor(
		override featureId: string,
		protected readonly options: RteKeyboardShortcutsFeatureOptions
	) {
		super();
		this.name = `RteKeyboardShortcutsFeature[${featureId}]`;
	}

	override getPlugins(_rte: RteInstanceImpl): PluginContribution[] {
		const bindings: Record<string, Command> = {};
		for (const [key, handler] of Object.entries(this.options.shortcuts)) {
			bindings[key] = toCommand(handler);
		}
		return [this.contribution(keymap(bindings), contributionPriority.high)];
	}
}

export const RteKeyboardShortcutsFeature = featureFacade(
	RteKeyboardShortcutsFeatureImpl
);
