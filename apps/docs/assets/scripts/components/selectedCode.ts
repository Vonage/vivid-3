import { observable } from '@microsoft/fast-element';

function saveToLocalStorage(key: string, value: unknown) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		// ignore
	}
}

function loadFromLocalStorage<T>(key: string): T | undefined {
	try {
		const item = localStorage.getItem(key);
		if (item) {
			return JSON.parse(item);
		}
	} catch (e) {
		// ignore
	}
	return undefined;
}

class CurrentCode {
	@observable code: 'vue' | 'web-component' =
		loadFromLocalStorage('code') ?? 'vue';
	codeChanged() {
		saveToLocalStorage('code', this.code);
	}
}
export const currentCode = new CurrentCode();
