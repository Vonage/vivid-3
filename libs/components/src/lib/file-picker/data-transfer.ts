/**
 * Extracts files from a DataTransfer, including files from directories.
 */
export async function filesFromDataTransfer(
	dataTransfer: DataTransfer
): Promise<File[]> {
	// To support folder drop, we need to use dataTransfer.items when supported
	const browserSupportFolderDrop =
		dataTransfer.items?.[0]?.webkitGetAsEntry != null;
	return browserSupportFolderDrop
		? await filesFromDataTransferItems(dataTransfer.items)
		: Array.from(dataTransfer.files);
}

async function filesFromDataTransferItems(
	items: DataTransferItemList
): Promise<File[]> {
	const result: Array<Promise<File[]>> = [];

	for (const item of items) {
		const file = item.getAsFile(); // For top level files, prefer getAsFile which is more reliable
		if (file) {
			result.push(Promise.resolve([file]));
		} else {
			const entry = item.webkitGetAsEntry();
			if (entry) {
				// Note: cannot await here as DataTransfer needs to be processed synchronously
				result.push(filesFromEntry(entry, false));
			}
		}
	}

	return (await Promise.all(result)).flat();
}

const filesFromEntry = (
	entry: FileSystemEntry,
	ignoreHiddenFiles: boolean
): Promise<File[]> => {
	const handleFileEntry = (file: FileSystemFileEntry): Promise<File[]> =>
		new Promise((resolve, reject) => {
			file.file((f) => {
				if (ignoreHiddenFiles && f.name.substring(0, 1) === '.') {
					resolve([]);
				} else {
					resolve([f]);
				}
			}, reject);
		});

	const promise = entry.isFile
		? handleFileEntry(entry as FileSystemFileEntry)
		: entry.isDirectory
		? filesFromDirectory(entry as FileSystemDirectoryEntry)
		: Promise.resolve([]);
	promise.catch(() => null); // Prevent unhandled promise rejection as promise may reject before handlers are attached
	return promise;
};

const filesFromDirectory = async (
	directory: FileSystemDirectoryEntry
): Promise<File[]> =>
	new Promise((resolve, reject) => {
		const result: Array<Promise<File[]>> = [];
		const dirReader = directory.createReader();

		const readEntries = () => {
			dirReader.readEntries((entries) => {
				for (const entry of entries) {
					result.push(filesFromEntry(entry, true));
				}

				// readEntries() must be called until it returns an empty array
				if (entries.length) {
					readEntries();
				} else {
					resolve(Promise.all(result).then((r) => r.flat()));
				}
			}, reject);
		};

		readEntries();
	});
