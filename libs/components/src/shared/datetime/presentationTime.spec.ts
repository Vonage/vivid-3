import {
	formatPresentationTime,
	parsePresentationTime,
} from './presentationTime';

describe('formatPresentationTime', () => {
	it('should format time with seconds', () => {
		expect(formatPresentationTime('12:34:56', true, false)).toEqual('12:34:56');
		expect(formatPresentationTime('12:34:56', true, true)).toEqual(
			'12:34:56 PM'
		);
	});

	it('should format time without seconds', () => {
		expect(formatPresentationTime('12:34', false, false)).toEqual('12:34');
		expect(formatPresentationTime('12:34', false, true)).toEqual('12:34 PM');
	});

	it('should format time with 12-hour clock', () => {
		expect(formatPresentationTime('12:34:56', true, true)).toEqual(
			'12:34:56 PM'
		);
		expect(formatPresentationTime('00:34:56', true, true)).toEqual(
			'12:34:56 AM'
		);
		expect(formatPresentationTime('23:34:56', true, true)).toEqual(
			'11:34:56 PM'
		);
	});
});

describe('parsePresentationTime', () => {
	describe.each([
		{ name: '12 hour clock', use12HourClock: true },
		{ name: '24 hour clock', use12HourClock: false },
	])('$name', ({ use12HourClock }) => {
		it('should parse time with seconds', () => {
			expect(parsePresentationTime('13:34:56', use12HourClock)).toEqual(
				'13:34:56'
			);
			expect(parsePresentationTime('12:34:56 PM', use12HourClock)).toEqual(
				'12:34:56'
			);
			expect(parsePresentationTime('12:34:56 AM', use12HourClock)).toEqual(
				'00:34:56'
			);
			expect(parsePresentationTime('11:34:56 PM', use12HourClock)).toEqual(
				'23:34:56'
			);
		});

		it('should parse time without seconds', () => {
			expect(parsePresentationTime('13:34', use12HourClock)).toEqual(
				'13:34:00'
			);
			expect(parsePresentationTime('12:34 PM', use12HourClock)).toEqual(
				'12:34:00'
			);
			expect(parsePresentationTime('12:34 AM', use12HourClock)).toEqual(
				'00:34:00'
			);
			expect(parsePresentationTime('11:34 PM', use12HourClock)).toEqual(
				'23:34:00'
			);
		});

		it('should be lenient in accepting user input', () => {
			expect(parsePresentationTime('1:1:1', use12HourClock)).toEqual(
				'01:01:01'
			);
			expect(parsePresentationTime('2:00 pm', use12HourClock)).toEqual(
				'14:00:00'
			);
			expect(parsePresentationTime('12:00 am', use12HourClock)).toEqual(
				'00:00:00'
			);
			expect(parsePresentationTime('1', use12HourClock)).toEqual('01:00:00');
			expect(parsePresentationTime('1 pm', use12HourClock)).toEqual('13:00:00');
			expect(parsePresentationTime('2pm', use12HourClock)).toEqual('14:00:00');
			expect(parsePresentationTime('2:00pm', use12HourClock)).toEqual(
				'14:00:00'
			);
			expect(parsePresentationTime('2:00:00pm', use12HourClock)).toEqual(
				'14:00:00'
			);
			expect(parsePresentationTime(' 13:34 ', use12HourClock)).toEqual(
				'13:34:00'
			);
			expect(parsePresentationTime(' 13:34:56 ', use12HourClock)).toEqual(
				'13:34:56'
			);
			expect(parsePresentationTime(' 12:34:56  pm ', use12HourClock)).toEqual(
				'12:34:56'
			);
			expect(parsePresentationTime('8.30', use12HourClock)).toEqual('08:30:00');
			expect(parsePresentationTime('8.30 PM', use12HourClock)).toEqual(
				'20:30:00'
			);
			expect(parsePresentationTime('8 30', use12HourClock)).toEqual('08:30:00');
			expect(parsePresentationTime('8 30 PM', use12HourClock)).toEqual(
				'20:30:00'
			);
			expect(
				parsePresentationTime('padding08:30padding', use12HourClock)
			).toEqual('08:30:00');
		});

		it('should throw an error if the input cannot be parsed', () => {
			expect(() => parsePresentationTime('', use12HourClock)).toThrow();
			expect(() =>
				parsePresentationTime('12:34:56:78', use12HourClock)
			).toThrow();
			expect(() =>
				parsePresentationTime('12:34:56:78', use12HourClock)
			).toThrow();
			expect(() => parsePresentationTime('24:00', use12HourClock)).toThrow();
			expect(() => parsePresentationTime('24:01', use12HourClock)).toThrow();
			expect(() => parsePresentationTime('23:60', use12HourClock)).toThrow();
			expect(() => parsePresentationTime('23:59:60', use12HourClock)).toThrow();
			expect(() => parsePresentationTime('x', use12HourClock)).toThrow();
			expect(() =>
				parsePresentationTime('00:00:00 pm', use12HourClock)
			).toThrow();
			expect(() =>
				parsePresentationTime('00:00:00 am', use12HourClock)
			).toThrow();
			expect(() =>
				parsePresentationTime('13:00:00 pm', use12HourClock)
			).toThrow();
			expect(() =>
				parsePresentationTime('13:00:00 am', use12HourClock)
			).toThrow();
		});
	});

	it('should parse hour 12 as 00 when using 12-hour clock with no meridiem provided', () => {
		expect(parsePresentationTime('12:00:00', true)).toEqual('00:00:00');
	});

	it('should parse hour 12 as 12 when using 24-hour clock with no meridiem provided', () => {
		expect(parsePresentationTime('12:00:00', false)).toEqual('12:00:00');
	});
});
