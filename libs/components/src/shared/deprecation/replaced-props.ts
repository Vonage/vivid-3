import {
	createMetadataLocator,
	type FASTElement,
	Observable,
	type Subscriber,
} from '@microsoft/fast-element';
import type { Constructor } from '../utils/mixins';

/*
 * Handling of props that deprecate other props in a backwards compatible way.
 * When the old prop is set, the new prop is set so that any code can just work with the new API.
 * Optionally, changes to the new prop can be reflected back to the old prop. This allows automatically migrating code
 * without worrying about breaking code depending on the old prop.
 */

type ReplacedPropConfiguration<PropertyT, DeprecatedT> = {
	newPropertyName: string;
	deprecatedPropertyName: string;
	/// Converts the deprecated value to the new value.
	fromDeprecated: (v: DeprecatedT) => PropertyT;
	/// Converts the new value to the deprecated value. If not provided, the changes to the new prop are not reflected back
	toDeprecated?: (v: PropertyT) => DeprecatedT;
};

const locateReplacedPropMetadata =
	createMetadataLocator<ReplacedPropConfiguration<any, any>>();

/**
 * Decorator to mark a property as deprecated and replaced by another property.
 */
export const replaces =
	<PropertyT, DeprecatedT = PropertyT>(
		config: Omit<
			ReplacedPropConfiguration<PropertyT, DeprecatedT>,
			'newPropertyName'
		>
	) =>
	($target: object, $prop: string) => {
		locateReplacedPropMetadata($target.constructor).push({
			newPropertyName: $prop,
			...config,
		});
	};

/**
 * Mixin responsible for the syncing between the properties.
 * This needs to be applied before any other mixin so that it can subscribe to the property changes before their initial
 * values are set.
 */
export const ReplacedPropHandling = <T extends Constructor<FASTElement>>(
	Base: T
) => {
	class ReplacedPropHandlingElement extends Base {
		#handleReplacedProp(replacedProp: ReplacedPropConfiguration<any, any>) {
			let newDirty = false;
			let deprecatedDirty = false;

			// To avoid infinite recursion, we need to check if the current change could be the result of the other
			// property changing
			const changeCouldBeFromDeprecated = (source: any) =>
				deprecatedDirty &&
				replacedProp.fromDeprecated(
					source[replacedProp.deprecatedPropertyName]
				) === source[replacedProp.newPropertyName];
			const changeCouldBeFromNew = (source: any) =>
				newDirty &&
				replacedProp.toDeprecated &&
				replacedProp.toDeprecated(source[replacedProp.newPropertyName]) ===
					source[replacedProp.deprecatedPropertyName];

			const subscriber: Subscriber = {
				handleChange(source: any, propertyName: string) {
					if (propertyName === replacedProp.newPropertyName) {
						newDirty = true;

						if (
							!replacedProp.toDeprecated ||
							changeCouldBeFromDeprecated(source)
						) {
							return;
						}

						source[replacedProp.deprecatedPropertyName] =
							replacedProp.toDeprecated(source[replacedProp.newPropertyName]);
					}
					if (propertyName === replacedProp.deprecatedPropertyName) {
						deprecatedDirty = true;

						if (changeCouldBeFromNew(source)) {
							return;
						}

						source[replacedProp.newPropertyName] = replacedProp.fromDeprecated(
							source[replacedProp.deprecatedPropertyName]
						);
					}
				},
			};

			// Subscribe to the two properties. Although we never unsubscribe, this does not leak memory
			const notifier = Observable.getNotifier(this);
			notifier.subscribe(subscriber, replacedProp.newPropertyName);
			notifier.subscribe(subscriber, replacedProp.deprecatedPropertyName);
		}

		constructor(...args: any[]) {
			super(...args);

			for (const replacedProp of locateReplacedPropMetadata(this.constructor)) {
				this.#handleReplacedProp(replacedProp);
			}
		}
	}

	return ReplacedPropHandlingElement;
};
