import { VCard, VDivider, VLayout } from '@vonage/vivid-vue';
import { argTypes } from './generated/VLayout';

export default {
  title: 'Wrappers/Layout',
  component: VLayout,
  argTypes,
};
const LayoutTemplate = () => ({
  components: { VLayout, VCard },
  template: `<VLayout>
    <VCard headline="Lorem ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
      <template #media>
        <img
          src="https://picsum.photos/id/1015/300/200"
          alt="landscape"
          style="width: 100%; height: 150px; object-fit: cover"
        />
      </template>
    </VCard>
    <VCard headline="Lorem ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
      <template #media>
        <img
          src="https://picsum.photos/id/1016/300/200"
          alt="landscape"
          style="width: 100%; height: 150px; object-fit: cover"
        />
      </template>
    </VCard>
    <VCard headline="Lorem ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
      <template #media>
        <img
          src="https://picsum.photos/id/1018/300/200"
          alt="landscape"
          style="width: 100%; height: 150px; object-fit: cover"
        />
      </template>
    </VCard>
    <VCard headline="Lorem ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
      <template #media>
        <img
          src="https://picsum.photos/id/1019/300/200"
          alt="landscape"
          style="width: 100%; height: 150px; object-fit: cover"
        />
      </template>
    </VCard>
    <VCard headline="Lorem ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
      <template #media>
        <img
          src="https://picsum.photos/id/1055/300/200"
          alt="landscape"
          style="width: 100%; height: 150px; object-fit: cover"
        />
      </template>
    </VCard>
    <VCard headline="Lorem ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
      <template #media>
        <img
          src="https://picsum.photos/id/1050/300/200"
          alt="landscape"
          style="width: 100%; height: 150px; object-fit: cover"
        />
      </template>
    </VCard>
  </VLayout>`,
});
export const Layout = LayoutTemplate.bind({});

const ColumnSpacingTemplate = () => ({
  components: { VLayout, VCard },
  template: `<div>
    <VLayout gutters="small" column-spacing="small">
      <VCard :elevation="2" text="small" />
      <VCard :elevation="2" text="small" />
      <VCard :elevation="2" text="small" />
    </VLayout>
    <VLayout gutters="small" column-spacing="medium">
      <VCard :elevation="2" text="medium" />
      <VCard :elevation="2" text="medium" />
      <VCard :elevation="2" text="medium" />
    </VLayout>
    <VLayout gutters="small" column-spacing="large">
      <VCard :elevation="2" text="large" />
      <VCard :elevation="2" text="large" />
      <VCard :elevation="2" text="large" />
    </VLayout>
  </div>`,
});
export const ColumnSpacing = ColumnSpacingTemplate.bind({});

const ColumnBasisTemplate = () => ({
  components: { VLayout, VCard },
  template: `<div>
    <VLayout gutters="small" column-basis="small">
      <VCard :elevation="2" text="small" />
      <VCard :elevation="2" text="small" />
      <VCard :elevation="2" text="small" />
      <VCard :elevation="2" text="small" />
    </VLayout>
    <VLayout gutters="small" column-basis="medium">
      <VCard :elevation="2" text="medium" />
      <VCard :elevation="2" text="medium" />
      <VCard :elevation="2" text="medium" />
      <VCard :elevation="2" text="medium" />
    </VLayout>
    <VLayout gutters="small" column-basis="large">
      <VCard :elevation="2" text="large" />
      <VCard :elevation="2" text="large" />
      <VCard :elevation="2" text="large" />
      <VCard :elevation="2" text="large" />
    </VLayout>
    <VLayout gutters="small" column-basis="block">
      <VCard :elevation="2" text="block" />
      <VCard :elevation="2" text="block" />
      <VCard :elevation="2" text="block" />
      <VCard :elevation="2" text="block" />
    </VLayout>
  </div>`,
});
export const ColumnBasis = ColumnBasisTemplate.bind({});

const AutoSizingTemplate = () => ({
  components: { VLayout, VCard },
  template: `<div>
    <VLayout auto-sizing="fit">
      <VCard :elevation="2" text="fit" />
      <VCard :elevation="2" text="fit" />
    </VLayout>
    <VLayout auto-sizing="fill">
      <VCard :elevation="2" text="fill" />
      <VCard :elevation="2" text="fill" />
    </VLayout>
  </div>`,
});
export const AutoSizing = AutoSizingTemplate.bind({});

const GuttersTemplate = () => ({
  components: { VLayout, VCard, VDivider },
  template: `<div>
    <VLayout>
      <VCard :elevation="2" text="none" />
    </VLayout>
    <VDivider />
    <VLayout gutters="small">
      <VCard :elevation="2" text="small" />
    </VLayout>
    <VDivider />
    <VLayout gutters="medium">
      <VCard :elevation="2" text="medium" />
    </VLayout>
    <VDivider />
    <VLayout gutters="large">
      <VCard :elevation="2" text="large" />
    </VLayout>
  </div>`,
});
export const Gutters = GuttersTemplate.bind({});

const GuttersInlineTemplate = () => ({
  components: { VLayout, VCard, VDivider },
  template: `<div>
    <VLayout gutters="small-inline">
      <VCard :elevation="2" text="small-inline" />
    </VLayout>
    <VDivider />
    <VLayout gutters="medium-inline">
      <VCard :elevation="2" text="medium-inline" />
    </VLayout>
    <VDivider />
    <VLayout gutters="large-inline">
      <VCard :elevation="2" text="large-inline" />
    </VLayout>
  </div>`,
});
export const GuttersInline = GuttersInlineTemplate.bind({});

const GuttersBlockTemplate = () => ({
  components: { VLayout, VCard, VDivider },
  template: `<div>
    <VLayout gutters="small-block">
      <VCard :elevation="2" text="small-block" />
    </VLayout>
    <VDivider />
    <VLayout gutters="medium-block">
      <VCard :elevation="2" text="medium-block" />
    </VLayout>
    <VDivider />
    <VLayout gutters="large-block">
      <VCard :elevation="2" text="large-block" />
    </VLayout>
  </div>`,
});
export const GuttersBlock = GuttersBlockTemplate.bind({});

const GridTemplateColumnsTemplate = () => ({
  components: { VLayout, VCard },
  template: `<div>
    <VLayout style="--layout-grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));">
      <VCard :elevation="2" />
      <VCard :elevation="2" />
      <VCard :elevation="2" />
      <VCard :elevation="2" />
    </VLayout>
    <VLayout style="--layout-grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));">
      <VCard :elevation="2" />
      <VCard :elevation="2" />
      <VCard :elevation="2" />
      <VCard :elevation="2" />
    </VLayout>
    <VLayout style="--layout-grid-template-columns: 280px repeat(auto-fill, minmax(100px, 1fr));">
      <VCard :elevation="2" />
      <VCard :elevation="2" />
      <VCard :elevation="2" />
      <VCard :elevation="2" />
    </VLayout>
  </div>`,
});
export const GridTemplateColumns = GridTemplateColumnsTemplate.bind({});
