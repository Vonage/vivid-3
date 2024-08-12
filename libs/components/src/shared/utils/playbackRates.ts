/**
 * Parses a playback rates string like '0.5, 1, 1.5, 2'
 */
export function getPlaybackRatesArray(playbackRates: string): number[] {
	if (playbackRates === '') return [];
	const ratesArray: number[] = [];

	playbackRates.split(',').forEach((numStr: string) => {
		const num = Number(numStr);
		if (!isNaN(num)) ratesArray.push(num);
	});
	return ratesArray;
}
