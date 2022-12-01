import '.';

describe('loadComponentsModules', () => {
	function mockCallWithPrefix(prefix: string) {
		jest.mock(`../${components[0]}/index.js?prefix=${prefix}`, async () => {
			return import(`../../lib/${components[0]}/index`);
		}, { virtual: true });
	}

	function getNonMockedLoadComponentsModules(): { loadComponentsModules: any; } {
		return jest.requireActual('.');
	}

	const components = ['button'];
	const prefix = 'vivid';
	let whenDefinedMock: any;
	const whenDefinedResolveValue = {};
	const { loadComponentsModules } = getNonMockedLoadComponentsModules();

	beforeEach(() => {
		whenDefinedMock = jest.spyOn(customElements, 'whenDefined')
			.mockReturnValue(Promise.resolve(whenDefinedResolveValue as CustomElementConstructor));
		mockCallWithPrefix(prefix);
	});

	afterEach(() => {
		whenDefinedMock.mockRestore();
	});

	it('should import "../${component}/index.js?prefic=${prefix}', async () => {
		await loadComponentsModules(components, prefix);

		expect(customElements.whenDefined).toHaveBeenCalledWith('vivid-button');
	});

	it('should wait for whenDefined of all components', async () => {
		const [whenDefinedRActualesolveValue] = await loadComponentsModules(components, prefix);

		expect(whenDefinedResolveValue).toEqual(whenDefinedRActualesolveValue);
	});
});
