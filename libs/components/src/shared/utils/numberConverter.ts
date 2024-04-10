import type { ValueConverter } from '@microsoft/fast-element';

export const numberConverter: ValueConverter = {
	toView(value: number | undefined): string | null {
		if (value === undefined) {
			return null;
		}

		return value.toString();
	},
	fromView(value: string | number | null | undefined): number | undefined {
		if (typeof value === 'string') {
			value = parseFloat(value.toString());
		}

		if (typeof value !== 'number') {
			return undefined;
		}

		return isNaN(value) || !isFinite(value) ? undefined : value;
	},
};
