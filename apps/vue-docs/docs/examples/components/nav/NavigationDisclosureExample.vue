<template>
  <VNav>
    <VNavDisclosure label="1st level item" open>
      <VNavItem
        href="#"
        text="2nd level item"
        :aria-current="selectedItem === 1 ? 'page' : undefined"
        @click.prevent="selectedItem = 1"
      />
      <VNavDisclosure label="2nd level item" open>
        <VNavItem
          href="#"
          text="3rd level item"
          :aria-current="selectedItem === 2 ? 'page' : undefined"
          @click.prevent="selectedItem = 2"
        />
        <VNavItem
          href="#"
          text="3rd level item"
          :aria-current="selectedItem === 3 ? 'page' : undefined"
          @click.prevent="selectedItem = 3"
        />
      </VNavDisclosure>
    </VNavDisclosure>
  </VNav>
</template>

<script setup lang="ts">
import { VNav, VNavDisclosure, VNavItem } from '@vonage/vivid-vue';
import { ref } from 'vue';

const selectedItem = ref(1);
</script>
