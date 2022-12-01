import '.';

describe('loadComponentsModules', () => {
	let whenDefinedMock: any;
	const whenDefinedResolveValue = {};

	beforeEach(() => {
		whenDefinedMock = jest.spyOn(customElements, 'whenDefined')
			.mockReturnValue(Promise.resolve(whenDefinedResolveValue as CustomElementConstructor));
	});

	afterEach(() => {
		whenDefinedMock.mockRestore();
	});

	it('should load components modules', async () => {
		const components = ['button'];
		const prefix = 'vivid';
		const { loadComponentsModules } = getNonMockedLoadComponentsModules();

		mockCallWithPrefix();

		const [whenDefinedRActualesolveValue] = await loadComponentsModules(components, prefix);

		expect(customElements.whenDefined).toHaveBeenCalledWith('vivid-button');
		expect(whenDefinedResolveValue).toEqual(whenDefinedRActualesolveValue);
	});
});

function mockCallWithPrefix() {
	jest.mock('../button/index.js?prefix=vivid', async () => {
		return import('../../lib/button/index');
	}, { virtual: true });
}

function getNonMockedLoadComponentsModules(): { loadComponentsModules: any; } {
	return jest.requireActual('.');
}
