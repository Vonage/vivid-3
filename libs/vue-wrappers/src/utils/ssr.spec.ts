import { handleVue3Props } from './ssr';

const props = {
	'^label': 'Hello',
	prop: 'World',
};

describe('handleVue3Props', () => {
	describe('when running in SSR mode', () => {
		beforeEach(() => {
			(process as any).server = true;
		});

		it('should drop props forwarded as properties and remove the "^" prefix from attributes', () => {
			expect(handleVue3Props(props)).toEqual({
				label: 'Hello',
			});
		});
	});

	describe('when not running in SSR mode', () => {
		beforeEach(() => {
			(process as any).server = false;
		});

		it('should the return the original props', () => {
			expect(handleVue3Props(props)).toBe(props);
		});
	});
});
