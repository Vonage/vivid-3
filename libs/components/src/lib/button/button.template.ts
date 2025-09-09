import { html, ref, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { ProgressRing } from '../progress-ring/progress-ring';
import { Size } from '../enums';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import { chevronTemplateFactory } from '../../shared/patterns/chevron';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { Button, ButtonSize } from './button';

const getClasses = ({
	connotation,
	appearance,
	shape,
	iconTrailing,
	icon,
	label,
	disabled,
	pending,
	stacked,
	size,
	iconSlottedContent,
	ariaExpanded,
	active,
	dropdownIndicator,
}: Button) =>
	classNames(
		'control',
		[`connotation-${connotation}`, Boolean(connotation)],
		[`appearance-${appearance}`, Boolean(appearance)],
		['disabled', disabled || pending],
		[`shape-${shape}`, Boolean(shape)],
		[`size-${size}`, Boolean(size)],
		[
			'icon-only',
			!label && !!(icon || iconSlottedContent?.length) && !dropdownIndicator,
		],
		['icon-trailing', iconTrailing],
		['stacked', Boolean(stacked)],
		['active', ariaExpanded === 'true' || active]
	);

function renderIconOrPending(
	context: VividElementDefinitionContext,
	icon: string | undefined,
	pending: boolean,
	size: ButtonSize | undefined = Size.Normal
) {
	if (pending && size != Size.SuperCondensed) {
		const progressTag = context.tagFor(ProgressRing);
		const progressSize = {
			[Size.Condensed]: '-6',
			[Size.Normal]: '-5',
			[Size.Expanded]: '-4',
		};

		const getClassName = (x: Button) => {
			const slottedIconElement = x.querySelector('[slot="icon"]');

			return classNames('icon', 'pending', [
				'pending-no-icon',
				!(icon || slottedIconElement),
			]);
		};

		return html`<span class="${getClassName}" aria-hidden="true"><${progressTag} size="${progressSize[size]}"></${progressTag}></span>`;
	} else {
		const affixIconTemplate = affixIconTemplateFactory(context);
		return affixIconTemplate(icon, IconWrapper.Slot);
	}
}

const getButtonType = (type: string): string => {
	const types = ['submit', 'button', 'reset'];
	if (types.indexOf(type) > -1) return type;
	return 'submit';
};

const buttonContent = (context: VividElementDefinitionContext) => {
	const chevronTemplate = chevronTemplateFactory(context);
	return html<Button>`<span class="content">
			${(x) => renderIconOrPending(context, x.icon, x.pending, x.size)}
			${when(
				(x) => x.label,
				html`<span class="text" aria-hidden="true">${(x) => x.label}</span>`
			)}
			<span class="sr-only"
				>${(x) =>
					x.pending
						? x.locale.button.pendingLabel
						: x.ariaLabel ?? x.label}</span
			>
		</span>
		${when((x) => x.dropdownIndicator, chevronTemplate)}`;
};

function renderButtonContent(context: VividElementDefinitionContext) {
	return html` <button
		class="${getClasses}"
		?autofocus="${(x) => x.autofocus}"
		form="${(x) => x.formId}"
		formaction="${(x) => x.formaction}"
		formenctype="${(x) => x.formenctype}"
		formmethod="${(x) => x.formmethod}"
		formnovalidate="${(x) => x.formnovalidate}"
		formtarget="${(x) => x.formtarget}"
		name="${(x) => x.name}"
		type="${(x) => getButtonType(x.type)}"
		value="${(x) => x.value}"
		title="${(x) => x.title}"
		${delegateAria({
			ariaLabel: null,
			ariaDisabled: (x) => x.disabled || x.pending,
		})}
		${ref('control')}
		@click="${(x, c) => x.clickHandler(c.event)}"
	>
		${buttonContent(context)}
	</button>`;
}

function renderAnchorContent(context: VividElementDefinitionContext) {
	return html<Button>`${(x) =>
		x._renderLinkElement(buttonContent(context), getClasses, {
			ariaLabel: null,
		})}`;
}

export const buttonTemplate = (context: VividElementDefinitionContext) => {
	return html` <template>
		${when((x) => !x.href, html<Button>`${renderButtonContent(context)}`)}
		${when((x) => x.href, renderAnchorContent(context))}
	</template>`;
};
