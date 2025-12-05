import { Schema } from 'prosemirror-model';
import type { Constructor } from '../../../shared/utils/mixins';
import { RteBaseImpl } from './features/base';
import { RteInstance, type RteInstanceOptions } from './instance';
import { RteFeature, RteFeatureImpl, sortedContributions } from './feature';
import { TextblockAttrs } from './utils/textblock-attrs';
import { impl } from './utils/impl';
import { TextblockMarks } from './utils/textblock-marks';
import { RteLinkFeatureImpl } from './features/link';
import { RteToolbarFeatureImpl } from './features/toolbar';

export class RteConfig {
	/// @internal
	[impl]: RteConfigImpl;

	constructor(features: RteFeature[]) {
		this[impl] = new RteConfigImpl(features);
	}

	instantiateEditor(options?: RteInstanceOptions): RteInstance {
		return new RteInstance(this, options);
	}
}

export class RteConfigImpl {
	schema: Schema;
	textblockAttrs: TextblockAttrs;
	textblockMarks: TextblockMarks;
	featureMap: Map<Constructor<RteFeatureImpl>, RteFeatureImpl>;
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
		this.features = resolveFeatures(featuresFacades.map((f) => f[impl]));
		this.featureMap = new Map();

		for (const f of this.features) {
			const constr = f.constructor as Constructor<RteFeatureImpl>;
			if (this.featureMap.has(constr)) {
				throw new Error(`Duplicate feature: ${constr.name}`);
			}
			this.featureMap.set(constr, f);
		}

		if (!this.featureMap.has(RteBaseImpl)) {
			throw new Error('RteBase feature is required');
		}

		if (
			this.featureMap.has(RteLinkFeatureImpl) &&
			!this.featureMap.has(RteToolbarFeatureImpl)
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
