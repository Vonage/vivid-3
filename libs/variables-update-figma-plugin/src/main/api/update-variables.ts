import { createCollection } from '@main/api/create-collection';
import { createMode } from '@main/api/create-mode';
import { getValue } from '@main/utils/get-value.util';
import { iterateTokens } from '@main/utils/iterate-tokens.util';
import { parseJson } from '@main/utils/parse-json.util';
import { resolveVariableType } from '@main/utils/resolve-variable-type.util';
import type { SelectedCollection } from '@ui/CollectionSelect';
import type { SelectedMode } from '@ui/ModeSelector';
import type { JSONTokenTree } from 'design-tokens-format-module';

export interface UpdateVariablesOptions {
	createMissing: boolean;
}

export async function updateVariables(
	selectedCollection: SelectedCollection,
	selectedMode: SelectedMode | undefined,
	json: string,
	options?: UpdateVariablesOptions
) {
	let collectionId = selectedCollection.id;
	let modeId = selectedMode ? selectedMode.id : undefined;

	if (collectionId === 'new') {
		collectionId = await createCollection(selectedCollection.name);
	}

	const currentCollection =
		await figma.variables.getVariableCollectionByIdAsync(collectionId);

	if (!currentCollection) throw new Error('Collection not found!');

	if (modeId === undefined && currentCollection) {
		modeId = currentCollection.defaultModeId;
	}

	if (modeId === 'new' && selectedMode) {
		modeId = await createMode(collectionId, selectedMode.name);
	}

	const tokens = parseJson<JSONTokenTree>(json);

	if (!tokens) throw new Error(`Couldn't parse json!`);

	const updates = new Map(iterateTokens(tokens));

	for (const variableId of currentCollection.variableIds) {
		const currentVariable =
			await figma.variables.getVariableByIdAsync(variableId);

		if (!currentVariable) continue;
		const update = updates.get(currentVariable.name);

		if (!update) continue;

		const value: VariableValue | undefined = await getValue(update);
		updates.delete(currentVariable.name);

		if (value === undefined) continue;

		currentVariable.setValueForMode(modeId, value);
	}

	if (options && !options.createMissing) return;

	for (const [variableName, token] of updates) {
		const variableType = resolveVariableType(token);
		if (!variableType) continue;
		const newVariable = figma.variables.createVariable(
			variableName,
			currentCollection,
			variableType
		);

		const value: VariableValue | undefined = await getValue(token);
		updates.delete(variableName);

		if (value === undefined) continue;
		newVariable.setValueForMode(modeId, value);
	}

	if (updates.size > 0) {
		console.error('there are still some updates left!', updates);
	}
}
