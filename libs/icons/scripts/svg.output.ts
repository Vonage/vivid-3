import type { OutputFormat } from '@repo/tools';

export const svg: OutputFormat = {
	fileName: (entry) => `${entry.id}.svg`,
	template: (_entry, svg) =>
		svg
			.replace('fill="none"', '')
			.replace(/fill="\S+"/gm, 'fill="currentColor"'),
};
