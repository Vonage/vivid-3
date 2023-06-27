
# Color Palette

## Guidelines - Usage & mapping

There’s a science to color. It’s part visual chemistry and part psychology. Balancing both makes for a palette that’s a powerful tool for establishing uniqueness. Our colors help to structure information and conveys the spirit of our brand.  
  
Application of the color palette brings a unified and recognizable consistency to Vonage’s vast array of digital products and interfaces. This consistency is grounded by a set of well-defined rules on how to work with the Vivid component library in the context of dark and light themes.

### Brand colors

Vivid’s default theme is derived from the Vonage Brand Identity color palette. Black is our Primary color and the core Purple family serves as the main action color across all Vonage products and experiences. The Neutral Gray family is dominant in our default theme, making use of subtle shifts in value and lightness to help organize content into distinct sections.

![color palette](https://user-images.githubusercontent.com/106529909/188305811-6f80d634-cc3d-4dc4-84ab-51949fbdc5dc.png)

#### Additional brand colors

Although we value an aesthetically pleasing use of color, we place a higher value on clear communication. Our use of color should be rational and should serve to support the purpose of the content. The additional brand colors should be used sparingly and purposefully throughout Vonage’s interfaces and applications, and mainly just for decoartive purposes.

![brand colors](https://user-images.githubusercontent.com/106529909/188305830-ab6f12ac-60c5-4844-890c-a7954165c701.png)

### Color token

A design token that’s specific to color usage. This provides a way of referencing a variable color value (a color value that changes based on color theme). Color tokens are named by the color and a number representing an index in the list of tints and shades.

For example, Purple-500 represents the sixth color in the list of tints and shades of purple.

![color token](https://user-images.githubusercontent.com/106529909/187898660-61384e46-0843-403b-bff8-431bcd4f7a47.png)

### Connotation colors

Colors have assigned meanings and are used consistently throughout Vivid to set expectations of meaning for users. Color is used sparingly and intentionally to reinforce hierarchies and to create clear modes of communication.

- Black - Accent
- Purple - CTA
- Magenta - Announcement
- Blue - Information
- Red - Alert
- Green - Success
- Yellow - Warning

<style>
 dl{
  border: 1px solid var(--vvd-color-neutral-100);
  border-radius: 6px;
  width: max-content;
  margin: 0;
 }

 dd {
  margin: 0;
 }

 .scale {
  --layout-grid-template-columns: repeat(11, 1fr);
  max-width: 950px;
  display: block;
 }

 .scale>div {
  --box-size: 70px;
  margin-block-start: var(--box-size);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--box-size);
 }

 .scale>div::before {
  aspect-ratio: 1;
  background-color: var(--color);
  position: absolute;
  inset: 0;
  border-radius: 50%;
  content: '';
  transform: translateY(calc(0px - var(--box-size)));
  border: 1px solid var(--vvd-color-neutral-100);
 }
</style>

<dl>

 <vwc-layout column-basis="block" column-spacing="small" gutters="small">
  <dt>
   <strong>Canvas:</strong> <samp>--vvd-color-<var>{n}</var></samp>
  </dt>

  <dd>
   <vwc-layout class="scale" column-spacing="small">
    <div style="--color: var(--vvd-color-canvas)"><small>canvas</small></div>
    <div style="--color: var(--vvd-color-canvas-text)"><small>canvas-text</small></div>
   </vwc-layout>
  </dd>
 </vwc-layout>

 <vwc-layout column-basis="block" column-spacing="small" gutters="small">
  <dt>
   <strong>Neutral:</strong> <samp>--vvd-color-neutral-<var>{n}</var></samp>
  </dt>

  <dd>
   <vwc-layout class="scale" column-spacing="small">
    <div style="--color: var(--vvd-color-neutral-50)"><small>50</small></div>
    <div style="--color: var(--vvd-color-neutral-100)"><small>100</small></div>
    <div style="--color: var(--vvd-color-neutral-200)"><small>200</small></div>
    <div style="--color: var(--vvd-color-neutral-300)"><small>300</small></div>
    <div style="--color: var(--vvd-color-neutral-400)"><small>400</small></div>
    <div style="--color: var(--vvd-color-neutral-500)"><small>500</small></div>
    <div style="--color: var(--vvd-color-neutral-600)"><small>600</small></div>
    <div style="--color: var(--vvd-color-neutral-700)"><small>700</small></div>
    <div style="--color: var(--vvd-color-neutral-800)"><small>800</small></div>
    <div style="--color: var(--vvd-color-neutral-900)"><small>900</small></div>
    <div style="--color: var(--vvd-color-neutral-950)"><small>950</small></div>
   </vwc-layout>
  </dd>
 </vwc-layout>

 <vwc-layout column-basis="block" column-spacing="small" gutters="small">
  <dt>
   <strong>CTA:</strong> <samp>--vvd-color-cta-<var>{n}</var></samp>
  </dt>

  <dd>
   <vwc-layout class="scale" column-spacing="small">
    <div style="--color: var(--vvd-color-cta-50)"><small>50</small></div>
    <div style="--color: var(--vvd-color-cta-100)"><small>100</small></div>
    <div style="--color: var(--vvd-color-cta-200)"><small>200</small></div>
    <div style="--color: var(--vvd-color-cta-300)"><small>300</small></div>
    <div style="--color: var(--vvd-color-cta-400)"><small>400</small></div>
    <div style="--color: var(--vvd-color-cta-500)"><small>500</small></div>
    <div style="--color: var(--vvd-color-cta-600)"><small>600</small></div>
    <div style="--color: var(--vvd-color-cta-700)"><small>700</small></div>
    <div style="--color: var(--vvd-color-cta-800)"><small>800</small></div>
    <div style="--color: var(--vvd-color-cta-900)"><small>900</small></div>
   </vwc-layout>
  </dd>
 </vwc-layout>

 <vwc-layout column-basis="block" column-spacing="small" gutters="small">
  <dt>
   <strong>Success:</strong> <samp>--vvd-color-success-<var>{n}</var></samp>
  </dt>

  <dd>
   <vwc-layout class="scale" column-spacing="small">
    <div style="--color: var(--vvd-color-success-50)"><small>50</small></div>
    <div style="--color: var(--vvd-color-success-100)"><small>100</small></div>
    <div style="--color: var(--vvd-color-success-200)"><small>200</small></div>
    <div style="--color: var(--vvd-color-success-300)"><small>300</small></div>
    <div style="--color: var(--vvd-color-success-400)"><small>400</small></div>
    <div style="--color: var(--vvd-color-success-500)"><small>500</small></div>
    <div style="--color: var(--vvd-color-success-600)"><small>600</small></div>
    <div style="--color: var(--vvd-color-success-700)"><small>700</small></div>
    <div style="--color: var(--vvd-color-success-800)"><small>800</small></div>
    <div style="--color: var(--vvd-color-success-900)"><small>900</small></div>
   </vwc-layout>
  </dd>
 </vwc-layout>

 <vwc-layout column-basis="block" column-spacing="small" gutters="small">
  <dt>
   <strong>Alert:</strong> <samp>--vvd-color-alert-<var>{n}</var></samp>
  </dt>

  <dd>
   <vwc-layout class="scale" column-spacing="small">
    <div style="--color: var(--vvd-color-alert-50)"><small>50</small></div>
    <div style="--color: var(--vvd-color-alert-100)"><small>100</small></div>
    <div style="--color: var(--vvd-color-alert-200)"><small>200</small></div>
    <div style="--color: var(--vvd-color-alert-300)"><small>300</small></div>
    <div style="--color: var(--vvd-color-alert-400)"><small>400</small></div>
    <div style="--color: var(--vvd-color-alert-500)"><small>500</small></div>
    <div style="--color: var(--vvd-color-alert-600)"><small>600</small></div>
    <div style="--color: var(--vvd-color-alert-700)"><small>700</small></div>
    <div style="--color: var(--vvd-color-alert-800)"><small>800</small></div>
    <div style="--color: var(--vvd-color-alert-900)"><small>900</small></div>
   </vwc-layout>
  </dd>
 </vwc-layout>

 <vwc-layout column-basis="block" column-spacing="small" gutters="small">
  <dt>
   <strong>Information:</strong> <samp>--vvd-color-information-<var>{n}</var></samp>
  </dt>

  <dd>
   <vwc-layout class="scale" column-spacing="small">
    <div style="--color: var(--vvd-color-information-50)"><small>50</small></div>
    <div style="--color: var(--vvd-color-information-100)"><small>100</small></div>
    <div style="--color: var(--vvd-color-information-200)"><small>200</small></div>
    <div style="--color: var(--vvd-color-information-300)"><small>300</small></div>
    <div style="--color: var(--vvd-color-information-400)"><small>400</small></div>
    <div style="--color: var(--vvd-color-information-500)"><small>500</small></div>
    <div style="--color: var(--vvd-color-information-600)"><small>600</small></div>
    <div style="--color: var(--vvd-color-information-700)"><small>700</small></div>
    <div style="--color: var(--vvd-color-information-800)"><small>800</small></div>
    <div style="--color: var(--vvd-color-information-900)"><small>900</small></div>
   </vwc-layout>
  </dd>
 </vwc-layout>

 <vwc-layout column-basis="block" column-spacing="small" gutters="small">
  <dt>
   <strong>Announcement:</strong> <samp>--vvd-color-announcement-<var>{n}</var></samp>
  </dt>

  <dd>
   <vwc-layout class="scale" column-spacing="small">
    <div style="--color: var(--vvd-color-announcement-50)"><small>50</small></div>
    <div style="--color: var(--vvd-color-announcement-100)"><small>100</small></div>
    <div style="--color: var(--vvd-color-announcement-200)"><small>200</small></div>
    <div style="--color: var(--vvd-color-announcement-300)"><small>300</small></div>
    <div style="--color: var(--vvd-color-announcement-400)"><small>400</small></div>
    <div style="--color: var(--vvd-color-announcement-500)"><small>500</small></div>
    <div style="--color: var(--vvd-color-announcement-600)"><small>600</small></div>
    <div style="--color: var(--vvd-color-announcement-700)"><small>700</small></div>
    <div style="--color: var(--vvd-color-announcement-800)"><small>800</small></div>
    <div style="--color: var(--vvd-color-announcement-900)"><small>900</small></div>
   </vwc-layout>
  </dd>
 </vwc-layout>

 <vwc-layout column-basis="block" column-spacing="small" gutters="small">
  <dt>
   <strong>Warning:</strong> <samp>--vvd-color-warning-<var>{n}</var></samp>
  </dt>

  <dd>
   <vwc-layout class="scale" column-spacing="small">
    <div style="--color: var(--vvd-color-warning-50)"><small>50</small></div>
    <div style="--color: var(--vvd-color-warning-100)"><small>100</small></div>
    <div style="--color: var(--vvd-color-warning-200)"><small>200</small></div>
    <div style="--color: var(--vvd-color-warning-300)"><small>300</small></div>
    <div style="--color: var(--vvd-color-warning-400)"><small>400</small></div>
    <div style="--color: var(--vvd-color-warning-500)"><small>500</small></div>
    <div style="--color: var(--vvd-color-warning-600)"><small>600</small></div>
    <div style="--color: var(--vvd-color-warning-700)"><small>700</small></div>
    <div style="--color: var(--vvd-color-warning-800)"><small>800</small></div>
    <div style="--color: var(--vvd-color-warning-900)"><small>900</small></div>
   </vwc-layout>
  </dd>
 </vwc-layout>

</dl>

#### Usage

The color tokens are referenced using the `--vvd-color-{name}-{n}`.  

```css
vwc-side-drawer::part(base) {
  background-color: var(--vvd-color-neutral-100);
}
```

### Alternate
A single component can be set with alternate colors.  

#### Class
Add the class `vvd-theme-alternate` to the component.
```html preview
<style>
.wrapper {
background-color: var(--vvd-color-neutral-950);
    width: 200px;
    height: 60px;
    display: grid;
    place-content: center;
}
</style>
<div class='wrapper'>
<vwc-button label='filled' appearance='filled' class='vvd-theme-alternate'></vwc-button>
</div>
```

#### Part
If the component has part, add `part='vvd-theme-alternate'`

### Gradients

Our brand colors are used to build two distinctive sets of gradients. 2-tone and 3-tone gradients.  
Gradients should only be used for decorative and illustrative purposes, never to convey functionality or information.

#### 2-tone gradients

![2-tone gradients](https://user-images.githubusercontent.com/106529909/188305849-ca5c783a-a983-45f0-840f-ef89c229989f.png)

#### 3-tone gradients

![3-tone gradients](https://user-images.githubusercontent.com/106529909/188305853-ebe7477f-e43b-4423-a0fe-485851c6bf18.png)

To learn more about the usage of 2-tone and 3-tone gradients please review -
[Vonage’s Brand Identity Toolkit manual.](https://drive.google.com/file/d/1zPE5qIJys_KyjpWNAfsW9tmHc3iXEOMl/view)
