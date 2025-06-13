import {
	type ComponentName,
	type NormalizedComponentTag,
	normalizeTag,
} from './components';

export class ComponentMetadata<T> {
	#data = new Map<
		NormalizedComponentTag,
		{
			name: ComponentName;
			data: T;
		}
	>();

	add(name: ComponentName, data: T) {
		this.#data.set(normalizeTag(name), { name, data });
	}

	forTag(
		tag: NormalizedComponentTag,
		callback: (name: ComponentName, data: T) => void
	) {
		const entry = this.#data.get(tag);
		if (entry) {
			callback(entry.name, entry.data);
		}
	}
}
