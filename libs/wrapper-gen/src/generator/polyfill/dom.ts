import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
});

// Install globally
for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (!(key in global)) {
    global[key] = dom.window[key];
  }
}

global.matchMedia =
  global.matchMedia ??
  (() =>
    ({
      matches: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addListener: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeListener: () => {},
    } as any));

(global as any).window = global;
