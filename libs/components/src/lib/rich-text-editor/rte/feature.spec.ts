import { RTEFeature } from './feature';
import type { RTEInstance } from './instance';
import { TextblockAttrs } from './utils/textblock-attrs';

describe('RTEFeature', () => {
	it('should have default stub implementations for all methods', () => {
		class TestFeature extends RTEFeature {}
		const feature = new TestFeature();

		expect(feature.getStyles()).toEqual([]);
		expect(feature.getSchema(new TextblockAttrs([]))).toEqual([]);
		expect(feature.getPlugins({} as RTEInstance)).toEqual([]);
		expect(feature.getToolbarItems({} as RTEInstance)).toEqual([]);
		expect(feature.getFeatures()).toEqual([feature]);
	});
});
