const markdownLibrary = require('../libraries/markdown-it');

module.exports = function packageInstallation(packageNames, devDependency) {
	return markdownLibrary.render(`<vwc-tabs gutters="none">
<vwc-tab label="npm"></vwc-tab>
<vwc-tab-panel>

\`\`\`sh
npm install ${devDependency ? '--save-dev ' : ''}${packageNames}
\`\`\`

</vwc-tab-panel>
<vwc-tab label="yarn"></vwc-tab>
<vwc-tab-panel>

\`\`\`sh
yarn add ${devDependency ? '-D ' : ''}${packageNames}
\`\`\`

</vwc-tab-panel>
<vwc-tab label="pnpm"></vwc-tab>
<vwc-tab-panel>

\`\`\`sh
pnpm add ${devDependency ? '-D ' : ''}${packageNames}
\`\`\`

</vwc-tab-panel>
</vwc-tabs>`);
};
