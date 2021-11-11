const setKarmaBaseConfig = require('../../karma.conf.cjs');

module.exports = function (config) {
    setKarmaBaseConfig(config);
    const newConfig = {
        singleRun: true
    }
    config.set(newConfig);
}
