# Dialog common design patterns
### WORK IN PROGRESS!!


### Announcements
can be found in used in VBC and VCC

```html preview
<style>
  html { /* for demo purposes */
    block-size: 400px;
  }
  .button {
    align-self: center;
  }
</style>
<vwc-button appearance="filled"  connotation="cta" label="trigger to open Announcment" onclick="openDialog()"></vwc-button>
<vwc-dialog>
<vwc-card headline="headline" subtitle="Subtilte"" slot="main">
  <img slot="media" src="https://doodleipsum.com/300x150/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540" alt="Sitting on Floor"style="width: 100%; height: 150px; object-fit: cover;"/>
  <vwc-button slot="footer" class="button" shape="pill" label="Done" appearance="outlined" current-value=""></vwc-button>
</vwc-card>
</vwc-dialog>

<script>
  function openDialog() {
    const dialog = document.querySelector('vwc-dialog');
    dialog.showModal();
  }
</script>
```

## Onboarding


```html preview
<style>
  html { /* for demo purposes */
    block-size: 400px;
  }
  .button {
    align-self: center;
  }
</style>
<vwc-button appearance="filled"  connotation="cta" label="trigger to open Announcment" onclick="openDialog()"></vwc-button>
<vwc-dialog headline="Participants" icon-placement="side" icon="info">
<div class="body" slot="body">

<vwc-tabs activeid="apps">
    <vwc-tab label="Schedule" id="schedule"></vwc-tab>
    <vwc-tab label="Call flow" id="callFlow"></vwc-tab>
    <vwc-tab-panel id="schedule">

    </vwc-tab-panel>
    <vwc-tab-panel id="callFlow">

    </vwc-tab-panel>
</vwc-tabs>


<vwc-layout gutters="medium-inline" column-basis="small" column-spacing="large" >
<vwc-action-group appearance="ghost">
  <vwc-button label="edit" appearance="filled"></vwc-button>
  <vwc-button label="copy" appearance="filled"></vwc-button>
  <vwc-button label="paste" appearance="filled"></vwc-button>
  <vwc-button label="submit" appearance="filled"></vwc-button>
</vwc-action-group>

<span>Choose a VR to apply from the list below</span>
</vwc-layout>
<vwc-divider></vwc-divider>
</div>
</vwc-dialog>

<script>
  function openDialog() {
    const dialog = document.querySelector('vwc-dialog');
    dialog.showModal();
  }
</script>
```




```html preview
<style>
  html { /* for demo purposes */
    block-size: 600px;
  }
  .body {
    margin-top: 24px;
  }
  .demo-footer {
    display: flex;
    justify-content: flex-end;
    column-gap: 8px;
  }
</style>
<vwc-dialog open
  headline="Dialog with footer"
  subtitle="this is an example of the dialog with slotted buttons inside footer">
  <div slot="body">
    <form>
      <vwc-layout column-basis="block">
        <vwc-text-field label="Name"></vwc-text-field>
        <vwc-text-field label="Password" type="password"></vwc-text-field>
        <vwc-button label="Login" appearance="filled"></vwc-button>
      </vwc-layout>
    </form>
  </div>
  <div slot="footer" class="demo-footer">
    <vwc-button appearance="outlined" label="Cancel"></vwc-button>
    <vwc-button appearance="filled" label="Action"></vwc-button>
  </div>
</vwc-dialog>
```
