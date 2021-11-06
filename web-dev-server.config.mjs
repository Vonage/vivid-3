import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import { importMap } from './docs/import-map.js';


export default {
    open: false,
    watch: true,
    nodeResolve: true,
    appIndex: 'docs/index.html',
    // in a monorepo you need to set set the root dir to resolve modules
    rootDir: '.',
    plugins: [
        esbuildPlugin({ ts: true, target: 'auto' }),
        importMapsPlugin({
            inject: {importMap}
        })
    ],
};