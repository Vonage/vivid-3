import { observable } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * Returns a normalised OS key based on the current user agent.
 *
 * @internal
 */
export function detectOS(): string {
	/* v8 ignore next 3 -- @preserve */
	if (typeof navigator === 'undefined') {
		return 'unknown';
	}

	const ua = navigator.userAgent.toLowerCase();
	if (ua.includes('mac')) return 'apple';
	if (ua.includes('iphone') || ua.includes('ipad')) return 'apple';
	if (ua.includes('win')) return 'windows';
	if (ua.includes('android')) return 'android';
	if (ua.includes('linux')) return 'linux';
	if (ua.includes('cros')) return 'chromeos';

	/* v8 ignore next -- @preserve */
	return 'unknown';
}

/**
 * Built-in filter resolvers.
 *
 * Each key corresponds to a `data-<key>` attribute on a child element.
 * The resolver returns a string that is compared against the attribute value.
 *
 * @public
 */
export type FilterResolver = () => string;

const builtInResolvers: Record<string, FilterResolver> = {
	os: detectOS,
};

/**
 * Displays at most one of its children based on `data-*` filter attributes.
 *
 * Each child can declare constraints via data attributes, e.g.
 * `data-os="apple"`. The component shows the first child whose
 * constraints all match and hides the rest.
 *
 * If no child matches, nothing is displayed.
 *
 * @public
 * @component platform-switch
 * @slot - Default slot accepts children with optional `data-*` filter attributes.
 */
export class PlatformSwitch extends VividElement {
	/**
	 * User-provided filter resolvers.
	 *
	 * Merged with the built-in resolvers (built-ins can be overridden).
	 *
	 * @public
	 */
	static resolvers: Record<string, FilterResolver> = {};

	/**
	 * @internal
	 */
	@observable slottedContent?: Node[];

	/**
	 * @internal
	 */
	slottedContentChanged() {
		this.#updateVisibility();
	}

	#getResolvers(): Record<string, FilterResolver> {
		return {
			...builtInResolvers,
			...(this.constructor as typeof PlatformSwitch).resolvers,
		};
	}

	#updateVisibility() {
		const children = (this.slottedContent ?? []).filter(
			(n): n is HTMLElement => n instanceof HTMLElement
		);

		const resolvers = this.#getResolvers();
		let matched = false;

		for (const child of children) {
			if (matched) {
				child.style.display = 'none';
				continue;
			}

			if (this.#matches(child, resolvers)) {
				child.style.display = '';
				matched = true;
			} else {
				child.style.display = 'none';
			}
		}

		// Hide the host element when no child matches
		if (children.length > 0 && !matched) {
			this.style.display = 'none';
		} else {
			this.style.removeProperty('display');
		}
	}

	#matches(
		el: HTMLElement,
		resolvers: Record<string, FilterResolver>
	): boolean {
		for (const [key, resolve] of Object.entries(resolvers)) {
			const expected = el.dataset[key];
			if (expected === undefined) continue;

			const actual = resolve();
			if (actual !== expected) return false;
		}
		return true;
	}
}
