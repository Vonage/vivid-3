export async function createCollection(
	collectionName: string
): Promise<string> {
	const newCollection =
		figma.variables.createVariableCollection(collectionName);
	return newCollection.id;
}
