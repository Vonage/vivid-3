import { RteFeatureImpl } from './feature';
import type { RteInstanceImpl } from './instance';
import { TextblockAttrs } from './utils/textblock-attrs';

describe('RteFeature', () => {
	it('should have default stub implementations for all methods', () => {
		class TestFeature extends RteFeatureImpl {
			name = 'TestFeature';
		}
		const feature = new TestFeature();

		expect(feature.getStyles()).toEqual([]);
		expect(feature.getSchema(new TextblockAttrs([]))).toEqual([]);
		expect(feature.getPlugins({} as RteInstanceImpl)).toEqual([]);
		expect(feature.getToolbarItems({} as RteInstanceImpl)).toEqual([]);
		expect(feature.getFeatures()).toEqual([feature]);
	});
});
