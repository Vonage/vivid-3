import type { ComponentDef } from '@repo/metadata-extractor';

/**
 * Returns the Vue prop name for the modifiers object of a v-model.
 * Vue 3 uses `modelModifiers` for the default v-model (name === 'modelValue')
 * and `${name}Modifiers` for named v-models.
 */
export const modifiersPropName = (modelName: string) =>
	modelName === 'modelValue' ? 'modelModifiers' : `${modelName}Modifiers`;

export const resolveVueModels = (componentDef: ComponentDef) => {
	// Filter out props that are overshadowed by v-model name
	const props = componentDef.props.filter(
		({ name }) =>
			!componentDef.vueModels.some(
				(model) => model.name === name && model.propName !== name
			)
	);

	// Find v-models and their corresponding prop and event
	const vueModels = componentDef.vueModels.map((model) => {
		const prop = componentDef.props.find(
			(prop) => prop.name === model.propName
		);
		if (!prop) throw new Error(`v-model prop not found: ${model.propName}`);
		for (const eventName of model.eventNames) {
			const event = componentDef.events.find((e) => e.name === eventName);
			if (!event) throw new Error(`v-model event not found: ${eventName}`);
		}
		if (model.lazyEventNames) {
			for (const lazyEventName of model.lazyEventNames) {
				const lazyEvent = componentDef.events.find(
					(e) => e.name === lazyEventName
				);
				if (!lazyEvent)
					throw new Error(`v-model lazy event not found: ${lazyEventName}`);
			}
		}

		return {
			...model,
			prop,
		};
	});

	const vueModelEvents = vueModels.map((vueModel) => ({
		name: `update:${vueModel.name}`,
		description: `Fires when the ${vueModel.name} value changes`,
		type: vueModel.prop.type,
	}));

	return { props, vueModels, vueModelEvents };
};
