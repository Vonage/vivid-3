const config = require('./config.json');
const mockfs = require('mock-fs');
const fs = require('fs');
const {resolve} = require('path');


describe(`Tokens Build Script`, function () {
	beforeEach(function () {
		mockfs({
			'node_modules': mockfs.load(resolve(`./node_modules/`)),
			'dist': {
				'libs': {
					'tokens': {
						'scss': {
							'themes': {}
						}
					}
				}
			},
			'libs': {
				'tokens': mockfs.load(resolve(__dirname, '../../'))
			}
		});
	});

	afterEach(function () {
		mockfs.restore();
	});

	// it(`should not fail`, async function () {
	// 	jest.spyOn(process, 'cwd').mockImplementation(() => resolve(__dirname, './'));
	// 	require('./build');
	// });

	it(`should match built tokens`, async function () {
		jest.spyOn(process, 'cwd').mockImplementation(() => resolve(__dirname, './'));
		require('./build');
	});
});
