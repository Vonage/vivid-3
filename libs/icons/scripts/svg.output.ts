import type { OutputFormat } from '@repo/tools';
import { kebabCase } from 'change-case';

export const svg: OutputFormat = {
	fileName: (entry) => `svg/${kebabCase(`${entry.name}-${entry.style}`)}.svg`,
	template: (_entry, svg) =>
		svg
			.replace(' fill="none"', '')
			.replace(/fill="\S+"/gm, 'fill="currentColor"'),
};
