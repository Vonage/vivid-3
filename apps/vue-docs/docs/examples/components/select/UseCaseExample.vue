<template>
  <div class="container">
    <VSelect
      v-model="value"
      label="country code"
      :icon="flag"
    >
      <VOption
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :text="option.text"
        :icon="option.icon"
      />
    </VSelect>
  </div>
</template>

<script setup lang="ts">
import { VSelect, VOption } from '@vonage/vivid-vue';
import { computed, ref } from 'vue';

const options = [
	{ value: '+1', text: '+1', icon: 'flag-united-states' },
	{ value: '+49', text: '+49', icon: 'flag-germany' },
	{ value: '+355', text: '+355', icon: 'flag-albania' },
];

const value = ref('+1');
const flag = computed(() => options.find((option) => option.value === value.value)!.icon);
</script>

<style scoped>
.container {
  block-size: 230px;
}
</style>
