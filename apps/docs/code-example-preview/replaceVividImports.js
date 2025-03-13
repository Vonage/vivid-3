/**
 * Replace imports of @vonage/vivid with the bundled version (see .eleventy.js)
 * @param {string} code
 */
const replaceVividImports = (code) =>
	code.replace(/(from\s*)['"]@vonage\/vivid['"]/g, (_, from) => {
		return `${from}'vivid-bundle'`;
	});

module.exports = {
	replaceVividImports,
};
