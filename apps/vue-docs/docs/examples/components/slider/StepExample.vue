<template>
  <div>
    <div>
      <VSlider v-model="slidervalue" step="0.5" :value="slidervalue" />
    </div>
    <div>
      Current value: <span id="slidervalue">{{ slidervalue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VSlider } from '@vonage/vivid-vue';
import { ref } from 'vue';

const slidervalue = ref(5);
</script>
