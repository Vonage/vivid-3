import { Schema } from 'prosemirror-model';
import type { Constructor } from '../../../shared/utils/mixins';
import { RTECoreImpl } from './features/core';
import { RTEInstance, type RTEInstanceOptions } from './instance';
import { RTEFeature, RTEFeatureImpl, sortedContributions } from './feature';
import { RTETextBlockStructureImpl } from './features/text-block';
import { RTEFreeformStructureImpl } from './features/freeform';
import { TextblockAttrs } from './utils/textblock-attrs';
import { RTEAlignmentFeatureImpl } from './features/alignment';
import { impl } from './utils/impl';

export class RTEConfig {
	/// @internal
	[impl]: RTEConfigImpl;

	constructor(features: RTEFeature[]) {
		this[impl] = new RTEConfigImpl(features);
	}

	instantiateEditor(options?: RTEInstanceOptions): RTEInstance {
		return new RTEInstance(this, options);
	}
}

export class RTEConfigImpl {
	schema: Schema;
	textblockAttrs: TextblockAttrs;
	featureMap: Map<Constructor<RTEFeatureImpl>, RTEFeatureImpl>;
	features: RTEFeatureImpl[];

	constructor(featuresFacades: RTEFeature[]) {
		const features = featuresFacades.map((f) => f[impl]);
		this.features = features.flatMap((f) => f.getFeatures());
		this.featureMap = new Map();

		for (const f of features) {
			const constr = f.constructor as Constructor<RTEFeatureImpl>;
			if (this.featureMap.has(constr)) {
				throw new Error(`Duplicate feature: ${constr.name}`);
			}
			this.featureMap.set(constr, f);
		}

		if (!this.featureMap.has(RTECoreImpl)) {
			throw new Error('RTECore feature is required');
		}

		if (
			!this.featureMap.has(RTETextBlockStructureImpl) ===
			!this.featureMap.has(RTEFreeformStructureImpl)
		) {
			throw new Error(
				'Either RTETextBlockStructure or RTEFreeformStructure feature is required'
			);
		}

		if (
			this.featureMap.has(RTEFreeformStructureImpl) &&
			this.featureMap.has(RTEAlignmentFeatureImpl)
		) {
			throw new Error(
				'RTEAlignmentFeature cannot be used with RTEFreeformStructure'
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
