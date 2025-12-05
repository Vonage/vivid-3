import { RteFeatureImpl } from './feature';
import type { RteInstanceImpl } from './instance';
import { TextblockAttrs } from './utils/textblock-attrs';
import { TextblockMarks } from './utils/textblock-marks';

describe('RteFeature', () => {
	it('should have default stub implementations for all methods', () => {
		class TestFeature extends RteFeatureImpl {
			name = 'TestFeature';
		}
		const feature = new TestFeature();

		expect(feature.getStyles()).toEqual([]);
		expect(
			feature.getSchema(new TextblockAttrs([]), new TextblockMarks([]))
		).toEqual([]);
		expect(feature.getPlugins({} as RteInstanceImpl)).toEqual([]);
		expect(feature.getToolbarItems({} as RteInstanceImpl)).toEqual([]);
		expect(feature.getFeatures()).toEqual([feature]);
	});
});
