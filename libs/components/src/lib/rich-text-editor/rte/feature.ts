import type { SchemaSpec } from 'prosemirror-model';
import type { Plugin } from 'prosemirror-state';
import type { RTEInstance } from './instance';
import type { ToolbarItemSpec } from './utils/toolbar-items';
import {
	TextblockAttrs,
	type TextblockAttrSpec,
} from './utils/textblock-attrs';

// Features bundle everything related to a specific editor capability together.
// They can contribute styles, schema additions, ProseMirror plugins, toolbar items, etc.

/**
 * Since features are provided in any order, their individual contributions need to be ordered.
 * Order is often important, e.g. which keyboard shortcut takes precedence, or the order of toolbar items.
 * It can also matter in unexpected ways, e.g. the order of schema additions affects how content is rendered to HTML.
 * Therefore, each contribution has a priority and if priorities are equal, feature name is used to ensure a deterministic order.
 */
type Contribution<T> = {
	priority: number;
	featureName: string;
	value: T;
};

export const sortedContributions = <T>(
	contributions: Contribution<T>[]
): T[] => {
	return contributions
		.sort((a, b) => {
			const priorityDelta = a.priority - b.priority;
			if (priorityDelta !== 0) {
				return priorityDelta;
			}
			if (a.featureName === b.featureName) {
				return 0;
			}
			return a.featureName > b.featureName ? 1 : -1;
		})
		.map((c) => c.value);
};

export const contributionPriority = {
	highest: -20,
	high: -10,
	default: 0,
	low: 10,
	lowest: 20,
};

export type StyleContribution = Contribution<string>;
export type SchemaContribution = Contribution<Partial<SchemaSpec>>;
export type TextblockAttrContribution = Contribution<TextblockAttrSpec>;
export type PluginContribution = Contribution<Plugin>;
export type ToolbarItemContribution = Contribution<ToolbarItemSpec>;

export abstract class RTEFeature {
	/**
	 * The name of the feature, e.g. RTEBoldFeature
	 * Note: Cannot use this.constructor.name because it may be minified
	 */
	protected abstract name: string;

	/**
	 * Creates a contribution of this feature.
	 */
	protected contribution<T>(value: T, order?: number): Contribution<T> {
		return {
			featureName: this.name,
			priority: order ?? contributionPriority.default,
			value,
		};
	}

	getStyles(): StyleContribution[] {
		return [];
	}

	getSchema(textblockAttrs: TextblockAttrs): SchemaContribution[] {
		return [];
	}

	getTextblockAttrs(): TextblockAttrContribution[] {
		return [];
	}

	getPlugins(rte: RTEInstance): PluginContribution[] {
		return [];
	}

	getToolbarItems(rte: RTEInstance): ToolbarItemContribution[] {
		return [];
	}

	// A feature may include additional features for better organization.
	getFeatures(): RTEFeature[] {
		return [this];
	}
}
