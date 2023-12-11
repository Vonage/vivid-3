import { VSelect, VOption } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes } from './generated/VSelect';

export default {
  title: 'Wrappers/Select',
  component: VSelect,
  argTypes,
};

const DefaultTemplate = () => ({
  components: { VSelect, VOption },
  template: `
  <div>
    <VSelect label="choose one option" style="width:150px;" >
      <VOption value="1" text="Option 1"></VOption>
      <VOption value="2" text="Option 2"></VOption>
      <VOption value="3" text="Option 3"></VOption>
      <VOption value="4" text="Option 4"></VOption>
      <VOption value="5" text="Option 5"></VOption>
      <VOption value="6" text="Option 6"></VOption>
      <VOption value="7" text="Option 7"></VOption>
      <VOption value="8" text="Option 8"></VOption>
    </VSelect>
  </div>`,
});
export const Default = DefaultTemplate.bind({});

const VModelTemplate = () => ({
  components: { VSelect, VOption },
  setup() {
    const value = ref('');
    console.log(value);
    return { value };
  },
  template: `<div>
    <div>
      <VSelect v-model="value" style="width:150px;" >
        <VOption text="Option 1" value="1"/>
        <VOption text="Option 2" value="2"/>
      </VSelect>
    </div> 
    <div>v-model: {{ value }}</div>
    <div>
      <button @click="value = ''">Reset</button>
      <button @click="value = '2'">Set to '2'</button>
    </div>
  </div>`,
});
export const VModel = VModelTemplate.bind({});

const LabelTemplate = () => ({
  components: { VSelect, VOption },
  template: `<div>
    <VSelect label="choose one option" style="width:150px;" >
      <VOption value="1" text="Option 1"></VOption>
      <VOption value="2" text="Option 2"></VOption>
      <VOption value="3" text="Option 3"></VOption>
    </VSelect>
  </div>`,
});
export const Label = LabelTemplate.bind({});

const IconTemplate = () => ({
  components: { VSelect, VOption },
  template: `<div>
    <VSelect label="choose one option" icon="search-line" style="width:150px;" >
      <VOption value="1" text="Option 1"></VOption>
      <VOption value="2" text="Option 2"></VOption>
      <VOption value="3" text="Option 3"></VOption>
    </VSelect>
  </div>`,
});
export const Icon = IconTemplate.bind({});

const MultipleTemplate = () => ({
  components: { VSelect, VOption },
  template: `
  <div style="display:flex;gap:10px;">
    <div>
      <VSelect multiple label="choose how many options you want" style="width: 150px;" @change="populateValues($event)">
        <VOption value="1" text="Option 1" />
        <VOption value="2" text="Option 2" />
        <VOption value="3" text="Option 3" />
      </VSelect>
    </div>
    <div>v-model selected: {{ values }}</div>
    <div>
      <button @click="values = []">Reset</button>
    </div>
  </div>`,
  setup() {
    const values = ref([]);
    function populateValues($event) {
      values.value = $event.target._selectedOptions.map(s => s.__text);
    }
    return { values, populateValues };
  },
});
export const Multiple = MultipleTemplate.bind({});

const AppearanceTemplate = () => ({
  components: { VSelect, VOption },
  template: `<VSelect appearance="ghost" >
    <VOption value="1" text="Option 1" selected />
    <VOption value="2" text="Option 2" />
  </VSelect>`,
});
export const Appearance = AppearanceTemplate.bind({});

const ShapeTemplate = () => ({
  components: { VSelect, VOption },
  template: `<VSelect shape="pill" >
    <VOption value="1" text="Option 1" />
    <VOption value="2" text="Option 2" />
  </VSelect>`,
});
export const Shape = ShapeTemplate.bind({});

const DisabledTemplate = () => ({
  components: { VSelect, VOption },
  template: `<VSelect disabled >
    <VOption value="1" text="Option 1" />
  </VSelect>`,
});
export const Disabled = DisabledTemplate.bind({});

const OpenTemplate = () => ({
  components: { VSelect, VOption },
  template: `<VSelect open >
    <VOption value="1" text="Option 1" />
    <VOption value="2" text="Option 2" />
    <VOption value="3" text="Option 3" />
  </VSelect>`,
});
export const Open = OpenTemplate.bind({});

const OptionLabelTemplate = () => ({
  components: { VSelect, VOption },
  template: `<VSelect open >
    <VOption label="Custom Label 1" value="1" text="Option 1" />
    <VOption label="Custom Label 2" value="2" text="Option 2" />
    <VOption label="Custom Label 3" value="3" text="Option 3" />
  </VSelect>`,
});
export const OptionLabel = OptionLabelTemplate.bind({});

const HeightTemplate = () => ({
  components: { VSelect, VOption },
  template: `<div>
    <VSelect style="--select-height: 200px;" >
      <VOption value="1" text="Option 1"></VOption>
      <VOption value="2" text="Option 2"></VOption>
      <VOption value="3" text="Option 3"></VOption>
      <VOption value="4" text="Option 4"></VOption>
      <VOption value="5" text="Option 5"></VOption>
      <VOption value="6" text="Option 6"></VOption>
      <VOption value="7" text="Option 7"></VOption>
    </VSelect>
  </div>`,
});
export const Height = HeightTemplate.bind({});

const WidthTemplate = () => ({
  components: { VSelect, VOption },
  template: `<div>
    <VSelect label="choose one option" style="width: 140px;" >
      <VOption value="1" text="Option 1: dogs"></VOption>
      <VOption value="2" text="Option 2: cats"></VOption>
      <VOption value="3" text="Option 3: dogs and cats"></VOption>
    </VSelect>
  </div>`,
});
export const Width = WidthTemplate.bind({});

const UseCaseTemplate = () => ({
  components: { VSelect, VOption },
  template: `<div>
    <VSelect label="country code" :icon="value" style="width: 120px;" @change="value=$event.target._selectedOptions[0]._icon">
      <VOption value="1" text="+1" icon="flag-united-states"></VOption>
      <VOption value="+49" text="+49" icon="flag-germany"></VOption>
      <VOption value="+355" text="+355" icon="flag-albania"></VOption>
    </VSelect>
  </div>`,
  setup() {
    const value = ref('flag-united-states');
    return { value };
  },
});
export const UseCase = UseCaseTemplate.bind({});
