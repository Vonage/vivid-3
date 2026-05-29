import { configureAxe } from 'vitest-axe';

export const axe = configureAxe({
	rules: {
		// color contrast doesn't work in this env
		'color-contrast': { enabled: false },
		// stops the HTML provided from being treated as a whole page
		region: { enabled: false },
	},
});
