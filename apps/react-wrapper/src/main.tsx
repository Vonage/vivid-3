import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
// import {
//   provideFASTDesignSystem,
//   fastButton
// } from "@microsoft/fast-components";
import {
  provideVividDesignSystem,
  vividButton
} from "@vonage/vivid";

// provideFASTDesignSystem().register(fastButton());
provideVividDesignSystem().register(vividButton());

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
