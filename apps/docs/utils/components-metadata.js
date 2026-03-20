const meta = require('../../../libs/components/metadata.json');

const metadataMap = new Map(
	meta.componentDefs.map((item) => [item.name, item])
);

exports.metadataByTag = metadataMap;
