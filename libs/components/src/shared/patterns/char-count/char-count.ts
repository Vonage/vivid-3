import { attr, html, ref } from '@microsoft/fast-element';
import { VividElement } from '../../foundation/vivid-element/vivid-element';
import type { Constructor, MixinType } from '../../utils/mixins';
import { VisuallyHidden } from '../../../lib/visually-hidden/visually-hidden';
import type { VividElementDefinitionContext } from '../../design-system/defineVividComponent';
import { Localized } from '../localized';

/**
 * Mixin for elements that can display a character count
 */
export const WithCharCount = <T extends Constructor<VividElement>>(Base: T) => {
	class ElementWithCharCount extends Localized(Base) {
		value!: string;
		maxlength!: number;

		/**
		 * Use in combination with `maxlength` to display a character count.
		 * @public
		 * @remarks
		 * HTML Attribute: char-count
		 */
		@attr({
			attribute: 'char-count',
			mode: 'boolean',
		})
		charCount = false;

		/**
		 * A reference to the internal character count indicator,
		 * dedicated to the screen readers
		 * @internal
		 */
		charCountRemaining!: HTMLSpanElement;

		/**
		 * Timeout of the character count update,
		 * used to debounce screen reader announcements
		 * @internal
		 */
		#charCountTimeout: ReturnType<typeof setTimeout> | null = null;

		/**
		 * ID of the character count limit description
		 * @internal
		 */
		_charCountDescribedBy = 'char-count-description';

		/**
		 * @internal
		 */
		_renderCharCountRemaining = () => {
			if (!this.charCount || !this.maxlength) {
				return;
			}
			this.charCountRemaining.textContent =
				this.locale.charCount.charactersRemainingMessage(
					this.maxlength - this.value.length
				);
		};

		/**
		 * @internal
		 */
		_updateCharCountRemaining = () => {
			const delay = 1000;
			if (this.#charCountTimeout !== null) {
				clearTimeout(this.#charCountTimeout);
			}
			this.#charCountTimeout = setTimeout(
				() => this._renderCharCountRemaining(),
				delay
			);
		};

		/**
		 * @internal
		 */
		_getCharCountTemplate = (context: VividElementDefinitionContext) => {
			const visuallyHiddenTag = context.tagFor(VisuallyHidden);
			return html<ElementWithCharCount>`
				<div class="char-count">
					<span aria-hidden="true"
						> ${(x) => (x.value ? x.value.length : 0)} / ${(x) => x.maxlength}</span
					>
					<${visuallyHiddenTag} id="${(x) => x._charCountDescribedBy}"
						>${(x) =>
							x.locale.charCount.charactersLimitMessage(
								x.maxlength
							)}</${visuallyHiddenTag}
					>
					<${visuallyHiddenTag} id="char-count-remaining" aria-live="polite" ${ref(
				'charCountRemaining'
			)}
						></${visuallyHiddenTag}
					>
				</div>
			`;
		};
	}
	return ElementWithCharCount;
};

export type ElementWithCharCount = MixinType<typeof WithCharCount>;
