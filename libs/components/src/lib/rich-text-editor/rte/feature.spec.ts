import { RTEFeatureImpl } from './feature';
import type { RTEInstanceImpl } from './instance';
import { TextblockAttrs } from './utils/textblock-attrs';

describe('RTEFeature', () => {
	it('should have default stub implementations for all methods', () => {
		class TestFeature extends RTEFeatureImpl {
			name = 'TestFeature';
		}
		const feature = new TestFeature();

		expect(feature.getStyles()).toEqual([]);
		expect(feature.getSchema(new TextblockAttrs([]))).toEqual([]);
		expect(feature.getPlugins({} as RTEInstanceImpl)).toEqual([]);
		expect(feature.getToolbarItems({} as RTEInstanceImpl)).toEqual([]);
		expect(feature.getFeatures()).toEqual([feature]);
	});
});
