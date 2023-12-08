import { Button, buttonDefinition, registerButton } from '@vonage/vivid';
import { provideReactWrapper } from '@microsoft/fast-react-wrapper';
import React, { forwardRef } from 'react';
import { memoizeWith } from 'ramda';

export interface ButtonProps {
	id?: string;
	style?: React.CSSProperties;
	slot?: string;
	className?: string;
	label?: string;
	/**
	 * The connotation of the button.
	 */
	connotation?: 'accent' | 'success' | 'cta' | 'alert';
	onClick?: () => void;
	children?: React.ReactNode;
}

const { wrap} = provideReactWrapper(React);
const WrappedButton = wrap(buttonDefinition());

const registerVividButton = memoizeWith(() => '', () => registerButton('my-prefix'));
export const VButton = forwardRef<Button, ButtonProps>((props, ref) => {
	registerVividButton();
	return <WrappedButton {...props} ref={ref as any} />;
});
