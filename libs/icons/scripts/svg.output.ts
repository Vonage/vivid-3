import type { OutputFormat } from '@repo/tools';

export const svg: OutputFormat = {
	fileName: (entry) => `${entry.id}.svg`,
	template: (entry, svg) => {
		if (entry.style === 'color' || entry.style === 'flag') {
			return svg;
		}

		return svg
			.replace('fill="none"', '')
			.replace(/fill="\S+"/gm, 'fill="currentColor"');
	},
};
