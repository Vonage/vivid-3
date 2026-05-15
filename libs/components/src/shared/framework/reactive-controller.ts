/**
 * Reactive Controllers are a feature of Lit (https://lit.dev/docs/composition/controllers/)
 * This is an adaptation of them for FASTElement.
 */

import type { Constructor, MixinType } from '../utils/mixins';
import type { FASTElement } from '@microsoft/fast-element';

/**
 * A Reactive Controller is an object that enables subcomponent code
 * organization and reuse by aggregating the state, behavior, and lifecycle
 * hooks related to a single feature.
 *
 * Controllers are added to a host component, or other object that implements
 * the `ReactiveControllerHost` interface, via the `addController()` method.
 * They can hook their host component's lifecycle by implementing one or more
 * of the lifecycle callbacks.
 */
export interface ReactiveController {
	/**
	 * Called when the host is connected to the component tree. For custom
	 * element hosts, this corresponds to the `connectedCallback()` lifecycle,
	 * which is only called when the component is connected to the document.
	 */
	hostConnected?(): void;

	/**
	 * Called when the host is disconnected from the component tree. For custom
	 * element hosts, this corresponds to the `disconnectedCallback()` lifecycle,
	 * which is called the host or an ancestor component is disconnected from the
	 * document.
	 */
	hostDisconnected?(): void;
}

/**
 * An object that can host Reactive Controllers and call their lifecycle
 * callbacks.
 */
export interface ReactiveControllerHost {
	/**
	 * Adds a controller to the host, which sets up the controller's lifecycle
	 * methods to be called with the host's lifecycle.
	 */
	_addController(controller: ReactiveController): void;

	/**
	 * Removes a controller from the host.
	 */
	_removeController(controller: ReactiveController): void;
}

/**
 * Mixin implementing ReactiveControllerHost for custom elements.
 */
export const ReactiveControllerHostSupport = <
	T extends Constructor<FASTElement>,
>(
	Base: T
) => {
	class ReactiveControllerHostSupportElement
		extends Base
		implements ReactiveControllerHost
	{
		#controllers = new Set<ReactiveController>();

		/**
		 * Adds a controller to the host, which sets up the controller's lifecycle
		 * methods to be called with the host's lifecycle.
		 * @internal
		 */
		_addController(controller: ReactiveController): void {
			this.#controllers.add(controller);
			if (this.isConnected) {
				controller.hostConnected?.();
			}
		}

		/**
		 * Removes a controller from the host.
		 * @internal
		 */
		_removeController(controller: ReactiveController): void {
			this.#controllers.delete(controller);
		}

		override connectedCallback(): void {
			super.connectedCallback();

			for (const controller of this.#controllers) {
				controller.hostConnected?.();
			}
		}

		override disconnectedCallback(): void {
			super.disconnectedCallback();

			for (const controller of this.#controllers) {
				controller.hostDisconnected?.();
			}
		}
	}

	return ReactiveControllerHostSupportElement;
};

export type ReactiveControllerHostSupportElement = MixinType<
	typeof ReactiveControllerHostSupport
>;
