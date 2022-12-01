import '.';

describe('loadComponentsModules', () => {
	let whenDefinedMock: any;
	beforeEach(() => {
		whenDefinedMock = jest.spyOn(customElements, 'whenDefined')
			.mockReturnValue(Promise.resolve({ whenDefinedCalled: true } as unknown as CustomElementConstructor));
	});

	afterEach(() => {
		whenDefinedMock.mockRestore();
	});

	it('should load components modules', async () => {
		const components = ['button'];
		const prefix = 'vivid';
		const {loadComponentsModules} = jest.requireActual('.');

		let importCalledWithPrefix = false;
		jest.mock('../button/index.js?prefix=vivid', async () => {
			importCalledWithPrefix = true;
			return import('../../lib/button/index');
		}, {virtual: true});

		const [{whenDefinedCalled}] = await loadComponentsModules(components, prefix);

		expect(importCalledWithPrefix).toBeTruthy();
		expect(customElements.whenDefined).toHaveBeenCalledWith('vivid-button');
		expect(whenDefinedCalled).toEqual(true);
	});
});
