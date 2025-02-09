import { generateRandomId } from './randomId';

vi.mock('uuid', () => ({
	v4: vi.fn(() => 'uuidv4'),
}));

describe('generateRandomId', () => {
	it('should return a uuid v4', () => {
		expect(generateRandomId()).toBe('uuidv4');
	});
});
