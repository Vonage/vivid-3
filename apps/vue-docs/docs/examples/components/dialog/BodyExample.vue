<template>
  <div style="height: 420px">
    <VDialog style="--dialog-max-block-size: 360px" open headline="Dialog Content" subtitle="Dialog with body content">
      <template #body>
        <form style="margin-top: 24px">
          <VLayout column-basis="block">
            <VTextField label="Name" />
            <VTextField label="Password" type="password" />
            <VButton label="Login" appearance="filled" />
          </VLayout>
        </form>
      </template>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { VDialog, VLayout, VTextField, VButton } from '@vonage/vivid-vue';
</script>
