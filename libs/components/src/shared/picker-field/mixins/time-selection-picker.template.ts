import { html, ref } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../design-system/defineVividComponent';
import { InlineTimePicker } from './inline-time-picker/inline-time-picker';
import type { TimeSelectionPickerElement } from './time-selection-picker';

export const TimeSelectionPickerTemplate = (
	context: VividElementDefinitionContext,
	numOptionsVisible: number
) => {
	const inlineTimePickerTag = context.tagFor(InlineTimePicker);

	return html<TimeSelectionPickerElement>`
		<${inlineTimePickerTag}
			id='inline-time-picker'
			${ref('_inlineTimePickerEl')}
			style="--_inline-time-picker-num-options-visible: ${() => numOptionsVisible}"
			tabindex='1'
			:value='${(x) => x._timeValue || undefined}'
			:clock='${(x) => (x._use12hClock ? '12h' : '24h')}'
			:min='${(x) => x._resolvedMinTime || undefined}'
			:max='${(x) => x._resolvedMaxTime || undefined}'
			:minutesStep='${(x) => x.minutesStep ?? 1}'
			:secondsStep='${(x) => x.secondsStep ?? undefined}'
			@change='${(x, c) =>
				x._onInlineTimePickerChange(c.event as CustomEvent<string>)}'
			@last-column-selected='${(x) => x._onInlineTimePickerLastColumnSelected()}'
		>
		</${inlineTimePickerTag}>
	`;
};
