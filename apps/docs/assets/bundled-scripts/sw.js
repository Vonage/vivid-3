const VERSION = 'SW_VERSION';

console.log(`Vivid Upgraded to Version ${VERSION}!`);

const addResourcesToCache = async (resources) => {
	const cache = await caches.open(VERSION);
	await cache.addAll(resources);
};

const putInCache = async (request, response) => {
	const cache = await caches.open(VERSION);
	await cache.put(request, response);
};

async function removeOldCache(event) {
	await caches.keys().then(function (keys) {
		return Promise.all(keys.filter(function (key) {
			return key !== VERSION;
		}).map(function (key) {
			return caches.delete(key);
		}));
	}).then(function () {
		return self.clients.claim();
	});
}

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
	const responseFromCache = await caches.match(request);
	if (responseFromCache) {
		return responseFromCache;
	}

	const preloadResponse = await preloadResponsePromise;
	if (preloadResponse) {
		console.info('using preload response', preloadResponse);
		await putInCache(request, preloadResponse.clone());
		return preloadResponse;
	}

	try {
		const responseFromNetwork = await fetch(request);
		await putInCache(request, responseFromNetwork.clone());
		return responseFromNetwork;
	} catch (error) {
		const fallbackResponse = await caches.match(fallbackUrl);
		if (fallbackResponse) {
			return fallbackResponse;
		}
		return new Response('Network error happened', {
			status: 408,
			headers: { 'Content-Type': 'text/plain' },
		});
	}
};

const enableNavigationPreload = async () => {
	if (self.registration.navigationPreload) {
		await self.registration.navigationPreload.enable();
	}
};

self.addEventListener('activate', (event) => {
	event.waitUntil(removeOldCache(event));
	event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
	self.skipWaiting();
	event.waitUntil(
		addResourcesToCache([
			'./',
			'./index.html',
			'/assets/styles/core/all.css',
			'/assets/scripts/vivid-components.js',
			'/assets/scripts/live-sample.js',
		])
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		cacheFirst({
			request: event.request,
			preloadResponsePromise: event.preloadResponse,
			fallbackUrl: './assets/images/vivid-logo.jpeg',
		})
	);
});
