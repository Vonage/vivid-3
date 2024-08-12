/**
 * Transform local path, e.g. "./libs/components/src/lib/alert/README.md" to GitHub edit link
 */
function githubEditLinkFromPath(filePath) {
	const relativeFilePath = filePath.replace(/^\.\//, '');
	return `https://github.com/Vonage/vivid-3/edit/main/${relativeFilePath}`;
}

module.exports = {
	githubEditLinkFromPath,
};
