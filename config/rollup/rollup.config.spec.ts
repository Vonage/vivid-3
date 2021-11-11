import rollupBaseConfig from "./rollup.config.base.ts";

export default {
    output: {
        format: 'iife', // Helps prevent naming collisions.
        name: '<your_project>', // Required for 'iife' format.
        sourcemap: 'inline', // Sensible for testing.
    },
    ...rollupBaseConfig
};
