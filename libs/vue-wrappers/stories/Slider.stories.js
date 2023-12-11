import { VSlider } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes } from './generated/VSlider';

export default {
  title: 'Wrappers/Slider',
  component: VSlider,
  argTypes,
};

const SliderTemplate = () => ({
  components: { VSlider },
  template: `<VSlider></VSlider>`,
});
export const Slider = SliderTemplate.bind({});

const MinTemplate = () => ({
  components: { VSlider },
  setup() {
    const value = ref('5');
    return { value };
  },
  template: `<div>
    <div>
      <VSlider v-model="value" min="-5"/>
    </div>
    <div>Value: {{ value }}</div>
  </div>`,
});
export const Min = MinTemplate.bind({});

const MaxTemplate = () => ({
  components: { VSlider },
  setup() {
    const value = ref('5');
    return { value };
  },
  template: `<div>
    <div>
      <VSlider v-model="value" max="100"/>
    </div>
    <div>Value: {{ value }}</div>
  </div>`,
});
export const Max = MaxTemplate.bind({});

const StepTemplate = () => ({
  components: { VSlider },
  setup() {
    const value = ref('5');
    return { value };
  },
  template: `<div>
    <div>
      <VSlider v-model="value" step="0.5"/>
    </div>
    <div>Value: {{ value }}</div>
  </div>`,
});
export const Step = StepTemplate.bind({});

const OrientationTemplate = () => ({
  components: { VSlider },
  template: `<div>
    <div>
      <VSlider v-model="value" orientation="vertical" style="height: 100px" />
    </div>
  </div>`,
});
export const Orientation = OrientationTemplate.bind({});

const MarkersTemplate = () => ({
  components: { VSlider },
  template: `<div>
    <div>
      <VSlider markers />
    </div>
  </div>`,
});
export const Markers = MarkersTemplate.bind({});

const DisabledTemplate = () => ({
  components: { VSlider },
  template: `<div>
    <div>
      <VSlider disabled />
    </div>
  </div>`,
});
export const Disabled = DisabledTemplate.bind({});

const ValueTemplate = () => ({
  components: { VSlider },
  template: `<div>
    <div>
      <VSlider value="5" />
    </div>
  </div>`,
});
export const Value = ValueTemplate.bind({});
