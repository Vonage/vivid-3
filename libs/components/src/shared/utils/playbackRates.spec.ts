import { getPlaybackRatesArray } from './playbackRates';

describe('getPlaybackRatesArray', () => {
	it('should return an empty array if the playbackRates string is empty', () => {
		expect(getPlaybackRatesArray('')).toEqual([]);
	});

	it('should return an array of numbers from the playbackRates string', () => {
		expect(getPlaybackRatesArray('0.5, 1, 1.5, 2')).toEqual([0.5, 1, 1.5, 2]);
	});

	it('should ignore invalid numbers in the playbackRates string', () => {
		expect(getPlaybackRatesArray('0.5, foo, 1, 1.5, 2')).toEqual([
			0.5, 1, 1.5, 2,
		]);
	});
});
