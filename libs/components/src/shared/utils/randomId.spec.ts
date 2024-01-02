import { generateRandomId } from './randomId';

jest.mock('uuid', () => ({
	v4: jest.fn(() => 'uuidv4'),
}));

describe('generateRandomId', () => {
	it('should return a uuid v4', () => {
		expect(generateRandomId()).toBe('uuidv4');
	});
});
