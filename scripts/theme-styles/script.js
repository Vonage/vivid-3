import { renderStyles } from './_build.js';
import { watchStyles } from './_watch.js';

import glob from 'glob'
const { sync } = glob;

import yargs from 'yargs'

const argv = yargs(process.argv.slice(2))
  .check((argv, options) => {
    const filePaths = argv._
    if (filePaths.length > 1) {
      throw new Error("Only 0 or 1 files may be passed.")
    } else {
      return true // tell Yargs that the arguments passed the check
    }
  })
  .argv

const { build, b, watch, w } = argv;

const pattern = 'src/core/theme/**/*.scss';

if (build || b) {
    const styleFiles = sync(pattern);
    styleFiles.forEach(renderStyles);
}

if (watch || w) { 
    watchStyles(pattern, renderStyles)
}
