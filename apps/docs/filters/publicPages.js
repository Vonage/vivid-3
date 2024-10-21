const isServing = process.argv.includes('--serve');

const isPublicStatus = (status) => isServing || status !== 'underlying';

const onlyPublicPages = (pages) =>
	pages.filter((page) => isPublicStatus(page.data.status));

module.exports = {
	onlyPublicPages,
	isPublicStatus,
};
