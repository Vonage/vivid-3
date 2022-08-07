const config = require('./config.json');
const mockfs = require('mock-fs');
const fs = require('fs');
const {resolve} = require('path');

const libsToImport = [
	'style-dictionary',
	'chalk',
	'supports-color',
	'ansi-styles',
	'mock-fs',
	'has-flag',
	'tinycolor2',
	'change-case',
'tslib'];
const importLibs = () => libsToImport.reduce((acc, lib) => {
	acc[lib] = mockfs.load(resolve(`./node_modules/${lib}`));
	return acc;
}, {});
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

	it(`should not fail`, async function () {
		jest.spyOn(process, 'cwd').mockImplementation(() => resolve(__dirname, './'));
		require('./build');
	});
});
