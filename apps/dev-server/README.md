# Dev Server

A local development server for Vivid components. It renders Web Component (HTML) or Vue example code written the same way as in our docs.

Functionality:

- Reloads automatically on code or example changes
- Maintains source mapping for easier debugging

## Running

```sh
pnpm dev
```

The server starts at [http://localhost:5200](http://localhost:5200). The index page lists all available examples.

## Creating Examples

### Web Components

Create an `.html` file in `examples-wc/`. Write only the body fragment, the server wraps it in a full page that loads Vivid styles, fonts, and registers all components automatically.

**Example:** `examples-wc/my-feature.html`:

```html
<vwc-button appearance="filled" label="Click Me"></vwc-button>

<script>
	document.querySelector('vwc-button').addEventListener('click', () => alert('Clicked!'));
</script>
```

View it at `http://localhost:5200/wc/my-feature.html`.

### Vue

Create a `.vue` SFC in `examples-vue/`. The server mounts it as a Vue app with the `vividVue` plugin already configured.

**Example:** `examples-vue/my-feature.vue`:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VButton } from '@vonage/vivid-vue';

const count = ref(0);
</script>

<template>
	<VButton appearance="filled" :label="`Clicked ${count} times`" @click="count++" />
</template>
```

View it at `http://localhost:5200/vue/my-feature.vue`.
