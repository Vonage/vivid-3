export async function createMode(
	collectionId: string,
	modeName: string
): Promise<string> {
	const collection =
		await figma.variables.getVariableCollectionByIdAsync(collectionId);

	if (!collection) {
		throw `Couldn't find collection with ${collectionId} id!`;
	}

	const newModeId = collection.addMode(modeName);
	return newModeId;
}
