import { DOM, Observable } from '@microsoft/fast-element';

type ReflectedAsProperty<T> = {
	type: 'property';
	destination: keyof T;
	skipIfEqual: boolean;
};

type ReflectedAsAttribute = {
	type: 'attribute' | 'boolean-attribute';
	destination: string;
}

type ReflectedProperty<T> = ReflectedAsProperty<T> | ReflectedAsAttribute;


/**
 * Reflects observable properties of the source object to the target, either as attributes or as properties.
 */
export class Reflector<S, T extends HTMLElement> {
	#reflectedProperties = new Map<keyof S, ReflectedProperty<T>>();
	readonly #source: S;
	readonly #target: T;

	constructor(source: S, target: T) {
		this.#source = source;
		this.#target = target;
	}

	attribute(propertyName: keyof S, attributeName: string) {
		this.#addReflectedProperty(propertyName, {
			type: 'attribute',
			destination: attributeName
		});
	}

	booleanAttribute(propertyName: keyof S, attributeName: string) {
		this.#addReflectedProperty(propertyName, {
			type: 'boolean-attribute',
			destination: attributeName
		});
	}

	property(propertyName: keyof S, targetProperty: keyof T, skipIfEqual = false) {
		this.#addReflectedProperty(propertyName, {
			type: 'property',
			destination: targetProperty,
			skipIfEqual
		});
	}

	destroy() {
		const notifier = Observable.getNotifier(this.#source);
		for (const prop of this.#reflectedProperties.keys()) {
			notifier.unsubscribe(this.#propertyChangeHandler, prop);
		}
		this.#reflectedProperties.clear();
	}

	#addReflectedProperty(name: keyof S, reflected: ReflectedProperty<T>) {
		this.#reflectedProperties.set(name, reflected);
		const notifier = Observable.getNotifier(this.#source);
		notifier.subscribe(this.#propertyChangeHandler, name);
		this.#propertyChangeHandler.handleChange(this.#source, name);
	}

	#propertyChangeHandler = {
		handleChange: (source: S, propertyName: keyof S) => {
			const reflectedProperty = this.#reflectedProperties.get(propertyName)!;
			const value = source[propertyName];

			switch (reflectedProperty.type) {
				case 'boolean-attribute':
					DOM.setBooleanAttribute(this.#target, reflectedProperty.destination, Boolean(value));
					break;
				case 'attribute':
					DOM.setAttribute(this.#target, reflectedProperty.destination, value);
					break;
				case 'property':
					if (reflectedProperty.skipIfEqual && (this.#target as any)[reflectedProperty.destination] === value) {
						return;
					}
					(this.#target as any)[reflectedProperty.destination] = value as any;
					break;
			}
		}
	};
}
