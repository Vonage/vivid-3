import { 
  provideVividDesignSystem
} from '@vonage/vivid/shared/design-system';
import { 
  vividButton
} from '@vonage/vivid';
import { provideReactWrapper } from '@microsoft/fast-react-wrapper';
import React from 'react';

const { wrap } = provideReactWrapper(
  React, 
  provideVividDesignSystem()
);

export const VividButton = wrap(vividButton())

function App() {
  return (
    <VividButton appearance='filled' label='A default button'></VividButton>
  );
}
export default App;
