import { posix, win32 } from 'path';
import { describe, expect, it } from 'vitest';
import { getImportsFromTag } from './generator.js';

describe('getImportsFromTag', () => {
	const mainComponentTag = {
		name: 'vwc-list',
		path: './../node_modules/@vonage/vwc-list/src/vwc-list.ts',
	};

	const subComponentExclusionTag = {
		name: 'vwc-tag',
		path: './..\\node_modules\\@vonage\\vwc-tags\\vwc-tag.d.ts',
	};

	const subComponentTag = {
		name: 'vwc-radio-list-item',
		path: './../node_modules/@vonage/vwc-list/src/vwc-radio-list-item.ts',
	};

	it('should create a default import for main component', () => {
		const result = getImportsFromTag(mainComponentTag);

		expect(result).toEqual([`import '@vonage/vwc-list'`]);
	});

	it('should create import from specific file for subcomponent and main component import', () => {
		const result = getImportsFromTag(subComponentTag);

		expect(result).toEqual([
			`import '@vonage/vwc-list'`,
			`import '@vonage/vwc-list/${subComponentTag.name}'`,
		]);
	});

	it('should create import from specific file for subcomponent with exclusion', () => {
		const result = getImportsFromTag(subComponentExclusionTag);

		expect(result).toEqual([
			`import '@vonage/vwc-tags/${subComponentExclusionTag.name}'`,
		]);
	});

	it('should work for win32 paths', () => {
		const winTag = {
			...subComponentTag,
			path: subComponentTag.path.split(posix.sep).join(win32.sep),
		};

		const result = getImportsFromTag(winTag);

		expect(result).toEqual([
			`import '@vonage/vwc-list'`,
			`import '@vonage/vwc-list/${subComponentTag.name}'`,
		]);
	});
});
