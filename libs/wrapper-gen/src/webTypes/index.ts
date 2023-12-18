import * as fs from 'fs';
import { WebTypesTag } from './tags';

export function generateWebTypesWithTags(tags: WebTypesTag[]): Record<string, unknown> {
  const { version } = JSON.parse(fs.readFileSync('../vue-wrappers/package.json', 'utf-8'));
  return {
    framework: 'vue',
    name: '@vonage/vivid-vue',
    version,
    contributions: {
      html: {
        'description-markup': 'markdown',
        'types-syntax': 'typescript',
        tags,
      },
    },
  };
}
