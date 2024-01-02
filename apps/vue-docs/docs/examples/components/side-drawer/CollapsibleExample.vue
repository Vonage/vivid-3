<template>
  <div class="container">
    <VSideDrawer class="drawer" :class="{ collapsed: !open }" open alternate>
      <VLayout gutters="small" column-basis="block">
        <VNav>
          <VNavItem
            class="item"
            href="#"
            :text="open ? 'Calls' : ''"
            :data-label="open ? '' : 'Calls'"
            icon="call-line"
            :aria-current="selected === 'calls' ? 'page' : null"
            @click.prevent="selected = 'calls'"
          />
          <VNavItem
            class="item"
            href="#"
            :text="open ? 'Voicemail' : ''"
            :data-label="open ? '' : 'Voicemail'"
            icon="voicemail-line"
            :aria-current="selected === 'voicemail' ? 'page' : null"
            @click.prevent="selected = 'voicemail'"
          />
          <VNavItem
            class="item"
            href="#"
            :text="open ? 'SMS' : ''"
            :data-label="open ? '' : 'SMS'"
            icon="chat-line"
            :aria-current="selected === 'sms' ? 'page' : null"
            @click.prevent="selected = 'sms'"
          />
        </VNav>
      </VLayout>
      <VLayout slot="app-content" gutters="medium"> Toggle the side drawer by clicking the FAB. </VLayout>
      <VFab slot="app-content" class="fab" icon="menu-solid" @click="open = !open" />
    </VSideDrawer>
  </div>
</template>

<script setup lang="ts">
import { VFab, VLayout, VNav, VNavItem, VSideDrawer } from '@vonage/vivid-vue';
import { ref } from 'vue';

const open = ref(true);
const selected = ref('calls');
</script>

<style lang="scss" scoped>
.container {
  /* for demo purposes */
  block-size: 250px;
  overflow: hidden;
}

.fab {
  position: fixed;
  inset: auto auto 8px 8px;
  z-index: 2;
}

.drawer::part(base) {
  transform: var(--demo-drawer-transform);
}

.drawer {
  --demo-drawer-transform: translateX(0);
  --side-drawer-app-content-offset: 280px;
}

.drawer.collapsed {
  --demo-drawer-transform: translateX(calc(-100% + 70px));
  --side-drawer-app-content-offset: 70px;

  .item {
    align-self: flex-end;
  }
}
</style>
