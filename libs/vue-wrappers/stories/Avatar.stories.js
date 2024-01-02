import { VAvatar } from '@vonage/vivid-vue';
import { argTypes } from './generated/VAvatar';

export default {
  title: 'Wrappers/Avatar',
  component: VAvatar,
  argTypes,
};

const AvatarTemplate = () => ({
  components: { VAvatar },
  template: `<VAvatar aria-label="avatar" />`,
});
export const Avatar = AvatarTemplate.bind({});

const IconTemplate = () => ({
  components: { VAvatar },
  template: `<VAvatar icon="group-2-solid" />`,
});
export const Icon = IconTemplate.bind({});

const InitialsTemplate = () => ({
  components: { VAvatar },
  template: `<VAvatar initials="vivid avatar" />`,
});
export const Initials = InitialsTemplate.bind({});

const AppearanceTemplate = () => ({
  components: { VAvatar },
  template: `<div>
      <VAvatar appearance="filled" />
      <VAvatar appearance="duotone" />
      <VAvatar appearance="outlined" />
    </div>`,
});
export const Appearance = AppearanceTemplate.bind({});

const ConnotationTemplate = () => ({
  components: { VAvatar },
  template: `<div>
      <VAvatar connotation="accent" />
      <VAvatar connotation="cta" />
      <VAvatar connotation="accent" appearance="duotone" />
      <VAvatar connotation="cta" appearance="duotone" />
      <VAvatar connotation="accent" appearance="outlined" />
      <VAvatar connotation="cta" appearance="outlined" />
    </div>`,
});
export const Connotation = ConnotationTemplate.bind({});

const ShapeTemplate = () => ({
  components: { VAvatar },
  template: `<div>
      <VAvatar shape="rounded" />
      <VAvatar shape="pill" />
    </div>`,
});
export const Shape = ShapeTemplate.bind({});

const SizeTemplate = () => ({
  components: { VAvatar },
  template: `<div>
      <VAvatar size="condensed" shape="pill" />
      <VAvatar size="normal" shape="pill" />
      <VAvatar size="expanded" shape="pill" />
      <VAvatar size="condensed" shape="pill" initials="john doe" />
      <VAvatar size="normal" shape="pill" initials="john doe" />
      <VAvatar size="expanded" shape="pill" initials="john doe" />
    </div>`,
});
export const Size = SizeTemplate.bind({});

