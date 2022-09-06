
<style>
  .color_layout {
    --layout-grid-template-columns: 280px repeat(11, 1fr);
  }
  .color_wrapper {
    font-size: 0.75rem;
    text-align: center;
  }
  .color_rec {
    height: 3rem;
    border: 1px solid var(--vvd-color-neutral-100);
  }
</style>

# Color Scheme


### [Guidelines - Usage]
### [How to work with UI Kit colors](../how-to-work-with-ui-kit-colors)
### [Guidelines - Accessibility](../guidelines-accessibility)

<hr>

## Guidelines - Usage

There’s a science to color. It’s part visual chemistry and part psychology. Balancing both makes for a palette that’s a powerful tool for establishing uniqueness. Our colors help to structure information and conveys the spirit of our brand.  
  
Application of the color palette brings a unified and recognizable consistency to Vonage’s vast array of digital products and interfaces. This consistency is grounded by a set of well-defined rules on how to work with the Vivid component library in the context of dark and light themes.
<hr>

### Brand colors
Vivid’s default theme is derived from the Vonage Brand Identity color palette. Black is our Primary color and the core Purple family serves as the main action color across all Vonage products and experiences. The Neutral Gray family is dominant in our default theme, making use of subtle shifts in value and lightness to help organize content into distinct sections.

![color palette](https://user-images.githubusercontent.com/106529909/188305811-6f80d634-cc3d-4dc4-84ab-51949fbdc5dc.png)

#### Additional brand colors
Although we value an aesthetically pleasing use of color, we place a higher value on clear communication. Our use of color should be rational and should serve to support the purpose of the content. The additional brand colors should be used sparingly and purposefully throughout Vonage’s interfaces and applications, and mainly just for decoartive purposes.

![brand colors](https://user-images.githubusercontent.com/106529909/188305830-ab6f12ac-60c5-4844-890c-a7954165c701.png)

<hr>

### Color token

A design token that’s specific to color usage. This provides a way of referencing a variable color value (a color value that changes based on color theme). Color tokens are named by the color and a number representing an index in the list of tints and shades.

For example, Purple-500 represents the sixth color in the list of tints and shades of purple.

![color token](https://user-images.githubusercontent.com/106529909/187898660-61384e46-0843-403b-bff8-431bcd4f7a47.png)
   
   <hr>

### Connotation colors

Colors have assigned meanings and are used consistently throughout Vivid to set expectations of meaning for users. Color is used sparingly and intentionally to reinforce hierarchies and to create clear modes of communication.

 - Purple - CTA
 - Green - Success
 - Red - Alert
 - Blue - Information
 - Magenta - Announcement
 - Yellow - Warning
 - Black - Neutral

<vwc-layout class="color_layout" column-basis="small" column-spacing="small">
  <div>
    Cta<br>
    <code>--vvd-color-cta-<em>{n}</em></code>
  </div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-50);"></div>50</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-100);"></div>100</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-200);"></div>200</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-300);"></div>300</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-400);"></div>400</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-500);"></div>500</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-600);"></div>600</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-700);"></div>700</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-800);"></div>800</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-900);"></div>900</div>
</vwc-layout>
<vwc-layout class="color_layout" column-basis="small" column-spacing="small">
  <div>
    Success<br>
    <code>--vvd-color-success-<em>{n}</em></code>
  </div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-50);"></div>50</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-100);"></div>100</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-200);"></div>200</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-300);"></div>300</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-400);"></div>400</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-500);"></div>500</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-600);"></div>600</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-700);"></div>700</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-800);"></div>800</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-900);"></div>900</div>
</vwc-layout>
<vwc-layout class="color_layout" column-basis="small" column-spacing="small">
  <div>
    Alert<br>
    <code>--vvd-color-alert-<em>{n}</em></code>
  </div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-50);"></div>50</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-100);"></div>100</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-200);"></div>200</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-300);"></div>300</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-400);"></div>400</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-500);"></div>500</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-600);"></div>600</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-700);"></div>700</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-800);"></div>800</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-900);"></div>900</div>
</vwc-layout>
<vwc-layout class="color_layout" column-basis="small" column-spacing="small">
  <div>
    Information<br>
    <code>--vvd-color-information-<em>{n}</em></code>
  </div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-information-50);"></div>50</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-information-100);"></div>100</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-information-200);"></div>200</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-information-300);"></div>300</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-information-400);"></div>400</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-information-500);"></div>500</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-information-600);"></div>600</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-information-700);"></div>700</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-information-800);"></div>800</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-information-900);"></div>900</div>
  </vwc-layout>
  <vwc-layout class="color_layout" column-basis="small" column-spacing="small">
  <div>
    Announcement<br>
    <code>--vvd-color-announcement-<em>{n}</em></code>
  </div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-50);"></div>50</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-100);"></div>100</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-200);"></div>200</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-300);"></div>300</div>
    <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-400);"></div>400</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-500);"></div>500</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-600);"></div>600</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-700);"></div>700</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-800);"></div>800</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-900);"></div>900</div>
</vwc-layout>
<vwc-layout class="color_layout" column-basis="small" column-spacing="small">
  <div>
    Warning<br>
    <code>--vvd-color-warning-<em>{n}</em></code>
  </div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-50);"></div>50</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-100);"></div>100</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-200);"></div>200</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-300);"></div>300</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-400);"></div>400</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-500);"></div>500</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-600);"></div>600</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-700);"></div>700</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-800);"></div>800</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-900);"></div>900</div>
</vwc-layout>
<vwc-layout class="color_layout" column-basis="small" column-spacing="small">
  <div>
    Neutral<br>
    <code>--vvd-color-neutral-<em>{n}</em></code>
  </div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-50);"></div>50</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-100);"></div>100</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-200);"></div>200</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-300);"></div>300</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-400);"></div>400</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-500);"></div>500</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-600);"></div>600</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-700);"></div>700</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-800);"></div>800</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-900);"></div>900</div>
   <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-950);"></div>950</div>
</vwc-layout>

#### Usage

The color tokens are referenced using the `--vvd-color-{name}-{n}`.  

```css
#sideDrawer {
  --side-drawer-background-color: var(--vvd-color-neutral-100);
}
```

<hr>

### Gradients

Our brand colors are used to build two distinctive sets of gradients. 2-tone and 3-tone gradients.  
Gradients should only be used for decorative and illustrative purposes, never to convey functionality or information.

#### 2-tone gradients

![2-tone gradients](https://user-images.githubusercontent.com/106529909/188305849-ca5c783a-a983-45f0-840f-ef89c229989f.png)

#### 3-tone gradients

![3-tone gradients](https://user-images.githubusercontent.com/106529909/188305853-ebe7477f-e43b-4423-a0fe-485851c6bf18.png)

To learn more about the usage of 2-tone and 3-tone gradients please review -
[Vonage’s Brand Identity Toolkit manual.](https://drive.google.com/file/d/1zPE5qIJys_KyjpWNAfsW9tmHc3iXEOMl/view)