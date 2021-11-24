import { Config } from "karma";
import setKarmaBaseConfig from "../../karma.conf";

export default function (config: Config) {
  setKarmaBaseConfig(config);
  const newConfig = {
    singleRun: false,
  };
  config.set(newConfig);
}
