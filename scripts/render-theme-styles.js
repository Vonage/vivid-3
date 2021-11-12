import { parse } from 'path';
import { writeFileSync, mkdir } from 'fs';
import sass from 'sass';
const { renderSync } = sass;
import glob from 'glob'
const { sync } = glob;


const renderStyles = (file, outFile) => { 
    const { css } = renderSync({
        file,
    });
    
    const { dir } = parse(outFile);

    mkdir(dir, { recursive: true}, function (err) {
        if (err) return err;

        writeFileSync(outFile, css);
  })
};
    
const styleFiles = sync('src/core/theme/**/*.scss');

styleFiles.forEach(file => { 
    const { name, dir } = parse(file);
    const outFile = `${dir.replace('src', 'dist')}/${name}.css`;
    renderStyles(file, outFile);
});
