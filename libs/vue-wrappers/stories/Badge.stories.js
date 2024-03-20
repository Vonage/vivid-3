import { VBadge } from '@vonage/vivid-vue';
import { argTypes, Template } from './generated/VBadge';

export default {
	title: 'Wrappers/Badge',
	component: VBadge,
	argTypes,
};

export const Basic = Template.bind({});
Basic.args = {
	text: 'Badge',
};

const TextTemplate = () => ({
	components: { VBadge },
	template: `<VBadge text="A default badge" />`,
});
export const Text = TextTemplate.bind({});

const ShapeTemplate = () => ({
	components: { VBadge },
	template: `<div>
    <VBadge text="rounded" shape="rounded" />
    <VBadge text="pill" shape="pill" />
  </div>`,
});
export const Shape = ShapeTemplate.bind({});

const IconTemplate = () => ({
	components: { VBadge },
	template: `<div>
    <VBadge appearance="filled" icon="message-sent-line" />
    <VBadge appearance="filled" icon="message-sent-line" shape="pill" />
  </div>`,
});
export const Icon = IconTemplate.bind({});

const IconWithTextTemplate = () => ({
	components: { VBadge },
	template: `<div>
    <VBadge appearance="filled" text="icon" icon="check-line" />
    <VBadge appearance="filled" text="icon-trailing" icon="check-line" icon-trailing />
  </div>`,
});
export const IconWithText = IconWithTextTemplate.bind({});

const AppearanceTemplate = () => ({
	components: { VBadge },
	template: `<div>
    <VBadge text="filled" appearance="filled" />
    <VBadge text="subtle" appearance="subtle" />
    <VBadge text="duotone" appearance="duotone" />
  </div>`,
});
export const Appearance = AppearanceTemplate.bind({});

const FilledBadgeWithConnotationTemplate = () => ({
	components: { VBadge },
	template: `<div>
    <VBadge text="accent" connotation="accent" appearance="filled" />
    <VBadge text="cta" connotation="cta" appearance="filled" />
    <VBadge text="information" connotation="information" appearance="filled" />
    <VBadge text="success" connotation="success" />
    <VBadge text="warning" connotation="warning" />
    <VBadge text="alert" connotation="alert" />
  </div>`,
});
export const FilledBadgeWithConnotation =
	FilledBadgeWithConnotationTemplate.bind({});

const SubtleBadgeWithConnotationTemplate = () => ({
	components: { VBadge },
	template: `<div>
    <VBadge text="accent" appearance="subtle" connotation="accent" />
    <VBadge text="cta" appearance="subtle" connotation="cta" />
    <VBadge text="information" appearance="subtle" connotation="information" />
    <VBadge text="success" appearance="subtle" connotation="success" />
    <VBadge text="warning" appearance="subtle" connotation="warning" />
    <VBadge text="alert" appearance="subtle" connotation="alert" />
  </div>`,
});
export const SubtleBadgeWithConnotation =
	SubtleBadgeWithConnotationTemplate.bind({});

const DuotoneBadgeWithConnotationTemplate = () => ({
	components: { VBadge },
	template: `<div>
    <VBadge text="accent" appearance="duotone" connotation="accent" />
    <VBadge text="cta" appearance="duotone" connotation="cta" />
    <VBadge text="information" appearance="duotone" connotation="information" />
    <VBadge text="success" appearance="duotone" connotation="success" />
    <VBadge text="warning" appearance="duotone" connotation="warning" />
    <VBadge text="alert" appearance="duotone" connotation="alert" />
  </div>`,
});
export const DuotoneBadgeWithConnotation =
	DuotoneBadgeWithConnotationTemplate.bind({});
