/**
 * We are no longer using a service worker, remove previous registrations.
 */
void (async function () {
	// eslint-disable-next-line compat/compat
	for (const registration of await navigator.serviceWorker.getRegistrations()) {
		await registration.unregister();
	}
})();
