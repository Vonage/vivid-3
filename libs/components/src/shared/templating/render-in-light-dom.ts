import {
	type AddViewBehaviorFactory,
	type Binding,
	type CaptureType,
	ExecutionContext,
	type ExpressionNotifier,
	HTMLDirective,
	Markup,
	Observable,
	oneWay,
	type Subscriber,
	type SyntheticView,
	type SyntheticViewTemplate,
	type ViewBehavior,
	type ViewBehaviorFactory,
	type ViewController,
} from '@microsoft/fast-element';
import type { VividElement } from '../foundation/vivid-element/vivid-element';

export class RenderInLightDomBehaviour<TSource extends VividElement>
	implements ViewBehavior, Subscriber
{
	private source: TSource | null = null;
	private view?: SyntheticView;
	private insertionPoint?: Node;
	private templateBindingObserver: ExpressionNotifier<
		TSource,
		SyntheticViewTemplate
	>;
	private context?: ExecutionContext;

	constructor(
		templateBinding: Binding<TSource, SyntheticViewTemplate>,
		isTemplateBindingVolatile: boolean
	) {
		this.templateBindingObserver = Observable.binding(
			templateBinding.evaluate,
			this,
			isTemplateBindingVolatile
		);
	}

	bind(controller: ViewController): void {
		this.source = controller.source as TSource;
		this.context = controller.context;

		if (!this.insertionPoint) {
			this.insertionPoint = document.createComment('');
			this.source.appendChild(this.insertionPoint);
		}

		this.templateBindingObserver.observe(this.source, this.context);
		this.handleChange();
	}

	unbind(): void {
		this.source = null;

		this.view!.unbind();
		this.templateBindingObserver.dispose();
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

export class RenderInLightDomDirective<TSource extends VividElement>
	implements HTMLDirective, ViewBehaviorFactory
{
	createPlaceholder: (index: number) => string = (index: number) =>
		Markup.comment(`render-in-light-dom-${index}`);

	private readonly isTemplateBindingVolatile: boolean;
	constructor(
		readonly templateBinding: Binding<TSource, SyntheticViewTemplate>
	) {
		this.isTemplateBindingVolatile = Observable.isVolatileBinding(
			templateBinding.evaluate
		);
	}

	createHTML(add: AddViewBehaviorFactory): string {
		return this.createPlaceholder(0);
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
): CaptureType<TSource, any> {
	const templateBinding =
		typeof templateOrTemplateBinding === 'function'
			? oneWay(templateOrTemplateBinding)
			: oneWay(() => templateOrTemplateBinding);

	return new RenderInLightDomDirective<TSource>(templateBinding);
}
