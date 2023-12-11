import { VProgressRing } from '@vonage/vivid-vue';
import { argTypes } from './generated/VProgressRing';

export default {
  title: 'Wrappers/ProgressRing',
  component: VProgressRing,
  argTypes,
};

const ProgressRingTemplate = () => ({
  components: { VProgressRing },
  template: `<VProgressRing />`,
});
export const ProgressRing = ProgressRingTemplate.bind({});

const MinMaxTemplate = () => ({
  components: { VProgressRing },
  template: `<div>
      <VProgressRing min="0" max="50" value="12.5" />
      <VProgressRing min="0" max="50" value="50" />
      <VProgressRing min="0" max="100" value="50" />
    </div>`,
});
export const MinMax = MinMaxTemplate.bind({});

const ValueTemplate = () => ({
  components: { VProgressRing },
  template: `<div>
      <VProgressRing value="12.5" />
      <VProgressRing value="45" />
      <VProgressRing value="73" />
      <VProgressRing value="100" />
    </div>`,
});
export const Value = ValueTemplate.bind({});

const ConnotationTemplate = () => ({
  components: { VProgressRing },
  template: `<div>
      <VProgressRing connotation="accent" />
      <VProgressRing connotation="cta" />
      <VProgressRing connotation="success" />
      <VProgressRing connotation="alert" />
    </div>`,
});
export const Connotation = ConnotationTemplate.bind({});

const PausedTemplate = () => ({
  components: { VProgressRing },
  template: `<VProgressRing min="0" max="50" value="25" paused />`,
});
export const Paused = PausedTemplate.bind({});

const SizeTemplate = () => ({
  components: { VProgressRing },
  template: `<div>
      <VProgressRing min="0" max="50" value="50" size="-5" />
      <VProgressRing min="0" max="50" value="50" size="-4" />
      <VProgressRing min="0" max="50" value="50" size="-3" />
      <VProgressRing min="0" max="50" value="50" size="-2" />
      <VProgressRing min="0" max="50" value="50" size="-1" />
      <VProgressRing min="0" max="50" value="50" size="0" />
      <VProgressRing min="0" max="50" value="50" size="1" />
      <VProgressRing min="0" max="50" value="50" size="2" />
      <VProgressRing min="0" max="50" value="50" size="3" />
      <VProgressRing min="0" max="50" value="50" size="4" />
      <VProgressRing min="0" max="50" value="50" size="5" />
    </div>`,
});
export const Size = SizeTemplate.bind({});

const DeterminateStateTemplate = () => ({
  components: { VProgressRing },
  template: `<VProgressRing min="0" max="50" value="12.5" />`,
});
export const DeterminateState = DeterminateStateTemplate.bind({});

const IndeterminateTemplate = () => ({
  components: { VProgressRing },
  template: `<div>
      <VProgressRing min="0" max="50" />
      <VProgressRing min="0" max="50" value="indeterminate" />
    </div>`,
});
export const Indeterminate = IndeterminateTemplate.bind({});
