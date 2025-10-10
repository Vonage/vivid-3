import type { SchemaSpec } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import type { RTEInstance } from './instance';
import type { ToolbarItemSpec } from './utils/toolbar-items';

// Since features are provided in any order, their contributions need to allow ordering in case it is relevant.

export type StyleContribution = {
	order?: number;
	css: string;
};

export type SchemaContribution = {
	order?: number;
	schema: Partial<SchemaSpec>;
};

export type PluginContribution = {
	order?: number;
	plugin: Plugin;
};

export abstract class RTEFeature {
	getStyles(): StyleContribution[] {
		return [];
	}

	getSchema(): SchemaContribution[] {
		return [];
	}

	getPlugins(rte: RTEInstance): PluginContribution[] {
		return [];
	}

	getToolbarItems(rte: RTEInstance): ToolbarItemSpec[] {
		return [];
	}

	// A feature may include additional features for better organization.
	getFeatures(): RTEFeature[] {
		return [this];
	}
}
