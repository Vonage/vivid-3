export function parseJson<T extends object>(text: string): T | undefined {
	try {
		return JSON.parse(text) as T;
	} catch (e) {
		return (e && undefined) as undefined;
	}
}
