import type { Node } from '@figma/rest-api-spec';
import { GetClientUserOptions } from './cached-client';
import { FileResponse } from 'figma-js';

export type IconStyle =
  | 'solid'
  | 'line'
  | 'flag'
  | 'color'
  | 'mono'
  | ({} & string);

export type IconCategory =
  | 'alert'
  | 'arrows'
  | 'audio'
  | 'brand'
  | 'calling'
  | 'charts'
  | 'check'
  | 'chevrons'
  | 'commerce'
  | 'connectivity'
  | 'delete'
  | 'devices'
  | 'emoji'
  | 'file'
  | 'flags'
  | 'layout'
  | 'location'
  | 'messaging'
  | 'objects'
  | 'password'
  | 'science'
  | 'social'
  | 'sort'
  | 'time'
  | 'tools'
  | 'user'
  | 'video'
  | 'view'
  | ({} & string);

export interface IconEntry {
  category: IconCategory;
  figmaComponentName: string;
  figmaNodeId: string;
  imageUrl: string;
  keywords: string[];
  name: string;
  style: IconStyle;
}

export type TemplateFunction = (
  entry: IconEntry,
  svg: string
) => string | undefined;
export type PathFunction = (entry: IconEntry) => string;

export interface OutputFormat {
  fileName: PathFunction;
  template: TemplateFunction;
}

export type NodeFilterFunction = (node: Node, path: Node[]) => boolean;

export type CreateIconEntryFunction = (
  node: Node,
  path: Node[],
  file: FileResponse
) => IconEntry;

export interface FetchIconsOptions {
  cacheOptions: GetClientUserOptions;
  createEntry: CreateIconEntryFunction;
  dir: string;
  filter: NodeFilterFunction;
  forceUpdate: boolean;
  indexFileName: string;
  outputs: OutputFormat[];
}
