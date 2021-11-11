import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import nodeResolve from "@rollup/plugin-node-resolve";

const BASE_CONFIG = {
    watch: {
        clearScreen: false
    },
    plugins: [del({ targets: 'dist/*' }), typescript({ noEmitOnError: true, tsconfig: './config/typescript/tsconfig.prod.json'}), nodeResolve()]
};

export default BASE_CONFIG;
