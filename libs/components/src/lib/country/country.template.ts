import { html, when } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { Icon } from '../icon/icon';
import type { Country } from './country';

export const CountryTemplate = (context: VividElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);
	return html<Country>`
		<div class="base">
			<slot name="icon" class="icon">
				${when(
					(x) => x.flagIconName,
					html<Country>`<${iconTag}
						size="-4"
						name="${(x) => x.flagIconName!}"
						aria-hidden="true"
					></${iconTag}>`
				)}
			</slot>
			${when(
				(x) => x.displayText,
				html<Country>`<span class="text">${(x) => x.displayText!}</span>`
			)}
		</div>
	`;
};
