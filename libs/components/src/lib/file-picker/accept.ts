/**
 * Match a file against an accept string, like native file input
 */
export function isAcceptedFileType(file: File, accept: string | undefined) {
	if (!accept) {
		return true;
	}

	const validTypes = accept.split(',');

	// E.g. 'image/*'
	const isBasePattern = (type: string) => /\/\*$/.test(type);
	// E.g. 'image/png' -> 'image'
	const baseType = (type: string) => type.replace(/\/.*$/, '');

	for (let validType of validTypes) {
		validType = validType.trim();
		if (validType.charAt(0) === '.') {
			if (file.name.toLowerCase().endsWith(validType.toLowerCase())) {
				return true;
			}
		} else if (isBasePattern(validType)) {
			if (baseType(file.type) === baseType(validType)) {
				return true;
			}
		} else {
			if (file.type === validType) {
				return true;
			}
		}
	}

	return false;
}
