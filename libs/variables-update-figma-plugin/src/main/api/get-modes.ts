export interface Mode {
	name: string;
	id: string;
	default: boolean;
}

export async function getModes(collectionId: string): Promise<Mode[]> {
	const collection =
		await figma.variables.getVariableCollectionByIdAsync(collectionId);

	if (!collection) {
		return [];
	}

	const defaultModeId = collection.defaultModeId;
	const modesPayload = Object.values(collection.modes).map((mode) => {
		return {
			name: mode.name,
			id: mode.modeId,
			default: mode.modeId === defaultModeId,
		};
	});

	return modesPayload;
}
