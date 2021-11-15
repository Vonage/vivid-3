import { parse, join } from 'path';
import { mkdirSync, writeFileSync } from "fs";
import { renderSync } from 'sass';
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import nodeResolve from "@rollup/plugin-node-resolve";
import litcss from 'rollup-plugin-lit-css';
import scss from "rollup-plugin-scss";
import multiInput from 'rollup-plugin-multi-input';

export const scssBuild = {
    input: [`src/core/theme/*.scss`],
    plugins: [
        multiInput(),
        scss({
            output: (_, styleNodes) => {
                for (const [file] of Object.entries(styleNodes)) { 
                    const { name, dir } = parse(file);
                    const [, path] = dir.split('src/');
                    const outDir = join('dist', path);
                    const { css } = renderSync({ file });

                    mkdirSync(outDir, { recursive: true });
                    writeFileSync(`${outDir}/${name}.css`, css);
                }
            },   
        })
    ]
};

export const BASE_CONFIG = {
    watch: {
        clearScreen: false
    },
    plugins: [
        del({ targets: 'dist/*' }),
        typescript({ noEmitOnError: true, tsconfig: './config/typescript/tsconfig.prod.json' }),
        litcss({
            specifier: 'lit',
            include: ['/**/*.scss'],
            transform: (data, { filePath }) =>
                renderSync({ data, file: filePath })
                .css.toString(),
        }),
        nodeResolve()
    ]
};

export default [
    {...BASE_CONFIG},
    {...scssBuild}
];
