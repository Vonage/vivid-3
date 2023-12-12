<template>
  <VButton connotation="cta" shape="pill" :icon="icon" :aria-label="ariaLabel" @click="toggleButton" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { VButton } from '@vonage/vivid-vue';

const icon = ref('microphone-solid');
const ariaLabel = ref('Mute');
const ariaPressed = ref(false);

function toggleButton() {
  ariaPressed.value = !ariaPressed.value;
  icon.value = ariaPressed.value ? 'mic-mute-solid' : 'microphone-solid';
  ariaLabel.value = ariaPressed.value ? 'Unmute' : 'Mute';
}
</script>
