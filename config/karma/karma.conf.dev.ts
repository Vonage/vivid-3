import {Config} from "karma";

const setKarmaBaseConfig = require('../../karma.conf.ts');

export default function (config: Config) {
    setKarmaBaseConfig(config);
    const newConfig = {
        singleRun: false
    }
    config.set(newConfig);
}
