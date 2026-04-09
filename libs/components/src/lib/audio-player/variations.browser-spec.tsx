import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { audioPlayerDefinition } from './definition';

const AudioPlayer = component(audioPlayerDefinition);

// Tiny silent WAV (100 samples, 8kHz, mono, 8-bit PCM) used as src so that
// the audio player reports a valid duration and renders in its enabled state.
const silenceDataUrl =
	'data:audio/wav;base64,UklGRogAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWQAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA';

variationTest(
	'audio-player',
	table({
		caption: 'Layout',
		xAxis: {
			'skip-by': {
				none: null,
				'5s': '5',
				'10s': '10',
				'30s': '30',
			},
		},
		yAxis: {
			extras: {
				default: {},
				notime: { notime: true },
				'playback-rates': { 'playback-rates': '0.5,1,1.5,2' },
			},
		},
		render: (variant) => (
			<AudioPlayer
				src={silenceDataUrl}
				style="inline-size: 500px"
				{...flattenAttrs(variant)}
			/>
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			connotation: {
				accent: 'accent',
				cta: 'cta',
			},
		},
		yAxis: {
			disabled: { default: false, disabled: true },
		},
		render: (variant) => (
			<AudioPlayer
				src={silenceDataUrl}
				style="inline-size: 500px"
				skip-by="10"
				playback-rates="0.5,1,1.5,2"
				{...flattenAttrs(variant)}
			/>
		),
	})
);
