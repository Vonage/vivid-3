import { join, parse } from 'path';
import lodashFp from 'lodash/fp.js';
const { flowRight, map, replace, reverse, startCase, uniqBy } = lodashFp;
import {
	access,
	constants as fsConstants,
	readFileSync,
	existsSync,
	rmSync,
} from 'fs';
const { F_OK } = fsConstants;
import mkdirp from 'mkdirp';
import { spawnSync } from 'child_process';
import {
	WCAConfig,
	VividRepo,
	FileName,
	OutputLanguage,
	ComponentsBindablePropertiesMap,
	ComponentsReadOnlyPropertiesMap,
	ComponentsExtraPropertiesMap,
} from './consts.js';
import fsExtra from 'fs-extra';
const { copySync } = fsExtra;

const renderPropertyJsDoc = (tag) => (property) =>
	`* @param ${property.type ? `{${property.type}}` : ''} ${property.name} ${property.description ? `- ${property.description}` : ''} ${property.attribute ? `attribute: &lt;${getComponentName(tag)} ${property.attribute} />` : ''}`;
const renderTagPropertiesJsDoc = (tag) =>
	getProperties(tag).map(renderPropertyJsDoc(tag)).join('\n');
export const renderJsDoc = (tag) =>
	`/** ${tag.description || ''} \n${renderTagPropertiesJsDoc(tag)}\n*/`;
const stripQuotes = (input) => input.replace(/'/g, '');
const unique = (stringArray) => Array.from(new Set(stringArray));
export const toJsonObjectsList = (collection) =>
	(collection || []).map(JSON.stringify).join(',');
export const toCommaSeparatedList = (collection) =>
	(collection || []).map((x) => `'${stripQuotes(x.name)}'`).join(',');
export const capitalize = (input) =>
	input.replace(/(^|\s)[a-z]/g, (s) => s.toUpperCase());
const deCapitalize = (input) =>
	input.replace(/(^|\s)[A-Z]/g, (s) => s.toLowerCase());
export const getComponentName = (tag) => capitalize(kebab2Camel(tag.name));
export const camel2kebab = (input) =>
	deCapitalize(input)
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[\s_]+/g, '-')
		.toLowerCase();
export const kebab2Camel = (input) =>
	deCapitalize(
		input
			.split('-')
			.map((x) => capitalize(x))
			.join('')
	);
const snake2Camel = (input) =>
	deCapitalize(
		input
			.split('_')
			.map((x) => capitalize(x))
			.join('')
	);
export const event2PropName = (eventName) =>
	`on${capitalize(kebab2Camel(snake2Camel(eventName)))}`;
export const event2EventDescriptor = (event) =>
	typeof event === 'string'
		? { name: event, propName: event2PropName(event) }
		: event;
export const getUniqueEvents = flowRight(
	uniqBy('name'),
	// need to reverse to have custom events first, to allow overwriting of the ones grabbed from JSDocs
	reverse,
	map(event2EventDescriptor)
);
export const isVividPackageName = (packageName) =>
	/@vonage\/vwc-*/.test(packageName);
export const getIndexFileName = (language) =>
	`index.${language === OutputLanguage.TypeScript ? 'tsx' : language}`;
export const getVividPackageName = (componentPath) => {
	const { dir } = parse(componentPath);
	if (dir.indexOf('node_modules') >= 0) {
		return /(@vonage\/vwc-.*?)\//.exec(componentPath.replace(/\\/g, '/'))[1];
	}
	const pathParts = dir.split('\\').join('/').split('/');
	if (pathParts.length > 0 && pathParts[pathParts.length - 1] === 'src') {
		pathParts.pop();
	}
	const packageJson = filePath(
		join(FileName.tempFolder, ...pathParts, FileName.packageJson)
	);
	const pkg = getParsedJson(packageJson);
	return pkg.name;
};
export const prepareDir = (p, clean = true, verbose = true) => {
	if (clean && existsSync(p)) {
		if (verbose) {
			console.info(`Clearing folder: ${p}`);
		}
		rmSync(p, { recursive: true });
	}
	mkdirp.sync(p);
};
export const getProperties = (tag) =>
	(tag.properties || [])
		.filter(
			(prop) =>
				!(
					ComponentsReadOnlyPropertiesMap[getComponentName(tag)] || []
				).includes(prop.name)
		) // skip readonly properties
		.filter(
			(prop) =>
				/'.*?'/.test(prop.name) ||
				/^([a-zA-Z_$][a-zA-Z\\d_$]*)$/.test(prop.name)
		) // only props having valid names
		.map((prop) => {
			const isBindable =
				(ComponentsBindablePropertiesMap[getComponentName(tag)] || []).includes(
					prop.name
				) ||
				prop.type?.indexOf('=>') > 0 || // property type is function
				prop.type?.indexOf('[]') > 0; // property type is array
			prop.bindable = isBindable;
			return prop;
		})
		.concat(ComponentsExtraPropertiesMap[getComponentName(tag)] || []);

