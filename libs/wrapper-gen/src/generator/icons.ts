import * as fs from 'fs';

export const icons = JSON.parse(fs.readFileSync('./vivid-icons.json', 'utf8')) as string[];
