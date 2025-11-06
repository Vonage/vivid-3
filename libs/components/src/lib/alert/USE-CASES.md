## Error on Save

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview 300px
<script setup lang="ts">
import { ref } from 'vue';
import { VAlert, VButton, VTextArea, VLayout } from '@vonage/vivid-vue';

// Reactive state for the alert and button
const alertOpen = ref(false);
const buttonPending = ref(false);
const message = ref('');

// Simulate sending a message
function simulateSend() {
	buttonPending.value = true;

	setTimeout(() => {
		buttonPending.value = false;
		alertOpen.value = true;
	}, 2000);
}
</script>

<template>
	<div style="max-inline-size: 420px;">
		<!-- Alert -->
		<VAlert v-model:open="alertOpen" connotation="alert" headline="Message not sent" text="There seems to be a problem with your connection. Please try again later." removable />

		<!-- Layout for message input and button -->
		<VLayout column-spacing="small" column-basis="block" style="display: block;">
			<VTextArea label="Message" v-model="message" />

			<div>
				<VButton appearance="filled" label="Send" :pending="buttonPending" @click="simulateSend" />
			</div>
		</VLayout>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```html preview 300px
<vwc-alert connotation="alert" headline="Message not sent" text="There seems to be a problem with your connection. Please try again later." removable></vwc-alert>

<vwc-layout column-spacing="small" column-basis="block" style="display: block; max-inline-size: 420px">
	<vwc-text-area label="Message"></vwc-text-area>

	<div>
		<vwc-button appearance="filled" label="Send" onclick="simulateSend(this)"></vwc-button>
	</div>
</vwc-layout>

<script>
	function simulateSend(button) {
		button.pending = true;
		setTimeout(() => {
			button.pending = false;
			document.querySelector('vwc-alert').open = true;
		}, 2000);
	}
</script>
```

</vwc-tab-panel>
</vwc-tabs>