export const isFileExists = (fileName) =>
	new Promise((resolve, reject) =>
		access(filePath(fileName), F_OK, (error) =>
			error ? reject(error) : resolve(fileName)
		)
	);
export const filePath = (fileName) => join(process.cwd(), fileName);

export const readMetaData = () =>
	new Promise((resolve) => {
		const vividPackageFolder = join(
			process.cwd(),
			'node_modules/@vonage/vivid/dist'
		);
		const elementsMetaData = `${vividPackageFolder}/${FileName.customElements}`;
		const apiMetaData = `${vividPackageFolder}/${FileName.vividApi}`;
		const meta = {
			api: getParsedJson(apiMetaData),
			elements: getParsedJson(elementsMetaData),
		};
		resolve(meta);
	});

export const getInstalledPackageVersion = (packageName) => {
	const installedPackageJson = filePath(
		join('node_modules', packageName, FileName.packageJson)
	);
	return getParsedJson(installedPackageJson).version;
};

export const getParsedJson = (jsonFilePath) =>
	JSON.parse(readFileSync(jsonFilePath, { encoding: 'utf8' }));

export const getVividPackageNames = ({ dependencies, devDependencies }) => {
	const packages = [
		...Object.keys(dependencies),
		...Object.keys(devDependencies),
	];
	const result = unique(packages).filter(isVividPackageName);
	console.log(
		`Vivid packages detected from ${FileName.packageJson}: \n${result.map((x) => `  - ${x}`).join('\n')}`
	);
	return result;
};

export const getCustomElementTagsDefinitionsList =
	(config = WCAConfig) =>
	(vividPackageNames) =>
		new Promise((resolve) => {
			const analyzerOutput = filePath(
				join(config.tempFolder, config.tempFileName)
			);
			const child = spawnSync(
				'node',
				config.nodeArgumentsFactory(vividPackageNames, analyzerOutput),
				{ cwd: process.cwd() }
			);
			if (child.status === 0) {
				const output = getParsedJson(analyzerOutput);
				const uniqueTags = unique(output.tags.map((x) => x.name)).map((x) =>
					output.tags.find((y) => y.name === x)
				);
				return resolve(uniqueTags);
			}
		});

export const compileTypescript = (rootDir) => async (outDir) =>
	spawnSync('node', [
		'./node_modules/typescript/lib/tsc.js',
		'--project',
		filePath('tsconfig.json'),
		'--rootDir',
		rootDir,
		'--outDir',
		outDir,
	]);

export const copyStaticAssets = (outputDir, assets) => () => {
	const cp = (file) => {
		const source = filePath(file);
		const dest = filePath(join(outputDir, file));
		copySync(source, dest);
		console.info(`Copy static asset ${source} => ${dest}`);
	};
	assets.split(',').map((assetFileName) => cp(assetFileName));
};

export const getInputArgument = (argumentName, defaultValue = null) => {
	const argumentObjects = process.argv
		.filter((argument) => argument.indexOf('=') >= 0)
		.map((argument) => ({
			name: argument.split('=')[0].replace(/--/g, ''),
			value: argument.split('=')[1],
		}));
	const targetArgument = argumentObjects.find(
		(argumentObject) => argumentObject.name === argumentName
	);
	return targetArgument ? targetArgument.value : defaultValue;
};

export const getComponentNameFromPackage = flowRight(
	replace(/\s/g, ''),
	startCase,
	replace('@vonage/', '')
);

export const compoundComponentTemplate = (
	baseName,
	compositeName,
	defaultProps
) =>
	`const ${compositeName} = (props) => createElement(${baseName}, props)

${compositeName}.defaultProps = ${JSON.stringify(defaultProps)}

${baseName}.${compositeName} = ${compositeName}`;

export const prepareCompoundComponents =
	(baseName, template, compoundComponentsConfig = {}) =>
	() =>
		Object.entries(compoundComponentsConfig)
			.map(([compositeName, defaultProps]) =>
				template(baseName, compositeName, defaultProps)
			)
			.join('\n\n');
