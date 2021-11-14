import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import nodeResolve from "@rollup/plugin-node-resolve";
import litcss from 'rollup-plugin-lit-css';
import { renderSync } from 'sass';
import path from "path";
import scss from "rollup-plugin-scss";
import {mkdirSync, writeFileSync} from "fs";

export const scssBuild = {
    input: [path.join(process.cwd(), `src/core/theme/light.scss`), path.join(process.cwd(), `src/core/theme/dark.scss`)],
    plugins: [
        scss({
                output: function (styles, styleNodes) {
                    for (const [key, value] of Object.entries(styleNodes)) {
                        const filePath = path.join(process.cwd(), 'dist', key.substr(key.indexOf('src/') + 4)).replace('scss', 'css');
                        const fileName = path.basename(filePath);
                        const folderName = filePath.replace(fileName, '');
                        mkdirSync(folderName, { recursive: true });
                        writeFileSync(filePath, value);
                    }
                }
            }
        )
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
