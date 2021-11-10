import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
    plugins: [del({ targets: 'dist/*' }), typescript({ tsconfig: './config/rollup/tsconfig.build.json'}), nodeResolve()]
};
