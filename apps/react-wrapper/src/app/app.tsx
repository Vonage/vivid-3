import React from "react";
import { provideReactWrapper } from "@microsoft/fast-react-wrapper";
// import { fastButton } from "@microsoft/fast-components";
import { vividButton } from "@vonage/vivid";

const { wrap } = provideReactWrapper(React);

// const MyButton = wrap(fastButton());
const MyButton = wrap(vividButton());

export default function App() {
  return (
      /* <MyButton appearance="accent">Accent Button</MyButton> */
      <MyButton appearance="filled" label='A default button'></MyButton>
  );
}
