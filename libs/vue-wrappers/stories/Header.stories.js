import { VBanner, VButton, VHeader, VLayout } from '@vonage/vivid-vue';
import { argTypes } from './generated/VHeader';

export default {
  title: 'Wrappers/Header',
  component: VHeader,
  argTypes,
};

const Template = () => ({
  components: { VHeader },
  template: `<VHeader elevation-shadow>
  Header content
</VHeader>`,
});

export const ElevationShadow = Template.bind({});

const AlternateTemplate = () => ({
  components: { VHeader },
  template: `<VHeader alternate>
  Header content
</VHeader>`,
});

export const Alternate = AlternateTemplate.bind({});

const DefaultSlotTemplate = () => ({
  components: { VHeader },
  template: `<VHeader>
   Header content
</VHeader>`,
});

export const DefaultSlot = DefaultSlotTemplate.bind({});

const ActionItemsTemplate = () => ({
  components: { VHeader, VButton },
  template: `<VHeader>
  <VButton slot="action-items" icon="twitter-mono"/>
  <VButton slot="action-items" icon="facebook-mono"/>
  <VButton slot="action-items" icon="heart-solid"/>
</vwc-header>`,
});

export const ActionItems = ActionItemsTemplate.bind({});

const AppContentTemplate = () => ({
  components: { VHeader, VLayout },
  template: `<VHeader>
  Header content
  <main slot="app-content">
    <VLayout gutters="small">
      Application content
    </VLayout>
  </main>
</VHeader>`,
});

export const AppContent = AppContentTemplate.bind({});

const BlockSizeTemplate = () => ({
  components: { VHeader, VLayout },
  template: `
<VHeader>
  Header content

  <main slot="app-content">
    <VLayout column-basis="block" gutters="medium">
      <h1>
        Application content
      </h1>
    </VLayout>
  </main>
</VHeader>`,
});

export const BlockSize = BlockSizeTemplate.bind({});

const BasePartTemplate = () => ({
  components: { VHeader, VLayout },
  template: `<VHeader class="v3Header">
  Header content
</VHeader>`,
  mounted() {
    const css = document.createElement('style');
    css.type = 'text/css';
    css.appendChild(
      document.createTextNode(`.v3Header::part(base) { background-color: var(--vvd-color-neutral-100); }
    `)
    );
    this.$el.appendChild(css);
  },
});

export const BasePart = BasePartTemplate.bind({});

const HeaderWithBannerTemplate = () => ({
  components: { VHeader, VLayout, VBanner },
  template: `<VHeader>
  Header with Banner

  <VBanner slot="app-content" text="Here's some information that you may find important!"></VBanner>

  <VLayout slot="app-content" column-basis="block" gutters="medium">
    <h1>
      Page Header
    </h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
  </VLayout>

</VHeader>`,
  style: `html {
    block-size: 200px;
  }

  vwc-banner {
    position: sticky;
    top: 0;
  }`,
});

export const HeaderWithBanner = HeaderWithBannerTemplate.bind({});
