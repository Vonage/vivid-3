import { lightStyleDictionary, darkStyleDictionary, flutterStyleDictionary } from './style-dictionary';

await lightStyleDictionary.buildAllPlatforms();
await darkStyleDictionary.buildAllPlatforms();
await flutterStyleDictionary.buildAllPlatforms();
