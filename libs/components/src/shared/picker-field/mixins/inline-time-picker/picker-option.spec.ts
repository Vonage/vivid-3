import {
	getHoursOptions,
	getMeridiesOptions,
	getMinutesOptions,
	getSecondsOptions,
} from './picker-option';

describe('getHoursOptions', () => {
	it('should return 12-hour clock options for AM', () => {
		const result = getHoursOptions(undefined, undefined, 'AM');
		expect(result.length).toBe(12);
		expect(result[0]).toEqual({ value: '00', label: '12' });
		expect(result[11]).toEqual({ value: '11', label: '11' });
	});

	it('should return 12-hour clock options for PM', () => {
		const result = getHoursOptions(undefined, undefined, 'PM');
		expect(result.length).toBe(12);
		expect(result[0]).toEqual({ value: '12', label: '12' });
		expect(result[11]).toEqual({ value: '23', label: '11' });
	});

	it('should return 24-hour clock options', () => {
		const result = getHoursOptions(undefined, undefined);
		expect(result.length).toBe(24);
		expect(result[0]).toEqual({ value: '00', label: '00' });
		expect(result[23]).toEqual({ value: '23', label: '23' });
	});

	it('should limit hours by min and max', () => {
		const result = getHoursOptions('11:00:00', '13:00:00');
		expect(result.length).toBe(3);
		expect(result[0]).toEqual({ value: '11', label: '11' });
		expect(result[2]).toEqual({ value: '13', label: '13' });
	});
});

describe('getMinutesOptions', () => {
	it.each([null, 1, 0])('should return 60 options with step %s', () => {
		const result = getMinutesOptions(null);
		expect(result.length).toBe(60);
		expect(result[0]).toEqual({ value: '00', label: '00' });
		expect(result[59]).toEqual({ value: '59', label: '59' });
	});

	it('should limit minutes by min and max', () => {
		const result = getMinutesOptions(1, '12:34:00', '12:30:00', '12:40:00');
		expect(result.length).toBe(11);
		expect(result[0]).toEqual({ value: '30', label: '30' });
		expect(result[10]).toEqual({ value: '40', label: '40' });
	});

	it('should generate options based on step', () => {
		const result = getMinutesOptions(5);
		expect(result.length).toBe(12);
		expect(result[0]).toEqual({ value: '00', label: '00' });
		expect(result[11]).toEqual({ value: '55', label: '55' });
	});
});

describe('getSecondsOptions', () => {
	it.each([0, 1])('should return 60 options with step %s', (step) => {
		const result = getSecondsOptions(step);
		expect(result.length).toBe(60);
		expect(result[0]).toEqual({ value: '00', label: '00' });
		expect(result[59]).toEqual({ value: '59', label: '59' });
	});

	it('should limit seconds by min and max', () => {
		const result = getSecondsOptions(1, '12:34:56', '12:34:50', '12:34:59');
		expect(result.length).toBe(10);
		expect(result[0]).toEqual({ value: '50', label: '50' });
		expect(result[9]).toEqual({ value: '59', label: '59' });
	});

	it('should generate options based on step', () => {
		const result = getSecondsOptions(5);
		expect(result.length).toBe(12);
		expect(result[0]).toEqual({ value: '00', label: '00' });
		expect(result[11]).toEqual({ value: '55', label: '55' });
	});
});

describe('getMeridiesOptions', () => {
	it('should return AM and PM options', () => {
		const result = getMeridiesOptions();
		expect(result.length).toBe(2);
		expect(result[0]).toEqual({ value: 'AM', label: 'AM' });
		expect(result[1]).toEqual({ value: 'PM', label: 'PM' });
	});

	it('should hide AM if min is PM', () => {
		const result = getMeridiesOptions('12:00:00', '13:00:00');
		expect(result.length).toBe(1);
		expect(result[0]).toEqual({ value: 'PM', label: 'PM' });
	});

	it('should hide PM if max is AM', () => {
		const result = getMeridiesOptions('10:00:00', '11:00:00');
		expect(result.length).toBe(1);
		expect(result[0]).toEqual({ value: 'AM', label: 'AM' });
	});
});
