import rollupBaseConfig from "./rollup.config.base";
import typescript from "@rollup/plugin-typescript";
const istanbul = require('../../scripts/rollup-plugin-istanbul.cjs');

rollupBaseConfig.plugins.push(istanbul({
    exclude: ['src/**/*.spec.ts', 'node_modules/**/*']
}));

rollupBaseConfig.plugins.splice(1,1, typescript({tsconfig: './config/typescript/tsconfig.spec.json'}),);

export default {
    output: {
        format: 'iife', // Helps prevent naming collisions.
        name: 'vivid', // Required for 'iife' format.
        sourcemap: 'inline', // Sensible for testing.
    },
    ...rollupBaseConfig
};
