import { html, repeat, slotted, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { KbdKey } from '../kbd-key/kbd-key';
import { KbdShortcut } from '../kbd-shortcut/kbd-shortcut';
import type { KbdShortcutText, ParsedChord } from './kbd-shortcut-text';

const getClasses = (_: KbdShortcutText) => classNames('base');

/**
 * The template for the KbdShortcutText component.
 *
 * @param context - element definition context
 * @public
 */
export const KbdShortcutTextTemplate: (
	context: VividElementDefinitionContext
) => ViewTemplate<KbdShortcutText> = (context) => {
	const kbdShortcutTag = context.tagFor(KbdShortcut);
	const kbdKeyTag = context.tagFor(KbdKey);

	return html<KbdShortcutText>`<span class="${getClasses}" role="group"
		><slot hidden ${slotted('_slottedNodes')}></slot
		><span class="keys"
			>${repeat(
				(x) => x._chords,
				html<ParsedChord>`${when(
					(x) => !x.isFirst,
					html`<span class="alt-separator">/</span>`
				)}<${kbdShortcutTag}>${repeat(
					(x) => x.keys,
					html`<${kbdKeyTag} name="${(x) => x}"></${kbdKeyTag}>`
				)}</${kbdShortcutTag}>`
			)}</span
		></span
	>`;
};
