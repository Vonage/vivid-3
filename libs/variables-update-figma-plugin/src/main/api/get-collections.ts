export interface Collection {
	name: string;
	id: string;
}

export async function getCollections(): Promise<Collection[]> {
	const collections = await figma.variables.getLocalVariableCollectionsAsync();
	const collectionsPayload = collections.map((coll) => ({
		name: coll.name,
		id: coll.id,
	}));

	return collectionsPayload;
}
