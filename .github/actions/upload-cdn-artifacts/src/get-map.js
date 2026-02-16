export function getMap(entries) {
	return Object.fromEntries(
		entries.map((entry) => [`${entry.name}-${entry.style}`, entry.hash])
	);
}
