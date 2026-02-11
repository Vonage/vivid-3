import { Schema } from 'prosemirror-model';
import type { Constructor } from '../../../shared/utils/mixins';
import { RteInstance, type RteInstanceOptions } from './instance';
import {
	getFeatureImpl,
	RteFeature,
	RteFeatureImpl,
	sortedContributions,
} from './feature';
import { TextblockAttrs } from './utils/textblock-attrs';
import { impl } from './utils/impl';
import { TextblockMarks } from './utils/textblock-marks';
import type { RteDocument } from './document';
import { convertToView, type RteView, type RteViewOptions } from './view';

export class RteConfig {
	/// @internal
	[impl]: RteConfigImpl;

	constructor(features: RteFeature[]) {
		this[impl] = new RteConfigImpl(features);
	}

	instantiateEditor(options?: RteInstanceOptions): RteInstance {
		return new RteInstance(this, options);
	}

	instantiateView(document: RteDocument, options?: RteViewOptions): RteView {
		return convertToView(document, { config: this, options: { ...options } });
	}
}

export class RteConfigImpl {
	schema: Schema;
	textblockAttrs: TextblockAttrs;
	textblockMarks: TextblockMarks;
	featureFacadesMap: Map<Constructor<RteFeature>, RteFeatureImpl[]>;
	featureMap: Map<string, RteFeatureImpl>;
	features: RteFeatureImpl[];

	constructor(featuresFacades: RteFeature[]) {
		const resolveFeatures = (features: RteFeatureImpl[]): RteFeatureImpl[] =>
			features.flatMap((f) =>
				f
					.getFeatures()
					.flatMap((subFeature) =>
						subFeature === f ? f : resolveFeatures([subFeature])
					)
			);
		this.features = resolveFeatures(featuresFacades.map(getFeatureImpl));
		this.featureMap = new Map();

		for (const f of this.features) {
			if (this.featureMap.has(f.name)) {
				throw new Error(`Duplicate feature: ${f.name}`);
			}
			this.featureMap.set(f.name, f);
		}

		this.featureFacadesMap = new Map();
		for (const facade of featuresFacades) {
			const FacadeClass = facade.constructor as Constructor<RteFeature>;
			const feature = getFeatureImpl(facade);

			const instances = this.featureFacadesMap.get(FacadeClass);
			if (instances) {
				instances.push(feature);
			} else {
				this.featureFacadesMap.set(FacadeClass, [feature]);
			}
		}

		if (!this.featureMap.has('RteBase')) {
			throw new Error('RteBase feature is required');
		}

		if (
			this.featureMap.has('RteLinkFeature') &&
			!this.featureMap.has('RteToolbarFeature')
		) {
			throw new Error('RteToolbarFeature is required for RteLinkFeature');
		}

		this.textblockAttrs = new TextblockAttrs(
			sortedContributions(this.features.flatMap((f) => f.getTextblockAttrs()))
		);
		this.textblockMarks = new TextblockMarks(
			sortedContributions(this.features.flatMap((f) => f.getTextblockMarks()))
		);

		const schemaContributions = sortedContributions(
			this.features.flatMap((f) =>
				f.getSchema(this.textblockAttrs, this.textblockMarks)
			)
		);

		const schemaSpec = {
			nodes: {},
			marks: {},
		};

		for (const schema of schemaContributions) {
			Object.assign(schemaSpec.nodes, schema.nodes ?? {});
			Object.assign(schemaSpec.marks, schema.marks ?? {});
		}

		for (const referencedNodeName of this.textblockMarks.getReferencedNodeNames()) {
			if (!(referencedNodeName in schemaSpec.nodes)) {
				throw new Error(`Unknown node "${referencedNodeName}"`);
			}
		}

		this.schema = new Schema(schemaSpec);
	}
}
