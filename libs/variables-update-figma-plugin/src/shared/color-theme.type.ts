// import { equalAround } from '@shared/steps.util'

import { equalAround, equalBetween } from '@shared/steps.util';

export interface Scale<N extends string = string> {
	name: N;
	baseColor: string;
	hueOverrides: number[];
	chromaOverrides: number[];
}

export interface ThemeConfig {
	name: string;
	steps: number[];
	isDarkMode: boolean;
	colors: [
		Scale<'neutral'>,
		Scale<'accent'>,
		Scale<'cta'>,
		Scale<'announcement'>,
		Scale<'success'>,
		Scale<'warning'>,
		Scale<'alert'>,
		Scale<'information'>,
	];
}
// const s = [0, 1*8.333, 2 * 8.33, 3*8.333, 4*8.333, 5*8.333, 50, 7*8.333, 8*8.333, 9*8.333, 10*8.333, 11*8.333, 100]
// const s = equalAround(0, 100, 13).map(Math.round);
const s = equalBetween(4, 96, 13).map(Math.round);
// console.log( equalAround(0, 100, 13) )

export const themeTemplate: ThemeConfig = {
	name: 'default',
	steps: s,
	isDarkMode: false,

	colors: [
		{
			name: 'neutral',
			baseColor: '#858585',
			hueOverrides: [],
			chromaOverrides: [],
		},

		{
			name: 'accent',
			baseColor: '#858585',
			hueOverrides: [],
			chromaOverrides: [],
		},

		{
			name: 'cta',
			baseColor: '#871EFF',
			hueOverrides: [],
			chromaOverrides: [],
		},
		{
			name: 'announcement',
			baseColor: '#D6219C',
			hueOverrides: [],
			chromaOverrides: [],
		},

		{
			name: 'success',
			baseColor: '#167629',
			hueOverrides: [],
			chromaOverrides: [],
		},
		{
			name: 'warning',
			baseColor: '#ffdc07',
			hueOverrides: [],
			chromaOverrides: [],
		},
		{
			name: 'alert',
			baseColor: '#CD0D0D',
			hueOverrides: [],
			chromaOverrides: [],
		},
		{
			name: 'information',
			baseColor: '#0E65C2',
			hueOverrides: [],
			chromaOverrides: [],
		},
	],
};

// export const themeTemplate: Theme = [
//   // ['background', '#ffffff'],
//   ['neutral', '#858585', [], []],
//
//   ['accent', '#871EFF', [], []],
//   ['announcement', '#D6219C', [], []],
//
//   ['success', '#167629', [], []],
//   ['warning', '#ffdc07', [], []],
//   ['error', '#CD0D0D', [], []],
//   ['info', '#0E65C2', [], []]
// ]
