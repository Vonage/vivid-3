import type { TypeStr } from '@repo/metadata-extractor/metadata/type-str';
import { parseTypeStr } from '@repo/metadata-extractor/metadata/type-str';

export const getEventType = (
	type: TypeStr,
	className: string,
	isVueModelEvent: boolean
): string => {
	// Event type should be a single type like `CustomEvent<undefined>`
	if (parseTypeStr(type).length > 1) {
		throw new Error('Multiple event types not supported');
	}

	if (isVueModelEvent) {
		return type; // Vue model events use the prop's type, e.g. a `update:modelValue` will have type `string`
	}

	// The event `currentTarget` will always be the host component. Therefore, type `currentTarget` accordingly to make
	// it easier to use for consumers.
	// Originally we typed `target` instead, but this is not the case if the event bubbles from the light DOM, e.g. an
	// input event bubbling from a select slotted into a text-field.
	//
	// Note: `Event.currentTarget` can be `null` in consumer-land depending on how the handler is invoked (e.g. when
	// wrapping handlers with debounce/throttle). Therefore we must keep `null` in the type even though the component
	// emits the event with a correctly populated `currentTarget`.
	return `${type} & {
			currentTarget: ${className} | null
		}`;
};
