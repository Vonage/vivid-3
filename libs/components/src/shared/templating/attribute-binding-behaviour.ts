import {
	type Binding,
	DOM,
	type ExecutionContext,
	type ExpressionNotifier,
	Observable,
	type Subscriber,
	type ViewBehavior,
	type ViewController,
} from '@microsoft/fast-element';

/**
 * Binds a binding to an attribute of the target element.
 */
export class AttributeBindingBehavior implements ViewBehavior, Subscriber {
	constructor(
		private target: HTMLElement,
		private binding: Binding,
		private isBindingVolatile: boolean,
		private attributeName: string
	) {}

	private source: unknown | null = null;
	private context: ExecutionContext | null = null;
	private bindingObserver?: ExpressionNotifier;

	bind(controller: ViewController) {
		this.source = controller.source;
		this.context = controller.context;

		if (!this.bindingObserver) {
			this.bindingObserver = Observable.binding(
				this.binding.evaluate,
				this,
				this.isBindingVolatile
			);
		}

		this.bindingObserver.observe(this.source, this.context);
		this.updateTarget(this.bindingObserver.observe(this.source, this.context));
	}

	// unbind() {
	// 	this.bindingObserver!.dispose();
	// 	this.source = null;
	// 	this.context = null;
	// }

	handleChange() {
		this.updateTarget(
			this.bindingObserver!.observe(this.source, this.context!)
		);
	}

	updateTarget(value: unknown) {
		DOM.setAttribute(this.target, this.attributeName, value);
	}
}
