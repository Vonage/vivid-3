# Color

<link rel="stylesheet" href="/assets/styles/color.css"/>

## There’s a science to color

##### It’s part visual chemistry and part psychology. Balancing both makes for a palette that’s a powerful tool for establishing uniqueness.

________________________________________________________________________


## Color palette

Our colors help to structure information and conveys the spirit of our brand. Application of the color palette brings a unified and 
recognizable consistency to Vonage’s vast array of digital products and interfaces. This consistency is grounded by a set of well-defined 
rules on how to work with the Vivid component library in the context of dark and light themes.

### Usage

The color tokens are referenced using the `--vvd-color-{name}-{n}`.  

```css
 #side-drawer {
  	--side-drawer-background-color: var(--vvd-color-neutral-10);
  }
```

### Connotation Colors

Colors have assigned meanings and are used consistently throughout Vivid to set expectations of meaning for users. Color is used sparingly and intentionally to reinforce hierarchies and to create clear modes of communication. 

<vwc-layout column-basis="block">
<vwc-layout class="color_connotation" column-basis="base-small" column-spacing="base-small">
  <div class="color_name">
    Cta<br>
    <code>--vvd-color-cta-<em>{n}</em></code>
  </div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta);"></div>cta</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-on-cta);"></div>on-cta</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-10);"></div>10</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-20);"></div>20</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-cta-30);"></div>30</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-70);"></div>70</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-90);"></div>90</div>

  <div class="color_name">
    Success<br>
    <code>--vvd-color-success-<em>{n}</em></code>
  </div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success);"></div>success</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-on-success);"></div>on-success</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-10);"></div>10</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-20);"></div>20</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-30);"></div>30</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-70);"></div>70</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-success-90);"></div>90</div>

  <div class="color_name">
    Alert<br>
    <code>--vvd-color-alert-<em>{n}</em></code>
  </div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert);"></div>alert</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-on-alert);"></div>on-alert</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-10);"></div>10</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-20);"></div>20</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-30);"></div>30</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-70);"></div>70</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-alert-90);"></div>90</div>

  <div class="color_name">
    Warning<br>
    <code>--vvd-color-warning-<em>{n}</em></code>
  </div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning);"></div>warning</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-on-warning);"></div>on-warning</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-10);"></div>10</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-20);"></div>20</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-30);"></div>30</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-70);"></div>70</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-warning-90);"></div>90</div>

  <div class="color_name">
    Info<br>
    <code>--vvd-color-info-<em>{n}</em></code>
  </div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-info);"></div>info</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-on-info);"></div>on-info</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-info-10);"></div>10</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-info-20);"></div>20</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-info-30);"></div>30</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-info-70);"></div>70</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-info-90);"></div>90</div>
  
  <div class="color_name">
    Announcement<br>
    <code>--vvd-color-announcement-<em>{n}</em></code>
  </div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement);"></div>announcement</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-on-announcement);"></div>on-announcement</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-10);"></div>10</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-20);"></div>20</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-30);"></div>30</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-70);"></div>70</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-announcement-90);"></div>90</div>
</vwc-layout>

<vwc-layout class="color_primary" column-basis="base-small" column-spacing="base-small">
   <div class="color_name">
    Canvas<br>
    <code>--vvd-color-canvas-<em>{n}</em></code>
  </div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-canvas);"></div>canvas</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-on-canvas);"></div>on-canvas</div>

  <div class="color_name">
    Primary<br>
    <code>--vvd-color-primary-<em>{n}</em></code>
  </div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-primary);"></div>primary</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-on-primary);"></div>on-primary</div>
</vwc-layout>

<vwc-layout class="color_neutral" column-basis="base-small" column-spacing="base-small">
  <div class="color_name">
    Neutral<br>
    <code>--vvd-color-neutral-<em>{n}</em></code>
  </div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral);"></div>neutral</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-on-neutral);"></div>on-neutral</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-10);"></div>10</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-20);"></div>20</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-30);"></div>30</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-40);"></div>40</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-50);"></div>50</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-70);"></div>70</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-80);"></div>80</div>
  <div class="color_wrapper"><div class="color_rec" style="background-color: var(--vvd-color-neutral-90);"></div>90</div>
</vwc-layout>
</vwc-layout>

