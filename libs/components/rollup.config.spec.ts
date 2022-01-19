const rollupBaseConfig = require("./rollup.config.base");
const typescript = require("@rollup/plugin-typescript");
const { RollupOptions } = require("rollup");
const istanbul = require("../../scripts/rollup-plugin-istanbul.cjs");

rollupBaseConfig.plugins.push(
  istanbul({
    exclude: ["src/**/*.spec.ts", "node_modules/**/*"],
  })
);

const specTypescriptConfig = {
  tsconfig: "./config/typescript/tsconfig.spec.json",
};

rollupBaseConfig.plugins.splice(1, 1, typescript(specTypescriptConfig));

const rollupConfig: RollupOptions = {
  cache: false,
  output: {
    manualChunks: () => 'everything.js',
    format: "iife",
    name: "vivid",
    sourcemap: "inline",
    dir: "./dist/out-tsc",
  },
  ...rollupBaseConfig,
  watch: {
    clearScreen: true,
  },
};

module.exports = rollupConfig;
