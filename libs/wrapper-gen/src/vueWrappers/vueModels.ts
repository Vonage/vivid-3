import { ComponentDef } from '../common/ComponentDef';

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
