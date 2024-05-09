import { normalizeTag } from './components';

describe('normalizeTag', function () {
	it('should normalize a tag names for the same component', function () {
		expect(normalizeTag('VAccordionItem')).toBe('vaccordionitem');
		expect(normalizeTag('v-accordion-item')).toBe('vaccordionitem');
		expect(normalizeTag('vaccordionitem')).toBe('vaccordionitem');
	});
});
