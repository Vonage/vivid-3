import { registerRichTextEditor } from './definition';

registerRichTextEditor();

export { RTEConfig } from './rte/config';
export { RTECore } from './rte/features/core';
export { RTETextBlockStructure } from './rte/features/text-block';
export { RTEFreeformStructure } from './rte/features/freeform';
export { RTEToolbarFeature } from './rte/features/toolbar';
export { RTEFontSizeFeature } from './rte/features/font-size';
export { RTEBoldFeature } from './rte/features/bold';
export { RTEItalicFeature } from './rte/features/italic';
export { RTEUnderlineFeature } from './rte/features/underline';
export { RTEStrikethroughFeature } from './rte/features/strikethrough';
export { RTEMonospaceFeature } from './rte/features/monospace';
