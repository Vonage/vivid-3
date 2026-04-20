import { createResolver } from '../types/resolver';
import { discoverComponents } from '../components/discover-components';
import { extractEventsFromHierarchy } from '../components/extractors/events';
import { extractVueModelsFromHierarchy } from '../components/extractors/vue-models';
import { extractMethodsFromHierarchy } from '../components/extractors/methods';
import { extractSlotsFromHierarchy } from '../components/extractors/slots';
import { extractTestUtilsFromHierarchy } from '../components/extractors/test-utils';
import { extractAccessorsFromHierarchy } from '../components/extractors/accessors';
import { extractPropertiesFromHierarchy } from '../components/extractors/properties';
import { extractAttrsFromHierarchy } from '../components/extractors/attrs';
import { resolveClassHierarchy } from '../components/class-hierarchy';
import type { Metadata } from './format';
import { traverseAliasChain } from '../types/alias-chain';
import { patchIcons } from './patch-icons';
import { ICONS_MANIFEST_URL } from '@vonage/vivid-icons';
import { getRegisterFunctionName } from '../components/register-function';
import { createMetadataTypeRenderer } from './render-type';
import { getDescription } from '../types/jsdoc';
import type { NodeId } from '../types/structure';
import { getSourceEntryPoints } from '../project/entry-points';
import path from 'node:path';
import { stableMetadata } from './stable-metadata';
import { propNameForAttribute } from '../components/attributes';
import { createProject } from '../project/create-project';
import { logger } from '@repo/tools';

export async function extractMetadata(packageRoot: string): Promise<Metadata> {
	const project = createProject(packageRoot);
	const ctx = createResolver(packageRoot);

	// Build up a map that tells us for a given node, if, from where, and under what name it is exported from Vivid
	const exportedAs = new Map<NodeId, string>();

	const entryPoints = await getSourceEntryPoints(packageRoot);

	// Vivid entry points are a mess, only use the main entry point for now
	const mainEntryPoint = entryPoints['.'];
	logger.debug(`Using entry point ${mainEntryPoint}`);
	const mainSourceFile = project.getSourceFile(
		path.join(packageRoot, mainEntryPoint)
	)!;
	const exportedSymbols = ctx.extractExportedSymbols(mainSourceFile);
	logger.debug(`Exported symbols for ${mainEntryPoint}:`);
	for (const symbol of exportedSymbols) {
		logger.debug(` - ${symbol.name}`);
	}
	for (const symbol of exportedSymbols) {
		traverseAliasChain(ctx.getNode, symbol, (id) => {
			exportedAs.set(id, `@vonage/vivid#${symbol.name}`);
			return false;
		});
	}

	const renderType = createMetadataTypeRenderer(exportedAs, ctx.getNode);

	const componentDefs = discoverComponents(project).map((component) => {
		const { name, className, classDeclaration, modulePath } = component;

		const hierarchy = resolveClassHierarchy(classDeclaration);
		logger.debug(`Class hierarchy of component: ${name}`);
		for (const entry of hierarchy) {
			logger.debug(
				` - ${entry.classDeclaration.getName()} : ${
					entry.isMixin ? `Mixin ${entry.mixinName}` : `Class`
				}`
			);
		}

		const attrs = extractAttrsFromHierarchy(hierarchy, ctx);
		const existingPropNames = new Set(
			attrs.map((a) => propNameForAttribute(a.attributeName, a.propertyName))
		);
		const properties = extractPropertiesFromHierarchy(hierarchy, ctx).filter(
			(p) => !existingPropNames.has(p.name)
		);
		const observables = properties.filter((p) => p.isObservable);
		const nonObservableProperties = properties.filter((p) => !p.isObservable);

		const accessors = extractAccessorsFromHierarchy(hierarchy, ctx).filter(
			(a) => !existingPropNames.has(a.name)
		);
		const setters = accessors.filter((a) => a.hasSetter);
		const readonlyGetters = accessors.filter(
			(a) => a.hasGetter && !a.hasSetter
		);

		const props = [
			...attrs.map((attr) => ({
				name: propNameForAttribute(attr.attributeName, attr.propertyName),
				description: attr.description,
				type: renderType(attr.type, true),
				attributeName: attr.attributeName,
				propertyName: attr.propertyName,
			})),
			...observables.map((obs) => ({
				name: obs.name,
				description: obs.description,
				type: renderType(obs.type, true),
				propertyName: obs.name,
			})),
			...setters.map((setter) => ({
				name: setter.name,
				description: setter.description,
				type: renderType(setter.type, true),
				propertyName: setter.name,
			})),
		];

		// Properties that are read-only (e.g. select.length) aren't props since they can not be set
		// We would still want to show them in the docs
		// Non-observable properties should maybe be props, but currently they are mostly mistakes
		const domOnlyProperties = [
			...readonlyGetters.map((getter) => ({
				name: getter.name,
				type: renderType(getter.type),
				readonly: true,
			})),
			...nonObservableProperties.map((prop) => ({
				name: prop.name,
				type: renderType(prop.type),
				readonly: false,
			})),
		];
		if (domOnlyProperties.length) {
			logger.debug(`Ignoring DOM only properties of component ${name}:`);
			for (const prop of domOnlyProperties) {
				logger.debug(` - ${prop.name}${prop.readonly ? ' (readonly)' : ''}`);
			}
		}

		const methods = extractMethodsFromHierarchy(hierarchy, ctx).map((m) => ({
			name: m.name,
			description: m.description,
			args: m.args.map((a) => ({
				name: a.name,
				type: renderType(a.type),
			})),
			returnType: renderType(m.returnType),
		}));

		const registerFunctionName = getRegisterFunctionName(modulePath);

		return {
			name,
			className,
			registerFunctionName,
			description: getDescription(classDeclaration) ?? '',
			props,
			events: extractEventsFromHierarchy(hierarchy),
			vueModels: extractVueModelsFromHierarchy(hierarchy),
			methods,
			slots: extractSlotsFromHierarchy(hierarchy),
			testUtils: extractTestUtilsFromHierarchy(hierarchy),
		};
	});

	const metadata: Metadata = {
		componentDefs,
		iconsManifestUrl: ICONS_MANIFEST_URL,
	};

	return stableMetadata(patchIcons(metadata));
}
