import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';


// import {
//   provideFASTDesignSystem,
//   fastButton
// } from "@microsoft/fast-components";
// provideFASTDesignSystem().register(fastButton());

import {
  provideVividDesignSystem,
  vividButton
} from "@vonage/vivid";
provideVividDesignSystem().register(vividButton());

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
