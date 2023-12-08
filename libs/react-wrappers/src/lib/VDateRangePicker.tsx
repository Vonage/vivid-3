import { provideReactWrapper } from '@microsoft/fast-react-wrapper';
import React, { FormEvent } from 'react';
import { memoizeWith } from 'ramda';
import { dateRangePickerDefinition, registerDateRangePicker } from '@vonage/vivid';

interface DateRangePickerProps {
	label?: string;
	start?: string;
	end?: string;
	"onInputStart"?: (event: Event) => void;
	"onInputEnd"?: (event: Event) => void;
	children?: React.ReactNode;
}

const { wrap} = provideReactWrapper(React);

export const WrappedDateRangePicker = wrap(dateRangePickerDefinition(), {
	events: {
		"onInputStart": "input:start",
		"onInputEnd": "input:end"
	}
});

const registerVividDateRangePicker = memoizeWith(() => '', () => registerDateRangePicker('my-prefix'));

export const VDateRangePicker = React.forwardRef((props: DateRangePickerProps, ref: any) => {
	registerVividDateRangePicker();
	return <WrappedDateRangePicker {...props} ref={ref} />;
});
