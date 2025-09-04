import { filesFromDataTransfer } from './data-transfer';
import {
	mockDir,
	mockFile,
	mockNonFileOrDir,
	mockString,
	mockTransfer,
	simulateDirReadError,
	simulateFileReadError,
	simulateNoItemsSupport,
	simulateNoWebkitGetAsEntrySupport,
	simulateWebkitGetAsEntryReturnsNull,
} from './__mocks__/data-transfer';

describe('filesFromDataTransfer', () => {
	it('should extract files from DataTransfer', async () => {
		const result = await filesFromDataTransfer(
			mockTransfer([
				mockFile('file1.txt'),
				mockDir('a', [
					mockFile('file2.txt'),
					mockDir('b', [mockFile('file3.txt')]),
				]),
			])
		);

		expect(result.map((f) => f.name)).toEqual([
			'file1.txt',
			'file2.txt',
			'file3.txt',
		]);
	});

	it('should ignore hidden files in directories', async () => {
		const result = await filesFromDataTransfer(
			mockTransfer([
				mockFile('.not-ignored'),
				mockDir('a', [mockFile('.ignored')]),
			])
		);

		expect(result.map((f) => f.name)).toEqual(['.not-ignored']);
	});

	it('should ignore hidden files in directories', async () => {
		const result = await filesFromDataTransfer(
			mockTransfer([
				mockFile('file1.txt'),
				mockNonFileOrDir('non-file1'),
				mockDir('a', [mockFile('file2.txt'), mockNonFileOrDir('non-file2')]),
			])
		);

		expect(result.map((f) => f.name)).toEqual(['file1.txt', 'file2.txt']);
	});

	it('should ignore string items', async () => {
		const result = await filesFromDataTransfer(
			mockTransfer([mockFile('file1.txt'), mockString()])
		);

		expect(result.map((f) => f.name)).toEqual(['file1.txt']);
	});

	it('should rethrow errors during file reading', async () => {
		await expect(
			filesFromDataTransfer(
				mockTransfer([
					simulateFileReadError(
						mockFile('file1.txt'),
						new DOMException('File reading failed')
					),
				])
			)
		).rejects.toThrow('File reading failed');
	});

	it('should rethrow errors during directory reading', async () => {
		await expect(
			filesFromDataTransfer(
				mockTransfer([
					simulateDirReadError(
						mockDir('a', []),
						new DOMException('Directory reading failed')
					),
				])
			)
		).rejects.toThrow('Directory reading failed');
	});

	describe('backwards compatibility', () => {
		it('should fallback to .files when .items is not supported', async () => {
			const result = await filesFromDataTransfer(
				simulateNoItemsSupport(
					mockTransfer([
						mockFile('file1.txt'),
						mockDir('a', [mockFile('file2.txt')]),
					])
				)
			);

			expect(result.map((f) => f.name)).toEqual(['file1.txt']);
		});

		it('should fallback to .files when webkitGetAsEntry is not supported', async () => {
			const result = await filesFromDataTransfer(
				simulateNoWebkitGetAsEntrySupport(
					mockTransfer([
						mockFile('file1.txt'),
						mockDir('a', [mockFile('file2.txt')]),
					])
				)
			);

			expect(result.map((f) => f.name)).toEqual(['file1.txt']);
		});

		it('should use .getAsFile when webkitGetAsEntry returns null for files', async () => {
			const result = await filesFromDataTransfer(
				simulateWebkitGetAsEntryReturnsNull(
					mockTransfer([
						mockFile('file1.txt'),
						mockDir('a', [mockFile('file2.txt')]),
					])
				)
			);

			expect(result.map((f) => f.name)).toEqual(['file1.txt']);
		});
	});
});
