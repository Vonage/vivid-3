# Dialog common design patterns
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

```
