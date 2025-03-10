import { html, ref } from '@microsoft/fast-element';
import type { VividFoundationButton } from './button';

export const buttonTemplate = html<VividFoundationButton>`
	<button
		class="control"
		part="control"
		?autofocus="${(x) => x.autofocus}"
		?disabled="${(x) => x.disabled}"
		form="${(x) => x.formId}"
		formaction="${(x) => x.formaction}"
		formenctype="${(x) => x.formenctype}"
		formmethod="${(x) => x.formmethod}"
		formnovalidate="${(x) => x.formnovalidate}"
		formtarget="${(x) => x.formtarget}"
		name="${(x) => x.name}"
		type="${(x) => x.type}"
		value="${(x) => x.value}"
		${ref('control')}
	>
		<span class="content" part="content">
			<slot></slot>
		</span>
	</button>
`;
