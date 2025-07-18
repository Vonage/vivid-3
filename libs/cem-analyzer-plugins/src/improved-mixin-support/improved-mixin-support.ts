import {
	extractMixinNodes,
	isMixin,
} from '@custom-elements-manifest/analyzer/src/utils/mixins.js';
import type {
	AnalyzePhaseParams,
	ModuleLinkPhaseParams,
	Plugin,
} from '@custom-elements-manifest/analyzer';

type ImprovedMixinSupportContext = {
	context: {
		mixinClassNames: Record<string, string>;
	};
};

/**
 * This plugin makes certain features (e.g. @attr/@event/@slot) work with mixins.
 * The analyzer has built in support for mixins, but it is flawed: the mixin declaration is created from the inner
 * class when the mixin is first encountered. That means that later plugins, like the @attr decorator plugin, will
 * not update the mixin. However, the inner class is still present in the moduleDoc and will be updated with the
 * attribute. The inner class is later dropped from the manifest as it is not exported. This plugin copies the
 * updated declarations from the inner class to the mixin before that happens.
 */
export const improvedMixinSupportPlugin = (): Plugin => ({
	name: 'improved-mixin-support',
	analyzePhase({
		ts,
		node,
		context,
	}: AnalyzePhaseParams & ImprovedMixinSupportContext) {
		switch (node.kind) {
			case ts.SyntaxKind.VariableStatement:
			case ts.SyntaxKind.FunctionDeclaration:
				if (isMixin(node)) {
					const { mixinFunction, mixinClass } = extractMixinNodes(node);
					const mixinName =
						mixinFunction?.name?.getText() ||
						mixinFunction?.parent?.name?.getText() ||
						mixinFunction?.declarationList?.declarations?.[0]?.name?.getText() ||
						'';
					// When we encounter a mixin, store the class name so that we can associate it with the mixin later
					context.mixinClassNames = context.mixinClassNames ?? {};
					context.mixinClassNames[mixinName] = mixinClass.name.getText();
				}
				break;
		}
	},
	moduleLinkPhase({
		moduleDoc,
		context,
	}: ModuleLinkPhaseParams & ImprovedMixinSupportContext) {
		for (const declaration of moduleDoc.declarations ?? []) {
			if (declaration.kind === 'mixin') {
				const mixinClassName = context.mixinClassNames[declaration.name];
				const mixinClass = moduleDoc.declarations!.find(
					(d) => d.kind === 'class' && d.name === mixinClassName
				) as any;
				Object.assign(declaration, {
					members: mixinClass.members,
					attributes: mixinClass.attributes,
					events: mixinClass.events,
					slots: mixinClass.slots,
				});
				if (mixinClass.vividTesting) {
					Object.assign(declaration, {
						vividTesting: mixinClass.vividTesting,
					});
				}
			}
		}
	},
});
