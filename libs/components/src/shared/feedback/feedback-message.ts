import { attr, html, ViewTemplate, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { iconDefinition } from '../../lib/icon/definition';
import { Icon } from '../../lib/icon/icon';
import { VisuallyHidden } from '../../lib/visually-hidden/visually-hidden';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import {
	defineVividComponent,
	type VividElementDefinitionContext,
} from '../design-system/defineVividComponent';
import { visuallyHiddenDefinition } from '../../lib/visually-hidden/definition';
import { Localized } from '../patterns';
import type { FeedbackMessageLocale } from './locale';
import styles from './feedback-message.scss?inline';

export type FeedbackType = 'none' | 'helper' | 'error' | 'success';

/**
 * Renders a feedback message of the given type. When type='none', nothing is rendered.
 */
export class FeedbackMessage extends Localized(VividElement) {
	// eslint-disable-next-line @nrwl/nx/workspace/no-attribute-default-value
	@attr type: FeedbackType = 'none';
}

function iconTemplate(
	context: VividElementDefinitionContext,
	icon: string,
	textI18nKey: keyof FeedbackMessageLocale
) {
	const iconTag = context.tagFor(Icon);
	const visuallyHiddenTag = context.tagFor(VisuallyHidden);

	return html`<${iconTag} class="icon" name="${icon}" aria-hidden="true"></${iconTag}><${visuallyHiddenTag}>${(
		x
	) => x.locale.feedbackMessage[textI18nKey]}</${visuallyHiddenTag}>`;
}

function iconForType(
	context: VividElementDefinitionContext
): ViewTemplate<FeedbackMessage> {
	const iconTemplateForType: Record<FeedbackType, ViewTemplate | ''> = {
		none: '',
		helper: '',
		error: iconTemplate(context, 'info-line', 'errorIconText'),
		success: iconTemplate(context, 'check-circle-line', 'successIconText'),
	};

	return html`${(x) => iconTemplateForType[x.type]}`;
}

const shouldAnnounce = (type: FeedbackType) => type === 'error';

const FeedbackMessageTemplate = (
	ctx: VividElementDefinitionContext
): ViewTemplate<FeedbackMessage> => {
	const message = html<FeedbackMessage>`<div
		class="${(x) => classNames('message', `${x.type}-message`)}"
	>
		${iconForType(ctx)}<slot></slot>
	</div>`;

	return html`${when((x) => !shouldAnnounce(x.type), message)}
		<span class="announcement" role="status" aria-live="polite">
			${when((x) => shouldAnnounce(x.type), message)}
		</span>`;
};

export const feedbackMessageDefinition = defineVividComponent(
	'feedback-message',
	FeedbackMessage,
	FeedbackMessageTemplate,
	[iconDefinition, visuallyHiddenDefinition],
	{
		styles,
	}
);
