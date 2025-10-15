import {
	type AddViewBehaviorFactory,
	type Binding,
	type BindingDirective,
	type CaptureType,
	ExecutionContext,
	type Expression,
	type ExpressionObserver,
	HTMLDirective,
	Markup,
	normalizeBinding,
	type Subscriber,
	type SyntheticView,
	type ViewBehavior,
	type ViewBehaviorFactory,
	type ViewController,
	type ViewTemplate,
} from '@microsoft/fast-element';
import type { VividElement } from '../foundation/vivid-element/vivid-element';

export class RenderInLightDomBehaviour<TSource extends VividElement>
	implements ViewBehavior, Subscriber
{
	private source: TSource | null = null;
	private view?: SyntheticView;
	private insertionPoint?: Node;
	private templateBindingObserver: ExpressionObserver<TSource, ViewTemplate>;
	private context?: ExecutionContext;
	private controller?: ViewController;

	constructor(directive: RenderInLightDomDirective<TSource>) {
		this.templateBindingObserver = directive.templateBinding.createObserver(
			this,
			directive as any
		);
	}

	bind(controller: ViewController): void {
		this.source = controller.source as TSource;
		this.context = controller.context;
		this.controller = controller;

		if (!this.insertionPoint) {
			this.insertionPoint = document.createComment('');
			this.source.appendChild(this.insertionPoint);
		}

		this.templateBindingObserver.bind(controller);
		this.handleChange(this.source, this.templateBindingObserver);
	}

	// unbind(): void {
	// 	this.source = null;

	// 	if (this.view) {
	// 		this.view.unbind();
	// 	}
	// 	// The observer will be automatically cleaned up when the behavior is destroyed
	// }

	/**
	 * Handles change of the template itself.
	 */
	handleChange(source: any, args: any): void {
		// Check if this is a template change notification
		if (args === this.templateBindingObserver) {
			const template = this.templateBindingObserver.bind(this.controller!);
			this.instantiateTemplate(template);
		}
	}

	private instantiateTemplate(template: ViewTemplate): void {
		if (this.view) {
			this.view.dispose();
		}

		this.view = template!.create();
		this.view.bind(this.source!, this.context!);
		this.view.insertBefore(this.insertionPoint!);
	}
}

export class RenderInLightDomDirective<TSource extends VividElement>
	implements HTMLDirective, ViewBehaviorFactory, BindingDirective
{
	readonly templateBinding: Binding<TSource, ViewTemplate>;
	readonly dataBinding: Binding<TSource, ViewTemplate>;
	/**
	 * The structural id of the DOM node to which the created behavior will apply.
	 */
	targetNodeId: string = '';

	constructor(templateBinding: Binding<TSource, ViewTemplate>) {
		this.templateBinding = templateBinding;
		this.dataBinding = templateBinding; // For BindingDirective compatibility
	}

	createHTML(add: AddViewBehaviorFactory): string {
		return Markup.comment(add(this));
	}

	createBehavior(): RenderInLightDomBehaviour<TSource> {
		return new RenderInLightDomBehaviour<TSource>(this);
	}
}

HTMLDirective.define(RenderInLightDomDirective);

/**
 * Directive to render a template into the light DOM of the host element.
 */
export function renderInLightDOM<
	TSource extends VividElement = VividElement,
	TParent = any
>(
	templateOrTemplateBinding:
		| ViewTemplate<any, TSource>
		| Expression<TSource, ViewTemplate<any, TSource>, TParent>
		| Binding<TSource, ViewTemplate<any, TSource>, TParent>
): CaptureType<TSource, TParent> {
	const templateBinding = normalizeBinding(templateOrTemplateBinding);
	return new RenderInLightDomDirective<TSource>(templateBinding);
}
