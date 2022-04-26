import React from "react";
import { provideReactWrapper } from "@microsoft/fast-react-wrapper";
const { wrap } = provideReactWrapper(React);

import { vividButton } from "@vonage/vivid";
const MyButton = wrap(vividButton());
export default function App() {
  return (
      <MyButton appearance="filled" label='A default button'></MyButton>
  );
}

// import { fastButton } from "@microsoft/fast-components";
// const MyButton = wrap(fastButton());
// export default function App() {
//   return (
//       <MyButton appearance="accent">Accent Button</MyButton>
//   );
// }
