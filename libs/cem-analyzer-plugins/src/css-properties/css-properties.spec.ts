import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'glob';
import * as ts from '@custom-elements-manifest/analyzer/node_modules/typescript';
import { create } from '@custom-elements-manifest/analyzer/src/create.js';
import { cssPropertiesPlugin } from './css-properties';

const fixturesPath = path.join(__dirname, '__fixtures__');
const testCases = fs.readdirSync(fixturesPath);

describe('cssPropertiesPlugin', () => {
	it.each(testCases)(
		`should produce correct results for testcase %s`,
		async (testCase) => {
			const componentsPath = path.join(fixturesPath, testCase, 'components');
			const moduleFiles = glob.sync(path.join(componentsPath, '/**/*.{ts,js}'));
			const modules = moduleFiles.map((moduleFile) =>
				ts.createSourceFile(
					path.basename(moduleFile),
					fs.readFileSync(moduleFile, 'utf-8'),
					ts.ScriptTarget.ES2015,
					true
				)
			);
			process.chdir(componentsPath);

			expect(
				create({ modules, plugins: [cssPropertiesPlugin()] })
			).toMatchSnapshot();
		}
	);
});
