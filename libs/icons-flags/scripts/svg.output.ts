import type { OutputFormat } from '@repo/tools';
import { kebabCase } from 'change-case';

export const svg: OutputFormat = {
	fileName: (entry) => `${kebabCase(entry.name)}.svg`,
	template: (_entry, svg) => svg,
};
