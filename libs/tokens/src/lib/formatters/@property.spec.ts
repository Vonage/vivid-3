import cssAtRuleProperty from './@property';

const { formatter } = cssAtRuleProperty;

describe('basic', () => {
	it('should generate integer property from token', () => {
		const token = {
			dictionary: {
				allProperties: [
					{
						name: 'vvd-size-density',
						value: '0',
						type: 'sizing',
						public: true,
						'@property': {
							syntax: 'integer',
							inherits: true,
						},
					},
				],
			},
			file: {},
			options: {},
		};

		const expectedProperty = `@property --vvd-size-density {
    syntax: "<integer>";
    inherits: true;
    initial-value: 0;
  }`;

		expect(formatter(token)).toContain(expectedProperty);
	});

	it('should generate length property from token', () => {
		const token = {
			dictionary: {
				allProperties: [
					{
						value: '16',
						type: 'sizing',
						name: 'vvd-size-font-scale-base',
						'@property': {
							syntax: 'length',
							inherits: true,
						},
					},
				],
			},
			file: {},
			options: {},
		};

		const expectedProperty = `@property --vvd-size-font-scale-base {
    syntax: "<length>";
    inherits: true;
    initial-value: 16px;
  }`;

		expect(formatter(token)).toContain(expectedProperty);
	});
});
