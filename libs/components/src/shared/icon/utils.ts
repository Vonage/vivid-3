import {
	ICONS_BASE_URL as BASE_URL,
	ICONS_VERSION as ICON_SET_VERSION,
} from '@vonage/vivid-icons';

const baseUrlTemplate = (resource: string, version: string) =>
	[BASE_URL, `v${version}`, resource].join('/');

const assertIsValidResponse = ({ ok, headers }: Response) => {
	if (!ok || headers.get('content-type') !== 'image/svg+xml') {
		throw new Error('Something went wrong');
	}
};

const extractSvg = (response: Response) => {
	assertIsValidResponse(response);
	return response.text();
};

const loadSvg = (iconId: string, signal: AbortSignal) =>
	fetch(baseUrlTemplate(`${iconId}.svg`, ICON_SET_VERSION), { signal }).then(
		extractSvg
	);

const normalizeKey = (iconId: string | undefined) => (iconId ?? '').trim();

type CacheEntry = { promise: Promise<string>; signal?: AbortSignal };
const iconCache = new Map<string, CacheEntry>();

export const resolveIcon = (
	iconId: string | undefined,
	signal: AbortSignal
): Promise<string> => {
	const key = normalizeKey(iconId);
	if (!key) return Promise.resolve('');

	const cached = iconCache.get(key);
	if (cached && !cached.signal?.aborted) {
		return cached.promise;
	}

	const promise = loadSvg(key, signal)
		.then((svg) => {
			// Delete aborted entries from cache, keep successful ones
			const entry = iconCache.get(key);
			if (entry && entry.promise === promise && signal.aborted) {
				iconCache.delete(key);
				throw signal.reason ?? new DOMException('Aborted', 'AbortError');
			}
			return svg;
		})
		.catch((err) => {
			// Remove aborted or failed fetches from cache
			const entry = iconCache.get(key);
			if (entry && entry.promise === promise) {
				iconCache.delete(key);
			}
			throw err;
		});

	iconCache.set(key, { promise, signal });
	return promise;
};
