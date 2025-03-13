import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'glob';
import * as ts from '@custom-elements-manifest/analyzer/node_modules/typescript';
import { create } from '@custom-elements-manifest/analyzer/src/create.js';
import { improvedMixinSupportPlugin } from './improved-mixin-support';

const fixturesPath = path.join(__dirname, '__fixtures__');
const testCases = fs.readdirSync(fixturesPath);

test.each(testCases)(`Testcase %s`, async (testCase) => {
	const moduleFiles = glob.sync(
		path.join(fixturesPath, testCase, '/**/*.{ts,js}')
	);
	const modules = moduleFiles.map((moduleFile) =>
		ts.createSourceFile(
			'my-element.js',
			fs.readFileSync(moduleFile, 'utf-8'),
			ts.ScriptTarget.ES2015,
			true
		)
	);

	expect(
		create({ modules, plugins: [improvedMixinSupportPlugin()] })
	).toMatchSnapshot();
});
