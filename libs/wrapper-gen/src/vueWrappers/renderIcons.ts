import { kebabToCamel } from '../utils/casing';

export const renderIcons = (icons: string[]) => `export enum Icon {
${icons.map((icon) => `   '${kebabToCamel(icon)}' = '${icon}',`).join('\n')}
};

export type IconId = \`\${Icon}\`;
`;
