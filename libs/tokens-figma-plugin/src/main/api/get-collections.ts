export interface CollectionData {
	id: string;
	name: string;
}

export const getCollections = async (): Promise<CollectionData[]> => {
	const collections = await figma.variables.getLocalVariableCollectionsAsync();

	return collections.map((collection) => ({
		name: collection.name,
		id: collection.id,
	}));
};
