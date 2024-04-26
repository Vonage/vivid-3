/**
 * We are no longer using a service worker, remove previous registrations.
 */
(async function () {
	for (const registration of await navigator.serviceWorker.getRegistrations()) {
		registration.unregister();
	}
})();