const GraphicTemplate = () => ({
  components: { VAvatar },
  template: `
    <div>
      <VAvatar shape="pill" connotation="cta">
        <template #graphic>
            <img
            src="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="woman"
            />
        </template>
      </VAvatar>
  
      <VAvatar shape="pill" connotation="cta">
        <template #graphic>
          <svg xmlns="http://www.w3.org/2000/svg" width="349.66" height="349.66" fill="none" viewBox="0 0 349.66 349.66">
            <path
              d="M258.65 229.64H106.73c-16.654 0-35.169-13.505-41.345-30.159L2.011 30.161C-4.165 13.507 4.325.002 20.985.002h151.91c16.653 0 35.168 13.505 41.344 30.159l63.374 169.32c6.183 16.654-2.307 30.159-18.967 30.159z"
              fill="url(#a)"
              transform="translate(0 59.913)"
            />
            <path
              d="M329.7 44.809H173.84c-15.565 0-32.869 12.619-38.643 28.183l-47.654 128.46c-5.775 15.564 2.16 28.183 17.731 28.183h155.86c15.564 0 32.868-12.619 38.642-28.183l47.655-128.46c5.774-15.564-2.167-28.183-17.731-28.183z"
              fill="url(#b)"
              transform="translate(0 59.913)"
            />
            <path
              d="M105.78 229.63h153.1a27.995 27.995 0 0 0 2.72-.185c.054.005.109.008.166.008 8.922 0 18.311-4.78 22.625-8.285 6.276-5.099 9.997-8.74 14.022-16.253-7.212 12.612-14.68 11.974-20.076-2.868a8.237 8.237 0 0 0-.778-1.626 38.248 38.248 0 0 0-.336-.944l-56.119-151.28a38.757 38.757 0 0 0-1.446-3.39h-45.819c-15.564 0-32.868 12.619-38.643 28.183L87.542 201.45a32.942 32.942 0 0 0-.621 1.831c-5.443 13.513-11.951 13.677-19.11 1.287 4.155 7.676 7.997 11.395 14.475 16.605 4.454 3.581 14.147 8.465 23.359 8.465.046 0 .092-.002.136-.005z"
              clip-rule="evenodd"
              fill="url(#c)"
              fill-rule="evenodd"
              transform="translate(0 59.913)"
            />
            <path
              d="M151.74 337.64h151.92c.894 0 1.765-.039 2.611-.115.113.028.235.042.365.042 8.923 0 18.311-4.78 22.626-8.286 6.275-5.099 9.996-8.739 14.021-16.252-6.853 11.984-13.937 12.005-19.256-.76a34.11 34.11 0 0 0-1.399-4.788l-63.375-169.32c-6.176-16.654-24.691-30.159-41.344-30.159H65.999c-16.66 0-25.15 13.505-18.974 30.159l63.374 169.32c6.176 16.654 24.691 30.159 41.345 30.159z"
              clip-rule="evenodd"
              fill="url(#d)"
              fill-rule="evenodd"
              transform="translate(-45 -48.087)"
              opacity=".4"
              style="mix-blend-mode: hard-light"
            />
            <path
              d="M219.03 153h155.86c15.564 0 23.506 12.619 17.731 28.183l-47.654 128.46c-5.775 15.564-23.079 28.183-38.643 28.183h-155.36c-.044.004-.09.006-.136.006-.182 0-.364-.002-.547-.006-2.08-.013-4.022-.252-5.812-.693-7.032-1.478-13.569-5.008-16.999-7.767-6.479-5.209-10.321-8.929-14.476-16.605 7.159 12.39 13.667 12.226 19.11-1.287.186-.605.393-1.216.621-1.831l47.654-128.46C186.154 165.619 203.458 153 219.022 153z"
              clip-rule="evenodd"
              fill="url(#e)"
              fill-rule="evenodd"
              transform="translate(-45 -48.087)"
              opacity=".15"
              style="mix-blend-mode: hard-light"
            />
            <path
              d="M330.05 45H174.19c-15.564 0-32.868 12.619-38.642 28.183l-47.655 128.46c-5.774 15.564 2.161 28.183 17.731 28.183h155.86c15.564 0 32.868-12.619 38.642-28.183l47.655-128.46C353.555 57.619 345.614 45 330.05 45z"
              fill="url(#f)"
              fill-opacity=".2"
              transform="translate(0 59.913)"
            />
            <defs>
              <linearGradient
                id="a"
                x1="226"
                x2="45"
                y1="108"
                y2="67.5"
                gradientTransform="translate(-45 -108)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#A662FF" offset="0" />
                <stop stop-color="#57EDFD" offset="1" />
              </linearGradient>
              <linearGradient
                id="b"
                x1="278.5"
                x2="404"
                y1="306"
                y2="157.5"
                gradientTransform="translate(-45 -108)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FC27F6" offset="0" />
                <stop stop-color="#FFA694" offset="1" />
              </linearGradient>
              <linearGradient
                id="c"
                x1="186.5"
                x2="343"
                y1="153"
                y2="153"
                gradientTransform="translate(-45 -108)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#7600FF" offset="0" />
                <stop stop-color="#FB2FFB" offset="1" />
              </linearGradient>
              <linearGradient id="d" x1="252.5" x2="216" y1="112.5" y2="127.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#fff" offset="0" />
                <stop stop-color="#fff" stop-opacity="0" offset="1" />
              </linearGradient>
              <linearGradient id="e" x1="190" x2="210.86" y1="165" y2="172.66" gradientUnits="userSpaceOnUse">
                <stop stop-color="#fff" offset="0" />
                <stop stop-color="#fff" stop-opacity="0" offset="1" />
              </linearGradient>
              <linearGradient
                id="f"
                x1="372.5"
                x2="346.5"
                y1="249"
                y2="240"
                gradientTransform="translate(-45 -108)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#fff" offset="0" />
                <stop stop-color="#fff" stop-opacity="0" offset="1" />
              </linearGradient>
            </defs>
          </svg>
        </template>
      </VAvatar>
    </div>`,
});

export const graphic = GraphicTemplate.bind({});
