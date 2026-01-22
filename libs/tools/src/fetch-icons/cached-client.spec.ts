import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { getClient } from './cached-client';
import { Client } from 'figma-js';
import { hash } from 'ohash';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { logger, writeJson } from '../shared';

vi.mock('figma-js');
vi.mock('ohash');
vi.mock('node:fs');
vi.mock('node:path', async () => {
	const actual = await vi.importActual('node:path');
	return {
		...actual,
		resolve: vi.fn((...args) => args.join('/')),
	};
});
vi.mock('../shared/write-json.util');
vi.mock('../shared/logger.util');

describe('getClient', () => {
	const mockFigmaToken = 'test-figma-token';
	const mockClientInstance = {
		file: vi.fn(),
		fileImages: vi.fn(),
	};
	const mockCachedData = { some: 'data' };
	const mockResponseData = { new: 'data' };

	beforeEach(() => {
		vi.resetAllMocks();
		process.env.FIGMA_TOKEN = mockFigmaToken;

		vi.spyOn(process, 'exit').mockImplementation((code) => {
			throw new Error(`Process.exit(${code})`);
		});

		(Client as Mock).mockReturnValue(mockClientInstance);
		(hash as Mock).mockReturnValue('mock-hash');
		(existsSync as Mock).mockReturnValue(false);
		(readFileSync as Mock).mockReturnValue(JSON.stringify(mockCachedData));
		(resolve as Mock).mockImplementation((...args) => args.join('/'));
		(mockClientInstance.file as Mock).mockResolvedValue({
			data: mockResponseData,
		});
		(mockClientInstance.fileImages as Mock).mockResolvedValue({
			data: mockResponseData,
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
		delete process.env.FIGMA_TOKEN;
	});

	it('should exit if FIGMA_TOKEN is not set', () => {
		delete process.env.FIGMA_TOKEN;
		expect(() => getClient()).toThrow('Process.exit(1)');
		expect(logger.error).toHaveBeenCalledWith(
			expect.stringContaining('FIGMA_TOKEN environment variable is not set')
		);
	});

	it('should return a non-cached client if cached is false', () => {
		const client = getClient(false);
		expect(Client).toHaveBeenCalledWith({
			personalAccessToken: mockFigmaToken,
		});
		expect(client).toBe(mockClientInstance);
	});

	describe('cached client behavior', () => {
		it('should return cached data if cache exists', async () => {
			(existsSync as Mock).mockReturnValue(true);

			const client = getClient(true);
			const result = await client.file('file-id');

			expect(hash).toHaveBeenCalledWith(['file', ['file-id']]);
			expect(resolve).toHaveBeenCalledWith('.local', 'mock-hash.json');
			expect(existsSync).toHaveBeenCalledWith('.local/mock-hash.json');
			expect(readFileSync).toHaveBeenCalledWith(
				'.local/mock-hash.json',
				'utf-8'
			);
			expect(result).toEqual({ data: mockCachedData });
			expect(mockClientInstance.file).not.toHaveBeenCalled();
			expect(writeJson).not.toHaveBeenCalled();
		});

		it('should fetch data and cache it if cache does not exist', async () => {
			(existsSync as Mock).mockReturnValue(false);

			const client = getClient(true);
			const result = await client.file('file-id');

			expect(hash).toHaveBeenCalledWith(['file', ['file-id']]);
			expect(resolve).toHaveBeenCalledWith('.local', 'mock-hash.json');
			expect(existsSync).toHaveBeenCalledWith('.local/mock-hash.json');
			expect(mockClientInstance.file).toHaveBeenCalledWith('file-id');
			expect(writeJson).toHaveBeenCalledWith(
				'.local/mock-hash.json',
				mockResponseData
			);
			expect(result).toEqual({ data: mockResponseData });
		});

		it('should use custom cache directory if provided', async () => {
			const customDir = 'custom-cache-dir';
			(existsSync as Mock).mockReturnValue(false);

			const client = getClient(true, { dir: customDir });
			await client.file('file-id');

			expect(resolve).toHaveBeenCalledWith(customDir, 'mock-hash.json');
			expect(writeJson).toHaveBeenCalledWith(
				`${customDir}/mock-hash.json`,
				mockResponseData
			);
		});

		it('should handle different client methods via proxy', async () => {
			(existsSync as Mock).mockReturnValue(false);

			const client = getClient(true);
			const result = await client.fileImages('file-id', { ids: ['1'] });

			expect(hash).toHaveBeenCalledWith([
				'fileImages',
				['file-id', { ids: ['1'] }],
			]);
			expect(mockClientInstance.fileImages).toHaveBeenCalledWith('file-id', {
				ids: ['1'],
			});
			expect(result).toEqual({ data: mockResponseData });
		});
	});
});
