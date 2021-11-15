import rollupBaseConfig from "./rollup.config.base";
import typescript from "@rollup/plugin-typescript";
import {RollupOptions} from "rollup";
const istanbul = require('../../scripts/rollup-plugin-istanbul.cjs');

rollupBaseConfig.plugins.push(istanbul({
    exclude: ['src/**/*.spec.ts', 'node_modules/**/*']
}));

rollupBaseConfig.plugins.splice(1,1, typescript({tsconfig: './config/typescript/tsconfig.spec.json'}),);

const rollupConfig: RollupOptions = {
    cache: false,
    output: {
        format: 'iife',
        name: 'vivid',
        sourcemap: 'inline',
        dir: './dist/out-tsc'
    },
    ...rollupBaseConfig,
    watch: {
        clearScreen: true
    }
};

export default rollupConfig;
