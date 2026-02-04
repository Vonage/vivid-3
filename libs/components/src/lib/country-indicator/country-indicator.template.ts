import { html, when } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { Icon } from '../icon/icon';
import type { CountryIndicator } from './country-indicator';

export const CountryIndicatorTemplate = (
	context: VividElementDefinitionContext
) => {
	const iconTag = context.tagFor(Icon);
	return html<CountryIndicator>`
		<div class="base">
			<slot name="icon" class="icon">
				${when(
					(x) => x.flagIconName,
					html<CountryIndicator>`<${iconTag}
						size="-4"
						name="${(x) => x.flagIconName!}"
						aria-hidden="true"
					></${iconTag}>`
				)}
			</slot>
			${when(
				(x) => x.displayText,
				html<CountryIndicator>`<span class="text"
					>${(x) => x.displayText!}</span
				>`
			)}
		</div>
	`;
};
