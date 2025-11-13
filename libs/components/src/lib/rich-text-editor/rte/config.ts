import { DOMParser, DOMSerializer, Schema } from 'prosemirror-model';
import type { Constructor } from '../../../shared/utils/mixins';
import { RTECore } from './features/core';
import { RTEInstance } from './instance';
import { RTEFeature } from './feature';
import type { RTEDocument } from './document';
import { RTETextBlockStructure } from './features/text-block';
import { RTEFreeformStructure } from './features/freeform';
import { TextblockAttrs } from './utils/textblock-attrs';
import { RTEAlignmentFeature } from './features/alignment';

export class RTEConfig {
	schema: Schema;
	textblockAttrs: TextblockAttrs;
	featureMap: Map<Constructor<RTEFeature>, RTEFeature>;
	features: RTEFeature[];

	constructor(features: RTEFeature[]) {
		this.features = features.flatMap((f) => f.getFeatures());
		this.featureMap = new Map();

		for (const f of features) {
			const constr = f.constructor as Constructor<RTEFeature>;
			if (this.featureMap.has(constr)) {
				throw new Error(`Duplicate feature: ${constr.name}`);
			}
			this.featureMap.set(constr, f);
		}

		if (!this.featureMap.has(RTECore)) {
			throw new Error('RTECore feature is required');
		}

		if (
			!this.featureMap.has(RTETextBlockStructure) ===
			!this.featureMap.has(RTEFreeformStructure)
		) {
			throw new Error(
				'Either RTETextBlockStructure or RTEFreeformStructure feature is required'
			);
		}

		if (
			this.featureMap.has(RTEFreeformStructure) &&
			this.featureMap.has(RTEAlignmentFeature)
		) {
			throw new Error(
				'RTEAlignmentFeature cannot be used with RTEFreeformStructure'
			);
		}

		this.textblockAttrs = new TextblockAttrs(
			features.flatMap((f) => f.getTextblockAttrs())
		);

		const schemaContributions = features
			.flatMap((f) => f.getSchema(this.textblockAttrs))
			.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

		const schemaSpec = {
			nodes: {},
			marks: {},
		};

		for (const { schema } of schemaContributions) {
			Object.assign(schemaSpec.nodes, schema.nodes ?? {});
			Object.assign(schemaSpec.marks, schema.marks ?? {});
		}

		this.schema = new Schema(schemaSpec);
	}

	parseHTML(html: string): RTEDocument {
		const parser = DOMParser.fromSchema(this.schema);
		return parser
			.parse(new window.DOMParser().parseFromString(html, 'text/html').body)
			.toJSON().content;
	}

	toHTML(doc: RTEDocument): string {
		const serializer = DOMSerializer.fromSchema(this.schema);
		const node = this.schema.nodeFromJSON({
			type: 'doc',
			content: doc,
		});
		const container = document.createElement('div');
		container.appendChild(serializer.serializeFragment(node.content));
		return container.innerHTML;
	}

	instantiateEditor(initialDoc?: RTEDocument) {
		return new RTEInstance(this, initialDoc);
	}
}
