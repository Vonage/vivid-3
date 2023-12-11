<template>
  <VLayout column-basis="block" column-spacing="small" style="--layout-grid-template-columns: 250px">
    <VTextField name="username" aria-label="Username" placeholder="Username" />
    <VActionGroup appearance="fieldset" tight>
      <VButton icon="flag-uruguay" />
      <VTextField
        appearance="ghost"
        aria-label="Phone number"
        placeholder="Phone number"
        name="phone"
        autocomplete=""
        style="flex-grow: 1"
      />
    </VActionGroup>
  </VLayout>
</template>

<script setup lang="ts">
import { VLayout, VTextField, VButton, VActionGroup } from '@vonage/vivid-vue';
</script>
