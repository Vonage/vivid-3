(async function() {
	const active = 'ACTIVE';
	if (active === 'false') {
		return;
	}
	const registration = await navigator.serviceWorker.register(
		'/sw.js',
		{
			scope: '/',
		}
	);
})();

