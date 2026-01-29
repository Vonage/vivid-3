import {
  createIconEntry,
  type CreateIconEntryFunction,
  fetchIcons,
  type IconsManifest,
  type NodeFilterFunction,
  writeJson,
} from '@repo/tools';
import type { Node } from '@figma/rest-api-spec';
import { rmSync } from 'node:fs';
import 'dotenv/config';
import { svg } from './svg.output';

const figmaFileId = 'isdKI406usLCxZ2U8ljDrn';

// Only Flags icons
const onlyFlags: NodeFilterFunction = (node, path) => {
  if (!Array.isArray(path)) return false;

  return (
    node.type === 'COMPONENT' &&
    path.length >= 3 &&
    path.at(-3)?.name === 'Icons' &&
    path.at(-2)?.name === 'flags'
  );
};

const entryFunction: CreateIconEntryFunction = (
  node: Node,
  path: Node[],
  file
) => {
  const entry = createIconEntry(node, path, file);

  entry.name = node.name.replace('flag-', '');
  entry.figmaComponentName = node.name;
  entry.category = 'flags';
  entry.style = 'color';

  return entry;
};

(async () => {
  const clear = true;

  if (clear) {
    rmSync('./src/generated', { recursive: true, force: true });
  }

  const icons = await fetchIcons(figmaFileId, {
    dir: './src/generated/',
    forceUpdate: clear,
    filter: onlyFlags,
    createEntry: entryFunction,
    indexFileName: 'index.json',
    outputs: [svg],
  });

  const manifest: IconsManifest = icons.map((icon) => ({
    id: `flag-${icon.name}`,
    keyword: icon.keywords,
    tag: ['style_color_multi', 'category_flags'],
    ...(icon.aliases.length > 0 ? { alias: icon.aliases } : undefined),
  }));

  writeJson('./src/generated/manifest.json', manifest);
})();
