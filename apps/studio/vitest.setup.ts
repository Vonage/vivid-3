/**
 * Node 22+ defines an experimental global `localStorage` getter that shadows
 * jsdom's and returns undefined unless Node is started with
 * --localstorage-file. Replace it with an in-memory implementation.
 */
class MemoryStorage implements Storage {
	#data = new Map<string, string>();

	get length(): number {
		return this.#data.size;
	}

	key(index: number): string | null {
		return [...this.#data.keys()][index] ?? null;
	}

	getItem(key: string): string | null {
		return this.#data.get(key) ?? null;
	}

	setItem(key: string, value: string): void {
		this.#data.set(key, String(value));
	}

	removeItem(key: string): void {
		this.#data.delete(key);
	}

	clear(): void {
		this.#data.clear();
	}
}

Object.defineProperty(globalThis, 'localStorage', {
	value: new MemoryStorage(),
	writable: true,
	configurable: true,
});
