import fetch from 'node-fetch';
import * as fs from 'fs';

type IconManifest = {
  id: string;
  tag: string[];
  keyword: string[];
}[];

const manifestUrl = 'https://icon.resources.vonage.com/latest';

const fetchIcons = async (): Promise<string[]> => {
  const response = await fetch(manifestUrl);
  const manifest = (await response.json()) as IconManifest;
  return manifest.map(icon => icon.id).sort();
};

const updateVividIcons = async () => {
  const icons = await fetchIcons();
  fs.writeFileSync('./vivid-icons.json', JSON.stringify(icons, null, 2));
};

updateVividIcons();
