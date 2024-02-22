# VFilePicker Examples

## FilePicker

<code-tab>
<template #example>
<FilePickerExample />
</template>
<template #code>

```vue
<!--@include: ./components/file-picker/FilePickerExample.vue -->
```

</template>
</code-tab>



<script setup lang="ts">
import CodeTab from "../custom/CodeTab.vue";
import { defineClientComponent } from 'vitepress';

const FilePickerExample = defineClientComponent(() =>  import('./components/file-picker/FilePickerExample.vue'));
</script>
