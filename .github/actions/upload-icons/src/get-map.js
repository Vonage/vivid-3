export function getMap(entries) {
	return Object.fromEntries(entries.map((entry) => [entry.id, entry.hash]));
}
