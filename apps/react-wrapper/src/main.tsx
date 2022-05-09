import * as ReactDOM from 'react-dom';
import App from './app/app';

import { provideVividDesignSystem, VIVIDLayout } from "@vonage/vivid";
provideVividDesignSystem().register(VIVIDLayout());

// import { provideFASTDesignSystem, fastButton} from "@microsoft/fast-components";
// provideFASTDesignSystem().register(fastButton());

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('root')
);
