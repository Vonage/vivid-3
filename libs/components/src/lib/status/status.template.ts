import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { Connotation } from '../enums';
import type { Status } from './status';

const DEFAULT_ICON_BY_CONNOTATION: Partial<Record<string, string>> = {
	[Connotation.Success]: 'check-circle-solid',
	[Connotation.Information]: 'info-solid',
	[Connotation.Warning]: 'warning-solid',
	[Connotation.Alert]: 'error-solid',
};

const getClasses = ({ connotation }: Status) =>
	classNames('base', connotation ? `connotation-${connotation}` : '');

function getEffectiveIcon(status: Status): string | undefined {
	if (status.icon) {
		return status.icon;
	}
	return status.connotation
		? DEFAULT_ICON_BY_CONNOTATION[status.connotation]
		: undefined;
}

function getHeaderTemplate() {
	return html<Status>`<div class="headline">${(x) => x.status}</div>`;
}

export const StatusTemplate = (context: VividElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<Status>`
		<div class="${getClasses}">
			${(x) => affixIconTemplate(getEffectiveIcon(x), IconWrapper.Slot)}
			<div class="text">
				${when((x) => x.status, getHeaderTemplate())}
				<div class="description">
					<slot></slot>
				</div>
			</div>
		</div>
	`;
};
