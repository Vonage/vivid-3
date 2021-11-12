'use strict';

import { parse } from 'path';
import { writeFileSync, mkdir } from 'fs';

import sass from 'sass';
const { renderSync } = sass;




const getOutFile = file => {
  const { name, dir } = parse(file);
  return `${dir.replace('src', 'dist')}/${name}.css`;
};

export const renderStyles = file => {
    const { css } = renderSync({
        file,
    });

    const outFile = getOutFile(file);
  
    const { dir } = parse(outFile);

    mkdir(dir, { recursive: true}, function (err) {
        if (err) return err;

        writeFileSync(outFile, css);
  })
};


