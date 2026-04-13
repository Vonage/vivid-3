import type { AriaIdrefsPropertyName } from './aria-mixin';
import { publishAriaPropertyChange } from './aria-change-subscription';
import type { VividElement } from '../foundation/vivid-element/vivid-element';
import { handleAriaPropertyChange } from './attribute-removal';
import type { ReactiveController } from '../framework/reactive-controller';

const parseIdrefs = (idrefs: string): string[] => {
	if (!idrefs.trim()) {
		return [];
	}
	return idrefs.trim().split(/\s+/);
};

const idrefsControllers = new WeakMap<
	VividElement,
	Map<AriaIdrefsPropertyName, IdrefsController>
>();

/** Manages a single IDREF property for an element. Lazily created only when the property is used. */
export class IdrefsController implements ReactiveController {
	static resolvedElements(
		host: VividElement,
		property: AriaIdrefsPropertyName
	) {
		return (
			idrefsControllers.get(host)?.get(property)?.getResolvedElements() ?? null
		);
	}

	static for(host: VividElement, property: AriaIdrefsPropertyName) {
		let controllersByProp = idrefsControllers.get(host);
		if (!controllersByProp) {
			controllersByProp = new Map();
			idrefsControllers.set(host, controllersByProp);
		}
		let controller = controllersByProp.get(property);
		if (!controller) {
			controller = new IdrefsController(host, property);
			controllersByProp.set(property, controller);
		}
		return controller;
	}

	private constructor(
		private host: VividElement,
		private propertyName: AriaIdrefsPropertyName
	) {
		host._addController(this);
	}

	#isConnected = false;

	hostConnected(): void {
		this.#isConnected = true;
		this.#updateResolution();
	}

	hostDisconnected(): void {
		this.#isConnected = false;
		this.#updateResolution();
	}

	// --- Attribute ---
	// Use the FAST backing store for the attribute as to not trigger changes

	private getAttribute(): string | null {
		return (this.host as any)[`_${this.propertyName}`];
	}

	setAttribute(value: string | null): void {
		(this.host as any)[`_${this.propertyName}`] = value;
		handleAriaPropertyChange(this.host, this.propertyName);
		this.#updateResolution();
	}

	// --- Resolved elements ---

	#resolvedElements: HTMLElement[] | null = null;
	#setResolvedElements(elements: HTMLElement[] | null) {
		this.#resolvedElements = elements;
		publishAriaPropertyChange(this.host, this.propertyName);
	}

	private getResolvedElements(): HTMLElement[] | null {
		if (!this.host.isConnected && this.#resolvedElements) {
			return [];
		}
		return this.#resolvedElements;
	}

	/** When elements property is set on the host */
	setElements(elements: HTMLElement[] | null): void {
		this.setAttribute(elements !== null ? '' : null);
		this.#setResolvedElements(elements);
	}

	// --- Resolution ---

	#updateResolution() {
		this.#cleanupObserver();

		if (!(this.#isConnected && this.host.isConnected)) {
			return;
		}

		const attrValue = this.getAttribute();
		if (attrValue) {
			const idList = parseIdrefs(attrValue);
			if (idList.length === 0) {
				this.#setResolvedElements([]);
				return;
			}

			const resolved = this.#resolveIds(idList);
			this.#setResolvedElements(resolved);

			if (resolved.length < idList.length) {
				this.#observeForElements(idList);
			}
		}
	}

	#resolveId(id: string): HTMLElement | null {
		return (this.host.getRootNode() as Document | ShadowRoot).getElementById(
			id
		);
	}

	#resolveIds(idList: string[]): HTMLElement[] {
		return idList
			.map((id) => this.#resolveId(id))
			.filter((el): el is HTMLElement => el !== null);
	}

	#observer?: MutationObserver;

	#observeForElements(idList: string[]) {
		this.#observer = new MutationObserver(() => {
			const resolved = this.#resolveIds(idList);
			this.#setResolvedElements(resolved);
			if (resolved.length === idList.length) {
				this.#cleanupObserver();
			}
		});
		this.#observer.observe(this.host.getRootNode(), {
			childList: true,
			subtree: true,
		});
	}

	#cleanupObserver() {
		this.#observer?.disconnect();
		this.#observer = undefined;
	}
}
