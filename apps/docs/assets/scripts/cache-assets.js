(async function() {
	const registration = await navigator.serviceWorker.register(
		'/sw.js',
		{
			scope: '/',
		}
	);
})();

