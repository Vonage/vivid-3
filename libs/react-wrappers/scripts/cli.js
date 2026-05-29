import {
	OutputLanguage,
	CLIArgument,
	FileName,
	Assets,
} from './generateWrappers/consts.js';
import {
	generateWrappers,
	generateWrappersV3,
} from './generateWrappers/generator.js';
import {
	isFileExists,
	readMetaData,
	getParsedJson,
	getVividPackageNames,
	getInputArgument,
	getCustomElementTagsDefinitionsList,
	copyStaticAssets,
} from './generateWrappers/utils.js';

const outputDir = getInputArgument(
	CLIArgument.Output,
	FileName.defaultOutputDirectory
);
const language = getInputArgument(
	CLIArgument.Language,
	OutputLanguage.JavaScript
);
const staticAssets = getInputArgument(CLIArgument.Assets, Assets);
const cleanTemp = getInputArgument(CLIArgument.CleanTemp, true) !== 'false';

// generate wrappers for Vivid 2.x
isFileExists(FileName.packageJson)
	.then(getParsedJson)
	.then(getVividPackageNames)
	.then(getCustomElementTagsDefinitionsList())
	.then(generateWrappers(outputDir, language, cleanTemp))
	.then(() =>
		readMetaData() // generate wrappers for Vivid 3.x
			.then(generateWrappersV3(outputDir, language, cleanTemp))
	)
	.then(copyStaticAssets(outputDir, staticAssets));
