import React from 'react';
import { provideReactWrapper } from "@microsoft/fast-react-wrapper";
const { wrap } = provideReactWrapper(React);

import { VIVIDLayout } from '@vonage/vivid';
const VividLayout = wrap(VIVIDLayout());
export default function App() {
  return (
    <VividLayout column-basis="block">
      <img src="https://picsum.photos/id/1015/300/200"/>
      <img src="https://picsum.photos/id/1016/300/200"/>
      <img src="https://picsum.photos/id/1018/300/200"/>
      <img src="https://picsum.photos/id/1019/300/200"/>
      <img src="https://picsum.photos/id/1055/300/200"/>
      <img src="https://picsum.photos/id/1050/300/200"/>
    </VividLayout>
  );
}

// import { fastButton } from "@microsoft/fast-components";
// const MyButton = wrap(fastButton());
// export default function App() {
//   return (
//       <MyButton appearance="accent">Accent Button</MyButton>
//   );
// }
