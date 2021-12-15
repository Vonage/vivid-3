import * as extract from 'extract-gfm';
import * as fs from 'fs';
import * as path from 'path';

export function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export function extractHTMLBlocksFromReadme(pathToReadme: string): string[] {
    const readmeFileContents = fs.readFileSync(path.resolve(pathToReadme)).toString();
    const readmeFileSnippets = extract.extractBlocks(readmeFileContents);
    return readmeFileSnippets.filter((block: any) => block.lang === 'html').map((block: any) => replaceAll(block.code.replace('preview', ''), '\n', ''));
}
