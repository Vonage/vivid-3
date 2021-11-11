const setKarmaBaseConfig = require('../../karma.conf.cjs');

module.exports = function (config) {
    setKarmaBaseConfig(config);
    const newConfig = {
        singleRun: false
    }
    config.set(newConfig);
}
