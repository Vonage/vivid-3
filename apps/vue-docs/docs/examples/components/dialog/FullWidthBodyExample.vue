<template>
  <div style="height: 400px">
    <VDialog open icon-placement="side" icon="info" headline="Dialog Headline" full-width-body>
      <template #body>
        <div style="margin-bottom: 24px">
          <VProgress :min="0" :max="50" :value="12.5" shape="sharp" connotation="pacific" />
        </div>
        <VLayout column-basis="block" gutters="medium-inline">
          <form>
            <VLayout column-basis="block">
              <VTextField label="Agent Name" placeholder="Search for an agent" icon="search-line" />
              <VTextArea label="Additional Note (Optional)" />
            </VLayout>
          </form>
        </VLayout>
      </template>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { VDialog, VProgress, VLayout, VTextField, VTextArea } from '@vonage/vivid-vue';
</script>
