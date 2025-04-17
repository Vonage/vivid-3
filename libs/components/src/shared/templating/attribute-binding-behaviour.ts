import {
	type Behavior,
	type Binding,
	type BindingObserver,
	DOM,
	type ExecutionContext,
	Observable,
	type Subscriber,
} from '@microsoft/fast-element';

/**
 * Binds a binding to an attribute of the target element.
 */
export class AttributeBindingBehavior implements Behavior, Subscriber {
	constructor(
		private target: HTMLElement,
		private binding: Binding,
		private isBindingVolatile: boolean,
		private attributeName: string
	) {}

	private source: unknown | null = null;
	private context: ExecutionContext | null = null;
	private bindingObserver?: BindingObserver;

	bind(source: unknown, context: ExecutionContext) {
		this.source = source;
		this.context = context;

		if (!this.bindingObserver) {
			this.bindingObserver = Observable.binding(
				this.binding,
				this,
				this.isBindingVolatile
			);
		}

		this.updateTarget(this.bindingObserver!.observe(source, context));
	}

	unbind() {
		this.bindingObserver!.disconnect();
		this.source = null;
		this.context = null;
	}

	handleChange() {
		this.updateTarget(
			this.bindingObserver!.observe(this.source, this.context!)
		);
	}

	updateTarget(value: unknown) {
		DOM.setAttribute(this.target, this.attributeName, value);
	}
}
