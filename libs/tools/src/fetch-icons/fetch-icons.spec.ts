import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { fetchIcons } from './fetch-icons';
import { getClient } from './cached-client';
import { walk } from 'figmash';
import {
	chunkify,
	logger,
	readJson,
	retry,
	writeFile,
	writeJson,
} from '../shared';
import isSvg from 'is-svg';
import { createIconEntry } from './create-icon-entry';

vi.mock('node:path', async () => {
	const actual = await vi.importActual('node:path');
	return {
		...actual,
		resolve: vi.fn((...args) => args.join('/')),
	};
});

vi.mock('./cached-client');
vi.mock('figmash');
vi.mock('../shared/read-json.util');
vi.mock('../shared/write-json.util');
vi.mock('../shared/write-file.util');
vi.mock('../shared/chunk-array.util');
vi.mock('../shared/retry.util');
vi.mock('../shared/logger.util');
vi.mock('is-svg');
vi.mock('./create-icon-entry');

global.fetch = vi.fn();

describe('fetchIcons', () => {
	const figmaFileId = 'file-id';
	const mockClient = {
		file: vi.fn(),
		fileImages: vi.fn(),
	};
	const mockNode = { id: '1:1', name: 'icon-test' };

	const mockEntry = {
		figmaNodeId: '1:1',
		name: 'test',
		style: 'solid',
		imageUrl: '',
	};

	beforeEach(() => {
		vi.resetAllMocks();

		vi.spyOn(process, 'exit').mockImplementation((code) => {
			throw new Error(`Process.exit(${code})`);
		});

		(getClient as Mock).mockReturnValue(mockClient);
		(chunkify as Mock).mockImplementation((arr) => [arr]);
		// (writeJson as Mock).mockImplementation(( => {}));
		// (writeFile as Mock).mockImplementation(() => {});
		(retry as Mock).mockImplementation(async (fn, validator) => {
			const res = await fn();
			if (validator) validator(res);
			return res;
		});
		(isSvg as Mock).mockReturnValue(true);
		(createIconEntry as Mock).mockReturnValue({ ...mockEntry });

		mockClient.file.mockResolvedValue({
			data: {
				document: { children: [] },
				name: 'Fimga File',
			},
		});

		(walk as Mock).mockImplementation((doc, cb) => {
			cb(mockNode, []);
		});

		mockClient.fileImages.mockResolvedValue({
			data: {
				images: {
					[mockNode.id]: 'http://image.url',
				},
			},
		});

		(global.fetch as Mock).mockResolvedValue({
			text: vi.fn().mockResolvedValue('<svg></svg>'),
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should fetch icons and write them to files', async () => {
		const result = await fetchIcons(figmaFileId);

		expect(getClient).toHaveBeenCalled();
		expect(mockClient.file).toHaveBeenCalledWith(figmaFileId);
		expect(walk).toHaveBeenCalled();
		expect(createIconEntry).toHaveBeenCalled();
		expect(mockClient.fileImages).toHaveBeenCalled();
		expect(writeJson).toHaveBeenCalledWith(
			expect.stringContaining('index.json'),
			expect.any(Array)
		);
		expect(global.fetch).toHaveBeenCalledWith('http://image.url');
		expect(writeFile).toHaveBeenCalledWith(
			expect.stringContaining('.svg'),
			'<svg></svg>'
		);

		expect(result).toHaveLength(1);
		expect(result[0].imageUrl).toBe('http://image.url');
		expect(logger.success).toHaveBeenCalled();
	});

	it('should skip existing icons if forceUpdate is false', async () => {
		(readJson as Mock).mockReturnValue([
			{ ...mockEntry, imageUrl: 'http://old.url' },
		]);

		await fetchIcons(figmaFileId, { forceUpdate: false });

		expect(mockClient.fileImages).toHaveBeenCalled();
		expect(writeJson).toHaveBeenCalled();

		expect(global.fetch).not.toHaveBeenCalled();
		expect(writeFile).not.toHaveBeenCalled();
		expect(logger.debug).toHaveBeenCalledWith(
			expect.stringContaining('already exists')
		);
	});

	it('should update existing icons if forceUpdate is true', async () => {
		(readJson as Mock).mockReturnValue([{ ...mockEntry }]);

		await fetchIcons(figmaFileId, { forceUpdate: true });

		expect(global.fetch).toHaveBeenCalled();
		expect(writeFile).toHaveBeenCalled();
	});

	it('should exit if image URL is missing', async () => {
		mockClient.fileImages.mockResolvedValue({
			data: {
				images: {},
			},
		});

		await expect(fetchIcons(figmaFileId)).rejects.toThrow('Process.exit(1)');
		expect(logger.error).toHaveBeenCalledWith(
			expect.stringContaining('No image URL')
		);
	});

	it('should handle fetch SVG failure', async () => {
		(retry as Mock).mockRejectedValue(new Error('Fetch failed'));

		const result = await fetchIcons(figmaFileId);

		expect(logger.error).toHaveBeenCalledWith(
			expect.stringContaining('Failed to fetch SVG')
		);
		expect(writeFile).not.toHaveBeenCalled();
		expect(result).toHaveLength(0);
	});

	it('should filter nodes based on options', async () => {
		const filterSpy = vi.fn().mockReturnValue(false);
		await fetchIcons(figmaFileId, { filter: filterSpy });

		expect(filterSpy).toHaveBeenCalledWith(mockNode, []);
		expect(createIconEntry).not.toHaveBeenCalled();
	});

	it('should use custom outputs', async () => {
		const customOutput = {
			fileName: () => 'custom.svg',
			template: () => 'custom content',
		};

		await fetchIcons(figmaFileId, { outputs: [customOutput] });

		expect(writeFile).toHaveBeenCalledWith(
			expect.stringContaining('custom.svg'),
			'custom content'
		);
	});

	it('should skip writing file if template returns undefined', async () => {
		const customOutput = {
			fileName: () => 'custom.svg',
			template: () => undefined,
		};

		await fetchIcons(figmaFileId, { outputs: [customOutput] });

		expect(writeFile).not.toHaveBeenCalled();
	});

	it('should use user provided cache options', async () => {
		const cacheOptions = { dir: 'custom-cache' };
		await fetchIcons(figmaFileId, { cacheOptions });

		expect(getClient).toHaveBeenCalledWith(
			true,
			expect.objectContaining(cacheOptions)
		);
	});

	it('should validate SVG content', async () => {
		await fetchIcons(figmaFileId);
		expect(isSvg).toHaveBeenCalledWith('<svg></svg>');
	});
});
