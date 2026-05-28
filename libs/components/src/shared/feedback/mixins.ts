import { attr, html, observable, slotted } from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import type { VividElement } from '../foundation/vivid-element/vivid-element';
import type { VividElementDefinitionContext } from '../design-system/defineVividComponent';
import { renderInLightDOM } from '../templating/render-in-light-dom';
import { generateRandomId } from '../utils/randomId';
import { FeedbackMessage, type FeedbackType } from './feedback-message';

/**
 * Mixin for elements that display a feedback message.
 */
export const WithFeedback = <T extends Constructor<VividElement>>(Base: T) => {
	class ElementWithFeedback extends Base {
		/**
		 * Provides additional information to help the user enter the correct information.
		 * To add HTML to the helper text, use the helper-text slot instead.
		 *
		 * @public
		 * HTML Attribute: helper-text
		 */
		@attr({ attribute: 'helper-text' }) helperText?: string;

		/**
		 * @internal
		 */
		@observable _helperTextSlottedContent?: HTMLElement[];

		/**
		 * Ids of the feedback content that the control should use for aria-describedby.
		 *
		 * @internal
		 */
		get _feedbackDescribedBy() {
			// Uses describedby even for errors because errormessage still lacks SR support
			return 'feedback slotted-helper-text-feedback';
		}

		/**
		 * @internal
		 */
		_internalFeedback(): { type: FeedbackType; message: string } {
			const helperText = this._helperTextSlottedContent?.length
				? ''
				: this.helperText;

			// Component may or may not have these
			const errorText = (this as any).errorValidationMessage as
				| string
				| undefined;
			const successText = (this as any).successText as string | undefined;

			if (successText) return { type: 'success', message: successText };
			if (errorText) return { type: 'error', message: errorText };
			if (helperText) return { type: 'helper', message: helperText };
			return { type: 'none', message: '' };
		}

		/**
		 * @internal
		 */
		_slottedHelperTextFeedbackType() {
			const shouldShowSlottedHelperText =
				this._internalFeedback().type === 'none' &&
				this._helperTextSlottedContent?.length;

			return shouldShowSlottedHelperText ? 'helper' : 'none';
		}

		/**
		 * @internal
		 */
		_getFeedbackTemplate(ctx: VividElementDefinitionContext) {
			const feedbackTag = ctx.tagFor(FeedbackMessage);
			return html<ElementWithFeedback>`
				<${feedbackTag} id="feedback" :type="${(x) => x._internalFeedback().type}">
					${(x) => x._internalFeedback().message}
				</${feedbackTag}>
				<${feedbackTag}
					id="slotted-helper-text-feedback"
					:type="${(x) => x._slottedHelperTextFeedbackType()}"
				>
					<slot name="helper-text" ${slotted('_helperTextSlottedContent')}></slot>
				</${feedbackTag}>
			`;
		}
	}

	return ElementWithFeedback;
};

export type ElementWithFeedback = MixinType<typeof WithFeedback>;

/**
 * Like WithFeedback but renders the feedback message in light DOM.
 * This is needed if the control is in light DOM so that the describedby relation works.
 */
export const WithLightDOMFeedback = <T extends Constructor<VividElement>>(
	Base: T
) => {
	const randomFeedbackId = () => `vvd-feedback-${generateRandomId()}`;
	const randomSlottedContentId = () =>
		`vvd-slotted-feedback-${generateRandomId()}`;

	class ElementWithLightDOMFeedback extends WithFeedback(Base) {
		/**
		 * @internal
		 */
		@observable _slottedHelperTextIds: string[] = [];

		/**
		 * @internal
		 */
		_helperTextSlottedContentChanged(
			_: HTMLElement[],
			newContent: HTMLElement[]
		) {
			for (const el of newContent) {
				/* v8 ignore else -- @preserve */
				if (!el.id) {
					el.id = randomSlottedContentId();
				}
			}
			this._slottedHelperTextIds = newContent.map((el) => el.id);
		}

		/**
		 * @internal
		 */
		override get _feedbackDescribedBy() {
			return [this._feedbackId, ...this._slottedHelperTextIds].join(' ');
		}

		/**
		 * @internal
		 */
		_feedbackId = randomFeedbackId();

		/**
		 * @internal
		 */
		override _getFeedbackTemplate(ctx: VividElementDefinitionContext) {
			const feedbackTag = ctx.tagFor(FeedbackMessage);
			return html<ElementWithLightDOMFeedback>`
				<slot name="_feedback"></slot>
				${renderInLightDOM(html<ElementWithLightDOMFeedback>`<${feedbackTag}
					slot="_feedback"
					id="${(x) => x._feedbackId}"
					:type="${(x) => x._internalFeedback().type}"
				>
					${(x) => x._internalFeedback().message}
				</${feedbackTag}>`)}
				<${feedbackTag} :type="${(x) => x._slottedHelperTextFeedbackType()}">
					<slot
						name="helper-text"
						${slotted('_helperTextSlottedContent')}
					></slot>
				</${feedbackTag}>
			`;
		}
	}

	return ElementWithLightDOMFeedback;
};
