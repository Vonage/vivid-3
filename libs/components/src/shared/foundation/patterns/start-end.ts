import { html, ref } from '@microsoft/fast-element';
import type {
	SyntheticViewTemplate,
	ViewTemplate,
} from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
/**
 * Start configuration options
 * @public
 */
export type StartOptions = {
	start?: string | SyntheticViewTemplate;
};

/**
 * End configuration options
 * @public
 */
export type EndOptions = {
	end?: string | SyntheticViewTemplate;
};

/**
 * Start/End configuration options
 * @public
 */
export type StartEndOptions = StartOptions & EndOptions;

/**
 * A mixin class implementing start and end elements.
 * These are generally used to decorate text elements with icons or other visual indicators.
 * @public
 */
export class StartEnd {
	/* eslint-disable @typescript-eslint/explicit-member-accessibility */
	// @ts-expect-error Type is incorrectly non-optional
	public start: HTMLSlotElement;
	// @ts-expect-error Type is incorrectly non-optional
	public startContainer: HTMLSpanElement;
	public handleStartContentChange(): void {
		this.startContainer.classList.toggle(
			'start',
			this.start.assignedNodes().length > 0
		);
	}
	// @ts-expect-error Type is incorrectly non-optional
	public end: HTMLSlotElement;
	// @ts-expect-error Type is incorrectly non-optional
	public endContainer: HTMLSpanElement;
	public handleEndContentChange(): void {
		this.endContainer.classList.toggle(
			'end',
			this.end.assignedNodes().length > 0
		);
	}
	/* eslint-enable */
}

/**
 * The template for the end element.
 * For use with {@link StartEnd}
 *
 * @public
 */
export const endSlotTemplate: (
	context: ElementDefinitionContext,
	definition: EndOptions
) => ViewTemplate<StartEnd> = (
	_context: ElementDefinitionContext,
	definition: EndOptions
) => html`
	<span
		part="end"
		${ref('endContainer')}
		class=${() => (definition.end ? 'end' : void 0)}
	>
		<slot
			name="end"
			${ref('end')}
			@slotchange="${(x) => x.handleEndContentChange()}"
		>
			${definition.end || ''}
		</slot>
	</span>
`;

/**
 * The template for the start element.
 * For use with {@link StartEnd}
 *
 * @public
 */
export const startSlotTemplate: (
	context: ElementDefinitionContext,
	definition: StartOptions
) => ViewTemplate<StartEnd> = (
	_context: ElementDefinitionContext,
	definition: StartOptions
) => html`
	<span
		part="start"
		${ref('startContainer')}
		class="${() => (definition.start ? 'start' : void 0)}"
	>
		<slot
			name="start"
			${ref('start')}
			@slotchange="${(x) => x.handleStartContentChange()}"
		>
			${definition.start || ''}
		</slot>
	</span>
`;

/**
 * The template for the end element.
 * For use with {@link StartEnd}
 *
 * @public
 * @deprecated - use endSlotTemplate
 */
export const endTemplate: ViewTemplate<StartEnd> = html`
	<span part="end" ${ref('endContainer')}>
		<slot
			name="end"
			${ref('end')}
			@slotchange="${(x) => x.handleEndContentChange()}"
		></slot>
	</span>
`;

/**
 * The template for the start element.
 * For use with {@link StartEnd}
 *
 * @public
 * @deprecated - use startSlotTemplate
 */
export const startTemplate: ViewTemplate<StartEnd> = html`
	<span part="start" ${ref('startContainer')}>
		<slot
			name="start"
			${ref('start')}
			@slotchange="${(x) => x.handleStartContentChange()}"
		></slot>
	</span>
`;