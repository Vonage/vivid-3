import type { RteFontSizeFeatureConfig } from '../features/font-size';

export const basicFontSizeOptions: RteFontSizeFeatureConfig = {
	options: [
		{ size: '24px', label: 'Extra Large' },
		{ size: '18px', label: 'Large' },
		{ size: '14px', label: 'Normal' },
		{ size: '12px', label: 'Small' },
	],
	defaultSize: '14px',
};
