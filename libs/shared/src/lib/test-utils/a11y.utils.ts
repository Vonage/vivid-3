export const axe = async function (element: any) {
	const { configureAxe } = await import('vitest-axe');
	const axeInstance = configureAxe({
		rules: {
			// color contrast doesn't work in this env
			'color-contrast': { enabled: false },
			// stops the HTML provided from being treated as a whole page
			region: { enabled: false },
		},
	});
	return axeInstance(element);
};
