import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import nodeResolve from "@rollup/plugin-node-resolve";
import litcss from "rollup-plugin-lit-css";
import { renderSync } from "sass";

const BASE_CONFIG = {
  watch: {
    clearScreen: false,
  },
  plugins: [
    del({ targets: ["dist/vvd-components/**/*.*"], runOnce: true }),
    typescript({
      noEmitOnError: true,
      tsconfig: "./config/typescript/tsconfig.prod.json",
    }),
    litcss({
      specifier: "@microsoft/fast-element",
      include: ["/**/*.scss"],
      transform: (data, { filePath }) =>
        renderSync({ data, file: filePath }).css.toString(),
    }),
    nodeResolve(),
  ],
};

export default BASE_CONFIG;
