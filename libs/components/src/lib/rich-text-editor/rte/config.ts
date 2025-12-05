import { Schema } from 'prosemirror-model';
import type { Constructor } from '../../../shared/utils/mixins';
import { RteCoreImpl } from './features/core';
import { RteInstance, type RteInstanceOptions } from './instance';
import { RteFeature, RteFeatureImpl, sortedContributions } from './feature';
import { RteTextBlockStructureImpl } from './features/text-block';
import { RteFreeformStructureImpl } from './features/freeform';
import { TextblockAttrs } from './utils/textblock-attrs';
import { RteAlignmentFeatureImpl } from './features/alignment';
import { impl } from './utils/impl';

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
	featureMap: Map<Constructor<RteFeatureImpl>, RteFeatureImpl>;
	features: RteFeatureImpl[];

	constructor(featuresFacades: RteFeature[]) {
		const features = featuresFacades.map((f) => f[impl]);
		this.features = features.flatMap((f) => f.getFeatures());
		this.featureMap = new Map();

		for (const f of features) {
			const constr = f.constructor as Constructor<RteFeatureImpl>;
			if (this.featureMap.has(constr)) {
				throw new Error(`Duplicate feature: ${constr.name}`);
			}
			this.featureMap.set(constr, f);
		}

		if (!this.featureMap.has(RteCoreImpl)) {
			throw new Error('RteCore feature is required');
		}

		if (
			!this.featureMap.has(RteTextBlockStructureImpl) ===
			!this.featureMap.has(RteFreeformStructureImpl)
		) {
			throw new Error(
				'Either RteTextBlockStructure or RteFreeformStructure feature is required'
			);
		}

		if (
			this.featureMap.has(RteFreeformStructureImpl) &&
			this.featureMap.has(RteAlignmentFeatureImpl)
		) {
			throw new Error(
				'RteAlignmentFeature cannot be used with RteFreeformStructure'
			);
		}

		this.textblockAttrs = new TextblockAttrs(
			sortedContributions(features.flatMap((f) => f.getTextblockAttrs()))
		);

		const schemaContributions = sortedContributions(
			features.flatMap((f) => f.getSchema(this.textblockAttrs))
		);

		const schemaSpec = {
			nodes: {},
			marks: {},
		};

		for (const schema of schemaContributions) {
			Object.assign(schemaSpec.nodes, schema.nodes ?? {});
			Object.assign(schemaSpec.marks, schema.marks ?? {});
		}

		this.schema = new Schema(schemaSpec);
	}
}
