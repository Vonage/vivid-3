const { createFilter } = require('@rollup/pluginutils');
const istanbul = require('istanbul-lib-instrument');

module.exports = function (options = {}) {
    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'istanbul',
        transform (code, id) {
            if (!filter(id)) return;

            let instrumenter;
            const instrumenterConfig = Object.assign({
                esModules: true,
                compact: true,
                produceSourceMap: true,
                autoWrap: true,
                preserveComments: true
            }, options.instrumenterConfig);

            instrumenter = new (options.instrumenter || istanbul).createInstrumenter(instrumenterConfig);

            const { version, sources, sourcesContent, names, mappings } = this.getCombinedSourcemap();
            code = instrumenter.instrumentSync(code, id, { version, sources, sourcesContent, names, mappings });
            const map = instrumenter.lastSourceMap();

            return { code, map };
        }
    };
}
