import { textFieldDefinition, registerTextField } from '@vonage/vivid';
import { provideReactWrapper } from '@microsoft/fast-react-wrapper';
import React, { FormEvent } from 'react';
import { memoizeWith } from 'ramda';

interface TextFieldProps {
	label?: string;
	value?: string;
	onInput?: (event: FormEvent) => void;
	children?: React.ReactNode;
	errorText?: string;
}

const { wrap} = provideReactWrapper(React);

export const WrappedTextField = wrap(textFieldDefinition());

const registerVividTextField = memoizeWith(() => '', () => registerTextField('my-prefix'));

export const VTextField = React.forwardRef((props: TextFieldProps, ref: any) => {
	registerVividTextField();
	return <WrappedTextField {...props} ref={ref} />;
});
