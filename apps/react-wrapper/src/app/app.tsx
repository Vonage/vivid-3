import React from 'react';
import { provideReactWrapper } from "@microsoft/fast-react-wrapper";
import { vividButton } from '@vonage/vivid';

const { wrap } = provideReactWrapper(React);

const VIVIDButton = wrap(vividButton());

export default function App() {
  return (
      <VIVIDButton appearance='filled' label='A default button'></VIVIDButton>
  );
}

// import { fastButton } from "@microsoft/fast-components";
// const MyButton = wrap(fastButton());
// export default function App() {
//   return (
//       <MyButton appearance="accent">Accent Button</MyButton>
//   );
// }
