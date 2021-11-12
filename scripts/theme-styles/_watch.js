'use strict';

import { watch } from 'chokidar';


const watchOptions = {
  persistent: true,
};

// One-liner for current directory
export const watchStyles = (pattern, cb) => watch(pattern, watchOptions)
  .on('add', cb)
  .on('change', cb);
