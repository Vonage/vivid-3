
# Color Scheme

### Guidelines - Usage
### [How to work with UI Kit colors](../how-to-work-with-ui-kit-colors)
### [Guidelines - Accessibility](../guidelines-accessibility)

<hr>

## Guidelines - Usage

```html preview
<style>
 dl,
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
```

#### Usage

The color tokens are referenced using the `--vvd-color-{name}-{n}`.  

```css
#sideDrawer {
  --side-drawer-background-color: var(--vvd-color-neutral-100);
}
```