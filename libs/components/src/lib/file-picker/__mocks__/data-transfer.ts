function createFile(name: string) {
	return new File([''], name, {
		type: 'text/plain',
	});
}

class MockFileSystemEntry implements FileSystemEntry {
	readonly name: string;
	readonly isFile: boolean;
	readonly isDirectory: boolean;
	readonly filesystem = {} as FileSystem;
	readonly fullPath: string;

	constructor(
		name: string,
		isFile: boolean,
		isDirectory: boolean,
		fullPath?: string
	) {
		this.name = name;
		this.isFile = isFile;
		this.isDirectory = isDirectory;
		this.fullPath = fullPath || `/${name}`;
	}

	getParent(): void {
		throw new Error('Not implemented');
	}
}

class MockFileSystemFileEntry
	extends MockFileSystemEntry
	implements FileSystemFileEntry
{
	constructor(name: string, readonly _file: File, fullPath?: string) {
		super(name, true, false, fullPath);
	}

	file(
		successCallback: (file: File) => void,
		errorCallback?: (error: DOMException) => void
	) {
		setTimeout(() => {
			successCallback(this._file);
		}, 0);
	}
}

class MockFileSystemDirectoryEntry
	extends MockFileSystemEntry
	implements FileSystemDirectoryEntry
{
	private entries: FileSystemEntry[];

	constructor(
		name: string,
		entries: FileSystemEntry[] = [],
		fullPath?: string
	) {
		super(name, false, true, fullPath);
		this.entries = entries;
	}

	createReader(): FileSystemDirectoryReader {
		const entries = [...this.entries];
		let hasReadEntries = false;

		return {
			readEntries: (
				successCallback: (entries: FileSystemEntry[]) => void,
				errorCallback?: (error: DOMException) => void
			) => {
				setTimeout(() => {
					// Simulate the behavior where readEntries returns entries in chunks
					// For simplicity, we'll return all entries in the first call and empty array in subsequent calls
					if (!hasReadEntries) {
						hasReadEntries = true;
						successCallback(entries);
					} else {
						successCallback([]);
					}
				}, 0);
			},
		};
	}

	getDirectory() {
		throw new Error('Not implemented');
	}

	getFile() {
		throw new Error('Not implemented');
	}
}

class MockDataTransferItem implements DataTransferItem {
	constructor(
		readonly kind: string,
		readonly type: string,
		readonly _entry: FileSystemEntry | null = null,
		readonly _children: DataTransferItem[] = []
	) {}

	webkitGetAsEntry(): FileSystemEntry | null {
		return this._entry;
	}

	getAsFile(): File | null {
		return this._entry instanceof MockFileSystemFileEntry
			? this._entry._file
			: null;
	}

	getAsString(_callback: (data: string) => void): void {
		throw new Error('Not implemented.');
	}
}

export function mockFile(name: string) {
	return new MockDataTransferItem(
		'file',
		'text/plain',
		new MockFileSystemFileEntry(name, createFile(name))
	);
}

export function mockNonFileOrDir(name: string) {
	return new MockDataTransferItem(
		'unknown',
		'unknown',
		new MockFileSystemEntry(name, false, false)
	);
}

export function mockString() {
	return new MockDataTransferItem('string', 'text/plain');
}

export function mockDir(name: string, children: DataTransferItem[]) {
	return new MockDataTransferItem(
		'file',
		'',
		new MockFileSystemDirectoryEntry(
			name,
			children
				.map((item) => item.webkitGetAsEntry())
				.filter((entry): entry is FileSystemEntry => !!entry)
		)
	);
}

export function mockTransfer(items: DataTransferItem[]): DataTransfer {
	return {
		items,
		files: items
			.map((item) => item.getAsFile())
			.filter((file): file is File => !!file),
	} as unknown as DataTransfer;
}

export function simulateNoItemsSupport(transfer: DataTransfer): DataTransfer {
	delete (transfer as any).items;
	return transfer;
}

const allItems = (transfer: DataTransfer) =>
	Array.from(transfer.items).flatMap(function collectItem(item: any) {
		return [item, ...item._children.flatMap(collectItem)];
	});

export function simulateNoWebkitGetAsEntrySupport(
	transfer: DataTransfer
): DataTransfer {
	for (const item of allItems(transfer)) {
		item.webkitGetAsEntry = null;
	}
	return transfer;
}

export function simulateWebkitGetAsEntryReturnsNull(
	transfer: DataTransfer
): DataTransfer {
	for (const item of allItems(transfer)) {
		item.webkitGetAsEntry = () => null;
	}
	return transfer;
}

export function simulateFileReadError(
	item: DataTransferItem,
	error: DOMException
) {
	(item as any)._entry.file = (
		_: unknown,
		errorCallback?: (error: DOMException) => void
	) => {
		setTimeout(() => {
			errorCallback?.(error);
		}, 0);
	};
	return item;
}

export function simulateDirReadError(
	item: DataTransferItem,
	error: DOMException
) {
	(item as any)._entry.createReader = () => ({
		readEntries: (
			_: unknown,
			errorCallback?: (error: DOMException) => void
		) => {
			setTimeout(() => {
				errorCallback?.(error);
			}, 0);
		},
	});
	return item;
}
