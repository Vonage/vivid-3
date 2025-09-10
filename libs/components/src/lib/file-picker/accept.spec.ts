import { isAcceptedFileType } from './accept';

const createFile = (name: string, type: string) =>
	new File([''], name, { type });

describe('isAcceptedFileType', () => {
	it('should accept any file when accept is not provided', () => {
		expect(
			isAcceptedFileType(createFile('test.txt', 'text/plain'), undefined)
		).toBe(true);
		expect(isAcceptedFileType(createFile('test.txt', 'text/plain'), '')).toBe(
			true
		);
	});

	it('should accept files with matching extension', () => {
		expect(
			isAcceptedFileType(createFile('test.txt', 'text/plain'), '.txt')
		).toBe(true);
		expect(
			isAcceptedFileType(createFile('test.txt', 'text/plain'), '.jpg')
		).toBe(false);
	});

	it('should ignore case in file extensions', () => {
		expect(
			isAcceptedFileType(createFile('test.TXT', 'text/plain'), '.txt')
		).toBe(true);
	});

	it('should accept files with matching mime type', () => {
		expect(
			isAcceptedFileType(createFile('test.txt', 'text/plain'), 'text/plain')
		).toBe(true);
		expect(
			isAcceptedFileType(createFile('test.txt', 'text/plain'), 'image/jpeg')
		).toBe(false);
	});

	it('should accept files matching wildcard mime type', () => {
		expect(
			isAcceptedFileType(createFile('test.txt', 'text/plain'), 'text/*')
		).toBe(true);
		expect(
			isAcceptedFileType(createFile('test.txt', 'text/plain'), 'image/*')
		).toBe(false);
	});

	it('should allow separating multiple types with comma', () => {
		expect(
			isAcceptedFileType(
				createFile('test.txt', 'text/plain'),
				'text/plain, image/*, .pdf'
			)
		).toBe(true);
		expect(
			isAcceptedFileType(
				createFile('test.jpg', 'image/jpeg'),
				'text/plain, image/*, .pdf'
			)
		).toBe(true);
		expect(
			isAcceptedFileType(
				createFile('test.pdf', 'application/pdf'),
				'text/plain, image/*, .pdf'
			)
		).toBe(true);
		expect(
			isAcceptedFileType(
				createFile('test.html', 'text/html'),
				'text/plain, image/*, .pdf'
			)
		).toBe(false);
	});
});
