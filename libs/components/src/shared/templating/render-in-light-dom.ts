import {
	type Behavior,
	type Binding,
	type BindingObserver,
	type CaptureType,
	DOM,
	ExecutionContext,
	HTMLDirective,
	Observable,
	type Subscriber,
	type SyntheticView,
	type SyntheticViewTemplate,
} from '@microsoft/fast-element';
import type { VividElement } from '../foundation/vivid-element/vivid-element';

export class RenderInLightDomBehaviour<TSource extends VividElement>
	implements Behavior, Subscriber
{
	private source: TSource | null = null;
	private view?: SyntheticView;
	private insertionPoint?: Node;
	private templateBindingObserver: BindingObserver<
		TSource,
		SyntheticViewTemplate
	>;
	private context?: ExecutionContext;

	constructor(
		templateBinding: Binding<TSource, SyntheticViewTemplate>,
		isTemplateBindingVolatile: boolean
	) {
		this.templateBindingObserver = Observable.binding(
			templateBinding,
			this,
			isTemplateBindingVolatile
		);
	}

	bind(source: TSource, context: ExecutionContext): void {
		this.source = source;
		this.context = context;

		if (!this.insertionPoint) {
			this.insertionPoint = document.createComment('');
			source.appendChild(this.insertionPoint);
		}

		this.handleChange();
	}

	unbind(): void {
		this.source = null;

		this.view!.unbind();
		this.templateBindingObserver.disconnect();
	}

	/**
	 * Handles change of the template itself.
	 */
	handleChange(): void {
		this.instantiateTemplate(
			this.templateBindingObserver.observe(this.source!, this.context!)
		);
	}

	private instantiateTemplate(template: SyntheticViewTemplate): void {
		if (this.view) {
			this.view.dispose();
		}

		this.view = template!.create();
		this.view.bind(this.source!, this.context!);
		this.view.insertBefore(this.insertionPoint!);
	}
}

export class RenderInLightDomDirective<
	TSource extends VividElement
> extends HTMLDirective {
	createPlaceholder: (index: number) => string = DOM.createBlockPlaceholder;

	private readonly isTemplateBindingVolatile: boolean;
	constructor(
		readonly templateBinding: Binding<TSource, SyntheticViewTemplate>
	) {
		super();
		this.isTemplateBindingVolatile =
			Observable.isVolatileBinding(templateBinding);
	}

	createBehavior(): RenderInLightDomBehaviour<TSource> {
		return new RenderInLightDomBehaviour<TSource>(
			this.templateBinding,
			this.isTemplateBindingVolatile
		);
	}
}

/**
 * Directive to render a template into the light DOM of the host element.
 */
export function renderInLightDOM<TSource extends VividElement>(
	templateOrTemplateBinding:
		| SyntheticViewTemplate
		| Binding<TSource, SyntheticViewTemplate>
): CaptureType<TSource> {
	const templateBinding =
		typeof templateOrTemplateBinding === 'function'
			? templateOrTemplateBinding
			: (): SyntheticViewTemplate => templateOrTemplateBinding;

	return new RenderInLightDomDirective<TSource>(templateBinding);
}
