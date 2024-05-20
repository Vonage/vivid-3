module.exports = function editOnGitHub(localFilePath) {
	// Transform local path, e.g. "./libs/components/src/lib/alert/README.md"
	const relativeFilePath = localFilePath.replace(/^\.\//, '');
	const gitHubEditLink = `https://github.com/Vonage/vivid-3/edit/main/${relativeFilePath}`;

	return `<footer class="footer">
	<vwc-divider></vwc-divider>
	<a href="${gitHubEditLink}"><vwc-icon name="edit-line"></vwc-icon> Edit this page on GitHub</a>
</footer>`;
};
